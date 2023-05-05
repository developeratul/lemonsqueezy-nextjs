import Axios from "axios";
import { toast } from "react-hot-toast";

export const axios = Axios.create({
  baseURL: "/",
});

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error(message);
    return Promise.reject(error);
  }
);
