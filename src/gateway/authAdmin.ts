import { NextFunction, Request, Response } from "express";


export const authAdmin = (req:Request, res:Response, next: NextFunction) =>{

    if(req.body.variables.operation==='read'){
        next()
    }
    if(req.body.variables.operation==='write'){
        res.send('you have no persission to write')
    }
    if(req.body.variables.operation==='update'){
        next()
    }
    if(req.body.variables.operation==='delete'){
        res.send('you have no persission to delete')
    }
}

