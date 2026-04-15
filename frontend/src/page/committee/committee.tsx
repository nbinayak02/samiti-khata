import CommitteeTable from "./ui/committeeTable"
import { CreateCommitteeDialog } from "./ui/createCommitteeDialog"
import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CommitteePage = () => {
  return (
    <>
      <PageHeader title="Committee" description="Manage committees." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Committee</CardTitle>
          <CardDescription>Manage committees here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreateCommitteeDialog />
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Recent Committees</h3>
            <CommitteeTable />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default CommitteePage
