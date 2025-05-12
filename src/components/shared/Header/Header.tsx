import { Box } from "@mui/material";
import AuthUser from "../AuthUser";
import BurgerMenu from "../BurgerMenu";
import SelectedCompany from "../CompanySelectionModal/SelectedCompany";
import Translator from "../Translator";

type HeaderProps = {
  isOpen: boolean;
  handleToggle: () => void;
};

const Header = ({ isOpen, handleToggle }: HeaderProps) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={64}
      width="100%"
      borderBottom="1px solid"
      borderColor="rgb(255 255 255 / 0.1)"
      paddingInline={2}
    >
      <Box display="flex" alignItems="center" gap={3}>
        <BurgerMenu isOpen={isOpen} onClick={handleToggle} size={30} />
        <SelectedCompany />
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Translator />
        <AuthUser />
      </Box>
    </Box>
  );
};

export default Header;
