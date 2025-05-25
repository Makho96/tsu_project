import {
  TextField,
  TextFieldProps,
  FormControl,
  SxProps,
  Theme,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

type FormInputProps = {
  name: string;
  label: string;
  helperText?: string;
  style?: SxProps<Theme>;
  inputLabelStyle?: SxProps<Theme>;
  helperTextStyle?: SxProps<Theme>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & Omit<TextFieldProps, "name" | "label" | "helperText">;

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  helperText,
  style,
  inputLabelStyle,
  helperTextStyle,
  startIcon,
  endIcon,
  ...props
}) => {
  const [field, meta] = useField(name);

  const isError = meta.touched && Boolean(meta.error);
  const errorMessage = isError ? meta.error : undefined;

  return (
    <FormControl fullWidth error={isError}>
      <TextField
        {...field}
        {...props}
        id={name}
        name={name}
        label={label}
        error={isError}
        helperText={errorMessage || helperText}
        InputProps={{
          startAdornment: startIcon,
          endAdornment: endIcon,
          ...props.InputProps,
        }}
        InputLabelProps={{
          sx: inputLabelStyle,
          ...props.InputLabelProps,
        }}
        FormHelperTextProps={{
          sx: helperTextStyle,
          ...props.FormHelperTextProps,
        }}
        sx={{
          width: "100%",
          ...style,
        }}
      />
    </FormControl>
  );
};

export default FormInput;
