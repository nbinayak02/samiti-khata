import {
  BackendResponsePaginated,
  ReturnType,
  TablePaginationState,
} from "@/features/shared.types";
import { User } from "../schema/types";
import makeRequest from "@/lib/api/server.client";

export async function getAdmin({
  pageIndex,
  pageSize,
}: TablePaginationState): Promise<ReturnType<User>> {
  try {
    const res = await makeRequest<BackendResponsePaginated<User[]>>(
      `/users/admin?pageIndex=${pageIndex + 1}&pageSize=${pageSize}`,
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
  } catch (error: unknown) {
    throw new Error("Failed to fetch users.");
  }
}
