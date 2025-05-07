import {
  Input,
  InputProps,
  FormControl,
  FormHelperText,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

type FormInputProps = {
  name: string;
  label: string;
  helperText?: string;
  style?: React.CSSProperties;
  inputLabelStyle?: React.CSSProperties;
  helperTextStyle?: React.CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & Omit<InputProps, "name">;

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

  // Always treat the input as controlled by ensuring value is always a string
  const inputValue = field.value ?? "";
  const hasValue = inputValue !== "";

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel
        htmlFor={name}
        shrink={hasValue || props.placeholder !== undefined}
        sx={{
          ...(startIcon ? { marginLeft: "30px" } : {}),
          ...inputLabelStyle,
        }}
      >
        {label || props.placeholder}
      </InputLabel>
      <Input
        {...field}
        {...props}
        id={name}
        name={name}
        value={inputValue}
        placeholder=""
        startAdornment={
          startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined
        }
        endAdornment={
          endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined
        }
        sx={{
          width: "100%",
          ...style,
        }}
      />
      {(errorMessage || helperText) && (
        <FormHelperText sx={helperTextStyle}>
          {errorMessage || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormInput;
