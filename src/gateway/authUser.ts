import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../extensions/ittyni_user_api/src/controllers/User';
import { LABO } from "../extensions/ittyni_labm_api/module/labo";
import { CABINET } from "../extensions/ittyni_cabinet_api/src/module/cabinets";
import { Supadmin } from "./supadmin";
import { Db } from "./db";
import { USER } from "../extensions/ittyni_user_api/index";
import http from 'http'
import { COMPONENTS } from "../extensions/ittyni_module_api/src/module/component";

interface USER {
    _id: string
    email: string
    username: string
    picture: string
    firstName: string
    lastName: string
    accountId?: any
    role?: any
    enabledAt?: string
    enabledBy?: string
    status?: string
    permissions?: any[]
    supadmin?: any
    newToken?: string
    accounts?: any[]
    ua: string | undefined
}
interface Req extends Request {
    user?: USER
    account?: {
        _id: string
        type: string | boolean
    },
    component?: any,
    machine?: any
    hasAuthorization?: (user: USER) => boolean
    message?: string
    roles?: any[]
    permissions?: any
    accountName?: string
}

export const authUser = async (req: Req, res: Response, next: NextFunction) => {

    // instantiate user class
    const User = new Db(USER);

    let connectedUser;

    let connectedAccount;

    let permissions;

    /************************************************************
     * extract information about user account and the services **
     ************************************************************/
    const { authorization, account, accounttype, machinetoken } = req.headers;

    const userAgent = req.headers['user-agent'];

    const accountId = typeof account === 'string' && account.split(' ')[1];

    const accountType = typeof accounttype === 'string' && accounttype.split(' ')[1];

    // queuing system machine identification
    const machineToken = typeof machinetoken === 'string' && machinetoken.split(' ')[1];
    /*****************************************
     * information about user connected ******
     *****************************************/
    const token = authorization && authorization.split(' ')[1];
    if (token) {

        try {

            const { _id }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

            // token expired
            if (!_id) req.message = 'TOKEN_EXPIRED'

            else {

                connectedUser = await User.getDocById(_id);

                req.user = {

                    _id: connectedUser._id,
                    email: connectedUser.email,
                    username: connectedUser.email.split('@')[0],
                    firstName: connectedUser.firstName,
                    lastName: connectedUser.lastName,
                    picture: connectedUser.picture,
                    accounts: connectedUser.accounts,
                    role: connectedUser.role,
                    // status: userData.status || undefined,
                    supadmin: Supadmin,
                    // enabledAt: employer.createdAt || undefined,
                    // enabledBy: employer.addedBy || undefined,
                    // permissions: employerRole.permissions || undefined
                    // componentDb: employerRole.permissions || undefined
                    // componentName: employerRole.permissions || undefined
                    // accountDb: employerRole.permissions || undefined
                    ua: userAgent
                }

            }

        } catch {

            req.message = 'TOKEN_EXPIRED'
        }

    } else {
        req.message = 'NO_TOKEN_FOUNDED'
    }

    /*****************************************
     * information about service       *******
     *****************************************/
    const componentName = req.baseUrl.split('/')[1];
    const component = await COMPONENTS.findOne({ 'name': componentName });

    if (accountId) {
        console.log(accountId)
    } else {
        permissions =
            component
            && connectedUser
            && connectedUser.permissions
            && connectedUser.permissions.find((p: any) => p.component.toString() === component._id.toString());
        if (permissions) {
            req.permissions = permissions;
        }
    }


    //----->end of component infos
    try {
        if (machineToken) {

            const machine = jwt.verify(machineToken, 'iTTyniTokenApplicationByKHM@MEDv1.1');

            if (!machine) req.machine = { error: "TOKEN_NOT_VALID" }

            else {
                req.machine = machine;
            }
        }
    } catch (error) {
        req.machine = { error }
    }



    next()
}