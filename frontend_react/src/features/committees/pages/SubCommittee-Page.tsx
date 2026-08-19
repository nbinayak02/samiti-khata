import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import CreateSubCommitteeDialog from "../components/Create-Sub-Committee-Dialog";
import useGetSubCommittees from "../hooks/useGetSubCommittees";
import { SubCommitteeDataTable } from "../components/table/sub-committee/SubCommittee-Data-Table";
import { subcommitteeDataTableColumns } from "../components/table/sub-committee/SubCommittee-Columns";

export default function SubCommitteePage() {
  const { data } = useGetSubCommittees();
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Sub-Committee"
          description="Manage organization sub-committees."
        />
        <CreateSubCommitteeDialog />
      </PageHeader>
      <div className="px-10">
        {data && (
          <SubCommitteeDataTable
            columns={subcommitteeDataTableColumns}
            data={data}
          />
        )}
      </div>
    </PageLayout>
  );
}
