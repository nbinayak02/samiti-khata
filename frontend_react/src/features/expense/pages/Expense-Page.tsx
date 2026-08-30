import {
  ServerDataTable,
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
import useGetExpenses from "../hooks/useGetExpenses";
import AddExpenseBillSheet from "../components/Add-Expense-Bill-Sheet";
import { expenseDataTableColumns } from "../components/Expense-Columns";

export default function ExpensePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: expenseResponse, isPending } = useGetExpenses({
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
        <PageHeading
          title="Expense"
          description="Manage organization expense."
        />
        <AddExpenseBillSheet />
      </PageHeader>
      <PageSection>
        <ServerDataTable
          data={expenseResponse?.data}
          columns={expenseDataTableColumns}
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
            pageCount: expenseResponse?.meta.totalPages ?? 1,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
