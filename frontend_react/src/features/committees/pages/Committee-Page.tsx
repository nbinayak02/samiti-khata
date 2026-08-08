import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";

export default function CommitteePage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Committee"
          description="Manage organization committees."
        />
      </PageHeader>
    </PageLayout>
  );
}
