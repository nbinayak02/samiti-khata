import { QUERY_KEYS } from "@/lib/query/query-keys";
import PageTable from "@/components/pages/page-table";
import PageHeader from "@/components/pages/page-header";
import PageLayout from "@/components/pages/page-layout";
import PageHeading from "@/components/pages/page-heading";
import { getQueryClient } from "@/lib/query/query-client";
import IncomeTable from "@/features/income/components/Income-Table";
import { getIncomes } from "@/features/income/api/income.server.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { AddIncomeSheet } from "@/features/income/components/Add-Income-Sheet";

export default async function IncomePage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.INCOME],
    queryFn: () => getIncomes({ pageIndex: 0, pageSize: 10 }),
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Income"
          description="Record and review Income entries."
        />
        <AddIncomeSheet />
      </PageHeader>
      {/* <div className="bg-muted/30 shrink-0">
        <Separator />
        <div className="py-5 px-10 flex flex-row justify-between items-center gap-5">
          <Input placeholder="Search" className="w-full max-w-sm" />
          <div>
            <Combobox items={["a", "b", "c"]}>
              <ComboboxInput placeholder="Committee" />
              <ComboboxContent>
                <ComboboxEmpty>No committees found.</ComboboxEmpty>
                <ComboboxList>
                  <ComboboxItem>asdf</ComboboxItem>
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <DateRangePicker />
          <Combobox items={["a", "b", "c"]}>
            <ComboboxInput placeholder="Committee" />
            <ComboboxContent>
              <ComboboxEmpty>No committees found.</ComboboxEmpty>
              <ComboboxList>
                <ComboboxItem>asdf</ComboboxItem>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <Separator />
      </div> */}
      <PageTable>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <IncomeTable />
        </HydrationBoundary>
      </PageTable>
    </PageLayout>
  );
}
