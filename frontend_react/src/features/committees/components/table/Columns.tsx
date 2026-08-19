import clsx from "clsx";
import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { Committee } from "../../types/Committee.types";
import type { CommitteeDataTableFeatures } from "./dataTableFeatures";

// Use `accessor` for data columns and `display` for columns without one.
const committeeDataTableColumnHelper = createColumnHelper<
  CommitteeDataTableFeatures,
  Committee
>();

export const committeeDataTableColumns = committeeDataTableColumnHelper.columns(
  [
    committeeDataTableColumnHelper.display({
      id: "#",
      header: "#",
      cell: ({ row }) => {
        return <span>{row.index + 1}</span>;
      },
    }),
    committeeDataTableColumnHelper.accessor("name", {
      header: "Name",
    }),
    committeeDataTableColumnHelper.accessor("description", {
      header: "Description",
    }),
    committeeDataTableColumnHelper.accessor("isActive", {
      header: () => <div className="px-4">Status</div>,
      cell: ({ getValue }) => {
        const isActive = getValue();
        return (
          <div
            className={clsx("w-fit px-4 py-1 rounded-lg font-medium", {
              "bg-green-500/5 text-green-600": isActive,
              "bg-destructive/5 text-destructive": !isActive,
            })}
          >
            {isActive ? "Active" : "Inactive"}
          </div>
        );
      },
    }),
    committeeDataTableColumnHelper.accessor("createdAt", {
      header: "Created At",
      cell: ({ getValue }) => {
        const date = new Date(getValue());

        return <div>{getFormattedDateTime(date)}</div>;
      },
    }),
  ],
);
