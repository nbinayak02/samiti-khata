"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IncomeColumns } from "./Income-Columns";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { getIncomes } from "../api/income.server.api";
import { IncomeDataTable } from "./Income-Data-Table";
import { TablePaginationState } from "@/features/shared.types";

export default function IncomeTable() {
  const [pagination, setPagination] = useState<TablePaginationState>({
    pageIndex: 0, // tanstack is 0 based
    pageSize: 10,
  });

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.INCOME, pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      getIncomes({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  });

  return (
    <IncomeDataTable
      columns={IncomeColumns}
      data={data?.data || []}
      meta={data?.meta}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
