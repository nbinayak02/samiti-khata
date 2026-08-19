import PageHeader from "@/components/shared/page/Page-Header";
import PageHeading from "@/components/shared/page/Page-Heading";
import PageLayout from "@/components/shared/page/Page-Layout";

import useGetExpenseCategories from "../hooks/useGetExpenseCategories";
import CreateExpenseCategoryDialog from "../components/Create-Expense-Category-Dialog";
import { ExpenseCategoryDataTable } from "../components/table/Expense-Category-Data-Table";
import { expenseCategoryDataTableColumns } from "../components/table/Expense-Category-Columns";

export default function ExpenseCategoryPage() {
  const { data } = useGetExpenseCategories();
  return (
    <PageLayout>
      <PageHeader>
        <PageHeading
          title="Expense Category"
          description="Manage expense categories."
        />
        <CreateExpenseCategoryDialog />
      </PageHeader>
      <div className="px-10">
        {data ? (
          <ExpenseCategoryDataTable
            columns={expenseCategoryDataTableColumns}
            data={data}
          />
        ) : (
          <p>No categories found!</p>
        )}
      </div>
    </PageLayout>
  );
}
