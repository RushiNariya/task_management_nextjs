"use client";

import Button from "@/components/FormComponents/Button";
import CustomInput from "@/components/FormComponents/CustomInput";
import GoBack from "@/components/GoBack";
import Loader from "@/components/Loader";
import { updateTaskThunkAction } from "@/redux/features/tasks/thunk";
import { useAppDispatch } from "@/redux/hook";
import { getTodoByIdApi } from "@/service/taskService";
import { TaskType } from "@/types/task";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

interface PageProps {
  params: Promise<{ id: string }>;
}

function Page({ params }: PageProps) {
  const { id } = use<{ id: string }>(params);
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<TaskType | null>(null);

  React.useEffect(() => {
    async function fetchTaskByIdHandler() {
      try {
        setLoading(true);
        const { data } = await getTodoByIdApi(+id);
        setTask(data);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    }
    if (id && !isNaN(+id)) {
      fetchTaskByIdHandler();
    }
  }, [id]);

  const dispatch = useAppDispatch();

  const rounter = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: task?.todo || "",
      status: task?.completed ? "yes" : "no",
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

      dispatch(
        updateTaskThunkAction({
          id: +id,
          body: reqBody,
        }),
      )
        .unwrap()
        .then(() => {
          rounter.push("/tasks");
        })
        .catch((error: Error) => {
          toast.error(error.message || "Something went wrong");
        });
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader loaderText="Fetching data..." />
      </div>
    );
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="max-w-xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-8">
          <h2 className="title-font mb-1 text-lg font-medium text-gray-900">Edit Task</h2>
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
              disabled
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
            {formik.isSubmitting ? "Updating..." : "Update Task"}
          </Button>
          <GoBack />
        </div>
      </form>
    </>
  );
}

export default Page;
