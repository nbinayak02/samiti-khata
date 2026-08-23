import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  dataTableFeatures,
  type DataTableFeatures,
} from "./Data-Table-Features";

import { Button } from "@/components/ui/button";
import { DataTableSearch } from "./Data-Table-Search";
import { type Dispatch, type SetStateAction } from "react";
import type { SearchableColumn, SortDir } from "./data-table.types";
import type { PaginationState } from "@/types/pagination.types";
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";

interface DataTableProps<TData extends RowData> {
  data: TData[];
  search: string;
  pageCount: number;
  isLoading?: boolean;
  searchColumn: string;
  sortDirection: SortDir | null;
  pagination: PaginationState;
  searchableColumns: SearchableColumn[];
  setSearch: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<DataTableFeatures, TData>[];
  setSearchColumn: Dispatch<SetStateAction<string>>;
  setSortDirection: Dispatch<SetStateAction<SortDir | null>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

export function DataTable<TData extends RowData>({
  data,
  search,
  columns,
  setSearch,
  pageCount,
  pagination,
  searchColumn,
  sortDirection,
  setPagination,
  setSearchColumn,
  setSortDirection,
  searchableColumns,
  isLoading = false,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    pageCount,
    manualPagination: true,
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      <DataTableSearch
        search={search}
        setSearch={setSearch}
        pagination={pagination}
        searchColumn={searchColumn}
        setPagination={setPagination}
        sortDirection={sortDirection}
        setSearchColumn={setSearchColumn}
        setSortDirection={setSortDirection}
        searchableColumns={searchableColumns}
      />

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {pagination.pageIndex + 1} of {pageCount}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={pagination.pageIndex === 0 || isLoading}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={pagination.pageIndex >= pageCount - 1 || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
