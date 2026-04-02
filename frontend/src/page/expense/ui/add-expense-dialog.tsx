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
import SelectForm from "@/components/common/select-form"
import { useQuery } from "@tanstack/react-query"
import committeeRepository from "@/page/committee/committee.service"
import { useEffect, useState } from "react"
import CategoryRepository from "@/page/category/category.repository"
import useAddExpense from "../useAddExpense"
import NepaliDateInput from "@/components/common/nepali-date-input"

const AddExpense = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryRepository.fetchAllByOrganization,
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
  } = useAddExpense()

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
          <DialogTitle className="text-lg">Add Expense</DialogTitle>
          <DialogDescription>
            Enter the details of the new expense bill here. Click create when
            you are done.
          </DialogDescription>
        </DialogHeader>
        <form className="mt-2 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-row justify-between gap-6">
            <Field>
              <Label htmlFor="nepaliDate">Date</Label>
              <NepaliDateInput
                onValueChange={(value) => setValue("nepaliDate", value)}
              />
              {errors.nepaliDate && <FieldError>{errors.nepaliDate.message}</FieldError>}
            </Field>
            <Field>
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <SelectForm
                control={control}
                name="paymentMode"
                placeholder="Select Payment Mode"
                options={[
                  { name: "Cash", id: "CASH" },
                  { name: "Cheque", id: "CHEQUE" },
                  { name: "Online", id: "ONLINE" },
                ]}
                label="Payment Mode"
              />
              {errors.paymentMode && (
                <FieldError>{errors.paymentMode.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="documentType">Submitted Document Type</Label>
              <SelectForm
                control={control}
                name="documentType"
                placeholder="Select Document Type"
                options={[
                  { name: "Bill", id: "BILL" },
                  { name: "Voucher", id: "VOUCHER" },
                ]}
                label="Document Type"
              />
              {errors.documentType && (
                <FieldError>{errors.documentType.message}</FieldError>
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
                <Label htmlFor="particulars">Particulars</Label>
                <Input id="particulars" {...register("particulars")} />
                {errors.particulars && (
                  <FieldError>{errors.particulars.message}</FieldError>
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
                <Label>Category</Label>
                <SelectForm
                  control={control}
                  name="categoryId"
                  placeholder="Select Bill Issuer"
                  options={categories ? categories : []}
                  label="Categories"
                />
                {errors.categoryId && (
                  <FieldError>{errors.categoryId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  {...register("remarks")}
                  className="h-26"
                />
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
              Add Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddExpense



