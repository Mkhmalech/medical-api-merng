import User from "./User";
import { LABO } from '../../../lab-manager/src/labos/module/labo';
import { USER } from '../module/users';
class Account extends User {
  constructor() {
    super();
  }

  /**
   * link account to user
   */
  linkAccountToUser = (args: any, req: any) => {
    // get who want to link
    const { user, message, hasAuthorization } = req,
      { id, accountName } = args.iLinkAccount;
    if (!message) {
      // has_authorization
      if (hasAuthorization(user)) {
        // get account name or id
        try{
            this.getAccountId(accountName, (r: string)=>{

                USER.findById(id, (e:any, res:any)=>{
                    if(e) throw new Error(e)
                    if(!res) throw new Error("user_not_found")
                    res.accounts.push({
                        id : r,
                        enabledAt : new Date().toString()
                    })

                    res.save();

                    return "success"
                })

            })
        } catch {
            return "not_saved"
        }
        // user id

        // link account to user by authorized user

        // return success

        // or return error
      } else {
        return "not_allowed";
      }
    } else {
      return message;
    }
  };

  // Get accountID
  getAccountId = async (name : string, cb:(r:string)=>void) =>(
      await LABO.findOne({"account.name" : name},(e:any,r:any)=>{
        if(e) throw new Error(e);
        if(!r) throw new Error("not_found")
        cb(r._id)
    }))
}

export default new Account();
