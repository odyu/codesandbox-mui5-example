import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Autocomplete, AutocompleteProps, Checkbox, TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type ComboCheckboxFieldProps = Omit<
  AutocompleteProps<string, true, undefined, undefined>,
  "name" | "renderInput" | "renderOption" | "multiple"
> &
  Pick<TextFieldProps, "label" | "placeholder"> & {
    name: string;
    helperText?: string;
  };

export const ComboCheckboxField = ({
  helperText,
  label,
  name,
  options,
  placeholder,
  ...props
}: ComboCheckboxFieldProps): JSX.Element => {
  const [field, meta, { setValue }] = useField({ name });

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Autocomplete
      {...props}
      {...field}
      disableCloseOnSelect={true}
      multiple={true}
      onBlur={(event) => {
        setIsFocus(false);
        field.onBlur(event);
        props.onBlur?.(event);
      }}
      onChange={(event, value, reason, details) => {
        setValue(value);
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
          error={isFocus ? false : !!meta.error}
          helperText={meta.error || helperText || <>&nbsp;</>}
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
