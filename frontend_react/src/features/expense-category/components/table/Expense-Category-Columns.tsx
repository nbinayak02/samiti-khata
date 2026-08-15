import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { ExpenseCategory } from "../../types/expense-category.types";
import type { ExpenseCategoriesDataTableFeatures } from "./expenseCategory.dataTableFeatures";

// Use `accessor` for data columns and `display` for columns without one.
const expenseCategoryDataTableColumnHelper = createColumnHelper<
  ExpenseCategoriesDataTableFeatures,
  ExpenseCategory
>();

export const expenseCategoryDataTableColumns =
  expenseCategoryDataTableColumnHelper.columns([
    expenseCategoryDataTableColumnHelper.display({
      id: "#",
      header: "#",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    expenseCategoryDataTableColumnHelper.accessor("name", {
      header: "Name",
    }),
    expenseCategoryDataTableColumnHelper.accessor("description", {
      header: "Description",
    }),
    expenseCategoryDataTableColumnHelper.accessor("createdAt", {
      header: "Created At",
      cell: ({ getValue }) => {
        const date = new Date(getValue());

        return <div>{getFormattedDateTime(date)}</div>;
      },
    }),
  ]);
