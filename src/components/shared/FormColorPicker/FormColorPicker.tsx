import {
  FormControl,
  FormHelperText,
  InputLabel,
  SxProps,
  Theme,
  Button,
  Popover,
  Box,
  TextField,
} from "@mui/material";
import { useField } from "formik";
import { useState, useCallback } from "react";

type FormColorPickerProps = {
  name: string;
  label: string;
  helperText?: string;
  style?: SxProps<Theme>;
  inputLabelStyle?: SxProps<Theme>;
  helperTextStyle?: SxProps<Theme>;
};

const FormColorPicker = ({
  name,
  label,
  helperText,
  style,
  inputLabelStyle,
  helperTextStyle,
}: FormColorPickerProps) => {
  const [field, meta, helpers] = useField(name);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [localColor, setLocalColor] = useState(field.value || "#000000");

  const isError = meta.touched && Boolean(meta.error);
  const errorMessage = isError ? meta.error : undefined;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    helpers.setValue(localColor);
    helpers.setTouched(true);
  }, [helpers, localColor]);

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      setLocalColor(newColor);
    },
    []
  );

  const handleHexChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
        setLocalColor(newColor);
      }
    },
    []
  );

  const open = Boolean(anchorEl);

  return (
    <FormControl fullWidth error={isError}>
      <InputLabel
        htmlFor={name}
        sx={{
          ...inputLabelStyle,
          transform: "translate(10px, -10px) scale(0.75)",
        }}
      >
        {label}
      </InputLabel>
      <Button
        onClick={handleClick}
        sx={{
          width: "100%",
          height: "52px",
          padding: "16px",
          border: "1px solid rgb(209, 213, 219)",
          borderRadius: "8px",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          ...style,
        }}
      >
        <Box
          sx={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            backgroundColor: localColor,
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        />
        <Box sx={{ color: "text.primary", ml: 1 }}>{localColor}</Box>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "4px",
                backgroundColor: localColor,
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
            />
            <TextField
              value={localColor}
              onChange={handleHexChange}
              onBlur={handleClose}
              size="small"
              placeholder="#000000"
              sx={{ width: "120px" }}
            />
          </Box>
          <input
            type="color"
            value={localColor}
            onChange={handleColorChange}
            onBlur={handleClose}
            style={{
              width: "200px",
              height: "40px",
              padding: "2px",
              border: "1px solid rgb(209, 213, 219)",
              borderRadius: "8px",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          />
        </Box>
      </Popover>
      {(errorMessage || helperText) && (
        <FormHelperText sx={helperTextStyle}>
          {errorMessage || helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormColorPicker;
