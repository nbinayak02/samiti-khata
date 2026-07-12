"use client";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/form/Input-Field";
import useAddIncomeForm from "../hooks/useAddIncomeForm";
import ReceiptComboboxField from "./Receipt-Combobox-Field";
import TextAreaField from "@/components/form/Textarea-Field";
import CommitteeComboboxField from "./Committee-Combobox-Field";
import ImageInputField from "@/components/form/Image-Input-Field";
import SubCommitteeComboboxField from "./SubCommittee-Combobox-Field";
import ReceiptHandlerComboboxField from "./Receipt-Handler-Combobox-Field";

export default function AddIncomeForm() {
  const { control } = useAddIncomeForm();

  return (
    <form className="px-10 pt-5 flex flex-col gap-8">
      <div>
        <FieldLabel className="font-semibold">Receipt Information</FieldLabel>
        <FieldDescription className="text-sm pt-1 text-muted-foreground">
          Selecting a book suggests the next receipt number automatically.
        </FieldDescription>
      </div>

      <FieldGroup>
        {/* receipt book  */}
        <ReceiptComboboxField
          control={control}
          label="Receipt Book"
          name="receiptBook"
          isRequired
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
          <CommitteeComboboxField
            control={control}
            label="Committee"
            name="committeeId"
            isRequired
          />

          <SubCommitteeComboboxField
            control={control}
            label="Sub Committee"
            name="subCommitteeId"
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
        <ReceiptHandlerComboboxField
          control={control}
          label="Receipt Handeled By"
          name="billIssuerId"
          isRequired
        />
      </FieldGroup>
      <Separator />

      <FieldLabel className="font-semibold">Form Setting</FieldLabel>

      {/* <div className="space-y-1">
        <div className="flex flex-row gap-3">
          <Label htmlFor="donot-autoclose">Do not autoclose form</Label>
          <Switch
            id="donot-autoclose"
            checked={dontAutoClose}
            onCheckedChange={setDontAutoClose}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Turn on for continuous data entry.
        </p>
      </div> */}

      <Button className="mb-10">Save Income</Button>
    </form>
  );
}
