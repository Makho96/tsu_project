import { Box } from "@mui/material";
import { Colors } from "../../../store/actions/actions.types";

const colorsArray = Object.values(Colors);

type ColorPickerProps = {
  onChange: (color: Colors) => void;
  chosenColor: Colors;
};

const ColorPicker = ({ onChange, chosenColor }: ColorPickerProps) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(5, 1fr)"
      gridTemplateRows="repeat(2, 1fr)"
      gap={2}
    >
      {colorsArray.map((color) => (
        <Box
          key={color}
          sx={{
            width: "70px",
            height: "50px",
            border: "2px solid",
            borderColor: color === chosenColor ? "green.1000" : "transparent",
            borderRadius: "12px",
            padding: "3px",
            "&:hover": {
              borderColor: "gray.500",
            },
            cursor: "pointer",
          }}
          onClick={() => onChange(color)}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: color,
              borderRadius: "8px",
            }}
          ></Box>
        </Box>
      ))}
    </Box>
  );
};

export default ColorPicker;
