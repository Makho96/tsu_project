import {
  Select,
  SelectProps,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Theme,
  SxProps,
} from "@mui/material";
import { useField } from "formik";

type FormSelectProps = {
  name: string;
  label: string;
  helperText?: string;
  style?: SxProps<Theme>;
  inputLabelStyle?: SxProps<Theme>;
  helperTextStyle?: SxProps<Theme>;
  options: Array<{
    value: string | number;
    label: string;
  }>;
} & Omit<SelectProps, "name">;

const FormSelect = ({
  name,
  label,
  helperText,
  style,
  inputLabelStyle,
  helperTextStyle,
  options,
  ...props
}: FormSelectProps) => {
  const [field, meta] = useField(name);

  const isError = meta.touched && Boolean(meta.error);
  const errorMessage = isError ? meta.error : undefined;

  // Always treat the select as controlled by ensuring value is always a string
  const selectValue = field.value ?? "";

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel
        htmlFor={name}
        sx={{
          ...inputLabelStyle,
        }}
      >
        {label}
      </InputLabel>
      <Select
        {...field}
        {...props}
        id={name}
        name={name}
        value={selectValue}
        label={label}
        sx={{
          width: "100%",
          ...style,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {(errorMessage || helperText) && (
        <FormHelperText sx={helperTextStyle}>
          {errorMessage || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormSelect;
