import { FilePlus, Loader2, LucideFileEdit, User } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { useQuery } from "@tanstack/react-query"
import formatNepaliCurrency from "@/lib/formatNepaliCurrency"
import type { Dispatch, SetStateAction } from "react"
import { Separator } from "../ui/separator"
import ExpenseRepository from "@/page/expense/expense.repository"

type ExpenseDataViewerProps = {
  id: number
  open: boolean
  setOpen: Dispatch<SetStateAction<{ id: number | null; setOpen: boolean }>>
}

const ExpenseDataViewer = ({ id, open, setOpen }: ExpenseDataViewerProps) => {
  const { data: expense, isPending: isExpenseFetching } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => ExpenseRepository.getById(id),
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => setOpen({ id: null, setOpen: open })}
    >
      <DialogContent className="max-h-[90vh] min-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            View complete expense information.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isExpenseFetching ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="mt-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Basic Information */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Date (Nepali):</span>
                <span>{expense?.data.nepaliDate}</span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Date (English):</span>
                {expense?.data.date && (
                  <span>{new Date(expense?.data.date).toDateString()}</span>
                )}
              </p>

              {/* Vendor Information */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Vendor Name:</span>
                <span>{expense?.data.recepientName}</span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Address:</span>
                <span>{expense?.data.recepientAddress || "-"}</span>
              </p>

              {/* Expense Details */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Particulars:</span>
                <span>{expense?.data.particulars}</span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Quantity:</span>
                <span>{expense?.data.quantity || "-"}</span>
              </p>

              {/* Financial Information */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Amount:</span>
                <span>
                  {formatNepaliCurrency(Number(expense?.data.amount) || 0)}
                </span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Payment Mode:</span>
                <span>{expense?.data.paymentMode}</span>
              </p>

              {/* Document Information */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Voucher No.:</span>
                <span>{expense?.data.voucherNumber || "-"}</span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Bill No.:</span>
                <span>{expense?.data.billNumber || "-"}</span>
              </p>

              {/* Classification */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Category:</span>
                <span>{expense?.data.category?.name || "-"}</span>
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Committee:</span>
                <span>{expense?.data.committee?.name || "-"}</span>
              </p>

              {/* Sub-committee and Payer */}
              <p className="space-x-2">
                <span className="text-muted-foreground">Sub-Committee:</span>
                {/* <span>{expense?.data.subCommittee?.name || "-"}</span> */}
              </p>
              <p className="space-x-2">
                <span className="text-muted-foreground">Paid By:</span>
                <span>{expense?.data.paidBy?.name || "-"}</span>
              </p>

              {/* Remarks */}
              <p className="col-span-2 space-x-2">
                <span className="text-muted-foreground">Remarks:</span>
                <span>{expense?.data.remarks || "-"}</span>
              </p>
            </div>
          </div>
        )}
        <DialogFooter>
          <div className="flex flex-row justify-between gap-4 text-muted-foreground">
            <p className="flex flex-row items-center space-x-2">
              <User size={18} />
              <span className="text-xs">{expense?.data.createdBy}</span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <FilePlus size={18} />
              {expense?.data.createdAt && (
                <span className="text-xs">
                  {new Date(expense?.data.createdAt).toDateString()}
                </span>
              )}
            </p>
            <p className="flex flex-row items-center space-x-2">
              <LucideFileEdit size={18} />
              {expense?.data.updatedAt && (
                <span className="text-xs">
                  {new Date(expense?.data.updatedAt).toDateString()}
                </span>
              )}
            </p>
          </div>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ExpenseDataViewer
