"use client";

import Button from "@/components/FormComponents/Button";
import CustomInput from "@/components/FormComponents/CustomInput";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Home() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().trim().email().required("Email is required."),
      password: Yup.string()
        .trim()
        .required("Password is required.")
        .min(8, "Password must be at least 8 characters.")
        .max(50, "Password must be less than 50 characters."),
    }),
    onSubmit: async (values: any) => {
      try {
        toast.loading("Loading...");

        const response = signIn("login", {
          redirect: false,
          email: values.email,
          password: values.password,
        })
          .then((response: any) => {
            // additional logic after success login
            toast.success(response?.message || "User logged in successfully.");
          })
          .catch((error) => {
            formik.setSubmitting(false);

            // additional logic after failed login

            toast.error(
              error?.response?.data?.message ||
                error?.message ||
                "Error while login user.",
            );
          });

        await response;
      } catch (error: any) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">
            Welcome To Task Manager
          </h1>
          <p className="text-gray-500">Sign in to continue </p>
        </div>

        <form id="loginForm" className="space-y-6">
          <div>
            <CustomInput
              label="Email *"
              type="email"
              name="email"
              placeHolder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.email && !!formik.errors.email}
              helperText={formik.errors.email as string}
            />
          </div>

          <div>
            <CustomInput
              label="Password *"
              type={"password"}
              name="password"
              placeHolder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.password && !!formik.errors.password}
              helperText={formik.errors.password as string}
            />
          </div>

          <Button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
