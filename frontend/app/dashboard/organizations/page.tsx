import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import { getQueryClient } from "@/lib/query/query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import ComponentErrorBoundary from "@/components/errors/error-boundary";
import { PageDescription, PageTitle } from "@/components/pages/page-heading";
import OrganizationTable from "@/features/organizations/components/organization-table";
import { getOrganizations } from "@/features/organizations/api/organization.server.api";
import AddOrganizationDialog from "@/features/organizations/components/add-organization-dialog";

export default async function OrganizationsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations({ pageIndex: 0, pageSize: 10 }),
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageTitle>Organizations</PageTitle>
        <PageDescription>Manage organization.</PageDescription>
        <AddOrganizationDialog />
      </PageHeader>

      {/* table  */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Organizations</CardTitle>
          <CardDescription>
            Organizations registerd in SamitiKhata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComponentErrorBoundary>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <OrganizationTable />
            </HydrationBoundary>
          </ComponentErrorBoundary>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
