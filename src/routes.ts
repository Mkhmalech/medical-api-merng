import express from "express";
import * as HandlerUser from './user-medical-api/index'
import * as HandlerLab from './lab-medical-api/index'
import * as HandlerCabinet from './cabinet-medical-api'

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

    $.all('/tests', HandlerLab.LabTests)

    $.all('/users', HandlerUser.User);

    $.all('/labos', HandlerLab.Labo);

    // $.all('/search', HandlerSearch.Search)

    $.all('/labos/staff', HandlerLab.Staff);

    // lab referrals module
    $.all('/labos/referral', HandlerLab.LabReferrals);

    // lab referrals module
    $.all('/labos/order', HandlerLab.LabOrders);
    
    // lab appointement module
    $.all('/labos/appointement', HandlerLab.LabAppointement);
    /********************************
     * routes to cabinets
     ********************************/
    $.all('/cabinets', HandlerCabinet.Cabinet)
    // ====================>cabinet end
    $.get('/medicalapi.jpg',(
        req : express.Request,
        res : express.Response,
        next : express.NextFunction)=>
    {
        
    });
    
    return $;
}





export default routes;