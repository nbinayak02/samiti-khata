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
import { Edit, Loader, PlusCircle } from "lucide-react"
import SelectForm from "@/components/common/select-form"
import { useQuery } from "@tanstack/react-query"
import billIssuerRepository from "@/page/bill-issuer/billIssuer.repository"
import committeeRepository from "@/page/committee/committee.service"
import { useEffect, useState } from "react"
import NepaliDateInput from "@/components/common/nepali-date-input"
import expenseRepository from "../expense.repository"
import ExpenseRepository from "../expense.repository"
import CategoryRepository from "@/page/category/category.repository"
import useUpdateExpense from "../useUpdateExpense"

type UpdateExpenseProps = {
  id: number
}

const UpdateExpense = ({ id }: UpdateExpenseProps) => {
  const {
    data: expense,
    refetch,
    isPending: isExpenseFetching,
    isSuccess: isExpenseFetchSuccess,
  } = useQuery({
    enabled: false, // don't fetch on component mount
    queryKey: ["expense", id],
    queryFn: () => ExpenseRepository.getById(id),
  })

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryRepository.fetchAllByOrganization,
  })

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const [open, setOpen] = useState(false)
  const [hasFormChanged, setHasFormChanged] = useState(false)

  const {
    control,
    setValue,
    setDefaultValues,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isSuccess,
    isError,
    isPending,
  } = useUpdateExpense()

  useEffect(() => {
    setOpen(false)
  }, [isSuccess, isError])

  useEffect(() => {
    if (expense?.data) {
      setDefaultValues({
        address: expense.data.address,
        amount: String(expense.data.amount),
        categoryId: String(expense.data.category.id),
        committeeId: String(expense.data.committee.id),
        name: expense.data.name,
        nepaliDate: expense.data.nepaliDate,
        remarks: expense.data.remarks ?? "",
        id: expense.data.id,
        documentType: expense.data.documentType,
        paymentMode: expense.data.paymentMode,
        particulars: expense.data.particulars,
      })
    }
  }, [isExpenseFetchSuccess])

  useEffect(() => {
    if (open) {
      // fetch expense details when dialog is opened
      refetch()
    } else {
      setHasFormChanged(false) // reset form changed state when dialog is closed
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full min-w-2xl sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">Update expense</DialogTitle>
          <DialogDescription>
            Enter the details of the updated expense bill here. Click create
            when you are done.
          </DialogDescription>
        </DialogHeader>
        {isExpenseFetching && (
          <div className="flex h-40 items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}

        {isExpenseFetchSuccess && expense.data && (
          <form
            className="mt-2 space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            onChange={() => setHasFormChanged(true)}
          >
            <FieldGroup className="flex flex-row justify-between gap-6">
              <Field>
                <Label htmlFor="nepaliDate">Date</Label>
                <NepaliDateInput
                  defaultValue={expense.data.nepaliDate}
                  onValueChange={(value) => setValue("nepaliDate", value)}
                />
                {errors.nepaliDate && (
                  <FieldError>{errors.nepaliDate.message}</FieldError>
                )}
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
                  defaultValue={String(expense.data.paymentMode)}
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
                  defaultValue={String(expense.data.documentType)}
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
                  {errors.name && (
                    <FieldError>{errors.name.message}</FieldError>
                  )}
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
                    options={committees?.data ? committees.data : []}
                    label="Committees"
                    defaultValue={String(expense.data.committee.id)}
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
                    placeholder="Select Category"
                    options={categories ? categories : []}
                    label="Categories"
                    defaultValue={String(expense.data.category.id)}
                  />
                  {errors.categoryId && (
                    <FieldError>{errors.categoryId.message}</FieldError>
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

            <Separator />

            <FieldGroup>
              <Field>
                <Label htmlFor="reasonToUpdate">Reason for Update</Label>
                <Textarea id="reasonToUpdate" {...register("description")} />
                {errors.description && (
                  <FieldError>{errors.description.message}</FieldError>
                )}
              </Field>
            </FieldGroup>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending || !hasFormChanged}>
                {isPending && <Loader className="animate-spin" />}
                Update expense
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UpdateExpense
