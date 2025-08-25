import toast from "react-hot-toast";
import { axiosInstance } from "./AxiosInstance";

const addToCart = (data) => axiosInstance.post(`/cart/addToCart`,data);
const getCartDataOfAnUser = () => axiosInstance.get(`/cart/getCartDataOfAnUser`);
const updateCart = (data) => axiosInstance.put(`/cart/updateCart`,data);

export const addToCartHandler = async (data) => {
    try {
        const response = await addToCart(data);
        if(response.data.success) {
            return response;
        } else {
            throw new Error(response.data.message || `Something went wrong`);
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const getCartDataOfAnUserHandler = async () => {
    try {
        const response = await getCartDataOfAnUser();
        if(response.data.success) {
            return response;
        } else {
            throw new Error(response.data.message || `Something went wrong`);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message);
    }
}

export const updateCartHandler = async (data) => {
    try {
        const response = await updateCart(data);
        if(response.data.success) {
            return response;
        } else {
            throw new Error(response.data.message || `Something went wrong`);
        }
    } catch (error) {
        console.log(error.message);
    }
}