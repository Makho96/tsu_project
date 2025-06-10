import {
  Checkbox,
  FormControlLabel,
  FormControl,
  SxProps,
  Theme,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

type FormCheckboxProps = {
  name: string;
  label: string;
  style?: SxProps<Theme>;
  labelStyle?: SxProps<Theme>;
} & Omit<React.ComponentProps<typeof Checkbox>, "name" | "label">;

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  style,
  labelStyle,
  ...props
}) => {
  const [field, meta] = useField(name);

  const isError = meta.touched && Boolean(meta.error);

  return (
    <FormControl fullWidth error={isError}>
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            {...props}
            checked={field.value}
            sx={{
              ...style,
            }}
          />
        }
        label={label}
        sx={{
          ...labelStyle,
        }}
      />
    </FormControl>
  );
};

export default FormCheckbox;
