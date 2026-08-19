"use client";
import {
  SelectAuthorizedOrgMember,
  SelectFiscalYear,
} from "@/components/shared/select-components";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookStatusSelectField from "./Select-Status";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/form/Input-Field";
import useAddReceiptBookForm from "../hooks/useAddReceiptForm";
import { FieldGroup, FieldLabel } from "@/components/ui/field";

export default function AddReceiptForm() {
  const { control, handleSubmit, onSubmit, isError, isPending, serverError } =
    useAddReceiptBookForm();

  return (
    <form
      className="px-10 pt-5 flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isError && <p>{serverError?.message}</p>}

      <FieldLabel className="font-semibold">Receipt Information</FieldLabel>

      <FieldGroup>
        <InputField
          control={control}
          label="Book Number"
          name="bookNumber"
          isRequired
          placeholder="Receipt Book Number"
        />

        <div className="flex flex-row justify-between gap-3">
          <InputField
            control={control}
            label="Receipt Starting Number"
            name="receiptStartingNumber"
            isRequired
            placeholder="Receipt Starting Number"
          />

          <InputField
            control={control}
            label="Receipt Ending Number"
            name="receiptEndingNumber"
            isRequired
            placeholder="Receipt Ending Number"
          />
        </div>
        <SelectFiscalYear
          control={control}
          label="Fiscal Year"
          name="fiscalYearId"
          isRequired
        />
      </FieldGroup>

      <Separator />

      <FieldLabel className="font-semibold">
        Administrative Information
      </FieldLabel>

      <FieldGroup>
        <BookStatusSelectField
          control={control}
          label="Status"
          name="status"
          isRequired={false}
        />

        <div className="flex flex-row justify-between gap-3">
          <SelectAuthorizedOrgMember
            control={control}
            label="Assigned To"
            name="assignedTo"
            isRequired
          />
          <InputField
            control={control}
            label="Assigned At"
            name="assignedAt"
            placeholder="Assigned Date"
            isRequired={false}
          />
        </div>
        <InputField
          control={control}
          label="Returned At"
          name="returnedAt"
          placeholder="Returned Date"
          isRequired={false}
        />
      </FieldGroup>
      <Separator />

      <Button className="mb-10" disabled={isPending}>
        {isPending ? (
          <div className="flex flex-row gap-3">
            <Loader2 />
            Saving...
          </div>
        ) : (
          <>Save Receipt</>
        )}
      </Button>
    </form>
  );
}
