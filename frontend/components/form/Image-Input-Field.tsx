import { useEffect, useState } from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import ImageCaptureDialog from "../shared/Image-Capture-Dialog";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ImageInputFieldProps<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformValues>;
  name: Path<TFieldValues>;
  label: string;
  isRequired: boolean;
};

export default function ImageInputField<
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
>({
  control,
  label,
  name,
  isRequired = true,
}: ImageInputFieldProps<TFieldValues, TTransformValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name}>
            {label}
            {isRequired && <span className="text-rose-500">*</span>}
          </FieldLabel>

          <ImageCaptureDialog onCapture={(file) => field.onChange(file)} />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
