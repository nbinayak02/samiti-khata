import {
  PageHeader,
  PageHeading,
  PageLayout,
  PageSection,
} from "@/components/shared/page";
import useGetCommittees from "../hooks/useGetCommittees";
import { ClientDataTable } from "@/components/shared/data-table";
import CreateCommitteeSheet from "../components/Create-Committee-Dialog";
import { committeeDataTableColumns } from "../components/Committee-Columns";
import CommitteeDataTable from "../components/Committee-Data-Table";

export default function CommitteePage() {
  const { data, isPending } = useGetCommittees();

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
        <CommitteeDataTable
          data={data}
          columns={committeeDataTableColumns}
          isLoading={isPending}
        />
      </PageSection>
    </PageLayout>
  );
}
