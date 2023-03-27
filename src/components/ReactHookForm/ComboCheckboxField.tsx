import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, AutocompleteProps, Checkbox, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { Control, FieldError, Path, useController } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type ComboCheckboxFieldProps<T extends FieldValues> = Omit<
  AutocompleteProps<string, true, undefined, undefined>,
  "name" | "renderInput" | "renderOption" | "multiple"
> &
  Pick<TextFieldProps, "label" | "placeholder"> & {
    name: Path<T>;
    parseError?: (error: FieldError) => string;
    helperText?: string;
    control?: Control<T>;
  };

export const ComboCheckboxField = <TFieldValues extends FieldValues = FieldValues>({
  control,
  helperText,
  label,
  name,
  options,
  parseError,
  placeholder,
  ...props
}: ComboCheckboxFieldProps<TFieldValues>): JSX.Element => {
  const {
    field: { ref, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Autocomplete
      {...props}
      {...field}
      disableCloseOnSelect={true}
      multiple={true}
      onBlur={(event) => {
        setIsFocus(false);
        field.onBlur();
        props.onBlur?.(event);
      }}
      onChange={(event, value, reason, details) => {
        field.onChange(value);
        props.onChange?.(event, value, reason, details);
      }}
      onFocus={(event) => {
        setIsFocus(true);
        props.onFocus?.(event);
      }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          error={isFocus ? false : !!error}
          helperText={error?.message || helperText || <>&nbsp;</>}
          label={label || ""}
          placeholder={placeholder}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} checkedIcon={checkedIcon} icon={icon} style={{ marginRight: 8 }} />
          {option}
        </li>
      )}
      value={field.value}
    />
  );
};
