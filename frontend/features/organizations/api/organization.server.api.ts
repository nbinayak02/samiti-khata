import {
  BackendResponsePaginated,
  TablePaginationState,
} from "@/features/types";
import makeRequest from "@/lib/api/server.client";
import { Organization } from "../schema/types";
import { PaginationMetadata } from "@/api/types";

type ReturnType = {
  data: Organization[];
  meta: PaginationMetadata;
};

export async function getOrganizations({
  pageIndex,
  pageSize,
}: TablePaginationState): Promise<ReturnType> {
  try {
    const res = await makeRequest<BackendResponsePaginated<Organization[]>>(
      `/organization?pageIndex=${pageIndex + 1}&pageSize=${pageSize}`,
      { cache: "no-store" },
    );
    console.log({ res });

    return {
      data: res.data,
      meta: {
        ...res.meta,
        pageIndex: Math.max(0, pageIndex - 1),
      },
    };
  } catch (err: Error | unknown) {
    throw new Error("Failed to fetch organizations.");
  }
}
