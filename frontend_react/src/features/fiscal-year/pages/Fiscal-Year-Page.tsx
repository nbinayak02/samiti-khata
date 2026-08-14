import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import useGetFiscalYears from "../hooks/useGetFiscalYear";
import CreateFiscalYearDialog from "../components/Create-Fiscal-Year-Dialog";
import { FiscalYearDataTable } from "../components/table/Fiscal-Year-Data-Table";
import { fiscalYearDataTableColumns } from "../components/table/Fiscal-Year-Columns";

export default function FiscalYearPage() {
  const { data } = useGetFiscalYears();
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Fiscal Year" description="Manage fiscal years." />
        <CreateFiscalYearDialog />
      </PageHeader>
      <div className="px-10">
        {data && (
          <FiscalYearDataTable columns={fiscalYearDataTableColumns} data={data} />
        )}
      </div>
    </PageLayout>
  );
}
