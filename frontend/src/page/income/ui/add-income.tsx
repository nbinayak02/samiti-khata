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
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Loader, PlusCircle } from "lucide-react"
import useAddIncome from "../useAddIncome"
import SelectForm from "@/components/common/select-form"
import { useQuery } from "@tanstack/react-query"
import billIssuerRepository from "@/page/bill-issuer/billIssuer.repository"
import committeeRepository from "@/page/committee/committee.service"
import { useEffect, useState } from "react"
import NepaliDateInput from "@/components/common/nepali-date-input"

const AddIncome = () => {
  const { data: billIssuers } = useQuery({
    queryKey: ["billIssuers"],
    queryFn: billIssuerRepository.getBillIssuersByOrganization,
  })

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const [open, setOpen] = useState(false)

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isSuccess,
    isError,
    isPending,
  } = useAddIncome()

  useEffect(() => {
    setOpen(false)
  }, [isSuccess, isError])

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full min-w-2xl sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">Add Income</DialogTitle>
          <DialogDescription>
            Enter the details of the new income bill here. Click create when you
            are done.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-row justify-between gap-6">
            <Field>
              <Label htmlFor="billNo">Bill Number</Label>
              <Input id="billNo" {...register("billNumber")} />
              {errors.billNumber && (
                <FieldError>{errors.billNumber.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="bookNo">Book Number</Label>
              <Input id="bookNo" {...register("bookNumber")} />
              {errors.bookNumber && (
                <FieldError>{errors.bookNumber.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="nepaliDate">Date</Label>
              <NepaliDateInput
                onValueChange={(value) => setValue("nepaliDate", value)}
              />
              {errors.nepaliDate && (
                <FieldError>{errors.nepaliDate.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
          <Separator />
          <div className="flex flex-row justify-between gap-6">
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && <FieldError>{errors.name.message}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="address">Address</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <FieldError>{errors.address.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" {...register("amount")} />
                {errors.amount && (
                  <FieldError>{errors.amount.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <Label>Committee</Label>
                <SelectForm
                  control={control}
                  name="committeeId"
                  placeholder="Select Committee"
                  options={committees ? committees : []}
                  label="Committees"
                />
                {errors.committeeId && (
                  <FieldError>{errors.committeeId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label>Bill Issued By</Label>
                <SelectForm
                  control={control}
                  name="billIssuerId"
                  placeholder="Select Bill Issuer"
                  options={billIssuers ? billIssuers : []}
                  label="Bill Issuer"
                />
                {errors.billIssuerId && (
                  <FieldError>{errors.billIssuerId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea id="remarks" {...register("remarks")} />
                {errors.remarks && (
                  <FieldError>{errors.remarks.message}</FieldError>
                )}
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="animate-spin" />}
              Add Income
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddIncome



