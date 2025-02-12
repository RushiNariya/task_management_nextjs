import {
  getTaskListApi,
  deleteTodoApi,
  AddTodoApi,
  updateTodoApi,
} from "@/service/taskService";
import { messages } from "@/utils/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TasksParamsType } from "@/types/task";
import toast from "react-hot-toast";

export const fetchTasksListThunkAction = createAsyncThunk<any, TasksParamsType>(
  "tasks/list",
  async (params, thunkApi) => {
    try {
      const { data } = await getTaskListApi(params);

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err?.response?.data?.message || err?.message || err || messages.ERROR_MESSAGE,
      );
    }
  },
);

export const deleteTaskThunkAction = createAsyncThunk<any, number>(
  "tasks/delete",
  async (todoId, thunkApi) => {
    try {
      toast.loading("Deleting Task...");
      const { data } = await deleteTodoApi(todoId);

      toast.dismiss();
      toast.success("Task Deleted Successfully");
      return data;
    } catch (err: any) {
      toast.dismiss();
      toast.error("Failed to delete Task");
      return thunkApi.rejectWithValue(
        err?.response?.data?.message || err?.message || err || messages.ERROR_MESSAGE,
      );
    }
  },
);

export const addTaskThunkAction = createAsyncThunk<any, any>(
  "tasks/add",
  async (body, thunkApi) => {
    try {
      const { data } = await AddTodoApi(body);

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err?.response?.data?.message || err?.message || err || messages.ERROR_MESSAGE,
      );
    }
  },
);

export const updateTaskThunkAction = createAsyncThunk<any, { id: number; body: any }>(
  "tasks/update",
  async ({ body, id }, thunkApi) => {
    try {
      const { data } = await updateTodoApi(body, id);

      return data;
    } catch (err: any) {
      return thunkApi.rejectWithValue(
        err?.response?.data?.message || err?.message || err || messages.ERROR_MESSAGE,
      );
    }
  },
);
