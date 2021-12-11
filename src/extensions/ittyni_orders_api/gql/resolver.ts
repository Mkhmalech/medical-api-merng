import * as order from '../controller/orders'

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

}