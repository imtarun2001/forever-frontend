import axios from "axios";

const baseUrl =import.meta.env.PROD ? "https://forever-backend-3www.onrender.com/forever/v1" : import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create(
    {
        baseURL: baseUrl,
        withCredentials: true,
    }
);