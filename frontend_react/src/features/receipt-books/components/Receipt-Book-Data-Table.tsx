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
import SelectFiscalYearFilter from "@/features/fiscal-year/components/Select-Fiscal-Year-Filter";
import SelectBookStatusFilter from "@/components/shared/data-table/components/Select-Book-Status-Filter";
import SelectOrgMemberFilter from "@/features/org-members/components/Select-Org-Member-Filter";

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

  fiscalYearId: string | null;
  status: string | null;
  assignedTo: string | null;
  setFiscalYearId: Dispatch<SetStateAction<string | null>>;
  setStatus: Dispatch<SetStateAction<string | null>>;
  setAssignedTo: Dispatch<SetStateAction<string | null>>;
};

export default function ReceiptBookDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
  fiscalYearId,
  status,
  assignedTo,
  setFiscalYearId,
  setStatus,
  setAssignedTo,
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
    setFiscalYearId(null);
    setStatus(null);
    setAssignedTo(null);
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  return (
    <div className="space-y-6 flex min-h-0 flex-col">
      <div className="flex items-center gap-2 flex-wrap">
        <DataTableSearch
          key={search.searchKey}
          search={search}
          pagination={{
            setPagination: pagination.setPagination,
          }}
        />

        <SelectFiscalYearFilter
          fiscalYearId={fiscalYearId}
          setFiscalYearId={setFiscalYearId}
        />

        <SelectOrgMemberFilter
          label="assigned member"
          orgMemberId={assignedTo}
          setOrgMemberId={setAssignedTo}
        />
        <SelectBookStatusFilter status={status} setStatus={setStatus} />

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
