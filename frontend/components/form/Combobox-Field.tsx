import { Field, FieldError, FieldLabel } from "../ui/field";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../ui/combobox";
import { Item, ItemContent, ItemDescription, ItemTitle } from "../ui/item";

type ComboOptions = {
  key: string;
  label: string;
  value: string;
  description?: string;
  indicator?: string;
};

type ComboboxFieldProps<
  TData extends ComboOptions,
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
> = {
  control: Control<TFieldValues, unknown, TTransformValues>;
  name: Path<TFieldValues>;
  label: string;
  data: TData[];
  isRequired: boolean;
};
export default function ComboboxField<
  TData extends ComboOptions,
  TFieldValues extends FieldValues,
  TTransformValues = TFieldValues,
>({
  control,
  label,
  name,
  data,
  isRequired = true,
}: ComboboxFieldProps<TData, TFieldValues, TTransformValues>) {
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
          <Combobox>
            <ComboboxInput placeholder={`Select ${label}`} name={field.name} />
            <ComboboxContent>
              <ComboboxEmpty>No {label.toLowerCase()} found.</ComboboxEmpty>
              <ComboboxList>
                {data.map((d: TData) => (
                  <ComboboxItem key={d.key} value={d.value}>
                    <Item size="xs" className="p-0">
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">
                          {d.label}
                        </ItemTitle>
                        <ItemDescription>{d?.description}</ItemDescription>
                      </ItemContent>
                    </Item>
                  </ComboboxItem>
                ))}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
