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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {organizations.map((organization, index) => (
          <TableRow key={organization.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{organization.name}</TableCell>
            <TableCell>{organization.address}</TableCell>
            <TableCell>{organization.email}</TableCell>
            <TableCell>{organization.phoneNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default OrganizationTable
