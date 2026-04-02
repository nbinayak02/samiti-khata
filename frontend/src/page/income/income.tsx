import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddIncome from "@/page/income/ui/add-income"
import IncomeTable from "@/page/income/ui/income-table"

const IncomePage = () => {
  return (
    <>
      <PageHeader title="Income" description="Manage income bills." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Income</CardTitle>
          <CardDescription>Manage your income bills here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <AddIncome />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Income</h3>
            <IncomeTable />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default IncomePage

