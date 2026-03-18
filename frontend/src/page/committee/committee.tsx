import { PageHeader } from "@/components/common/pageHeader"
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
      <div className="mt-8">
        <CreateCommitteeDialog />
      </div>
      <div className="mt-8">
        <h3 className="text-md font-bold">All Committees</h3>
        <CommitteeTable />
      </div>
    </>
  )
}

export default CommitteePage
