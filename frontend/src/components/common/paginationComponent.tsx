import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

type PaginationComponentProps = {
  currentPage: number
  totalPages: number
  pageSize: number
  onRowsAmountChange: (value: number) => void
  onPageChange: (value: number) => void
}

export function PaginationComponent({
  currentPage,
  totalPages,
  pageSize,
  onRowsAmountChange,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <div className="flex flex-row items-center justify-end gap-4">
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeft />
      </Button>
      <Field orientation={"horizontal"} className="w-fit">
        <FieldLabel>Page</FieldLabel>
        <FieldLabel>{currentPage}</FieldLabel>
        <FieldLabel>of</FieldLabel>
        <FieldLabel>{totalPages}</FieldLabel>
      </Field>
      <Button
        size={"sm"}
        variant={"outline"}
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ArrowRight />
      </Button>
      <Select
        defaultValue={String(pageSize)}
        onValueChange={(value) => onRowsAmountChange(Number(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="25">25 rows</SelectItem>
            <SelectItem value="50">50 rows</SelectItem>
            <SelectItem value="100">100 rows</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
