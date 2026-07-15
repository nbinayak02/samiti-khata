import { PageHeader, PageHeading, PageLayout } from "@/components/pages";
import { AddFiscalYearDialog } from "@/features/fiscal-year/components/Add-FiscalYear-Dialog";

export default function FiscalYearPage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Fiscal Year"
          description="Add and view fiscal years."
        />
        <AddFiscalYearDialog />
      </PageHeader>
    </PageLayout>
  );
}
