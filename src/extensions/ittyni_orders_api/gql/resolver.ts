import * as order from '../controller/ordersController'

export const OrdersResolver = {
    // insert new referred order 
    insertOrder: order.insertOrder,
    // insert new referred order from cabinet
    insertCabinetOrder: order.insertCabinetOrder,
    // get all referred orders out from labo
    fetchReferredOrdersIn: order.fetchReferredOrdersIn,
    // get all referred orders in from labo
    fetchReferredOrdersOut: order.fetchReferredOrdersOut,
    // get order detail
    referredOrdersDetails: order.referredOrdersDetails,
    // get order detail
    referredOrdersChangeStatus: order.referredOrdersChangeStatus,

    OrderMedicine: {
        write_MedicineOrder: order.write_MedicineOrder        
    },

    OrderLabmProceduresQuery: {
        read_referral_labm_orders_out: order.read_referral_labm_orders_out,
        read_referral_labm_orders_in: order.read_referral_labm_orders_in,
        read_referral_labm_order_details: order.read_referral_labm_order_details,
    },

    OrderLabmProceduresMut: {
        write_referral_labm_order: order.write_referral_labm_order,
        
    }
}