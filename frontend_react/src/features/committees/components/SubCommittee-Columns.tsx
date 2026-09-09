import getFormattedDateTime from "@/lib/formatDateTime";
import { createColumnHelper } from "@tanstack/react-table";
import type { DataTableFeatures } from "@/components/shared/data-table";
import type { SubCommittee } from "@/features/committees/types/Committee.types";

// Use `accessor` for data columns and `display` for columns without one.
const helper = createColumnHelper<DataTableFeatures, SubCommittee>();

export const subcommitteeDataTableColumns = helper.columns([
  helper.display({
    id: "#",
    header: "#",
    cell: ({ row }) => {
      return <span>{row.index + 1}</span>;
    },
  }),
  helper.accessor("name", {
    header: "Name",
  }),
  helper.accessor("description", {
    header: "Description",
  }),
  helper.accessor("mainCommitteeId", {
    header: "Main Committee",
  }),

  helper.accessor("createdAt", {
    header: "Created At",
    cell: ({ getValue }) => {
      const date = new Date(getValue());

      return <div>{getFormattedDateTime(date)}</div>;
    },
  }),
]);
