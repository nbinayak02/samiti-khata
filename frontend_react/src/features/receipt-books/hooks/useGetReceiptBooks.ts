import { MODULES } from "@/constants/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getReceiptBooks } from "../api/receipt-books.api";
import type { PaginatedQueryString } from "@/types/pagination.types";

export default function useGetReceiptBooks({
  pageIndex = 1,
  pageSize = 25,
  sortDir = "desc",
}: PaginatedQueryString) {
  return useQuery({
    queryKey: [MODULES.RECEIPT_BOOK, "page", pageIndex, pageSize, sortDir],
    queryFn: () => getReceiptBooks({ pageIndex, pageSize, sortDir }),
    placeholderData: keepPreviousData,
  });
}
