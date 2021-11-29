import { ObjectId } from "mongoose";

export const Supadmin = (user:{
    role :{ name : string, status : string}
    _id : ObjectId
}, cb: (_id:ObjectId)=>any) => {

    const Error_Msg_Not_Supadmin = "User_Not_Authorized_To_make_this_change"

    if(user.role.name === 'supadmin'){
       return cb(user._id)
    } 
    else 
        return Error(Error_Msg_Not_Supadmin);
}
export const Manger = (user:{
    role :{ name : string, status : string}
    _id : ObjectId
}, cb: (_id:ObjectId)=>any) => {

    const Error_Msg_Not_Supadmin = "User_Not_Authorized_To_make_this_change"

    if(user.role.name === 'manager'){
       return cb(user._id)
    } 
    else 
        return Error(Error_Msg_Not_Supadmin);
}


// export class CUser extends Db {

//     private user: any;

//     private Error_Msg_Not_Supadmin = "User_Not_Authorized_To_make_this_change"

//     constructor(db: any, user: any) {
//         super(db);
//         this.user = user;
//     }

//     // check user
    // check = (role: any) => (this.user.role === role) ? true : false;

//     // supadmin functions
//     supadmin = () => {

//         let supFunc: any = {
//             checked: () : boolean => this.check('supadmin'),
//             notAllowed : () : Error => Error(this.Error_Msg_Not_Supadmin)
//         }


//         if (this.check('supadmn'))
//             supFunc = {
//                 ...supFunc,
//                 supadminFun1: () => console.log('i m funct 1')
//             };
        
//         return supFunc;

//     }
// }