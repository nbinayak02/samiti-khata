import { OrganizationDto } from "@/api/types";
import { BackendResponse } from "@/features/shared.types";
import { axiosInstance } from "@/lib/api/browser.client";

export async function createOrganization(
  data: OrganizationDto,
): Promise<BackendResponse<OrganizationDto>> {
  return await axiosInstance.post("/organization", data);
}
