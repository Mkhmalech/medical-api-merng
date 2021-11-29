import User from "../controllers/User";
import Account from "../controllers/account";

const user = new User();

interface myUser {
  email: string;
  password: string;
}
interface userInput extends myUser { }

interface args {
  userInput: userInput;
}

export const userResolver = {
  // users: user.findAllUsers,

  userProfile: user.getUserProfile,
  verifyToken: user.verifyToken,
  verifyFrontToken: user.verifyFrontToken,
  roleAndPermissions: {
    addRoleToUser: user.addRoleToUser,
    updateRoleOfUser: user.updateRoleOfUser,
    addPermissionsToUser: user.addPermissionsToUser,
    updatePermissionsOfUser: user.updatePermissionsOfUser,
  },
  account: {
    linkAccountToUser: Account.linkAccountToUser,
    activateModuleInAccount: user.activateModuleInAccount,
  },

  listAll: user.findAllUsers,
  listAllWithRole: user.findAllUsers,
  getUserDetails: user.findUserDetailById,
  login: user.applyToAuthentify,
  createNewUser: user.applyForSignup,
  addNewUser: user.addNewUser,
  upgradeToUser: user.upgradeToUser,
  linkUserToAccount: user.linkUserToAccount,
  signupWithGoogle: user.signupWithGoogle,

  // roles and permissions 
  addPermissions : user.addPermissions,

};
