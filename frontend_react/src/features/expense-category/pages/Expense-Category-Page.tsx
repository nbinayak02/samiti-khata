import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import { useEffect, useState } from "react";
import useGetExpenseCategories from "../hooks/useGetExpenseCategories";
import CreateExpenseCategoryDialog from "../components/Create-Expense-Category-Dialog";
import { expenseCategoryDataTableColumns } from "../components/table/Expense-Category-Columns";
import { PageSection } from "@/components/shared/page";

export default function ExpenseCategoryPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: expenseCategoryResponse, isPending } = useGetExpenseCategories({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "description",
      label: "Description",
    },
  ];

  useEffect(() => {
    console.log({ searchKey, searchColumn, sortDirection });
  }, [searchColumn, searchKey, sortDirection]);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Expense Category"
          description="Manage expense categories."
        />
        <CreateExpenseCategoryDialog />
      </PageHeader>
      <PageSection>
        <DataTableContainer
          data={expenseCategoryResponse?.data}
          columns={expenseCategoryDataTableColumns}
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
            pageCount: expenseCategoryResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
