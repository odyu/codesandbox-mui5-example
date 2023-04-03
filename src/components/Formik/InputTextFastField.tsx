import { TextField, TextFieldProps } from "@mui/material";
import { FastField, useField } from "formik";
import { FastFieldProps } from "formik/dist/FastField";
import React, { useState } from "react";

export type InputTextFastFieldProps = Omit<TextFieldProps, "name"> & {
  name: string;
};

export const InputTextFastField = ({ helperText, name, label, ...props }: InputTextFastFieldProps): JSX.Element => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <FastField name={name}>
      {({ field, form, meta }: FastFieldProps) => (
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
      )}
    </FastField>
  );
};
