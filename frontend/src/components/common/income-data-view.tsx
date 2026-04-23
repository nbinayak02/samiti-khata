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
import IncomeRepository from "@/page/income/income.repository"
import formatNepaliCurrency from "@/lib/formatNepaliCurrency"
import type { Dispatch, SetStateAction } from "react"
import { Separator } from "../ui/separator"

type IncomeDataViewerProps = {
  id: number
  open: boolean
  setOpen: Dispatch<SetStateAction<{ id: number | null; setOpen: boolean }>>
}
const IncomeDataViewer = ({ id, open, setOpen }: IncomeDataViewerProps) => {
  const { data: income, isPending: isIncomeFetching } = useQuery({
    queryKey: ["income", id],
    queryFn: () => IncomeRepository.getById(id),
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => setOpen({ id: null, setOpen: open })}
    >
      <DialogContent className="min-w-xl">
        <DialogHeader>
          <DialogTitle>View Income Data</DialogTitle>
          <DialogDescription>View detailed info.</DialogDescription>
        </DialogHeader>
        <Separator />
        {isIncomeFetching ? (
          <Loader2 className="animate-spin" />
        ) : (
          <div className="mt-2 flex flex-row flex-wrap gap-8">
            <p className="space-x-2">
              <span className="text-muted-foreground">Book No.:</span>
              <span>{income?.data.bookNumber}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Bill No.:</span>
              <span>{income?.data.billNumber}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Date:</span>
              <span>{income?.data.nepaliDate}</span>
              {income?.data.date && (
                <span className="text-xs">
                  ({new Date(income?.data.date).toDateString()})
                </span>
              )}
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Name:</span>
              <span>{income?.data.name}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Address:</span>
              <span>{income?.data.address}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Amount:</span>
              <span>{formatNepaliCurrency(income?.data.amount || 0)}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Committee:</span>
              <span>{income?.data.committee.name}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Bill Issued By:</span>
              <span>{income?.data.billIssuer?.name || "-"}</span>
            </p>
            <p className="space-x-2">
              <span className="text-muted-foreground">Remarks:</span>
              <span>{income?.data.remarks}</span>
            </p>
          </div>
        )}
        <DialogFooter>
          <div className="flex flex-row justify-between gap-4 text-muted-foreground">
            <p className="flex flex-row items-center space-x-2">
              <User size={18} />
              <span className="text-xs">
                {income?.data.createdByUser.fullName}
              </span>
            </p>
            <p className="flex flex-row items-center space-x-2">
              <FilePlus size={18} />
              {income?.data.createdAt && (
                <span className="text-xs">
                  {new Date(income?.data.createdAt).toDateString()}
                </span>
              )}
            </p>
            <p className="flex flex-row items-center space-x-2">
              <LucideFileEdit size={18} />

              {income?.data.updatedAt && (
                <span className="text-xs">
                  {new Date(income?.data.updatedAt).toDateString()}
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

export default IncomeDataViewer
