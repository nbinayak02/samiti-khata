import type {
  PaginationState,
  SearchableColumns,
} from "@/types/pagination.types";
import {
  dataTableFeatures,
  nonPaginatedDataTableFeatures,
  type DataTableFeatures,
} from "./Data-Table-Features";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableSort from "./Data-Table-Sort";
import type { SortDir } from "./data-table.types";
import DataTableSearch from "./Data-Table-Search";
import type { Dispatch, SetStateAction } from "react";
import DataTablePagination from "./Data-Table-Pagination";
import { useTable, type ColumnDef, type RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props<TData extends RowData> = {
  data?: TData[];

  columns: ColumnDef<DataTableFeatures, TData>[];

  isLoading: boolean;

  isPaginated: boolean;

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
};

export default function DataTableContainer<TData extends RowData>({
  data,
  columns,
  isLoading,
  isPaginated,
  search,
  sorting,
  pagination,
}: Props<TData>) {
  const table = useTable({
    columns,
    data: data ?? [],

    manualPagination: isPaginated,

    features: isPaginated ? dataTableFeatures : nonPaginatedDataTableFeatures,

    state: isPaginated
      ? {
          pagination: pagination.pagination,
        }
      : undefined,

    pageCount: isPaginated ? pagination.pageCount : undefined,

    onPaginationChange: isPaginated ? pagination.setPagination : undefined,
  });

  const handleClearFilters = () => {
    search.setSearchKey("");
    search.setSearchColumn("");
    sorting.setSortDirection("desc");
  };

  return (
    <div className="space-y-6 flex min-h-0 flex-col">
      <div className="flex items-center gap-2">
        <DataTableSearch
          search={search}
          pagination={{
            setPagination: pagination.setPagination,
          }}
        />

        <DataTableSort sorting={sorting} />
        <Button variant={"secondary"} onClick={handleClearFilters}>
          <X />
          Clear Filters
        </Button>
      </div>

      {/* Table */}
      <div className="max-h-[calc(100vh-220px)] overflow-auto rounded-md border">
        <Table className="w-full min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted sticky top-0 z-10"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="bg-muted">
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

      {isPaginated && (
        <DataTablePagination
          isLoading={isLoading}
          pageCount={pagination.pageCount ?? 0}
          pageIndex={pagination.pagination.pageIndex}
          nextPage={table.nextPage}
          previousPage={table.previousPage}
        />
      )}
    </div>
  );
}
