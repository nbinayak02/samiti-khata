"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablePaginationState } from "@/features/shared.types";
import { organizationColumns } from "./organizations-column";
import { getOrganizations } from "../api/organization.server.api";
import { OrganizationDataTable } from "./organization-data-table";

export default function OrganizationTable() {
  const [pagination, setPagination] = useState<TablePaginationState>({
    pageIndex: 0, // tanstack is 0 based
    pageSize: 10,
  });

  const { data } = useQuery({
    queryKey: ["organizations", pagination.pageIndex, pagination.pageSize],
    queryFn: () =>
      getOrganizations({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  });

  return (
    <OrganizationDataTable
      columns={organizationColumns}
      data={data?.data || []}
      meta={data?.meta}
      pagination={pagination}
      setPagination={setPagination}
    />
  );
}
