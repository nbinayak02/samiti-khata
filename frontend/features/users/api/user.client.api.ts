import { SignupDto } from "@/api/types";
import { BackendResponse } from "@/features/shared.types";
import { axiosInstance } from "@/lib/api/browser.client";

export async function createAdmin(
  data: SignupDto,
): Promise<BackendResponse<SignupDto>> {
  return await axiosInstance.post("/users/admin", data);
}
