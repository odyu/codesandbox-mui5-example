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
import { useCallback, useMemo } from "react";
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

export function CheckboxField<TFieldValues extends FieldValues>({
  name,
  required,
  parseError,
  label,
  control,
  helperText,
  row,
  ...props
}: CheckboxFieldProps<TFieldValues>): JSX.Element {
  const theme = useTheme();

  const {
    field: { ref, ...field },
    fieldState,
  } = useController({
    control,
    name,
  });

  const formHelperText = useMemo(() => {
    if (!!fieldState.error && fieldState.error.message) {
      return <FormHelperText error={!!fieldState.error}>{fieldState.error.message}</FormHelperText>;
    }

    if (helperText) {
      return <FormHelperText>{helperText}</FormHelperText>;
    }

    return null;
  }, [fieldState.error, helperText]);

  const sx = useMemo<NonNullable<CheckboxProps["sx"]>>(
    () => ({
      color: !!fieldState.error ? theme.palette.error.main : undefined,
    }),
    [fieldState.error, theme.palette.error.main]
  );

  const onChange = useCallback<NonNullable<CheckboxProps["onChange"]>>(
    (event, checked) => {
      console.log("CheckboxField.onChange", event, checked);
      field.onChange(checked);
      props.onChange?.(event, checked);
    },
    [field, props]
  );

  return (
    <FormControl error={!!fieldState.error} required={required}>
      <FormGroup row={row}>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              checked={!!field.value}
              color={props.color || "primary"}
              inputRef={ref}
              onChange={onChange}
              sx={sx}
              value={field.value}
            />
          }
          label={label || ""}
        />
      </FormGroup>
      {formHelperText || <>&nbsp;</>}
    </FormControl>
  );
}
