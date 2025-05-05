import { Roles } from "./auth.types";

const RolesToNamesMapper = {
  [Roles.ADMIN]: "Admin",
  [Roles.USER]: "User",
};

export { RolesToNamesMapper };
