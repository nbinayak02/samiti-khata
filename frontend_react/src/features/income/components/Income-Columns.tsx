import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table/Data-Table-Features";
import type { Income } from "../types/income.types";

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Income>();

export const incomeDataTableColumns = columnHelper.columns([
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
  columnHelper.accessor("receiptBookId", {
    header: "Recipt Book",
  }),
  columnHelper.accessor("receiptNumber", {
    header: "Receipt Number",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("address", {
    header: "Address",
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
  }),
  columnHelper.accessor("committeeId", {
    header: "Committee",
  }),
]);
