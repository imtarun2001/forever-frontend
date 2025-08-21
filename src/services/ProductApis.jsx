import { axiosInstance } from "./AxiosInstance";

const getProducts = () => axiosInstance.get(`/getProducts`);