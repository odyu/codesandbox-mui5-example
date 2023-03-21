import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export type InputTextFieldProps<T extends FieldValues = FieldValues> = Omit<TextFieldProps, "name"> & {
  name: Path<T>;
  control?: Control<T>;
};

export const InputTextField = <TextFieldValues extends FieldValues = FieldValues>({
  control,
  helperText,
  name,
  ...props
}: InputTextFieldProps<TextFieldValues>): JSX.Element => {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextField
      {...props}
      {...field}
      error={isFocus ? false : !!error}
      helperText={error?.message || helperText || <>&nbsp;</>}
      inputRef={ref}
      name={name}
      onBlur={(event) => {
        setIsFocus(false);
        field.onBlur();
        props.onBlur?.(event);
      }}
      onChange={(event) => {
        field.onChange(event);
        props.onChange?.(event);
      }}
      onFocus={(event) => {
        setIsFocus(true);
        props.onFocus?.(event);
      }}
      value={field.value}
    />
  );
};
