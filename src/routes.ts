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
import * as HandlerPR from './extensions/ittyni_patient_api'
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
     * routes to cabinets
     ********************************/
    $.all('/cabinets', HandlerCabinet.Cabinet);
    // cabinet order
    $.all('/cabinets/order', HandlerORDERS.LabOrders);

    /********************************
     * Account Manager Api v0.1
     ********************************/
    $.all('/account', HandlerAM.AccountManger);

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

    /********************************
     * NGAP Manager Api v0.1
     ********************************/
    $.all('/ccam', HandlerCCAM.CCAMManger);

    /********************************
     * NGAP Manager Api v0.1
     ********************************/
    $.all('/icd', HandlerICD.ICDManger);
    
    /********************************
     * COMPONENT Manager Api v0.1
     ********************************/
    $.all('/component', HandlerComponent.ComponentManger);

    /********************************
     * DEPARTMENT Manager Api v0.1
     ********************************/
    $.all('/department', HandlerDepartment.DepartmentManger);

    /********************************
     * NGAP Manager Api v0.1
     ********************************/
    $.all('/queuing', HandlerQU.QueuingManger);

    /********************************
     * Area Manager Api v0.1
     ********************************/
    $.all('/area', HandlerArea.AreaManger);
    
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