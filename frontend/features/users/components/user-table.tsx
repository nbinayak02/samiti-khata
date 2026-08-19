"use client";
import { TablePaginationState } from "@/features/shared.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UserDataTable from "./user-data-table";
import { userColumns } from "./user-column";
import { getAdmin } from "../api/user.server.api";

export default function UserTable() {
  const [pagination, setPagination] = useState<TablePaginationState>({
    pageIndex: 0, // tanstack is 0 based
    pageSize: 10,
  });

  const { data } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      getAdmin({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  });

  return (
    <UserDataTable
      columns={userColumns}
      data={data?.data || []}
      meta={data?.meta}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
