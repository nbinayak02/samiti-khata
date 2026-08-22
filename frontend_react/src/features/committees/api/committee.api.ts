import axiosInstance from "@/lib/axios";
import type {
  CommitteeSchema,
  SubCommitteePayload,
} from "../schemas/committee.schema";
import type { Committee, SubCommittee } from "../types/Committee.types";

export async function createCommittee(data: CommitteeSchema) {
  const response = await axiosInstance.post(`/committee`, data);
  return response.data.data;
}

export async function createSubCommittee(
  data: SubCommitteePayload,
): Promise<SubCommittee> {
  const response = await axiosInstance.post(`/sub-committee`, data);
  return response.data.data;
}

export async function getCommittees(): Promise<Committee[]> {
  const response = await axiosInstance.get(`/committee/organization`);
  return response.data.data;
}

export async function getAllSubCommittees(): Promise<SubCommittee[]> {
  const response = await axiosInstance.get(`/sub-committee/`);
  return response.data.data;
}

export async function getSubCommitteesByCommittee(
  committeeId?: number,
): Promise<SubCommittee[]> {
  const response = await axiosInstance.get(`/sub-committee/${committeeId}`);
  return response.data.data;
}
