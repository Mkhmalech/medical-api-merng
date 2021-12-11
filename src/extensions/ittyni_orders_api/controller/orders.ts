import { PATIENT } from "../../ittyni_patient_api/src/module/patient";
import { PAYEMENT } from "../../ittyni_payement_api/src/module/payement";
import { CABINET } from "../../ittyni_cabinet_api/src/module/cabinets";
import { ORDER } from '../module/orders'

export const insertOrder = async ({ order, patient }: any, { user }: any) => {

    const Order = await ORDER.find({ OrderDate: new Date().toLocaleDateString() }).sort({ OrderTime: -1 });
    let convertDateToUCode = new Date().toLocaleDateString().split('/');
    let UOC: string = ''
    if (Order.length > 0) { UOC = Math.floor(Number(Order[0].OrderUniqueCode) + 1).toString(); }
    else { UOC = convertDateToUCode[2] + convertDateToUCode[0] + convertDateToUCode[1] + '00001'; }

    let newOrder = new ORDER({
        OrderUniqueCode: UOC,
        OrderType: "referral",
        OrderedBy: user._id,
        OrderDate: new Date().toLocaleDateString(),
        OrderTime: new Date().toLocaleTimeString(),
        OrderPriceTotal: order.OrderPriceTotal,
        panel: order.panel,
        patient: patient,
        laboratory: order.laboId,
        referredFrom: user.accountId || order.laboId
    })

    newOrder.OrderStatus.push({
        type: "created",
        createdAt: new Date().toLocaleString(),
        createdBy: user._id
    })

    const res = await newOrder.save();
    if (res) return "order_created_successfully"
    else return "order_not_created"
}
export const insertCabinetOrder = async ({ order, patientId, payement }: any, { user }: any) => {
    // await to get order code
    const Order = await ORDER.find({ OrderDate: new Date().toLocaleDateString() }).sort({ OrderTime: -1 });
    let convertDateToUCode = new Date().toLocaleDateString().split('/');
    let UOC: string = ''
    if (Order.length > 0) { UOC = Math.floor(Number(Order[0].OrderUniqueCode) + 1).toString(); }
    else { 
        UOC = convertDateToUCode[2];
        if(new Date().getMonth() < 10){
            UOC = UOC + '0' + convertDateToUCode[0];
        } else { UOC = UOC + convertDateToUCode[0]; } 
        if(new Date().getDay() < 10){
            UOC = UOC + '0' + convertDateToUCode[1] + '00001'; 
        } else {
            UOC = UOC + convertDateToUCode[1] + '00001';  
        }
    }
        
    // lets saving the order and get order id
    let newOrder = new ORDER({
        OrderUniqueCode: UOC,
        OrderType: "referral",
        OrderedBy: user._id,
        OrderDate: new Date().toLocaleDateString(),
        OrderTime: new Date().toLocaleTimeString(),
        OrderPriceTotal: order.OrderPriceTotal,
        panel: order.panel,
        patient: patientId,
        laboratory: order.laboId,
        referredFromCabinet: user.accountId
    })

    newOrder.OrderStatus.push({
        type: "created",
        createdAt: new Date().toLocaleString(),
        createdBy: user._id
    })

    const res = await newOrder.save();

    // await validation of the payement
    let newPayement = new PAYEMENT({
        createdAt: new Date().toISOString(),
        createdBy: user._id,
        orderCode: res.OrderUniqueCode,
        orderId: res._id,
        amount: payement,
        currency: "MAD"
    })
    // after get payement id lets make a track
    const paying = await newPayement.save();
    // track payement in cabinet
    CABINET.findById(user.accountId).then((cab: any) => {
        // if patient doesn t exist in cabinet
        if (cab) {
            cab.payements.push({
                payementId: paying._id,
                patientId: patientId
            })
            let i =cab.patients.findIndex((pat:any)=>(pat._id == patientId));
            if(i>=0){
                cab.patients[i].payements.push({
                    payementId: paying._id,
                    cabinetId: user.accountId
                })
            } else {
                // track payement in patient
                PATIENT.findById(patientId).then((pat:any)=>{
                    if(pat){
                        pat.payements.push({
                            payementId: paying._id,
                            cabinetId: user.accountId
                        });
                        pat.save();
                    }
                })
            }
            cab.save();
        }
        // search in patient
    })

    if (res) return "order_created_successfully"
    else return "order_not_created"
}

export const fetchReferredOrdersOut = async (args: any, { user }: any) => {
    const Order = await ORDER.find({
        $and: [
            { $or: [{ referredFrom: user.accountId }, { referredFromCabinet: user.accountId }] }, { OrderType: 'referral' }]
    })
        .sort({ OrderDate: -1, OrderTime: -1 })
        .populate('laboratory patient')
        .select("id OrderUniqueCode OrderDate OrderTime laboratory OrderStatus patient")

    if (Order.length <= 0)
        return "no_referred_order_founded"
    else
        return (Order)
}

export const fetchReferredOrdersIn = async (args: any, { user }: any) => {
    const Order = await ORDER.find({ $and: [{ laboratory: user.accountId }, { OrderType: 'referral' }] })
        .sort({ OrderDate: -1, OrderTime: -1 })
        .populate('referredFrom referredFromCabinet patient')
        .select("id OrderUniqueCode OrderDate OrderTime referredFrom referredFromCabinet OrderStatus patient")
        .then((order: any) => order);

    if (Order.length <= 0)
        return "no_referred_order_founded"
    else
        return (Order)
}
export const referredOrdersDetails = async (args: any, { user }: any) => {
    let patient: any
    const Order = await ORDER.findOne({ OrderUniqueCode: args.orderId })
        .populate('referredFrom laboratory panel.testId')
        .then(async (order: any) => {
            if (order) {
                patient = await CABINET.findById(user.accountId).then((cabinet: any) => {
                    return cabinet.patients.find((p: any) => p._id.toString() === order.patient.toString())
                }) || await PATIENT.findById(order.patient)
            }
            return order;
        });
    if (!Order)
        return "no_referred_order_founded"
    else
        return ({
            _id: Order._id,
            OrderUniqueCode: Order.OrderUniqueCode,
            OrderType: Order.OrderType,
            OrderedBy: Order.OrderedBy,
            OrderDate: Order.OrderDate,
            OrderTime: Order.OrderTime,
            OrderPriceTotal: Order.OrderPriceTotal,
            panel: Order.panel,
            patient: patient,
            laboratory: Order.laboratory,
            referredFromCabinet: Order.referredFromCabinet,
            OrderStatus: Order.OrderStatus
        })
}
export const referredOrdersChangeStatus = async (args: any, { user }: any) => {
    const Order = await ORDER.findOne({ OrderUniqueCode: args.UOC })
        .select('OrderStatus')
        .then(async (status: any) => {
            if (status) {
                status.OrderStatus.push({
                    type: args.type,
                    createdAt: new Date().toLocaleString(),
                    createdBy: user._id
                })
                const res = await status.save();
                if (res) return res.OrderStatus[res.OrderStatus.length - 1]
                else return new Error("order_status_not_saved")
            }
            else
                return new Error("order_status_not_founded")
        })
    if (!Order)
        return new Error("no_referred_order_founded")
    else
        return (Order)
}