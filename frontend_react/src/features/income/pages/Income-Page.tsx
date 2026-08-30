import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import { useEffect, useState } from "react";
import useGetIncomes from "../hooks/useGetIncomes";
import { incomeDataTableColumns } from "../components/Income-Columns";
import AddIncomeReceiptSheet from "../components/Add-Income-Receipt-Sheet";

export default function IncomePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: incomeResponse, isPending } = useGetIncomes({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "receiptBookId",
      label: "Receipt Book",
    },
    {
      id: "receiptNumber",
      label: "Receipt Number",
    },
    {
      id: "address",
      label: "Address",
    },
  ];

  useEffect(() => {
    console.log({ searchKey, searchColumn, sortDirection });
  }, [searchColumn, searchKey, sortDirection]);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Income" description="Manage organization income." />
        <AddIncomeReceiptSheet />
      </PageHeader>
      <PageSection>
        <DataTableContainer
          data={incomeResponse?.data}
          columns={incomeDataTableColumns}
          isLoading={isPending}
          isPaginated={true}
          search={{
            searchKey,
            searchColumn,
            searchableColumns,
            setSearchKey,
            setSearchColumn,
          }}
          sorting={{
            sortDirection,
            setSortDirection,
          }}
          pagination={{
            pageCount: incomeResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
