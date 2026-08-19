import PageHeader from "@/components/pages/page-header";
import PageHeading from "@/components/pages/page-heading";
import PageLayout from "@/components/pages/page-layout";
import { AddReceiptSheet } from "@/features/receipt-books/components/Add-Receipt-Sheet";

export default async function ReceiptBookPage() {
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Receipt Books"
          description="Review and manage income receipts."
        />
        <AddReceiptSheet />
      </PageHeader>
    </PageLayout>
  );
}
