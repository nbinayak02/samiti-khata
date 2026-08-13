import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import CreateCommitteeSheet from "../components/Create-Committee-Sheet";

export default function CommitteePage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Committee"
          description="Manage organization committees."
        />
        <CreateCommitteeSheet />
      </PageHeader>
    </PageLayout>
  );
}
