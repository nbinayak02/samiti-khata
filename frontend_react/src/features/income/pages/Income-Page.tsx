import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";

import { useState } from "react";
import { DataTableWithManualPagination } from "@/components/shared/data-table/Data-Table-Manual-Pagination";
import AddIncomeReceiptSheet from "../components/Add-Income-Receipt-Sheet";
import useGetReceiptBooksInfiniteQuery from "@/features/receipt-books/hooks/useGetReceiptBooksInfiniteScroll";

export default function IncomePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  //   const { data } = useGetReceiptBooks({
  //     pageIndex: pagination.pageIndex + 1,
  //     pageSize: pagination.pageSize,
  //   });

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Income" description="Manage organization income." />
        <AddIncomeReceiptSheet />
      </PageHeader>
      <div className="px-10">
        {/* {data && (
          <DataTableWithManualPagination
            columns={receiptBookDataTableColumns}
            data={data.data}
            pageCount={data.meta.totalPages}
            pagination={pagination}
            setPagination={setPagination}
          />
        )} */}
      </div>
    </PageLayout>
  );
}
