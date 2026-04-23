import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { TExpense } from "@/page/expense/expense.types"
import UpdateExpense from "@/page/expense/ui/update-expense"
import useDeleteExpense from "@/page/expense/useDeleteExpense"
import DeleteDialog from "@/components/common/delete-dialog"
import formatNepaliCurrency from "@/lib/formatNepaliCurrency"

const ExpenseReportTable = ({ expenseData }: { expenseData: TExpense[] }) => {
  const { deleteExpense } = useDeleteExpense()

  return (
    <>
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
              <TableHead>Pay. Mode</TableHead>
              <TableHead>Doc. Type</TableHead>
              <TableHead>Committee</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Action</TableHead>
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
                  <TableCell>
                    {formatNepaliCurrency(Number(expense.amount))}
                  </TableCell>
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
                  <TableCell className="space-x-2">
                    <UpdateExpense id={expense.id} />
                    <DeleteDialog
                      onDelete={(isDeleted, description) =>
                        deleteExpense(expense.id, description)
                      }
                    />
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
    </>
  )
}

export default ExpenseReportTable
