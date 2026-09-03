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

import { useState, type Dispatch, type SetStateAction } from "react";
import type { SearchableColumns } from "@/types/pagination.types";
import SelectReceiptBookFilter from "@/features/receipt-books/components/Select-Receipt-Book-Filter";
import ClearFilterButton from "@/components/shared/data-table/components/Clear-Filter-Button";
import SelectCommitteeFilter from "@/features/committees/components/Select-Committee-Filter";
import IncomeDetailsDialog from "./Income-Details-Dialog";
import DeleteIncomeAlertDialog from "./Delete-Income-Alert-Dialog";

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
  receiptBookId: string | null;
  setCommitteeId: Dispatch<SetStateAction<string | null>>;
  setReceiptBookId: Dispatch<SetStateAction<string | null>>;
};

export default function IncomeDataTable<TData extends RowData>({
  data,
  isLoading,
  columns,
  pagination,
  search,
  sorting,
  committeeId,
  receiptBookId,
  setCommitteeId,
  setReceiptBookId,
}: Props<TData>) {
  const [clickedRowId, setClickedRowId] = useState<number | null>(null);

  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteSuccess = () => {
    setOpenDelete(false);
    setClickedRowId(null);
  };

  const table = useTable({
    columns,
    data: data ?? [],
    features: dataTableFeatures,
    manualPagination: true,
    pageCount: pagination.pageCount,
    onPaginationChange: pagination.setPagination,
    state: {
      pagination: pagination.pagination,
      columnVisibility: {
        id: false,
      },
    },
  });

  const handleClearFilters = () => {
    setCommitteeId(null);
    setReceiptBookId(null);
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  const handleRowClick = (id: string) => {
    setClickedRowId(Number(id));
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

        <SelectReceiptBookFilter
          receiptBookId={receiptBookId}
          setReceiptBookId={setReceiptBookId}
        />

        <SelectCommitteeFilter
          committeeId={committeeId}
          setCommitteeId={setCommitteeId}
        />

        <DataTableSort sorting={sorting} />

        <ClearFilterButton onClick={handleClearFilters} />
      </div>

      <DataTable
        columns={columns}
        table={table}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      />

      <DataTablePagination
        isLoading={isLoading}
        pageCount={pagination.pageCount ?? 0}
        pageIndex={pagination.pagination.pageIndex}
        nextPage={table.nextPage}
        previousPage={table.previousPage}
      />

      {clickedRowId && (
        <>
          <IncomeDetailsDialog
            id={clickedRowId}
            open={!!clickedRowId}
            onClose={() => setClickedRowId(null)}
            onDelete={() => setOpenDelete(true)}
          />

          <DeleteIncomeAlertDialog
            id={clickedRowId}
            open={openDelete}
            setOpen={setOpenDelete}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </>
      )}
    </div>
  );
}
