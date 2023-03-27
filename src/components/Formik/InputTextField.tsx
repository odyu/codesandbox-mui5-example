import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import React, { useState } from "react";

export type InputTextFieldProps = Omit<TextFieldProps, "name"> & {
  name: string;
};

export const InputTextField = ({ helperText, name, label, ...props }: InputTextFieldProps): JSX.Element => {
  const [field, meta] = useField({ name });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <TextField
      {...field}
      error={isFocus ? false : !!meta.error}
      helperText={meta.error || helperText || <>&nbsp;</>}
      label={label}
      onBlur={(event) => {
        setIsFocus(false);
        field.onBlur(event);
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
    />
  );
};
