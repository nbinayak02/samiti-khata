import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddExpense from "@/page/expense/ui/add-expense-dialog"
import ExpenseTable from "@/page/expense/ui/expense-table"

const ExpensePage = () => {
  return (
    <>
      <PageHeader title="Expense" description="Manage expense bills." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Expense</CardTitle>
          <CardDescription>Manage your expense bills here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AddExpense />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Expenses</h3>
            <ExpenseTable />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ExpensePage

