import { TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

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
  const {
    field: { ref, ...field },
    fieldState,
  } = useController({
    control,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  const onBlur = useCallback<NonNullable<TextFieldProps["onBlur"]>>(
    (event) => {
      console.log("InputTextField.onBlur", event);
      setIsFocus(false);
      field.onBlur();
      props.onBlur?.(event);
    },
    [field, props]
  );

  const onFocus = useCallback<NonNullable<TextFieldProps["onFocus"]>>(
    (event) => {
      console.log("InputTextField.onFocus", event);
      setIsFocus(true);
      props.onFocus?.(event);
    },
    [props]
  );

  const onChange = useCallback<NonNullable<TextFieldProps["onChange"]>>(
    (event) => {
      console.log("InputTextField.onChange", event);
      field.onChange(event);
      props.onChange?.(event);
    },
    [field, props]
  );

  return (
    <TextField
      {...props}
      {...field}
      error={isFocus ? false : !!fieldState.error}
      helperText={fieldState.error?.message || helperText || <>&nbsp;</>}
      inputRef={ref}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      value={field.value || ""}
    />
  );
};
