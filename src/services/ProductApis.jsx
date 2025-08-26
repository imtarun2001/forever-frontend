import { axiosInstance } from "./AxiosInstance";

const getProducts = () => axiosInstance.get(`/getProducts`);
const getProduct = (productId) => axiosInstance.get(`/getProduct/${productId}`);

export const getProductsHandler = async () => {
    try {
        const response = await getProducts();
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const getProductHandler = async (productId) => {
    try {
        const response = await getProduct(productId);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message);
    }
}