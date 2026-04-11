import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { useQuery } from "@tanstack/react-query"
import committeeRepository from "../committee.service"
import DeleteDialog from "@/components/common/delete-dialog"
import useDeleteCommittee from "../useDeleteCommittee"

const CommitteeTable = () => {
  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const { deleteCommittee } = useDeleteCommittee()

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {committees && committees.data.length > 0 ? (
            committees.data.map((committee, index) => (
              <TableRow key={committee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{committee.name}</TableCell>
                <TableCell>{committee.description}</TableCell>
                <TableCell>
                  {committee.isActive ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>
                  <DeleteDialog
                    onDelete={() => deleteCommittee(committee.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-muted-foreground"
              >
                No committees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default CommitteeTable
