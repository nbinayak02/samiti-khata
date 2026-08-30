import { useState } from "react";
import useGetReceiptBooks from "../hooks/useGetReceiptBooks";
import PageHeader from "@/components/shared/page/Page-Header";
import PageLayout from "@/components/shared/page/Page-Layout";
import PageHeading from "@/components/shared/page/Page-Heading";
import CreateReceiptBookSheet from "../components/Create-Receipt-Boook-Sheet";
import { receiptBookDataTableColumns } from "../components/Receipt-Book-Columns";
import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import { PageSection } from "@/components/shared/page";

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
        <DataTableContainer
          data={receiptResponse?.data}
          columns={receiptBookDataTableColumns}
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
            pageCount: receiptResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
