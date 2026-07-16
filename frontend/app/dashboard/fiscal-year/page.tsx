import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageTable,
} from "@/components/pages";
import { getFiscalYears } from "@/features/fiscal-year/api/fiscalYear.client.api";
import { AddFiscalYearDialog } from "@/features/fiscal-year/components/Add-FiscalYear-Dialog";
import FiscalYearTable from "@/features/fiscal-year/components/FiscalYear-Table";
import { getQueryClient } from "@/lib/query/query-client";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function FiscalYearPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FISCAL_YEAR],
    queryFn: getFiscalYears,
  });
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Fiscal Year"
          description="Add and view fiscal years."
        />
        <AddFiscalYearDialog />
      </PageHeader>
      <PageTable>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FiscalYearTable />
        </HydrationBoundary>
      </PageTable>
    </PageLayout>
  );
}
