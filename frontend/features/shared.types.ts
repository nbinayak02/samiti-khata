import { PaginationMetadata } from "@/api/types";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

export interface BackendResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
      message: string;
    }
  | {
      success: false;
      message: string;
      errorCode: string;
    };

export interface BackendResponsePaginated<T> extends BackendResponse<T> {
  meta: PaginationMetadata;
}

export type TablePaginationState = Omit<PaginationMetadata, "totalPages">;

export interface ReturnType<T> {
  data: T[];
  meta: PaginationMetadata;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: PaginationMetadata;
  pagination: TablePaginationState;
  setPagination: Dispatch<SetStateAction<TablePaginationState>>;
}
