import axiosInstance from "@/lib/axios";
import type { CommitteeSchema } from "../schemas/committee.schema";
import type { Committee } from "../components/types/Committee.types";

export async function createCommittee(data: CommitteeSchema) {
  const response = await axiosInstance.post(`/committee`, data);
  return response.data.data;
}

export async function getCommittees(): Promise<Committee[]> {
  const response = await axiosInstance.get(`/committee/organization`);
  return response.data.data;
}
