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
import { useField } from "formik";
import { useState } from "react";

export type CheckboxFieldProps = Omit<CheckboxProps, "name"> &
  Pick<CheckboxProps, "onChange"> &
  Pick<FormGroupProps, "row"> & {
    name: string;
    label?: FormControlLabelProps["label"];
    helperText?: string;
  };

export const CheckboxField = ({
  helperText,
  label,
  name,
  required,
  row,
  ...props
}: CheckboxFieldProps): JSX.Element => {
  const theme = useTheme();

  const [field, meta, { setValue }] = useField({ name });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <FormControl error={!!meta.error} required={required}>
      <FormGroup row={row}>
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              checked={!!field.value}
              color={props.color || "primary"}
              onBlur={(event) => {
                setIsFocus(false);
                field.onBlur(event);
                props.onBlur?.(event);
              }}
              onChange={(event, checked) => {
                setValue(checked);
                props.onChange?.(event, checked);
              }}
              onFocus={(event) => {
                setIsFocus(true);
                props.onFocus?.(event);
              }}
              sx={{
                color: !!meta.error ? theme.palette.error.main : undefined,
              }}
              value={field.value}
            />
          }
          label={label || ""}
        />
      </FormGroup>
      <FormHelperText error={isFocus ? false : !!meta.error}>{meta.error || helperText || <>&nbsp;</>}</FormHelperText>
    </FormControl>
  );
};
