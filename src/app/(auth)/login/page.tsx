'use client';

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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <h1 className="text-2xl mb-4 font-bold text-gray-800">Welcome To Task Manager</h1>
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
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
