import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"

const OrganizationTable = () => {
  const organizations = useAppSelector((state) => state.organization.data)
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.length > 0 ? (
            organizations.map((organization, index) => (
              <TableRow key={organization.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{organization.name}</TableCell>
                <TableCell>{organization.address}</TableCell>
                <TableCell>{organization.email}</TableCell>
                <TableCell>{organization.phoneNumber}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}  className="py-8 text-center text-muted-foreground">
                No organizations found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrganizationTable
