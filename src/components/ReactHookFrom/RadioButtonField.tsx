import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, useTheme } from "@mui/material";
import { ChangeEvent } from "react";
import { Control, FieldError, Path, useController } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

export type RadioButtonFieldProps<T extends FieldValues> = {
  options: { label: string; id: string | number }[] | any[];
  helperText?: string;
  name: Path<T>;
  required?: boolean;
  parseError?: (error: FieldError) => string;
  label?: string;
  labelKey?: string;
  valueKey?: string;
  type?: "number" | "string";
  emptyOptionLabel?: "string";
  onChange?: (value: any) => void;
  returnObject?: boolean;
  row?: boolean;
  control?: Control<T>;
};

export function RadioButtonField<TFieldValues extends FieldValues>({
  helperText,
  options,
  label,
  name,
  parseError,
  labelKey = "label",
  valueKey = "id",
  required,
  emptyOptionLabel,
  returnObject,
  row,
  control,
  type,
  ...rest
}: RadioButtonFieldProps<TFieldValues>): JSX.Element {
  const theme = useTheme();
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: required ? { required: "This field is required" } : undefined,
  });

  helperText = error ? (typeof parseError === "function" ? parseError(error) : error.message) : helperText;

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value;
    const returnValue = returnObject ? options.find((items) => items[valueKey] === radioValue) : radioValue;
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue);
    if (typeof rest.onChange === "function") {
      rest.onChange(returnValue);
    }
  };

  return (
    <FormControl error={!!error}>
      {label && (
        <FormLabel error={!!error} required={required}>
          {label}
        </FormLabel>
      )}
      <RadioGroup name={name} onChange={onRadioChange} row={row} value={value || ""}>
        {emptyOptionLabel && (
          <FormControlLabel
            control={
              <Radio
                checked={!value}
                sx={{
                  color: error ? theme.palette.error.main : undefined,
                }}
              />
            }
            label={emptyOptionLabel}
            value=""
          />
        )}
        {options.map((option: any) => {
          const optionKey = option[valueKey];
          if (!optionKey) {
            console.error(`CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`, option);
          }
          let val = returnObject ? value[valueKey] : value;
          if (type === "number") {
            val = Number(val);
          }
          const isChecked = val === optionKey;
          return (
            <FormControlLabel
              control={
                <Radio
                  checked={isChecked}
                  sx={{
                    color: error ? theme.palette.error.main : undefined,
                  }}
                />
              }
              key={optionKey}
              label={option[labelKey]}
              value={optionKey}
            />
          );
        })}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}
