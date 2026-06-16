import { DataTable } from "@/components/data-table";
import { getOrganizations } from "../organization.service";
import { organizationColumns } from "./organizations-column";

export default async function OrganizationTable() {
  const organizations = await getOrganizations();

  return <DataTable columns={organizationColumns} data={organizations || []} />;
}
