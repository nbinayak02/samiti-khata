import useGetOrgMembers from "../hooks/useGetOrgMembers";
import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import CreateOrgMemberDialog from "../components/Create-Org-Member-Dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrgMemberDataTable } from "../components/table/org-member/Org-Member-Data-Table";
import { orgMemberDataTableColumns } from "../components/table/org-member/Org-Member-Columns";

export default function UserPage() {
  const { data: orgMembers } = useGetOrgMembers();
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
            {orgMembers && (
              <OrgMemberDataTable
                columns={orgMemberDataTableColumns}
                data={orgMembers}
              />
            )}
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
