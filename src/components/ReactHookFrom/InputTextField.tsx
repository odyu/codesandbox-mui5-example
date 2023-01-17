import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

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
  const [isFocus, setIsFocus] = useState(false);

  const onBlur = useCallback(() => {
    setIsFocus(false);
  }, []);

  const onFocus = useCallback(() => {
    setIsFocus(true);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
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
            if (typeof props.onChange === "function") {
              props.onChange(event);
            }
          }}
          onFocus={onFocus}
          value={field.value}
        />
      )}
    />
  );
};
