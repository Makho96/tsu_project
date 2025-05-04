import "./index.css";
import {
  createTheme,
  ThemeOptions,
  TypographyVariantsOptions,
} from "@mui/material";
import i18n from "./i18n";

declare module "@mui/material/styles" {
  interface Palette {
    blue: {
      1000: string;
    };
  }

  interface PaletteOptions {
    blue?: {
      1000?: string;
    };
  }
}

// Base theme options shared across all languages
const baseThemeOptions: ThemeOptions = {
  palette: {
    common: {
      white: "rgb(229, 231, 235)",
    },
    blue: {
      1000: "rgb(11, 26, 44)",
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          padding: "12px 16px",
          backgroundColor: theme.palette.blue[1000],
          color: theme.palette.common.white,
        }),
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "8px 12px",
          border: "1px solid",
          borderColor: "rgb(209, 213, 219)",
          "&.Mui-focused": {
            // This is the correct way to target the focused state
            borderColor: "#000",
          },
          "&:after": {
            content: "unset",
          },
          "&:before": {
            content: "unset",
          },
        },
        input: {
          // Add this block to style the actual input element
          "&::placeholder": {
            color: "rgb(107, 114, 128)", // Your desired placeholder color
            opacity: 1, // Firefox requires this to show custom placeholder colors
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(12px, 30px) scale(1)",
          "&.Mui-focused, &.MuiFormLabel-filled": {
            transform: "translate(12px, -5px) scale(0.75)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            boxShadow: "none",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "inherit",
              borderWidth: "1px",
            },
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
        },
      },
    },
  },
};

const typographyOptionsBasic: Omit<TypographyVariantsOptions, "fontFamily"> = {
  h1: {
    fontSize: "2.5rem",
    fontWeight: 500,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 500,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 500,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 500,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.5,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.43,
  },
  button: {
    textTransform: "none" as const,
    fontWeight: 500,
  },
};

// Typography settings for different languages
const typographyOptions: Record<string, TypographyVariantsOptions> = {
  en: {
    fontFamily: '"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    ...typographyOptionsBasic,
  },
  ka: {
    fontFamily: '"Noto Sans Georgian", "Noto Sans", "Roboto", sans-serif',
    ...typographyOptionsBasic,
  },
};

// Function to create theme based on current language
const getThemeForLanguage = () => {
  const currentLanguage = i18n.language || "en";
  const language = currentLanguage.split("-")[0]; // Handle regional variants like 'en-US'

  const typography =
    typographyOptions[language as keyof typeof typographyOptions] ||
    typographyOptions.en;

  return createTheme({
    ...baseThemeOptions,
    typography,
  });
};

export const theme = getThemeForLanguage();

// Re-export a function to update theme when language changes
export const getUpdatedTheme = getThemeForLanguage;
