import { useEffect } from "react"
import { useAppDispatch } from "@/hooks/typeSafeReduxHooks"
import { fetchCommittees } from "./committee.slice"
import CommitteeTable from "./ui/committeeTable"
import { CreateCommitteeDialog } from "./ui/createCommitteeDialog"

export default function CommitteePage() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCommittees())
  }, [dispatch])

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Committees</h1>
          <CreateCommitteeDialog />
        </div>
        <CommitteeTable />
      </div>
    </div>
  )
}
