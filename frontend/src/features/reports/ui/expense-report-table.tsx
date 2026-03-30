import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TExpense } from "@/features/expense/expense.types"

const ExpenseReportTable = ({ expenseData }: { expenseData: TExpense[] }) => {
  return (
    <Card>
      <CardContent>
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
              {expenseData && expenseData.length > 0 ? (
                expenseData.map((expense: TExpense, index: number) => (
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
      </CardContent>
    </Card>
  )
}

export default ExpenseReportTable
