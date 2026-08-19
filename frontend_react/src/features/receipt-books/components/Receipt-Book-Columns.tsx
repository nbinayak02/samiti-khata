import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table/Data-Table-Features";
import type { ReceiptBook } from "../types/receiptBooks.types";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, ReceiptBook>();

export const receiptBookDataTableColumns = columnHelper.columns([
  columnHelper.display({
    id: "#",
    header: "#",
    cell: ({ row, table }) => {
      const pagination = table.options.state?.pagination;

      return (
        <span>
          {(pagination?.pageIndex ?? 0) * (pagination?.pageSize ?? 0) +
            row.index +
            1}
        </span>
      );
    },
  }),
  columnHelper.accessor("fiscalYear.name", {
    header: "Fiscal Year",
  }),
  columnHelper.accessor("bookNumber", {
    header: "Book Number",
  }),
  columnHelper.accessor("receiptStartingNumber", {
    header: "Recipt Start No.",
  }),
  columnHelper.accessor("receiptEndingNumber", {
    header: "Recipt End No.",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("assignedMember.name", {
    header: "Assigned To",
  }),
]);
