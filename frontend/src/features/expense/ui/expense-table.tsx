import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import ExpenseRepository from "../expense.repository"
import type { TExpense } from "../expense.types"

const ExpenseTable = () => {
  const { data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: ExpenseRepository.getRecentExpense,
  })

  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Particulars</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Mode</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses && expenses.length > 0 ? (
            expenses.map((expense: TExpense, index: number) => (
              <TableRow key={expense.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{expense.nepaliDate}</TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.address}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.particulars}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.paymentMode}</TableCell>
                <TableCell>{expense.documentType}</TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.committee.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.category.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.remarks || "-"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={11}
                className="py-8 text-center text-muted-foreground"
              >
                No expense found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default ExpenseTable
