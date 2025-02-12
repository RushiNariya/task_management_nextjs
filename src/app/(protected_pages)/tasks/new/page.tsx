"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addTaskThunkAction } from "@/redux/features/tasks/thunk";
import { toast } from "react-hot-toast";
import GoBack from "@/components/GoBack";
import Button from "@/components/FormComponents/Button";
import CustomInput from "@/components/FormComponents/CustomInput";
function Page() {
  const dispatch = useAppDispatch();

  const rounter = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      status: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      status: Yup.string().required("Status is required."),
    }),

    onSubmit: (values) => {
      const reqBody = {
        todo: values.title,
        completed: values.status,
        userId: 5,
      };

      dispatch(addTaskThunkAction(reqBody))
        .unwrap()
        .then(() => {
          rounter.push("/tasks");
        })
        .catch((error) => {
          toast.error(error.message || "Something went wrong");
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
        <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
          Add New Task
        </h2>
        <p className="mb-5 leading-relaxed text-gray-600">
          Enter title and todo status, you can edit the task later to mark it as
          completed.
        </p>
        <div className="mb-4">
          <CustomInput
            label="Title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.errors.title}
            required
            placeHolder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700 font-medium mb-2">
            Completed
          </label>
          <select
            id="status"
            name="status"
            className="w-full rounded border border-gray-300 bg-white py-3 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            onChange={formik.handleChange}
            value={formik.values.status}
            onBlur={formik.handleBlur}
          >
            <option value="">Select status</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          {formik.touched.status && formik.errors.status ? (
            <div className="text-red-400 text-sm">{formik.errors.status}</div>
          ) : null}
        </div>

        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Adding..." : "Add Task"}
        </Button>
        <GoBack />
      </div>
    </form>
  );
}

export default Page;
