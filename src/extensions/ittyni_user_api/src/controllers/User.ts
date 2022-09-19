import { USER } from "../module/users";
import { LABO } from "../../../ittyni_labm_api/module/labo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Db } from "../../../../gateway/db";
import { Roles } from "./roles";
import { CABINET } from "../../../ittyni_cabinet_api/src/module/cabinets";
import * as CUser from "../../../../gateway/supadmin";
import { componentResolver } from "../../../ittyni_module_api/src/gql/resolver";


class User extends Roles {
  /**
   * we instanciate database class with mongoose
   * user model to make all our operations only
   * in this model
   */
  private user = new Db(USER);

  //Protected methods

  /**
   *
   * @param id
   * @returns { object }
   */
  // protected findUserById = (id : string) => this.user.getOneField("id", id);

  /**
   *
   * @param { email }
   * @returns { object }
   */
  protected findUserByEmail = (email: string, cb: (r: any) => any) =>
    this.user.getOneField("email", email, cb);

  /**
   * find user by id
   */
  findUserById = async (id: string) => {
    const user = await USER.findById(id);

    if (!user) throw new Error("User Not Found");

    return user;
  };

  //Login Methods
  applyToAuthentify = async (args: any, req: any) => {
    const user = await USER.findOne({ email: args.userInput.email });
    // if no user in user db 
    if (!user) {

      return Error("USER_NOT_FOUNDED");
    }
    else {
      const isEqual = await bcrypt.compare(args.userInput.password, user.password);
      // @@Todo console.log(isEqual)
      // console.log(user.password)
      if (!isEqual) throw new Error("PASSWORD_DOES_NOT_MATCH!");

      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          createdAt: new Date().toUTCString()
        },
        "iTTyniTokenApplicationByKHM@MEDv1.1",
        {
          expiresIn: "8h",
        }
      );
      return {
        _id: user.id,
        token: token,
        email: user.email,
        username: user.email.split("@")[0]
      };
    }
  };

  applyForSignup = ({ userInput }: any) =>
    USER.findOne({ email: userInput.email })
      .then((user) => {
        if (user) throw new Error("user already exists !!!");
        if (userInput.password !== userInput.ConfirmPassword)
          throw new Error("password doesn't mtach");
        return bcrypt.hash(userInput.password, 12);
      })
      .then(async (hashPassword) => {

        const User = new USER({
          email: userInput.email,
          password: hashPassword,

          createdAt: new Date(),
        });

        const newUser = await User.save();

        return newUser;

      })
      .then((newUser: any) => ({
        token: jwt.sign(
          { userId: newUser._id, email: newUser.email },
          "mysuperTokenlogin",
          {
            expiresIn: "1h",
          }
        ),
        tokenExpired: 1,
      }))
      .catch((err: any) => {
        throw err;
      });
  upgradeToUser = ({ userInput }: any, { user }: any) =>
    USER.findOne({ email: userInput.email })
      .then((user) => {
        if (user) throw new Error("user already exists !!!");
        if (userInput.password !== userInput.ConfirmPassword)
          throw new Error("password doesn't mtach");
        return bcrypt.hash(userInput.password, 12);
      })
      .then(async (hashPassword) => {


        const User = new USER({
          email: userInput.email,
          password: hashPassword,

          createdAt: new Date().toISOString(),
          status: "active",
          role: {
            name: "employer",
            createdAt: new Date().toISOString(),
          }
        });
        let account = {
          accountId: user.accountId,
          enabledAt: user.enabledAt,
          enabledBy: user.enabledBy,
          role: user.role,
          status: "active",
          staffId: user._id
        }

        User.accounts.push(account);

        const newUser = await User.save();

        return newUser;

      })
      .then((newUser: any) => ({
        token: jwt.sign(
          { userId: newUser._id, email: newUser.email },
          "mysuperTokenlogin",
          {
            expiresIn: "1h",
          }
        ),
        tokenExpired: 1,
      }))
      .catch((err: string) => {
        throw new Error(err);
      });

  addNewUser = (args: any, { user }: any) => {
    USER.findOne({ email: args.email })
      .then(async (user) => {
        if (user) throw new Error("user already exists !!!");
        const User = new USER({
          email: args.email,
          password: await bcrypt.hash(args.password, 12),

          createdAt: new Date().toISOString(),
          addedby: args.addedby,
          status: args.status,
          role: {
            name: args.role,
            addedby: args.addedby,
            createdAt: new Date().toISOString(),
          }
        });

        const newUser = await User.save();

        return newUser;

      })
      .then((newUser) => { if (newUser) return "user_added_successfully" })
      .catch((err: any) => {
        throw err;
      });
  }

  // link user to account
  linkUserToAccount = ({ userId, accountType, accountId }: any, { user }: any) => {

    return user.supadmin(user, (_id: any) => {
      const updateUser = new Db(USER);
      updateUser.getDocByIdAndPushSubDoc(userId, {
        accounts: {
          [accountType]: accountId,
          enabledBy: _id,
          role: {
            name: 'manager',
            status: 'active'
          }
        }
      })
    })
  };
  // add permissions to user
  addPermissions = async (args: any, { user }: any) => {
    const r = await user.supadmin(user, (_id: any) => {
      const updateComp = new Db(USER);
      updateComp.updateSubDocs({'_id' : args.userId}, { arrayFilters :[{ 'i.lab': args.accountId }], new: true},
        {
          "accounts.$[i].permissions": {
            component: args.componentId,
            canRead: true,
            canCreate: true,
            canUpdate: true,
            canDelete: true,
            canPublish: true,
            addedBy: _id
          }
        }
      )

    })

    return r? "SAVED_SUCCESSFULLY" : "NOT_SAVED"
  }
  /**
   * 
   * @param id 
   */
  activateModuleInAccount = async (args: any, { user }: any) => {
    // activate modules
    const labo = await LABO.findById(args.accountId).then(account => {
      if (account) {
        const exts = args.extensions.map((ext: any) => {
          account.extensions.push({
            component: args._id,
            activatedBy: user._id,
            plan: "free"
          })
        })

        return account.save((e: any) => new Error(e));
      }
    })
      .then((r: any) => {
        if (r) return "account_extensions_added_successfully"
      })
      .catch(e => new Error(e));

    const cabinet = await CABINET.findById(args.accountId).then(account => {
      if (account) {
        const exts = args.extensions.map((ext: any) => {
          account.extensions.push({
            componentName: ext,
            create: true,
            read: true,
            update: true,
            delete: true
          })
        })

        return account.save((e: any) => new Error(e));
      }
    })
      .catch(e => new Error(e));;

    return ("account_extensions_added_successfully")

  }

  getUserRole = async (id: string) => {
    const user = await USER.findById(id);

    if (!user) throw new Error("User Not Found");

    const role = user.email;

    return role;
  };

  verifyAuthById = async (userId: string) => {
    // const res = await this.findUserById(userId);
    // if(!res) throw new Error("User not found");
    // console.log(res)
  };

  getUserProfile = async ({ token }: any) => {
    let decodeToken: DecodeToken | any = jwt.decode(token);

    if (decodeToken) {
      const { email } = decodeToken;

      const profile = await this.findUserByEmail(email, (r) => r);

      if (profile) {
        return {
          _id: profile._id,
          email: profile.email,
          password: profile.password,
        };
      } else {
        throw new Error("there is no profile match this user");
      }
    } else {
      throw new Error("token not valid");
    }
  };

  findAllUsers = () => {
    return USER.find().then((users: any[]) => {
      return users.map((user: any) => {
        return {
          ...user._doc,
          id: user._doc._id.toString()
        };

      });
    });
  };

  findUserDetailById = (args: any) => {
    return USER.findOne({ "_id": args.id }).then((user: any) => {
      if (user) {
        return {
          ...user._doc,
          id: user._doc._id.toString(),
        };
      }
    });
  };

  verifyToken = async (args: any, req: any) => {
    if (req.user) {
      return req.user;
    } else {
      return Error(req.message)
    }
  };

  /**
   * add role to user
   * for system mangement
   */
  addRoleToUser = async (args: any, req: any) => {

    const { inputRole } = args, { user, message, hasAuthorization } = req;

    if (hasAuthorization(user)) {

      const User = await USER.findById(inputRole.id, (e: any, r: any) => {

        if (e) throw new Error(e);

        if (r) {

          r.role = { ...inputRole, addedBy: user._id, createdAt: new Date().toString() };

          r.save((e: any) => { if (e) throw new Error(e) });

        } else {
          return "no_user_founded"
        }

      });
    } else {

      return "not_allowed"
    }


    if (User) { return "success" } else { return "not_saved" }
  };

  /**
   * update role of an user
   * system management
   */
  updatePermissionsOfUser = () => { };

  /**
   * Signup with google
   */
  signupWithGoogle = async ({ email, fname, lname, picture }: any) => {
    const res = await USER.findOne({ email: email })
      .then(async (user) => {
        if (user) {
          if (!user.picture) {
            user.picture = picture;
            user.firstName = fname;
            user.lastName = lname;
            user.signedbygg = true;
            user.role.name = user.role.name ? user.role.name : 'user';
            const updateUser = await user.save();
            return updateUser;
          }
          else {
            user.sessions.push({
              at: new Date().toLocaleString()
            })
            const saved = await user.save();
            if (saved)
              return user;
            else Error("session_not_saved");
          }
        }
        else {
          const User = new USER({
            email: email,
            picture: picture,
            password: Math.floor(Math.random() * 10000000000),
            firstName: fname,
            lastName: lname,
            signedbygg: true,
            role: { name: 'client' },
            createdAt: new Date(),
          });

          const newUser = await User.save();

          return newUser;
        }
      })
      .then((newUser: any) => ({
        ...newUser,
        token: jwt.sign({ _id: newUser._id, email: newUser.email, createdAt: new Date().toUTCString() },
          "iTTyniTokenApplicationByKHM@MEDv1.1", { expiresIn: "8h" }),
        tokenExpired: 8,
        createdAt: new Date()
      }))
      .catch((err: any) => {
        throw err;
      });
    return res;
  }

  /**
   * ittyni front token verification
   */
  verifyFrontToken = (args: any, {user, message}:any) => {
    if(message) return Error(message)
    
    return user;
  }
  /**
   * ittyni front token verification
   */
  subscribedAccounts = async (args: any, {user, message}:any) => {
    if(message) return Error(message)
    const res = await new Db(USER).getSubDocWithPop(user._id, "accounts", "accounts.labo")

    return res.map((r:any)=>({name : r.labo.account.name}))
  }

  /**
   * load component of the user
   * to be displayed in the 
   * sidebar
   */
   readUserExtensions = async (args: any, {user, message}: any) =>{
    // if(message) return Error(message);
    const cp = await USER.findOne({_id: user._id})
      .populate('permissions.component')
      .select('permissions.component')

    if(cp&&cp.permissions.length>0){
      return cp.permissions.map(
        (p:any)=>(
          { 
            name: p.component.name, 
            _id: p.component._id
          }))
    }
    else return []
   }
}

export const userFunc = new User();

export default User;
