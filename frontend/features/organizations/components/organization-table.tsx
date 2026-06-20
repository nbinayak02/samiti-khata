"use client";
import { DataTable } from "@/components/data-table";
import { getOrganizations } from "../organization.service";
import { organizationColumns } from "./organizations-column";
import { useQuery } from "@tanstack/react-query";

export default function OrganizationTable() {
  const { data } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });
  return <DataTable columns={organizationColumns} data={data || []} />;
}
