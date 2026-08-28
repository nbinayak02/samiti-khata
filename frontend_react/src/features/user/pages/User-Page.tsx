import useGetOrgMembers from "../hooks/useGetOrgMembers";
import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import PageSection from "@/components/shared/page/Page-Section";
import CreateOrgMemberDialog from "../components/Create-Org-Member-Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orgMemberDataTableColumns } from "../components/table/org-member/Org-Member-Columns";
import {
  DataTableContainer,
  type SearchableColumn,
  type SortDir,
} from "@/components/shared/data-table";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<SortDir | null>("desc");

  const { data: orgMemberResponse, isPending } = useGetOrgMembers({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
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
      id: "phone",
      label: "Phone Number",
    },
  ];

  useEffect(() => {
    console.log({ searchKey, searchColumn, sortDirection });
  }, [searchColumn, searchKey, sortDirection]);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="User" description="Manage organization users." />
      </PageHeader>

      <div className="px-10">
        <Tabs defaultValue="orgMember" className="w-full">
          <TabsList>
            <TabsTrigger value="orgMember">Organization Members</TabsTrigger>
            <TabsTrigger value="operator">Operators</TabsTrigger>
          </TabsList>
          <TabsContent value="orgMember" className={"flex flex-col"}>
            <div className="self-end">
              <CreateOrgMemberDialog />
            </div>
            <PageSection>
              <DataTableContainer
                data={orgMemberResponse?.data}
                columns={orgMemberDataTableColumns}
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
                  pageCount: orgMemberResponse?.meta.totalPages,
                  pagination,
                  setPagination,
                }}
              />
            </PageSection>
          </TabsContent>
          <TabsContent value="operator">Change your password here.</TabsContent>
        </Tabs>

        {/* {data && (
          <CommitteeDataTable columns={committeeDataTableColumns} data={data} />
        )} */}
      </div>
    </PageLayout>
  );
}
