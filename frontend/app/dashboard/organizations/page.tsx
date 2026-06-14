"use server";
import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import StatsCard from "@/components/pages/stats-cards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Organization,
  organizationColumns,
} from "@/features/organizations/organizations-column";
import { PlusCircle } from "lucide-react";

export default async function OrganizationsPage() {
  const data: Organization[] = [
    {
      id: 1,
      address: "Maidhar",
      createdAt: "2026-06-13T00:00:00Z",
      createdBy: 1,
      email: "maidhar@sk.com",
      name: "Shree Laxmi Narayan Mandir",
      phoneNumber: "9812345678",
      updatedAt: "2026-06-13T00:00:00Z",
    },
    {
      id: 2,
      address: "Maidhar",
      createdAt: "2026-06-13T00:00:00Z",
      createdBy: 1,
      email: "maidhar@sk.com",
      name: "Shree Ranganatha Mandir",
      phoneNumber: "9812345678",
      updatedAt: "2026-06-13T00:00:00Z",
    },
  ];
  return (
    <PageLayout>
      <div className="flex flex-row justify-between items-center">
        <PageHeader title="Organizations" description="Manage organization." />
        <Button>
          <PlusCircle />
          Add Organization
        </Button>
      </div>
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

      {/* <div>
        <DataTable columns={organizationColumns} data={data} />
      </div> */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={organizationColumns} data={data} />
        </CardContent>
      </Card>
    </PageLayout>
  );
}
