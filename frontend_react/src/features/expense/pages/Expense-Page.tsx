import { useEffect, useState } from "react";
import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";

import { DataTable } from "@/components/shared/data-table/Data-Table";
import type {
  SearchableColumn,
  SortDir,
} from "@/components/shared/data-table/data-table.types";
import AddExpenseBillSheet from "../components/Add-Expense-Bill-Sheet";

export default function ExpensePage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  const [searchKey, setSearchKey] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("");
  const [sortDir, setSortDir] = useState<SortDir | null>("desc");

//   const { data } = useGetIncomes({
//     pageIndex: pagination.pageIndex + 1,
//     pageSize: pagination.pageSize,
//   });

  const searchableColumns: SearchableColumn[] = [
    {
      id: "name",
      label: "Name",
    },
    {
      id: "receiptBookId",
      label: "Receipt Book",
    },
    {
      id: "receiptNumber",
      label: "Receipt Number",
    },
    {
      id: "address",
      label: "Address",
    },
  ];

  useEffect(() => {
    console.log({ searchKey, searchColumn });
  }, [searchColumn, searchKey]);

  return (
    <PageLayout>
      <PageHeader>
        <PageHeading title="Expense" description="Manage organization expense." />
        <AddExpenseBillSheet />
      </PageHeader>
      {/* <div className="px-10">
        {data && (
          <DataTable
            data={data.data}
            search={searchKey}
            sortDirection={sortDir}
            pagination={pagination}
            setSearch={setSearchKey}
            searchColumn={searchColumn}
            setSortDirection={setSortDir}
            setPagination={setPagination}
            columns={incomeDataTableColumns}
            pageCount={data.meta?.totalPages}
            setSearchColumn={setSearchColumn}
            searchableColumns={searchableColumns}
          />
        )}
      </div> */}
    </PageLayout>
  );
}
