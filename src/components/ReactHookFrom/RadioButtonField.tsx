import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  TextFieldProps,
  useTheme,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { Control, FieldError, Path, useController } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FieldPathValue } from "react-hook-form/dist/types/path/eager";

export type RadioButtonFieldProps<T extends FieldValues> = Pick<TextFieldProps, "helperText" | "required" | "label"> & {
  options: { label: string; value: FieldPathValue<FieldValues, Path<T>> }[];
  name: Path<T>;
  parseError?: (error: FieldError) => string;
  onChange?: (value: FieldPathValue<FieldValues, Path<T>>) => void;
  row?: boolean;
  control?: Control<T>;
  parseValue: (value: string) => FieldPathValue<FieldValues, Path<T>>;
  formatValue: (value: FieldPathValue<FieldValues, Path<T>>) => string;
};

export function RadioButtonField<RadioButtonFieldValues extends FieldValues>({
  helperText,
  options,
  label,
  name,
  parseError,
  required,
  row,
  control,
  parseValue,
  formatValue,
  ...props
}: RadioButtonFieldProps<RadioButtonFieldValues>): JSX.Element {
  const theme = useTheme();

  const { field, fieldState } = useController({
    control,
    name,
  });

  const formLabel = useMemo(() => {
    if (label) {
      return (
        <FormLabel error={!!fieldState.error} required={required}>
          {label}
        </FormLabel>
      );
    }

    return null;
  }, [fieldState.error, label, required]);

  const formHelperText = useMemo(() => {
    if (!!fieldState.error && fieldState.error.message) {
      return <FormHelperText>{fieldState.error.message}</FormHelperText>;
    }

    if (helperText) {
      return <FormHelperText>{helperText}</FormHelperText>;
    }

    return null;
  }, [fieldState.error, helperText]);

  const onChangeRadio = useCallback<Exclude<RadioGroupProps["onChange"], undefined>>(
    (event, value) => {
      const parsedValue = parseValue(value);
      field.onChange?.(parsedValue);
      props.onChange?.(parsedValue);
    },
    [field, parseValue, props]
  );

  return (
    <FormControl error={!!fieldState.error}>
      {formLabel}
      <RadioGroup name={name} onChange={onChangeRadio} row={row} value={field.value || ""}>
        {options.map((option, index) => (
          <FormControlLabel
            {...option}
            control={
              <Radio
                checked={parseValue(field.value) === option.value}
                sx={{
                  color: !!fieldState.error ? theme.palette.error.main : undefined,
                }}
              />
            }
            key={index}
          />
        ))}
      </RadioGroup>
      {formHelperText}
    </FormControl>
  );
}
