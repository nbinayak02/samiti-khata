import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import CreateCommitteeSheet from "../components/Create-Committee-Dialog";
import useGetCommittees from "../hooks/useGetCommittees";
import { CommitteeDataTable } from "../components/table/committee/Data-Table";
import { committeeDataTableColumns } from "../components/table/committee/Columns";

export default function CommitteePage() {
  const { data } = useGetCommittees();
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Committee"
          description="Manage organization committees."
        />
        <CreateCommitteeSheet />
      </PageHeader>
      <div className="px-10">
        {data && (
          <CommitteeDataTable columns={committeeDataTableColumns} data={data} />
        )}
      </div>
    </PageLayout>
  );
}
