import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import User from '../user-medical-api/src/controllers/User';

interface USER {
    userId : string
    email  : string
    account? : any
    role? : any[]
    permissions? : any[]
}

interface Req extends Request {
    user? : USER
    hasAuthorization? : (user : USER) => boolean
    message ?: string
}

const checkAutorization = (user : USER, module? : string) : boolean=> {

    let hasAuth : boolean = false;
    /**
     * canRead : true ; level 1
     * canCreate : true; level 11
     * canUpdate : true; level 111
     * canDelete : true; level 1111
     * canPublish : true; level 11111
     */
    const level : number = 0;
    if(user === undefined || user.role === null || user.role === undefined || user.role.length <= 0) return hasAuth = false;
    if(!module) {

        if(user.role[0].name === "supadmin") hasAuth = true;
        return hasAuth = false;

    } else {        
        if(user.role[0].name === "supadmin" || user.role[0].name === "director" ) hasAuth = true;
    }



    return hasAuth
}

export const Auth = async (req : Req, res : Response, next : NextFunction) => {
    // instantiate user class
    const user= new User();

    // extract auth
    const {authorization} = req.headers;

    if(authorization){
        const token = authorization.split(' ')[1]

        try {

            const { userId }: any = jwt.verify(token, 'mysuperTokenlogin');

            const userData = await user.findUserById(userId);

            req.user = {
                userId : userData.id,
                email : userData.email,
                account : userData.account || undefined,
                role : userData.role || undefined,
                permissions : userData.permissions || undefined
            };

            req.message = undefined;

            

        } catch(e) {
            req.message = "token_expired"
        }
        

    } else {
        req.message = 'no_token_founded'
    }
    req.hasAuthorization = checkAutorization
 // continue
    next()
}

interface Permissions {
    canRead : boolean
    canCreate : boolean
    canUpdate : boolean
    canDelete : boolean
    canPublish : boolean
}
const calculateLevel = ({canRead, canCreate, canUpdate, canDelete, canPublish} : Permissions) : number => {

    let levelCalculated : number = 0;

    if(canRead){

    } else {

    }


    return levelCalculated
}