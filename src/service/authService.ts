// import axiosInstance from "./axiosInstance";
import axios from "axios";

export const postLoginApi = (authData: { email: string; password: string }) => {
  return axios.post(process.env.NEXT_PUBLIC_DEV_BASE_URL + "/auth/login", authData);
};
