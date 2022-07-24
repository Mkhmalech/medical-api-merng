import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import User from '../extensions/ittyni_user_api/src/controllers/User';
import { LABO } from "../extensions/ittyni_labm_api/module/labo";
import { CABINET } from "../extensions/ittyni_cabinet_api/src/module/cabinets";
import { Supadmin } from "./supadmin";
import { Db } from "./db";
import { USER } from "../extensions/ittyni_user_api/index";
import http from 'http'

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
    permissions?: {
        role: string
        permissions: any[]
    }
    accountName?: string
}

export const authUser = async (req: Req, res: Response, next: NextFunction) => {

    // instantiate user class
    const User = new Db(USER);

    // extract auth
    const { authorization, account, accounttype, component, machinetoken } = req.headers;

    const userAgent = req.headers['user-agent'];

    // get account name
    const accountId = typeof account === 'string' && account.split(' ')[1];
    const accountType = typeof accounttype === 'string' && accounttype.split(' ')[1];
    const componentId = typeof component === 'string' && component.split(' ')[1];
    // queuing system machine identification
    const machineToken = typeof machinetoken === 'string' && machinetoken.split(' ')[1];

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

    // get component data to serialize
    if (componentId) {
        req.component = {
            _id: componentId
        }
    }
    // get account data to serialize
    if (accountId) {
        req.account = {
            _id: accountId,
            type: accountType && accountType,
        }
    }
    // get user data to serialze 
    if (authorization) {

        const token = authorization.split(' ')[1];

        try {

            const { _id }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

            // token expired
            if (!_id) req.message = 'TOKEN_EXPIRED'

            else {

                const connectedUser = await User.getDocById(_id);

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

    // continue
    next()
}