import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import { useEffect, useState } from "react";
import { PageSection } from "@/components/shared/page";
import useGetCommittees from "../hooks/useGetCommittees";
import PageHeader from "@/components/shared/page/Page-Header";
import PageLayout from "@/components/shared/page/Page-Layout";
import PageHeading from "@/components/shared/page/Page-Heading";
import CreateCommitteeSheet from "../components/Create-Committee-Dialog";
import { committeeDataTableColumns } from "../components/table/committee/Columns";

export default function CommitteePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: committeeResponse, isPending } = useGetCommittees({
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
          title="Committee"
          description="Manage organization committees."
        />
        <CreateCommitteeSheet />
      </PageHeader>
      <PageSection>
        <DataTableContainer
          data={committeeResponse?.data}
          columns={committeeDataTableColumns}
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
            pageCount: committeeResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
