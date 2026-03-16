import axiosInstance from "@/lib/apiClient"

export const getUserProfile = async () => {
    return await axiosInstance.get("/user/");
}