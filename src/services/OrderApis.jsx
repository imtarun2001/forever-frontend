import { axiosInstance } from "./AxiosInstance";

const orderByCod = (orderData) => axiosInstance.post(`/order/orderByCod`,orderData);

export const orderByCodHandler = async (orderData) => {
    try {
        const response = await orderByCod(orderData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}