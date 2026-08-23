import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";
import CreateReceiptBookSheet from "../components/Create-Receipt-Boook-Sheet";
import useGetReceiptBooks from "../hooks/useGetReceiptBooks";
import { useState } from "react";
import { DataTableWithManualPagination } from "@/components/shared/data-table/Data-Table";
import { receiptBookDataTableColumns } from "../components/Receipt-Book-Columns";

export default function ReceiptBookPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const { data } = useGetReceiptBooks({
    pageIndex: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
  });

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Receipt Books"
          description="Manage organization receipt books."
        />
        <CreateReceiptBookSheet />
      </PageHeader>
      <div className="px-10">
        {data && (
          <DataTableWithManualPagination
            columns={receiptBookDataTableColumns}
            data={data.data}
            pageCount={data.meta.totalPages}
            pagination={pagination}
            setPagination={setPagination}
          />
        )}
      </div>
    </PageLayout>
  );
}
