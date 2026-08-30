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
import { useState } from "react";
import useGetReceiptBooks from "../hooks/useGetReceiptBooks";
import CreateReceiptBookSheet from "../components/Create-Receipt-Boook-Sheet";
import { receiptBookDataTableColumns } from "../components/Receipt-Book-Columns";

export default function ReceiptBookPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: receiptResponse, isPending } = useGetReceiptBooks({
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

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Receipt Books"
          description="Manage organization receipt books."
        />
        <CreateReceiptBookSheet />
      </PageHeader>
      <PageSection>
        <ServerDataTable
          data={receiptResponse?.data}
          columns={receiptBookDataTableColumns}
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
            pageCount: receiptResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
