import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isRequired: boolean;
};

export default function AuthorizedOrgMemberSelectField<T extends FieldValues>({
  control,
  label,
  name,
  isRequired = true,
}: SelectFieldProps<T>) {
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
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={name} onBlur={field.onBlur}>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              {[].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
