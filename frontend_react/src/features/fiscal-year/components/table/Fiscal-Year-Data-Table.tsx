import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useTable,
  type ColumnDef,
  type ColumnFiltersState,
  type RowData,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  fiscalYearDataTableFeatures,
  type FiscalYearDataTableFeatures,
} from "./fiscalYear.dataTableFeatures";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<FiscalYearDataTableFeatures, TData>[];
  data: TData[];
}

export function FiscalYearDataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useTable({
    data,
    columns,
    features: fiscalYearDataTableFeatures,
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Fiscal Year..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="bg-muted" key={header.id}>
                      {header.isPlaceholder ? null : (
                        <table.FlexRender header={header} />
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
    </div>
  );
}
