export type PaginationState = {
  pageSize: number;
  pageIndex: number;
}

export type PaginatedQueryString = PaginationState & {
  sortDir?: "asc" | "desc";
};
