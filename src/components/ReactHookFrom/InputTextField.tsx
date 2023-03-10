import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";
import { Control, Controller, FieldValues, Path, useController } from "react-hook-form";

export type InputTextFieldProps<T extends FieldValues = FieldValues> = Omit<TextFieldProps, "name"> & {
  name: Path<T>;
  control?: Control<T>;
};

export const InputTextField = <TextFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  helperText,
  ...props
}: InputTextFieldProps<TextFieldValues>): JSX.Element => {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  return (
    <TextField
      {...props}
      {...field}
      error={isFocus ? false : !!fieldState.error}
      helperText={fieldState.error?.message || helperText}
      inputRef={field.ref}
      name={name}
      onBlur={() => {
        onBlur();
        field.onBlur();
      }}
      onChange={(event) => {
        field.onChange(event);
        props.onChange?.(event);
      }}
      onFocus={onFocus}
      value={field.value || ""}
    />
  );
};
