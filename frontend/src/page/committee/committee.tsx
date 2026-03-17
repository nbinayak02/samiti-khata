import { PageHeader } from "@/components/common/pageHeader"
import { CreateCommitteeDialog } from "@/features/committee/ui/createCommitteeDialog"

const CommitteePage = () => {
  return (
    <>
      <PageHeader title="Committee" description="Manage committees here." />
      <div className="mt-8">
        <CreateCommitteeDialog />
      </div>
      <div className="mt-8">
        <h3 className="text-md font-bold">All Committees</h3>
      </div>
    </>
  )
}

export default CommitteePage
