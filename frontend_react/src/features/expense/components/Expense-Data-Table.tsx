import {
  useTable,
  type ColumnDef,
  type PaginationState,
  type RowData,
} from "@tanstack/react-table";
import {
  DataTable,
  dataTableFeatures,
  DataTablePagination,
  DataTableSearch,
  DataTableSort,
  type DataTableFeatures,
  type SortDir,
} from "@/components/shared/data-table";

import type { Dispatch, SetStateAction } from "react";
import type { SearchableColumns } from "@/types/pagination.types";
import ClearFilterButton from "@/components/shared/data-table/components/Clear-Filter-Button";
import SelectCommitteeFilter from "@/features/committees/components/Select-Committee-Filter";
import SelectCategoryFilter from "@/features/expense-category/components/Select-Category-Filter";

type Props<TData extends RowData> = {
  data?: TData[];
  isLoading: boolean;
  columns: ColumnDef<DataTableFeatures, TData>[];

  search: {
    searchKey: string;
    searchColumn: string;
    searchableColumns: SearchableColumns[];
    setSearchKey: Dispatch<SetStateAction<string>>;
    setSearchColumn: Dispatch<SetStateAction<string>>;
  };

  sorting: {
    sortDirection: SortDir | null;
    setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
  };

  pagination: {
    pageCount?: number;
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
  };

  committeeId: string | null;
  categoryId: string | null;
  setCommitteeId: Dispatch<SetStateAction<string | null>>;
  setCategoryId: Dispatch<SetStateAction<string | null>>;
};

export default function ExpenseDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
  committeeId,
  categoryId,
  setCommitteeId,
  setCategoryId,
}: Props<TData>) {
  const table = useTable({
    columns,
    data: data ?? [],
    features: dataTableFeatures,
    manualPagination: true,
    pageCount: pagination.pageCount,
    onPaginationChange: pagination.setPagination,
    state: {
      pagination: pagination.pagination,
    },
  });

  const handleClearFilters = () => {
    setCommitteeId(null);
    setCategoryId(null);
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  return (
    <div className="space-y-6 flex min-h-0 flex-col">
      <div className="flex items-center gap-2">
        <DataTableSearch
          key={search.searchKey}
          search={search}
          pagination={{
            setPagination: pagination.setPagination,
          }}
        />

        <SelectCategoryFilter
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />

        <SelectCommitteeFilter
          committeeId={committeeId}
          setCommitteeId={setCommitteeId}
        />

        <DataTableSort sorting={sorting} />

        <ClearFilterButton onClick={handleClearFilters} />
      </div>

      <DataTable columns={columns} table={table} isLoading={isLoading} />

      <DataTablePagination
        isLoading={isLoading}
        pageCount={pagination.pageCount ?? 0}
        pageIndex={pagination.pagination.pageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
      />
    </div>
  );
}
