import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileDown, Loader2 } from "lucide-react"
import { useState } from "react"

type DownloadReportPageRangeDialogProps = {
  isDownloading: boolean
  isDisabled: boolean
  onButtonClick: (range: "current" | "all") => void
}

const DownloadReportPageRangeDialog = ({
  onButtonClick,
  isDisabled,
  isDownloading,
}: DownloadReportPageRangeDialogProps) => {
  const [open, setOpen] = useState(false)

  const handleBtnClick = (range: "current" | "all") => {
    onButtonClick(range)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} disabled={isDisabled || isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Downloading...
            </>
          ) : (
            <>
              <FileDown size={20} />
              Download in Excel
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-lg">
        <DialogHeader>
          <DialogTitle>Confirm Download Range</DialogTitle>
          <DialogDescription>
            Select the range of pages you want to download.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-center">
          <p className="text-[16px]">How many pages do you want to download?</p>
          <p>Note: Downloading all pages might take some time.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button variant={"default"} onClick={() => handleBtnClick("current")}>
            Current Page
          </Button>
          <Button variant={"default"} onClick={() => handleBtnClick("all")}>
            All Pages
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DownloadReportPageRangeDialog
