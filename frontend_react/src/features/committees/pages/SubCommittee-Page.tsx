import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import CreateSubCommitteeDialog from "../components/Create-Sub-Committee-Dialog";
import useGetSubCommittees from "../hooks/useGetSubCommittees";
import { subcommitteeDataTableColumns } from "../components/table/sub-committee/SubCommittee-Columns";
import { useEffect, useState } from "react";
import { PageSection } from "@/components/shared/page";

export default function SubCommitteePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: subCommitteeResponse, isPending } = useGetSubCommittees({
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
          title="Sub-Committee"
          description="Manage organization sub-committees."
        />
        <CreateSubCommitteeDialog />
      </PageHeader>
      <PageSection>
        <DataTableContainer
          data={subCommitteeResponse?.data}
          columns={subcommitteeDataTableColumns}
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
            pageCount: subCommitteeResponse?.meta.totalPages,
            pagination,
            setPagination,
          }}
        />
      </PageSection>
    </PageLayout>
  );
}
