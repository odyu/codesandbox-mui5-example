import { TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type InputTextFieldProps<T extends FieldValues = FieldValues> = Omit<TextFieldProps, "name"> & {
  name: Path<T>;
  control?: Control<T>;
};

export const InputTextField = <TextFieldValues extends FieldValues = FieldValues>({
  type,
  required,
  name,
  control,
  helperText,
  ...props
}: InputTextFieldProps<TextFieldValues>): JSX.Element => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <TextField
          {...props}
          error={isFocus ? false : !!error}
          helperText={error?.message || helperText}
          inputRef={ref}
          name={name}
          onBlur={onBlur}
          onChange={(event) => {
            onChange(event);
            if (typeof props.onChange === "function") {
              props.onChange(event);
            }
          }}
          onFocus={(event) => {
            setIsFocus(true);
          }}
          required={required}
          type={type}
          value={value ?? ""}
        />
      )}
    />
  );
};
