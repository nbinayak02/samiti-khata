import { Eye, FilePlus, LucideFileEdit, User } from "lucide-react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useQuery } from "@tanstack/react-query"
import IncomeRepository from "@/page/income/income.repository"
import { useEffect, useState } from "react"
import { Separator } from "../ui/separator"

type IncomeDataViewerProps = {
  id: number
}
const IncomeDataViewer = ({ id }: IncomeDataViewerProps) => {
  const {
    data: income,
    refetch,
    isPending: isIncomeFetching,
    isSuccess: isIncomeFetchSuccess,
  } = useQuery({
    enabled: false, // don't fetch on component mount
    queryKey: ["income", id],
    queryFn: () => IncomeRepository.getById(id),
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      // fetch income details when dialog is opened
      refetch()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button>
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>View Income Data</DialogTitle>
          <DialogDescription>View detailed info.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row justify-between gap-4">
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
          </div>
          <div className="flex flex-row *:w-1/2">
            <div className="space-y-2">
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
            <div className="space-y-2">
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
                <span>Rs. {income?.data.amount} /-</span>
              </p>
            </div>
          </div>
        </div>
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
