import { axiosInstance } from "./AxiosInstance";

const orderByCod = (orderingUserData) => axiosInstance.post(`/order/orderByCod`, orderingUserData);
const orderByStripe = (orderingUserData) => axiosInstance.post(`/order/orderByStripe`, orderingUserData);
const verifyStripe = (data) => axiosInstance.put(`/order/verifyStripe`, data);
const getOrdersOfAnUser = () => axiosInstance.get(`/order/getOrdersOfAnUser`);




export const orderByCodHandler = async (orderingUserData) => {
    try {
        const response = await orderByCod(orderingUserData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const orderByStripeHandler = async (orderingUserData) => {
    try {
        const response = await orderByStripe(orderingUserData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const verifyStripeHandler = async (data) => {
    try {
        const response = await verifyStripe(data);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const getOrdersOfAnUserHandler = async () => {
    try {
        const response = await getOrdersOfAnUser();
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}