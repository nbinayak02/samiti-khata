import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import IncomeRepository from "../income.repository"
import type { TIncome } from "../income.types"
import UpdateIncome from "./update-income"
import DeleteDialog from "@/components/common/delete-dialog"
import useDeleteIncome from "@/page/reports/useDeleteIncome"
import { Loader2 } from "lucide-react"

const IncomeTable = () => {
  const { data: income, isPending } = useQuery({
    queryKey: ["incomes"],
    queryFn: IncomeRepository.getRecentIncome,
  })

  const { deleteIncome } = useDeleteIncome()

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Bill No.</TableHead>
            <TableHead>Book No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead>Bill Issuer</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending && (
            <TableRow>
              <TableCell
                colSpan={10}
                className="py-8 text-center text-muted-foreground"
              >
                <Loader2 className="animate-spin" />
              </TableCell>
            </TableRow>
          )}
          {income && income.length > 0 ? (
            income.map((income: TIncome, index: number) => (
              <TableRow key={income.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{income.billNumber}</TableCell>
                <TableCell>{income.bookNumber}</TableCell>
                <TableCell>{income.nepaliDate}</TableCell>
                <TableCell className="max-w-30 truncate">
                  {income.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {income.address}
                </TableCell>
                <TableCell>{income.amount}</TableCell>
                <TableCell className="max-w-30 truncate">
                  {income.committee.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {income.billIssuer?.name || "-"}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {income.remarks || "-"}
                </TableCell>
                <TableCell>
                  <UpdateIncome id={income.id} />
                  <DeleteDialog onDelete={() => deleteIncome(income.id)} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="py-8 text-center text-muted-foreground"
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default IncomeTable
