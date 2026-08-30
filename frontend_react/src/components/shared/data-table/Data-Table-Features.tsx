import {
  tableFeatures,
  rowSortingFeature,
  rowPaginationFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
} from "@tanstack/react-table";

export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSortingFeature,
});

export const nonPaginatedDataTableFeatures = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowSortingFeature,
});

export type DataTableFeatures = typeof dataTableFeatures;
