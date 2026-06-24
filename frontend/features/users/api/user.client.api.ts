import { SignupDto } from "@/api/types";
import { BackendResponse } from "@/features/types";
import { axiosInstance } from "@/lib/api/browser.client";

export async function createUser(
  data: SignupDto,
): Promise<BackendResponse<SignupDto>> {
  return await axiosInstance.post("/user", data);
}
