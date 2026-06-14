import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import StatsCard from "@/components/pages/stats-cards";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle } from "lucide-react";

export default function OrganizationsPage() {
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
      <div>
        
      </div>
    </PageLayout>
  );
}
