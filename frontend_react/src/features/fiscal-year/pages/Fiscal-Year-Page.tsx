import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import PageSection from "@/components/shared/page/Page-Section";
import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import { useEffect, useState } from "react";
import useGetFiscalYears from "../hooks/useGetFiscalYear";
import CreateFiscalYearDialog from "../components/Create-Fiscal-Year-Dialog";
import { fiscalYearDataTableColumns } from "../components/Fiscal-Year-Columns";

export default function FiscalYearPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });
  const [searchKey, setSearchKey] = useState("");
  const [searchColumn, setSearchColumn] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: fiscalYearResponse, isPending } = useGetFiscalYears({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const searchableColumns: SearchableColumn[] = [
    { id: "name", label: "Name" },
    { id: "startDateBs", label: "Start Date (B.S.)" },
    { id: "endDateBs", label: "End Date (B.S.)" },
  ];

  useEffect(() => {
    console.log({ searchKey, searchColumn, sortDirection });
  }, [searchColumn, searchKey, sortDirection]);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Fiscal Year" description="Manage fiscal years." />
        <CreateFiscalYearDialog />
      </PageHeader>
      <PageSection>
        <DataTableContainer
          data={fiscalYearResponse?.data}
          columns={fiscalYearDataTableColumns}
          isLoading={isPending}
          search={{
            searchKey,
            searchColumn,
            searchableColumns,
            setSearchKey,
            setSearchColumn,
          }}
          sorting={{ sortDirection, setSortDirection }}
          pagination={{
            pageCount: fiscalYearResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
