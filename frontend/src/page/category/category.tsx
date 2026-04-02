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

const CategoryPage = () => {
  return (
    <>
      <PageHeader title="Category" description="Manage expense categories." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Categories</CardTitle>
          <CardDescription>
            Manage your expense categories here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreateCategory />
          <CategoryTable />
        </CardContent>
      </Card>
    </>
  )
}

export default CategoryPage

