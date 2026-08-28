export type PaginationState = {
  pageSize: number;
  pageIndex: number;
}

export type PaginatedQueryString = PaginationState & {
  sortDir?: "asc" | "desc";
};

export type CursorPaginatedQueryString = {
  cursor?: number;
  limit: number;
}

export type SearchableColumns = {
  id: string;
  label: string;
}