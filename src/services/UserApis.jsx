import { axiosInstance } from "./AxiosInstance";

const registerUser = (userData) => axiosInstance.post(`/user/registerUser`, userData);
const loginUser = (userData) => axiosInstance.post(`/user/loginUser`, userData);
const logoutUser = () => axiosInstance.post(`/user/logoutUser`);

export const registerUserHandler = async (userData) => {
    try {
        const response = await registerUser(userData);
        if (response.data.success) {
            return response;
        }
    } catch (error) {
        console.log(`Error in registerUserHandler`, error.message);
    }
}

export const loginUserHandler = async (userData) => {
    try {
        const response = await loginUser(userData);
        if (response.data.success) {
            return response;
        }
    } catch (error) {
        console.log(`Error in loginUserHandler`, error.message);
    }
}


export const logoutUserHandler = async () => {
    try {
        const response = await logoutUser();
        if (response.data.success) {
            return response;
        }
    } catch (error) {
        console.log(`Error in loginUserHandler`, error.message);
    }
}