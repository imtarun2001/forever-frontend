import { axiosInstance } from "./AxiosInstance";

const registerUser = (userData) => axiosInstance.post(`/user/registerUser`, userData);
const loginUser = (userData) => axiosInstance.post(`/user/loginUser`, userData);
const logoutUser = () => axiosInstance.post(`/user/logoutUser`);

export const registerUserHandler = async (userData) => {
    try {
        const response = await registerUser(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

export const loginUserHandler = async (userData) => {
    try {
        const response = await loginUser(userData);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}


export const logoutUserHandler = async () => {
    try {
        const response = await logoutUser();
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}