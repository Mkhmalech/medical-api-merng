import express from "express";
/**
 * @USER
 */
import * as HandlerUser from './extensions/ittyni_user_api/index'
/**
 * @LABM
 */
import * as HandlerLABM from './extensions/ittyni_labm_api/index'
/**
 * @NABM
 */
import * as HandlerTests from './extensions/ittyni_nabm_api/index'
/**
 * @STAFF
 */
import * as HandlerSTAFF from './extensions/ittyni_staff_api/index'
/**
 * @REFERRALS
 */
import * as HandlerREFERRAL from './extensions/ittyni_referrals_api/index'
/**
 * @ORDERS
 */
import * as HandlerORDERS from './extensions/ittyni_orders_api/index'
/**
 * @APPOINTMENTS
 */
import * as HandlerAPPOINT from './extensions/ittyni_appointement_api/index'
/**
 * @NABM
 */
import * as HandlerNABM from './extensions/ittyni_nabm_service/index'

import * as HandlerCabinet from './extensions/ittyni_cabinet_api'
// import extensions handler
import * as HandlerPHARMA from './extensions/ittyni_pharma_api'

// import extensions handler
import * as HandlerMedicine from './extensions/ittyni_medicine_api'
// import extensions handler
import * as HandlerAM from './extensions/ittyni_account_api'
// import extensions handler
import * as EHR from './extensions/ittyni_ehr_api'
// import extensions handler
import * as HandlerNGAP from './extensions/ittyni_ngap_api'
// import extensions handler
import * as HandlerCCAM from './extensions/ittyni_ccam_api'
// import extensions handler
import * as HandlerICD from './extensions/ittyni_icd_api'
// component
import * as HandlerComponent from './extensions/ittyni_module_api'
// component
import * as HandlerDepartment from './extensions/ittyni_department_service'
// component
import * as HandlerQU from './extensions/ittyni_queuing_api'
// component
import * as HandlerArea from './extensions/ittyni_areas_service'
// laboratory packs
import * as HandlerPacks from './extensions/ittyni_pack_service'
// Parapharmacy
import * as HandlerParaPharmacy from './extensions/ittyni_parapharmacy_api'
// Paramedical 
import * as HandlerParamedical from './extensions/ittyni_paramedical_api'
// import country dial code
import countryDialCode from './common/country_dials_code.json'

const routes = ($: express.Router) => {

    $.get("/api", (
        req : express.Request,
        res : express.Response,
        next : express.NextFunction)=>
    {
        res.send("Hello From Server")
    });

    $.all('/tests', HandlerTests.LabTests)
    /********************************
     * NABM SERVICE Api v0.1
     ********************************/
    $.all('/nabm', HandlerNABM.NABM)

    $.all('/users', HandlerUser.User);

    $.all('/labos', HandlerLABM.Labo);

    // $.all('/search', HandlerSearch.Search)

    $.all('/staff', HandlerSTAFF.Staff);

    // lab referrals module
    $.all('/referral', HandlerREFERRAL.LabReferrals);

    // lab referrals module
    $.all('/order', HandlerORDERS.LabOrders);
    
    // lab appointement module
    $.all('/appointement', HandlerAPPOINT.LabAppointement);
    /********************************
     * Cabinets Webserver Api v0.1
     ********************************/
    $.all('/cabinets', HandlerCabinet.Cabinet);
    $.all('/cabinets/order', HandlerORDERS.LabOrders);

    /********************************
     * Account Webserver Api v0.1
     ********************************/
    $.all('/account', HandlerAM.AccountManger);

    /********************************
     * Account Webserver Api v0.1
     ********************************/
    $.all('/ehr', EHR.EHRHandler);

    /********************************
     * Medicine Webserver Api v0.1
     ********************************/
    $.all('/medicine', HandlerMedicine.Medicine);
    
    /********************************
     * Pharma Webserver Api v0.1
     ********************************/
    $.all('/pharma', HandlerPHARMA.PharmaManger);

    /********************************
     * NGAP Webserver Api v0.1
     ********************************/
    $.all('/ngap', HandlerNGAP.NGAPManger);

    /********************************
     * NGAP Webserver Api v0.1
     ********************************/
    $.all('/ccam', HandlerCCAM.CCAMManger);

    /********************************
     * NGAP Webserver Api v0.1
     ********************************/
    $.all('/icd', HandlerICD.ICDManger);
    
    /********************************
     * COMPONENT Webserver Api v0.1
     ********************************/
    $.all('/component', HandlerComponent.ComponentManger);

    /********************************
     * DEPARTMENT Webserver Api v0.1
     ********************************/
    $.all('/department', HandlerDepartment.DepartmentManger);

    /********************************
     * NGAP Webserver Api v0.1
     ********************************/
    $.all('/queuing', HandlerQU.QueuingManger);

    /********************************
     * Area Webserver Api v0.1
     ********************************/
    $.all('/zipcode', HandlerArea.AreaManger);
    
    /********************************
     * Pack Webserver Api v0.1
     ********************************/
    $.all('/pack', HandlerPacks.PackManger);
    
    /********************************
     * Pack Webserver Api v0.1
     ********************************/
    $.all('/parapharmacy', HandlerParaPharmacy.ParapharmacyManger);
    
    /********************************
     * Pack Webserver Api v0.1
     ********************************/
    $.all('/paramedical', HandlerParamedical.ParamedicalManger);
    
    // ====================>cabinet end
    $.get('/medicalapi.jpg',(
        req : express.Request,
        res : express.Response,
        next : express.NextFunction) =>
    {
        
    });

    /**
     * country dial json
     */
    $.get('/country_dials_code.json',(
        req:express.Request, 
        res: express.Response, 
        next : express.NextFunction
    )=>{
        res.json(countryDialCode)
    })
      
    
    return $;
}





export default routes;