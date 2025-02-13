import { postLoginApi } from "@/service/authService";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      id: "login",
      // @ts-expect-error - Types are incorrect
      async authorize(credentials: { email: string; password: string }) {
        try {
          // as there is no login and register APIs are provided in the assignment,
          // I'm just setting up the auth configuration, and login component setup, please note.
          const { data, status } = await postLoginApi({
            email: credentials?.email,
            password: credentials?.password,
          });

          if (data && status === 200) {
            if (data?.data?.user?.email_verified_at === null) {
              const errObj = {
                message: "Please verify your email first",
                showResend: true,
                email: credentials?.email,
              };
              throw new Error(JSON.stringify(errObj));
            }

            return {
              user: (data as any).data.user,
              token: (data as any).data.accessToken,
            };
          }

          throw new Error(
            JSON.stringify({
              message: "login failed",
            }),
          );
        } catch (error: any) {
          if (error?.response) {
            throw new Error(JSON.stringify(error?.response?.data));
          }

          throw new Error(error?.message);
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXT_PUBLIC_DEV_NEXT_AUTH_SECRET,
  callbacks: {
    // @ts-expect-error - Types are incorrect
    async session({ session, token }) {
      return { ...session, user: token.user, token: token.token };
    },
    async jwt({ token, user, trigger, session }: any) {
      if (typeof user !== "undefined") {
        return user;
      }

      if (trigger === "update") {
        token.user = { ...token.user, ...session };
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
