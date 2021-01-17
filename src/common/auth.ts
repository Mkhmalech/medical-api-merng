import {Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
import User from '../user-medical-api/src/controllers/User';
import { LABO } from "../health-provider/lab-medical-api/src/labos/module/labo";
import { CABINET } from "../health-provider/cabinet-medical-api/src/module/cabinets";

interface USER {
    userId : string
    email  : string
    accountId? : any
    role? : any
    enabledAt? : string
    enabledBy? : string
    status? : string
    permissions? : any[]
}
interface Req extends Request {
    user? : USER
    hasAuthorization? : (user : USER) => boolean
    message ?: string
    roles ? : any[]
    permissions? :  {
        role : string
        permissions : any[]
    }
    accountName? : string
}

const checkAutorization = (user : USER, module? : string) : boolean=> {

    let hasAuth : boolean = false;

    // if no role return no_auth
    if(user === undefined || user.role === null || user.role === undefined ) return hasAuth = false;


    /**
     * @1 step - verify in @userDb ittyni role if isAdmin give authorization noLimit
     */
     // if the user is a supadmin return has_auth
        if(user.role === "supadmin") return hasAuth = true;
     /* @2 step - verify in @userDb at @account role if @isDirector give account authorization no limit
     */
    // if user is the account holder
        if(user.role === "client") return hasAuth = true;
     /* if not get @role and @module and check activated authorization from @accountDb at @setting @permissions
     * 
     * @ step - verify @accountDb at @staff if exist redirect to profile module to activate account in @userDb
     * 
     */
    const level : number = 0;

    // if no role return no_auth
    if(user === undefined || user.role === null || user.role === undefined ) return hasAuth = false;

    

    // if user is the account holder
    if(user.role === "director") return hasAuth = true;

    /**********************************
     * don t modify this part untill 
     * modify function of modules 
     * ********************************/
    if(!module) {

        if(user.role === "supadmin") return hasAuth = true;

    } else {     
        const componentName : string = user.permissions 
            && user.permissions.find((d:any) => d.componentName == module);
        console.log(componentName)
    }
    /******************************************************************************************************/
    
    return hasAuth
}

export const Auth = async (req : Req, res : Response, next : NextFunction) => {
    // instantiate user class
    const user= new User();

    // extract auth
    const {authorization, account } = req.headers;

    // get account name
    const accountId = typeof account === 'string' && account.split(' ')[1];
    
    // get account modules permissions
    const accountData = (accountId && accountId!=='null' && accountId!=='ittyni' && await LABO.findById(accountId))
    const cabinetData = (accountId && accountId!=='null' && accountId!=='ittyni' && await CABINET.findById(accountId))
    
    if(authorization){
        const token = authorization.split(' ')[1];
        let employer : any;
        let employerRole : any;
        let role : any;

        try {
            const { userId }: any = jwt.verify(token, 'mysuperTokenlogin');

            // token expired when user still work
            if(!userId) return new Error('TOKEN_EXPIRED')

            if(accountData) {
                employer = accountData.staff.find((d:any) =>d._id == `${userId}`);
                employerRole = employer && accountData.setting.team.find((c:any)=> c._id == `${employer.role}`);
            }

            if(!employer){

                try{
                    const userData = await user.findUserById(userId) || undefined;
                    
                    req.user = {
                        userId : userData.id || employer._id,
                        email : userData.email || employer.firstName,
                        accountId : (accountData && accountData._id) || (cabinetData && cabinetData._id) || undefined,
                        role : userData.role.name || undefined,
                        status : userData.status || undefined,
                    };
                    if(userData.role.name === 'employer'){    
                        role = await LABO.findById(accountId).select('setting').then((t:any)=>{
                            return t.setting.team.find((c:any)=> c.role == userData.accounts[0].role);
                        });                  
                        req.user.permissions = role.permissions || undefined
                    } else {
                        req.user.permissions = (accountData && accountData.extensions) 
                            || (cabinetData && cabinetData.extensions) || undefined
                    }
                } catch {

                    return req.message = "no_user_founded";
                }
                
            } else {
                req.user = {
                    userId :  employer._id,
                    email :  employer.firstName,
                    accountId : (accountData && accountData._id) || undefined,
                    role :  employerRole.role || undefined,
                    enabledAt :  employer.createdAt || undefined,
                    enabledBy :  employer.addedBy || undefined,
                    status :  'not_user',
                    permissions : employerRole.permissions || undefined
                };
            }

            req.message = "user_success";

        } catch(e) {
            req.message = "token_expired"
        }  
        
    } else {
        req.message = 'no_token_founded'
    }
    // get verification function
    req.hasAuthorization = checkAutorization

    // catch account name
    req.accountName = `${accountData && accountData.account.name}`
    
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