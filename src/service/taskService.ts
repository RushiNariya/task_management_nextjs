// import { ArtistParamsType } from "@/types/artists";
import axiosInstance from "./axiosInstance";
import { TasksParamsType } from "@/types/task";

export const getTaskListApi = (params: TasksParamsType) => {
  return axiosInstance.get("/todos", {
    params: {
      limit: params.perPage,
      skip: (params.page - 1) * params.perPage,
    },
  });
};

export const deleteTodoApi = (id: number) => {
  return axiosInstance.delete(`/todos/${id}`);
};

export const AddTodoApi = (body: any) => {
  return axiosInstance.post(`/todos/add`, body);
};

export const updateTodoApi = (body: any, id: number) => {
  return axiosInstance.put(`/todos/${id}`, body);
};

export const getTodoByIdApi = (id: number) => {
  return axiosInstance.get(`/todos/${id}`);
};
