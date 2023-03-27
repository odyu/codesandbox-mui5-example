import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormGroupProps,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Control, FieldError, Path, useController } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

export type CheckboxFieldProps<T extends FieldValues> = Omit<CheckboxProps, "name"> &
  Pick<CheckboxProps, "onChange"> &
  Pick<FormGroupProps, "row"> & {
    name: Path<T>;
    parseError?: (error: FieldError) => string;
    label?: FormControlLabelProps["label"];
    helperText?: string;
    control?: Control<T>;
  };

export const CheckboxField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  helperText,
  label,
  name,
  parseError,
  required,
  row,
  ...props
}: CheckboxFieldProps<TFieldValues>): JSX.Element => {
  const theme = useTheme();

  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <FormControl error={!!error} required={required}>
      <FormGroup row={row}>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              checked={!!field.value}
              color={props.color || "primary"}
              inputRef={ref}
              onBlur={(event) => {
                setIsFocus(false);
                field.onBlur();
                props.onBlur?.(event);
              }}
              onChange={(event, checked) => {
                field.onChange(checked);
                props.onChange?.(event, checked);
              }}
              onFocus={(event) => {
                setIsFocus(true);
                props.onFocus?.(event);
              }}
              sx={{
                color: !!error ? theme.palette.error.main : undefined,
              }}
              value={field.value}
            />
          }
          label={label || ""}
        />
      </FormGroup>
      <FormHelperText error={isFocus ? false : !!error}>{error?.message || helperText || <>&nbsp;</>}</FormHelperText>
    </FormControl>
  );
};
