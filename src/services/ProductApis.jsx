import toast from "react-hot-toast";
import { axiosInstance } from "./AxiosInstance";

const getProducts = () => axiosInstance.get(`/getProducts`);
const getProduct = (productId) => axiosInstance.get(`/getProduct/${productId}`);

export const getProductsHandler = async () => {
    try {
        const response = await getProducts();
        if (response.data.success) {
            return response;
        }
        return [];
    } catch (error) {
        console.log(`Error in getProductsHandler`);
        toast.error(error.message);
        return [];
    }
}
export const getProductHandler = async (productId) => {
    try {
        const response = await getProduct(productId);
        if (response.data.success) {
            return response;
        }
        return [];
    } catch (error) {
        console.log(`Error in getProductHandler`);
        toast.error(error.message);
        return [];
    }
}