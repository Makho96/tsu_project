import { useTranslation } from "react-i18next";
import { Languages } from "./Translator.types";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useCallback } from "react";
import { LuGlobe } from "react-icons/lu";

const Translator = () => {
  const { i18n } = useTranslation();

  const switchLang = (lng: string) => i18n.changeLanguage(lng);

  const handleChange = useCallback(
    (event: SelectChangeEvent<Languages>) => {
      switchLang(event.target.value);
    },
    [switchLang]
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
      startAdornment={<LuGlobe size={20} style={{ marginRight: "8px" }} />}
    >
      <MenuItem value={Languages.EN}>English</MenuItem>
      <MenuItem value={Languages.KA}>ქართული</MenuItem>
    </Select>
  );
};

export default Translator;
