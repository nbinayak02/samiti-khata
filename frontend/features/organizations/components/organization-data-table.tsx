"use client";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Dispatch, SetStateAction, useState } from "react";
import { PaginationMetadata } from "@/api/types";
import { TablePaginationState } from "@/features/shared.types";
import DataTable from "@/components/tables/data-table";
import { Input } from "@/components/ui/input";
import PaginationComponent from "@/components/tables/pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: PaginationMetadata;
  pagination: TablePaginationState;
  setPagination: Dispatch<SetStateAction<TablePaginationState>>;
}

export function OrganizationDataTable<TData, TValue>({
  columns,
  data,
  meta,
  pagination,
  setPagination,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: meta?.totalPages || 1,
    onPaginationChange: setPagination,
    state: {
      columnFilters,
      pagination,
    },
  });

  return (
    <div>
      {/* search bar */}
      <div className="flex items-center pb-4">
        <Input
          placeholder="Search organization"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* table  */}
      <div className="overflow-hidden rounded-md border">
        <DataTable columns={columns} table={table} />
      </div>

      {/* pagination  */}
      <PaginationComponent
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onPreviousClick={() => table.previousPage()}
        setPreviousDisabled={!table.getCanPreviousPage()}
        onNextClick={() => table.nextPage()}
        setNextDisabled={!table.getCanNextPage()}
      />
    </div>
  );
}
