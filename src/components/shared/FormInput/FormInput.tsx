import React from "react";
import { useField } from "formik";
import {
  Input,
  InputProps,
  FormControl,
  FormHelperText,
  InputLabel,
} from "@mui/material";

type FormInputProps = {
  name: string;
  label: string;
  helperText?: string;
} & Omit<InputProps, "name">;

const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  helperText,
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
      />
      {(errorMessage || helperText) && (
        <FormHelperText>{errorMessage || helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormInput;
