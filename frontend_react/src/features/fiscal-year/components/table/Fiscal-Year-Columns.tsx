import { createColumnHelper } from "@tanstack/react-table";
import type { FiscalYear } from "../../types/fiscalYear.types";
import type { FiscalYearDataTableFeatures } from "./fiscalYear.dataTableFeatures";

// Use `accessor` for data columns and `display` for columns without one.
const fiscalYearDataTableColumnHelper = createColumnHelper<
  FiscalYearDataTableFeatures,
  FiscalYear
>();

export const fiscalYearDataTableColumns =
  fiscalYearDataTableColumnHelper.columns([
    fiscalYearDataTableColumnHelper.display({
      id: "#",
      header: "#",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    fiscalYearDataTableColumnHelper.accessor("name", {
      header: "Name",
    }),
    fiscalYearDataTableColumnHelper.accessor("startDateBs", {
      header: "Start Date (B.S.)",
    }),
    fiscalYearDataTableColumnHelper.accessor("endDateBs", {
      header: "End Date (B.S.)",
    }),
  ]);
