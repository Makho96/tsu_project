import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "./Translator.types";

const Translator = () => {
  const { i18n } = useTranslation();

  const handleChange = useCallback(
    (event: SelectChangeEvent<Languages>) => {
      const switchLang = (lng: string) => i18n.changeLanguage(lng);
      switchLang(event.target.value);
    },
    [i18n]
  );

  return (
    <Select
      value={i18n.language as Languages}
      onChange={handleChange}
      sx={{
        width: "150px",
        borderColor: "common.white",
        color: "common.white",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "common.white",
        },
        "& .MuiSelect-select": {
          padding: "10px",
        },
        "& .MuiSvgIcon-root": {
          fill: "white",
        },
        fontSize: "12px",
      }}
      startAdornment={
        <LanguageOutlinedIcon sx={{ marginRight: "8px", fontSize: 16 }} />
      }
    >
      <MenuItem value={Languages.EN}>English</MenuItem>
      <MenuItem value={Languages.KA}>ქართული</MenuItem>
    </Select>
  );
};

export default Translator;
