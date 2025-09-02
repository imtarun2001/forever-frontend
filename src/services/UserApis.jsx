import { axiosInstance } from "./AxiosInstance";

const registerUser = (userData) => axiosInstance.post(`/user/registerUser`, userData);
const customerLogin = (userData) => axiosInstance.post(`/user/customerLogin`, userData);
const customerLogout = () => axiosInstance.post(`/user/customerLogout`);
const forgotPasswordLinkToEmail = (userData) => axiosInstance.post(`/user/forgotPasswordLinkToEmail`, userData);
const forgotPassword = (userData) => axiosInstance.post(`/user/forgotPassword`, userData);




export const registerUserHandler = async (userData) => {
    try {
        const response = await registerUser(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const customerLoginHandler = async (userData) => {
    try {
        const response = await customerLogin(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const customerLogoutHandler = async () => {
    try {
        const response = await customerLogout();
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const forgotPasswordLinkToEmailHandler = async (userData) => {
    try {
        const response = await forgotPasswordLinkToEmail(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}




export const forgotPasswordHandler = async (userData) => {
    try {
        const response = await forgotPassword(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}