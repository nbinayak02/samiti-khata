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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
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
import { Checkbox } from "@/components/ui/checkbox"
import type { CheckedState } from "@radix-ui/react-checkbox"
import getTodayInBs from "@/lib/getTodayInBs"
import billIssuerRepository from "@/page/bill-issuer/billIssuer.repository"

const AddExpense = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryRepository.fetchAllByOrganization,
  })

  const { data: committees } = useQuery({
    queryKey: ["committees"],
    queryFn: committeeRepository.fetchAllByOrganization,
  })

  const { data: payers } = useQuery({
    queryKey: ["billIssuers"],
    queryFn: billIssuerRepository.getBillIssuersByOrganization,
  })

  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
    onSubmit,
    isSuccess,
    isPending,
    reset,
  } = useAddExpense()

  const [isSetAsToday, setIsSetAsToday] = useState<CheckedState>(false)

  useEffect(() => {
    reset()
  }, [isSuccess, reset])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full min-w-4xl sm:max-w-sm">
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
                placeholder="Enter date"
                defaultValue={isSetAsToday ? getTodayInBs() : undefined}
                onValueChange={(value) => setValue("nepaliDate", value)}
              />
              {errors.nepaliDate && (
                <FieldError>{errors.nepaliDate.message}</FieldError>
              )}
            </Field>
            <Field orientation={"horizontal"} className="self-end">
              <Checkbox
                id="setAsToday"
                checked={isSetAsToday}
                onCheckedChange={setIsSetAsToday}
              />
              <FieldLabel htmlFor="setAsToday">Set as Today</FieldLabel>
            </Field>

            <Field>
              <Label htmlFor="voucherNum">Voucher Number</Label>
              <Input
                id="voucherNum"
                placeholder="Enter voucher number"
                {...register("voucherNumber")}
              />
              {errors.voucherNumber && (
                <FieldError>{errors.voucherNumber.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="billNum">Bill Number</Label>
              <Input
                id="billNum"
                placeholder="Enter bill number"
                {...register("billNumber")}
              />
              {errors.billNumber && (
                <FieldError>{errors.billNumber.message}</FieldError>
              )}
            </Field>
            <Field>
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <SelectForm
                control={control}
                name="paymentMode"
                placeholder="Select Mode"
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
          </FieldGroup>
          <Separator />
          <div className="flex flex-row justify-between gap-6">
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Recepient Name</Label>
                <Input
                  id="name"
                  placeholder="Enter name"
                  {...register("recepientName")}
                />
                {errors.recepientName && <FieldError>{errors.recepientName.message}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="address">Recepient Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  {...register("recepientAddress")}
                />
                {errors.recepientAddress && (
                  <FieldError>{errors.recepientAddress.message}</FieldError>
                )}
              </Field>

              <Field>
                <Label htmlFor="particulars">Particulars</Label>
                <Input
                  id="particulars"
                  placeholder="Enter particulars"
                  {...register("particulars")}
                />
                {errors.particulars && (
                  <FieldError>{errors.particulars.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Enter quantity"
                  {...register("quantity")}
                />
                {errors.quantity && (
                  <FieldError>{errors.quantity.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  {...register("amount")}
                />
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
                  placeholder="Select expense category"
                  options={categories ? categories : []}
                  label="Categories"
                />
                {errors.categoryId && (
                  <FieldError>{errors.categoryId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label>Paid By</Label>
                <SelectForm
                  control={control}
                  name="payerId"
                  placeholder="Select authorized payer"
                  options={payers ? payers : []}
                  label="Paid By"
                />
                {errors.payerId && (
                  <FieldError>{errors.payerId.message}</FieldError>
                )}
              </Field>
              <Field>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Enter remarks"
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
