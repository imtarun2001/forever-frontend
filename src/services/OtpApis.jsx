import { axiosInstance } from "./AxiosInstance";

const generateOtp = (email) => axiosInstance.post(`/otp/generateOtp`, email);

export const generateOtpHandler = async (email) => {
    try {
        const response = await generateOtp(email);
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}