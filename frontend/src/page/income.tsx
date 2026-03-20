import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AddIncome from "@/features/income/ui/add-income"

const IncomePage = () => {
  return (
    <>
      <PageHeader title="Income" description="Manage income bills." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Income</CardTitle>
          <CardDescription>Manage your income bills here.</CardDescription>
        </CardHeader>
        <CardContent>
            <AddIncome />
        </CardContent>
      </Card>
    </>
  )
}

export default IncomePage
