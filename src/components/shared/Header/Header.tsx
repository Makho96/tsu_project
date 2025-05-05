import { Box } from "@mui/material";
import AuthUser from "../AuthUser";
import BurgerMenu from "../BurgerMenu";

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
      <Box>
        <BurgerMenu isOpen={isOpen} onClick={handleToggle} size={30} />
      </Box>
      <Box>
        <AuthUser />
      </Box>
    </Box>
  );
};

export default Header;
