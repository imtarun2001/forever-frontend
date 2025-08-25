import { axiosInstance } from "./AxiosInstance";

const generateOtp = (email) => axiosInstance.post(`/generateOtp`, email);

export const generateOtpHandler = async (email) => {
    try {
        const response = await generateOtp(email);
        if (response.data.success) {
            return response;
        }
    } catch (error) {
        console.log(`Error in generateOtpHandler`, error.message);
    }
}