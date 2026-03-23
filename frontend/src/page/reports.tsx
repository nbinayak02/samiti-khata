import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SearchFilter from "@/features/reports/ui/search-filter"

const ReportsPage = () => {
  return (
    <>
      <PageHeader title="Reports" description="View and export reports." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Search Income Records</CardTitle>
          <CardDescription>
            Search and filter records.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <SearchFilter />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Income</h3>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default ReportsPage
