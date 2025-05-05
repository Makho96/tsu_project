import { Box } from "@mui/material";
import { CSSProperties } from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
  color?: string;
  size?: number;
  thickness?: number;
  transitionDuration?: number;
  className?: string;
  style?: CSSProperties;
}

const BurgerMenu = ({
  isOpen,
  onClick,
  color = "currentColor",
  size = 24,
  thickness = 2,
  transitionDuration = 250,
  className = "",
  style = {},
}: BurgerMenuProps) => {
  const barWidth = size * 0.75;
  const barHeight = thickness;
  const barSpacing = size / 3 - barHeight;

  return (
    <Box
      className={className}
      onClick={onClick}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: size,
        height: size,
        cursor: "pointer",
        ...style,
      }}
    >
      {/* Top bar - transforms to top part of arrow */}
      <Box
        sx={{
          position: "absolute",
          width: barWidth,
          height: barHeight,
          backgroundColor: color,
          borderRadius: barHeight / 2,
          transition: `transform ${transitionDuration}ms ease`,
          transform: isOpen
            ? `translate(-1px, 0) rotate(-35deg) scaleX(0.5)`
            : `translate(0, -${barSpacing}px)`,
          transformOrigin: "left center",
        }}
      />

      {/* Middle bar - becomes the horizontal part of arrow */}
      <Box
        sx={{
          position: "absolute",
          height: barHeight,
          backgroundColor: color,
          borderRadius: barHeight / 2,
          transition: `transform ${transitionDuration}ms ease, width ${transitionDuration}ms ease`,
          transform: isOpen ? `translateX(-${size * 0.1}px)` : "translateX(0)",
          width: isOpen ? barWidth * 0.8 : barWidth,
        }}
      />

      {/* Bottom bar - transforms to bottom part of arrow */}
      <Box
        sx={{
          position: "absolute",
          width: barWidth,
          height: barHeight,
          backgroundColor: color,
          borderRadius: barHeight / 2,
          transition: `transform ${transitionDuration}ms ease`,
          transform: isOpen
            ? `translate(-1px, 0) rotate(35deg) scaleX(0.5)`
            : `translate(0, ${barSpacing}px)`,
          transformOrigin: "left center",
        }}
      />
    </Box>
  );
};

export default BurgerMenu;
