const API_URL = import.meta.env.VITE_API_URL;
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default axiosInstance;
