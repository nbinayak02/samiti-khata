import {
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import { useState } from "react";
import useGetIncomes from "../hooks/useGetIncomes";
import { incomeDataTableColumns } from "../components/Income-Columns";
import AddIncomeReceiptSheet from "../components/Add-Income-Receipt-Sheet";
import IncomeDataTable from "../components/Income-Data-Table";

export default function IncomePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");
  const [receiptBookId, setReceiptBookId] = useState<string | null>(null);
  const [committeeId, setCommitteeId] = useState<string | null>(null);

  const { data: incomeResponse, isPending } = useGetIncomes({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    sortDir: sortDirection ?? "desc",
    searchKey,
    searchColumn,
    receiptBookId: receiptBookId ?? "",
    committeeId: committeeId ?? "",
  });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "address",
      label: "Address",
    },
    {
      id: "receiptNumber",
      label: "Receipt Number",
    },
  ];

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Income" description="Manage organization income." />
        <AddIncomeReceiptSheet />
      </PageHeader>
      <PageSection>
        <IncomeDataTable
          data={incomeResponse?.data}
          columns={incomeDataTableColumns}
          isLoading={isPending}
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
          committeeId={committeeId}
          receiptBookId={receiptBookId}
          setCommitteeId={setCommitteeId}
          setReceiptBookId={setReceiptBookId}
        />
      </PageSection>
    </PageLayout>
  );
}
