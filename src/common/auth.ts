import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import User from '../user-medical-api/src/controllers/User';

interface USER {
    userId : string
    email  : string
    account? : any
    role? : string
    permissions? : object
}

interface Req extends Request {
    user? : USER
    hasAuthorization? : (user : USER) => boolean
}

const checkAutorization = (user : USER, module? : string) : boolean=> {

    const hasAuth : boolean = false;

    /**
     * canRead : true ; level 1
     * canCreate : true; level 11
     * canUpdate : true; level 111
     * canDelete : true; level 1111
     * canPublish : true; level 11111
     */
    const level : number = 0;

    if(!module) {

        

    } else {
        
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

            req.hasAuthorization = checkAutorization

        } catch {
            res.send('token_expired')
        }
        

    } else {
        res.send('not_allowed')
    }

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