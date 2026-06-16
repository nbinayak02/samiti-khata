import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import StatsCard from "@/components/pages/stats-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrganizations } from "@/features/organizations/organization.service";
import { organizationColumns } from "@/features/organizations/components/organizations-column";
import { PlusCircle } from "lucide-react";
import { Suspense } from "react";
import OrganizationTable from "@/features/organizations/components/organization-table";
import ComponentErrorBoundary from "@/components/error-boundary";

export default function OrganizationsPage() {
  return (
    <PageLayout>
      {/* header  */}
      <div className="flex flex-row justify-between items-center">
        <PageHeader title="Organizations" description="Manage organization." />
        <Button>
          <PlusCircle />
          Add Organization
        </Button>
      </div>

      {/* stats cards  */}
      <div className="flex flex-row justify-around items-center">
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
      </div>

      {/* table  */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <ComponentErrorBoundary>
            <Suspense fallback={<p>Loading...</p>}>
              <OrganizationTable />
            </Suspense>
          </ComponentErrorBoundary>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
