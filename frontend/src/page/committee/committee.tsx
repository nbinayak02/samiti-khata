import { PageHeader } from "@/components/common/pageHeader"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { fetchCommittees } from "@/features/committee/committee.slice"
import CommitteeTable from "@/features/committee/ui/committeeTable"
import { CreateCommitteeDialog } from "@/features/committee/ui/createCommitteeDialog"
import { useAppDispatch, useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useEffect } from "react"

const CommitteePage = () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.committee.status)
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCommittees())
    }
  }, [])
  return (
    <>
      <PageHeader title="Committee" description="Manage committees here." />
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">All Committees</CardTitle>
          <CardDescription>Manage committees</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <CreateCommitteeDialog />
          <CommitteeTable />
        </CardContent>
      </Card>
    </>
  )
}

export default CommitteePage
