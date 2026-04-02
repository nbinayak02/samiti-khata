import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"

const CommitteeTable = () => {
  const committees = useAppSelector((state) => state.committee.data)
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {committees.length > 0 ? (
            committees.map((committee, index) => (
              <TableRow key={committee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{committee.name}</TableCell>
                <TableCell>{committee.description}</TableCell>
                <TableCell>
                  {committee.isActive ? "Active" : "Inactive"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
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
