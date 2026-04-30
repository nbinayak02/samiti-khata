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
import UpdateExpense from "./update-expense"
import DeleteDialog from "@/components/common/delete-dialog"
import useDeleteExpense from "../useDeleteExpense"
import { Loader2 } from "lucide-react"
import formatNepaliCurrency from "@/lib/formatNepaliCurrency"
import { useState } from "react"
import ExpenseDataViewer from "@/components/common/expense-data-view"

type expenseDataViewer = {
  id: number | null
  setOpen: boolean
}

const ExpenseTable = () => {
  const { data: expenses, isPending } = useQuery({
    queryKey: ["expenses"],
    queryFn: ExpenseRepository.getRecentExpense,
  })

  const [isOpenDataViewer, setIsOpenDataViewer] = useState<expenseDataViewer>({
    id: null,
    setOpen: false,
  })

  const { deleteExpense } = useDeleteExpense()
  return (
    <div className="rounded-md border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Voucher</TableHead>
            <TableHead>Bill</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Recepient</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Particulars</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Mode</TableHead>
            <TableHead>Committee</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Paid By</TableHead>
            <TableHead>Remarks</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending && (
            <TableRow>
              <TableCell
                colSpan={11}
                className="py-8 text-center text-muted-foreground"
              >
                <Loader2 className="animate-spin" />
              </TableCell>
            </TableRow>
          )}
          {expenses && expenses.length > 0 ? (
            expenses.map((expense: TExpense, index: number) => (
              <TableRow
                key={expense.id}
                onClick={() =>
                  setIsOpenDataViewer({ id: expense.id, setOpen: true })
                }
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{expense.voucherNumber}</TableCell>
                <TableCell>{expense.billNumber}</TableCell>
                <TableCell>{expense.nepaliDate}</TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.recepientName}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.recepientAddress}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.particulars}
                </TableCell>
                <TableCell>{expense.quantity}</TableCell>
                <TableCell>
                  {formatNepaliCurrency(Number(expense.amount))}
                </TableCell>
                <TableCell>{expense.paymentMode}</TableCell>

                <TableCell className="max-w-30 truncate">
                  {expense.committee.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.category.name}
                </TableCell>
                <TableCell className="max-w-30 truncate">
                  {expense.paidBy?.name}
                </TableCell>

                <TableCell className="max-w-30 truncate">
                  {expense.remarks || "-"}
                </TableCell>
                <TableCell>
                  <UpdateExpense id={expense.id} />
                  <DeleteDialog
                    onDelete={(_, description) =>
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
              ></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isOpenDataViewer.id && (
        <ExpenseDataViewer
          open={isOpenDataViewer.setOpen}
          setOpen={setIsOpenDataViewer}
          id={isOpenDataViewer.id}
        />
      )}
    </div>
  )
}

export default ExpenseTable
