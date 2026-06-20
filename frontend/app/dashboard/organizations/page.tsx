import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import { getQueryClient } from "@/lib/query/query-client";
import ComponentErrorBoundary from "@/components/error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrganizationTable from "@/features/organizations/components/organization-table";
import AddOrganizationDialog from "@/features/organizations/components/add-organization-dialog";
import { getOrganizations } from "@/features/organizations/api/organization.server.api";

export default async function OrganizationsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["organizations"],
    queryFn: () => getOrganizations({ pageIndex: 0, pageSize: 10 }),
  });

  return (
    <PageLayout>
      {/* header  */}
      <div className="flex flex-row justify-between items-center">
        <PageHeader title="Organizations" description="Manage organization." />
        <AddOrganizationDialog />
      </div>

      {/* stats cards  */}
      {/* <div className="flex flex-row justify-around items-center">
        <StatsCard
          title="Active Organizations"
          stats={103}
          subTitle="+ 90% than previous month"
        />
        <StatsCard
          title="Active Organizations"
          stats={103}
          subTitle="+ 90% than previous month"
        />
        <StatsCard
          title="Active Organizations"
          stats={103}
          subTitle="+ 90% than previous month"
        />
      </div> */}

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
