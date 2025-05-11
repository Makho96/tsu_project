import { Roles } from "./auth.types";

const RolesToNamesMapper = {
  [Roles.SUPERADMIN]: "Super Admin",
  [Roles.ADMIN]: "Admin",
  [Roles.EDITOR]: "Editor",
  [Roles.VIEWER]: "Viewer",
};

export { RolesToNamesMapper };
