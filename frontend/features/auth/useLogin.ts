import { axiosInstance } from "@/lib/api/browser.client";

export default function useLogin() {
  const login = async () => {
    const response = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
    );
  };

  return { login };
}
