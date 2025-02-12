import { Store } from "@reduxjs/toolkit";
import axios from "axios";
// import { getSession, signOut } from "next-auth/react";
// import { getSession } from "next-auth/react";
// import toast from "react-hot-toast";

// Axios Instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEV_BASE_URL,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let store: Store;

export const injectStore = (_store: Store) => {
  store = _store;
};

// Request interceptor

instance.interceptors.request.use(
  async (config) => {
    // const session: any = await getSession();

    // if (session?.token != null) {
    //   config.headers["Authorization"] = `Bearer ${session!.token}`;
    // }

    config.params = {
      ...config.params,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor and error handling
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // console.log('Request canceled', error.message);
    } else if (!error.response) {
    }
    if (error?.response?.status === 401) {
      // signOut().then(() => {
      //   window.location.reload();
      // });
    } else {
      // console.log(error.response);
      // toast.error(error.response.data.message);
    }

    return Promise.reject(error);
  },
);

export default instance;
