/**
 * Roles Class
 *
 * For hole app
 * ------------
 * (admins) : is a programmers that has access to a hole source code
 *      SupAdmin : can_see_all , add_any, update_all , delete_all, no_barriers
 *      Admin : can_see_all , add_any, update_all , delete_all, can_not_delete_physicaly
 *      UnderAdmin : can_see_all , add_any, update_all , can_not_delete
 *
 * (managers) : is a pulishers and a holders of accounts
 *      directors : can_see_all_account_components, update, delete, and change_account_manager
 *      mahanger  : can_see_all_account_components, update, delete add roles to staff
 */

/**
 * there is two roles admin or director
 * admin : can controll the app
 * director : can controll only account
 */
type roles = "admin" | "director";

/**
 * permission that we can supAdmin or
 * supDirector assign them to staff
 */
interface Permissions {
  canRead?: boolean;
  canCreate?: boolean;
  canPublish?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}

type RoleStaus = roles;

interface RolesAndPermissions {
  roleName?: RoleStaus;
  permissions?: Permissions;
}
export class Roles {
  private role: RolesAndPermissions = {};

  constructor() {}

  /**
   * get role
   */
  getRole = (): string => "admin";

  /**
   * assign role to user
   */
  assignRole = () => {};

  /**
   * remove role from user
   */
  updateRoleOfUser = () => {};

  /**
   * remove role from user
   */
  removeRoleFromGroup = () => {};

  /**
   * verify if is admin
   */
  isAdmin = (): boolean => false;

  /**
   * verify if is a director
   */
  isDirector = (): boolean => false;

  /**
   * get permissions
   */
  getPermissions = () => {};

  /**
   * assign permission
   */
  addPermissionsToUser = () => {};

  /**
   * assign permission
   */
  addPermissionsToGroup = () => {};

  /**
   * remove permission
   */
  removePermissionsfromUser = () => {};

  /**
   * remove permission
   */
  removePermissionsfromGroup = () => {};

  /**
   * has permission
   */
  hasPermission = () => {};

}
