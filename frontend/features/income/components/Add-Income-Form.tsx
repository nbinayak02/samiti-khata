"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller } from "react-hook-form";
import useAddIncomeForm from "../hooks/useAddIncomeForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputField from "@/components/form/Input-Field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import TextAreaField from "@/components/form/Textarea-Field";
import ImageInputField from "@/components/form/Image-Input-Field";

export default function AddIncomeForm() {
  const { control } = useAddIncomeForm();

  return (
    <form className="px-10 pt-5 flex flex-col gap-8">
      <div>
        <FieldLabel className="font-semibold">Receipt Information</FieldLabel>
        <FieldDescription className="text-xs pt-1 text-muted-foreground">
          Selecting a book suggests the next receipt number automatically.
        </FieldDescription>
      </div>

      <FieldGroup>
        {/* receipt book  */}
        <Controller
          name="receiptBook"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="receiptBook">
                Receipt Book
                <span className="text-rose-500">*</span>
              </FieldLabel>
              <Select
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger
                  id="receiptBook"
                  aria-invalid={fieldState.invalid}
                  className="min-w-30"
                >
                  <SelectValue placeholder="Select Receipt Book" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={control}
            label="Receipt Number"
            name="billNumber"
            isRequired
            placeholder="Receipt Number"
          />

          <InputField
            control={control}
            label="Date (B.S.)"
            name="nepaliDate"
            isRequired
            placeholder="2083-01-01"
          />
        </div>

        <ImageInputField
          control={control}
          label="Receipt Image"
          name="billImage"
          isRequired={false}
        />
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold">Basic Information</FieldLabel>

      <FieldGroup className="flex flex-row justify-between gap-3">
        <InputField
          control={control}
          label="Name"
          name="name"
          placeholder="Name"
          isRequired
        />

        <InputField
          control={control}
          label="Address"
          name="address"
          placeholder="Address"
          isRequired
        />
      </FieldGroup>
      <Separator />

      <FieldLabel className="font-semibold">Financial Information</FieldLabel>

      <FieldGroup>
        <InputField
          control={control}
          label="Amount"
          name="amount"
          placeholder="Amount"
          isRequired
        />

        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={control}
            label="Committee"
            name="committeeId"
            placeholder="Committee"
            isRequired
          />

          <InputField
            control={control}
            label="Sub Committee"
            name="subCommitteeId"
            placeholder="Sub Committee"
            isRequired
          />
        </div>

        <TextAreaField
          control={control}
          label="Remarks"
          name="remarks"
          placeholder="Remarks"
          isRequired={false}
        />
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold">Administrative</FieldLabel>

      <FieldGroup>
        <InputField
          control={control}
          label="Receipt Handeled By"
          name="billIssuerId"
          placeholder="Amount"
          isRequired
        />
      </FieldGroup>
      <Separator />

      <Button className="mb-10">Save Income</Button>
    </form>
  );
}
