import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import IncomeSearch from "./income-search-filter"

const ExpenseReportCard = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Search Expense Records
          </CardTitle>
          <CardDescription>Search and filter records.</CardDescription>
        </CardHeader>
        <CardContent>
          <IncomeSearch />
        </CardContent>
      </Card>
    </>
  )
}

export default ExpenseReportCard

