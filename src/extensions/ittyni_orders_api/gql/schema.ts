import { buildSchema } from "graphql"
import { _id, contact, tele } from "../../../globalSchema"

const testId = `testId : ID`
const testPrice = `testPrice : String`
//  OrderedBy
const OrderPriceTotal = `OrderPriceTotal : Int`
const OrderUniqueCode = `OrderUniqueCode : String`
const OrderDate = `OrderDate : String`
const OrderTime = `OrderTime : String`
const civility = `civility : String`
const firstname = `firstname : String`
const lastname = `lastname : String`
const DOB = `DOB : String`
const documentIDNumber = `documentIDNumber : String`
const documentIDType = `documentIDType : String`
const laboId = `laboId : ID`

const referredFrom = `referredFrom : ID`

const panel = `{
    ${testId}
    ${testPrice}
}`
const status = `{type : String}`
const patient = `{
    ${civility}
    ${firstname}
    ${lastname}
    ${DOB}
    ${documentIDNumber}
    ${documentIDType}
}`

// tele
const user_tele = `USER_${tele}`

// contact
const user_contact = `USER_${contact}`

export const labOrdersSchema = buildSchema(`

    type ${user_tele}

    type Account {
        name : String
    }
    type Labo {
        _id : ID
        account : Account
    }
    type Cabinet {
        _id : ID
        account : Account
    }

    input panelInput ${panel}
    input patienInput ${patient}
    input _${user_tele}
    input _${user_contact}

    
    input OrderInput { 
        ${OrderPriceTotal}
        ${laboId}
        panel : [panelInput]
    }
    type Patient ${patient}
    type Status ${status}
    type Name {
        fr : String
    }
    type TestId {
        name : Name
    }
    type Panel {
        testId : TestId
        testPrice : Int
    }
    type Order {
        _id : ID
        ${OrderUniqueCode}
        ${OrderDate}
        ${OrderTime}
        laboratory : Labo
        referredFrom : Labo
        referredFromCabinet : Cabinet
        OrderStatus : [Status]
        patient : Patient
    }
    type OrderDetails {
        _id : ID
        ${OrderUniqueCode}
        ${civility}
        ${OrderDate}
        ${OrderTime}
        ${OrderPriceTotal}
        panel : [Panel]
        laboratory : Labo
        referredFrom : Labo
        OrderStatus : [Status]
        patient : Patient
    }
    type NewStatus ${status}
    type orderQuery {
        fetchReferredOrdersIn : [Order]
        fetchReferredOrdersOut : [Order]
    }

    input _ORDER_MEDICNE {
        medicine_id : ID
        email: String
        tele: _USER_TELE 
        contact: _USER_CONTACT

    }
    type OrderMedicineMutation {
        write_MedicineOrder(
            order: _ORDER_MEDICNE): String
    }

    type orderMut {
        insertOrder(order : OrderInput, patient : patienInput) : String
        insertCabinetOrder(
            order : OrderInput, patientId : String, payement : Float 
        ) : String
        referredOrdersDetails(orderId : String) : OrderDetails 
        referredOrdersChangeStatus(UOC : String, type : String) : NewStatus
        OrderMedicine : OrderMedicineMutation
    }

    schema {
        query : orderQuery
        mutation : orderMut
    }  
`)