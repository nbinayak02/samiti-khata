import { PaginationMetadata } from "@/api/types";

export interface BackendResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface BackendResponsePaginated<T> extends BackendResponse<T> {
  meta: PaginationMetadata;
}

export type TablePaginationState = Omit<PaginationMetadata, "totalPages">;
