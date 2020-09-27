import express from "express";
import * as HandlerUser from './user-medical-api/index'
import * as HandlerLab from './lab-medical-api/index'
import path from 'path'
import {readFileSync} from 'fs'


interface expressExchange {
    req : express.Request
    res : express.Response
    next : express.NextFunction
}

const routes = ($: express.Router) => {

    $.get("/api", (
        req : express.Request,
        res : express.Response,
        next : express.NextFunction)=>
    {
        res.send("Hello From Server")
    });

    $.all('/api/tests', HandlerLab.LabTests)

    $.all('/api/users', HandlerUser.User);

    $.all('/api/labos', HandlerLab.Labo);

    // $.all('/search', HandlerSearch.Search)

    $.all('/api/labos/staff', HandlerLab.Staff);


    // lab appointement module
    $.all('/api/labos/appointement', HandlerLab.LabAppointement);

    $.get('/medicalapi.jpg',(
        req : express.Request,
        res : express.Response,
        next : express.NextFunction)=>
    {
        
    });
    

    return $;
}





export default routes;