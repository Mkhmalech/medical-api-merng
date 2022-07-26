import { NextFunction, Request, Response } from "express";

export const AuthAccount = (req: Request, res: Response, next: NextFunction) =>{

    console.log("this account body", req.body)


    next();
}