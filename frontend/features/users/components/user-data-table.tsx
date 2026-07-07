"use client";
import DataTable from "@/components/tables/data-table";
import PaginationComponent from "@/components/pagination";
import { Input } from "@/components/ui/input";
import { DataTableProps } from "@/features/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export default function UserDataTable<TData, TValue>({
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
