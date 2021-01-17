import express from "express";
import * as HandlerUser from './user-medical-api/index'
import * as HandlerLab from './health-provider/lab-medical-api/index'
import * as HandlerCabinet from './health-provider/cabinet-medical-api'
// import extensions handler
import * as HandlerPHARMA from './health-provider/pharmacy-medical-api'

// import extensions handler
import * as HandlerMedicine from './extensions/medicine_manager'
// import extensions handler
import * as HandlerAM from './extensions/account_manager'
// import extensions handler
import * as HandlerPR from './extensions/patient_record'
// import extensions handler
import * as HandlerNGAP from './extensions/ngap_manager'


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
    $.all('/cabinets', HandlerCabinet.Cabinet);
    // cabinet order
    $.all('/cabinets/order', HandlerLab.LabOrders);

    /********************************
     * Account Manager Api v0.1
     ********************************/
    $.all('/accountmanager', HandlerAM.AccountManger);

    /********************************
     * Account Manager Api v0.1
     ********************************/
    $.all('/patient', HandlerPR.Patient);

    /********************************
     * Medicine Manager Api v0.1
     ********************************/
    $.all('/medicine', HandlerMedicine.Medicine);
    
    /********************************
     * Pharma Manager Api v0.1
     ********************************/
    $.all('/pharma', HandlerPHARMA.PharmaManger);
    /********************************
     * NGAP Manager Api v0.1
     ********************************/
    $.all('/ngap', HandlerNGAP.NGAPManger);
    
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