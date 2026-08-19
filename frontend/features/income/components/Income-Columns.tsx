"use client";

import { IncomeDto } from "@/api/types";
import { ColumnDef } from "@tanstack/react-table";

export const IncomeColumns: ColumnDef<IncomeDto>[] = [
  {
    id: "count",
    header: "#",
    cell: ({ row, table }) => {
      const { pageIndex, pageSize } = table.getState().pagination;

      return pageIndex * pageSize + row.index + 1;
    },
  },
  {
    accessorKey: "billNumber",
    header: "Bill Number",
  },
  {
    accessorKey: "Book Number",
    header: "Book Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "nepaliDate",
    header: "Date",
  },
];
