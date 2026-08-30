import type {
  DataTableSearchProps,
  DataTableSearchState,
  SearchableColumn,
  SortDir,
} from "./data-table.types";

import ClientDataTable from "./Client-Data-Table";
import ServerDataTable from "./Server-Data-Table";

export { ClientDataTable, ServerDataTable };

export type {
  SortDir,
  DataTableSearchProps,
  DataTableSearchState,
  SearchableColumn,
};
