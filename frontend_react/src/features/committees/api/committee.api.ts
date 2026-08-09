import axiosInstance from "@/lib/axios";
import type { CommitteeSchema } from "../schemas/committee.schema";

export async function createCommittee(data: CommitteeSchema) {
  const response = await axiosInstance.post(`/committee`, data);
  return response.data.data;
}
