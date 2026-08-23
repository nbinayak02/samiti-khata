import type {
  SearchableColumn,
  SortDir,
} from "@/components/shared/data-table/data-table.types";
import type {
  ColumnDef,
  PaginationState,
  RowData,
} from "@tanstack/react-table";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { DataTableFeatures } from "@/components/shared/data-table/Data-Table-Features";

export interface DataTableContext<TData extends RowData> {
  data: TData;
  columns: ColumnDef<DataTableFeatures, TData>[];

  isLoading?: boolean;

  //   pagination
  pageCount: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;

  //   searching
  searchValue: string;
  searchColumn: string;
  searchableColumns: SearchableColumn[];
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchColumn: Dispatch<SetStateAction<string>>;

  //   sorting
  sortDirection: SortDir | null;
  setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
}

// export const DataTableContext = createContext<DataTableContext | undefined>(undefined)