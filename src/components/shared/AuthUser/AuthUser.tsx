import { Avatar, Box, Typography } from "@mui/material";
import { RolesToNamesMapper } from "../../../store/auth/auth.consts";
import { useAppSelector } from "../../../store/hooks/useTypedSelector";

const AuthUser = () => {
  const user = useAppSelector((state) => state.auth.user!);

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box>
        {user.profilePicture ? (
          <Avatar
            src={user.profilePicture}
            alt={user.username}
            sx={{ width: 32, height: 32 }}
          />
        ) : (
          <Avatar sx={{ width: 32, height: 32 }}>
            {user.username[0].toUpperCase()}
          </Avatar>
        )}
      </Box>
      <Box>
        <Typography variant="body1" fontWeight={600}>
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {RolesToNamesMapper[user.role]}
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthUser;
