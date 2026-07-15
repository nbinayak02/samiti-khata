import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/query/query-keys";
import { getFiscalYears } from "./api/select-fields.client.api";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ComboboxFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  isRequired: boolean;
};

export default function FiscalYearSelectField<T extends FieldValues>({
  control,
  label,
  name,
  isRequired = true,
}: ComboboxFieldProps<T>) {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.FISCAL_YEAR],
    queryFn: getFiscalYears,
  });

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
          <Select value={field.value ?? ""} onValueChange={field.onChange}>
            <SelectTrigger id={name}>
              <SelectValue placeholder="Select a fiscal year." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fiscal Years</SelectLabel>
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))
                ) : isPending ? (
                  <SelectLabel>Loading...</SelectLabel>
                ) : (
                  <SelectLabel>No fiscal years found.</SelectLabel>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
