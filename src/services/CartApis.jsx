import { axiosInstance } from "./AxiosInstance";

const addToCart = (data) => axiosInstance.post(`/cart/addToCart`,data);
const getCartDataOfAnUser = () => axiosInstance.get(`/cart/getCartDataOfAnUser`);
const updateCart = (data) => axiosInstance.put(`/cart/updateCart`,data);

export const addToCartHandler = async (data) => {
    try {
        const response = await addToCart(data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Something went wrong`);
    }
}

export const getCartDataOfAnUserHandler = async () => {
    try {
        const response = await getCartDataOfAnUser();
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Something went wrong`);
    }
}

export const updateCartHandler = async (data) => {
    try {
        const response = await updateCart(data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || `Something went wrong`);
    }
}