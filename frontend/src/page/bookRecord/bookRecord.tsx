import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CreateCategory from "@/page/category/ui/add-category-dialog"
import CategoryTable from "@/page/category/ui/category-table"

const BookRecordPage = () => {
  return (
    <>
      <PageHeader
        title="Book Record"
        description="Manage income books record."
      />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Manage Book Record
          </CardTitle>
          <CardDescription>
            Manage your income books record here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreateCategory />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Book Records</h3>
            <CategoryTable />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookRecordPage
