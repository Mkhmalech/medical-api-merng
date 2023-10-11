import { buildSchema } from "graphql"
import { _id, contact, tele } from "../../../globalSchema"

const testId = `testId : ID`
const testPrice = `testPrice : String`
//  OrderedBy
const OrderPriceTotal = `{value : String currency: String}`
const OrderUniqueCode = `OrderUniqueCode : String`
const OrderDate = `OrderDate : String`
const OrderTime = `OrderTime : String`
const civility = `civility : String`
const firstname = `firstname : String`
const lastname = `lastname : String`
const DOB = `dob : String`
const documentIDNumber = `documentIDNumber : String`
const documentIDType = `documentIDType : String`
const laboId = `laboId : ID`

const referredFrom = `referredFrom : ID`

const panel = `{
    ${testId}
    ${testPrice}
}`
const status = `{type : String value: String}`
const patient = `{
    ${civility}
    ${firstname}
    ${lastname}
    gender: String
    ${DOB}
    documentIDNumber: String
}`

// tele
const user_tele = `USER_${tele}`

// contact
const user_contact = `USER_${contact}`

export const labOrdersSchema = buildSchema(`

    type ${user_tele}

    type OrderPriceTotal ${OrderPriceTotal}

    type DocumentID {
        ${documentIDNumber}
        ${documentIDType}
    }

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
        OrderPriceTotal : String
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
        OrderPriceTotal: String
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
    type Test {
        _id : ID
        name : Name
    }
    type Price {
        value : String
        currency : String
    }
    type Procedure {
        price: Price
        test: Test
    }

    type Referred_Out_Orders {
        _id: String
        ${OrderUniqueCode}
        ${OrderDate}
        OrderPriceTotal: OrderPriceTotal
        status: [Status]
        space: Labo
        patient: Patient
        procedures: [Procedure]
    }

    input _Price {
        value: String
        currency: String
    }
    input _Procedure {
        _id: ID
        price: _Price
        catalog: ID!
    }

    input _ORDER_MEDICNE {
        medicine_id : ID
        email: String
        tele: _USER_TELE 
        contact: _USER_CONTACT
    }
    input _ORDER_LABM_PROCEDURES {
        patient : patienInput
        procedures: [_Procedure]
        referredFrom: ID!
        referredTo: ID!
        price: _Price!
    }
    type OrderMedicineMutation {
        write_MedicineOrder(
            order: _ORDER_MEDICNE): String
    }

    type OrderLabmProceduresQuery {
        read_referral_labm_orders_out: [Referred_Out_Orders]
        read_referral_labm_orders_in: [Referred_Out_Orders]
        read_referral_labm_order_details(_id: ID!): Referred_Out_Orders
    }

    type OrderQuery {
        OrderLabmProceduresQuery: OrderLabmProceduresQuery
    }

    type OrderLabmProceduresMut {
        write_referral_labm_order(orderLabm: _ORDER_LABM_PROCEDURES): String
    }

    type orderMut {
        insertOrder(order : OrderInput, patient : patienInput) : String
        insertCabinetOrder(
            order : OrderInput, patientId : String, payement : Float 
        ) : String
        referredOrdersDetails(orderId : String) : OrderDetails 
        referredOrdersChangeStatus(UOC : String, type : String) : NewStatus
        OrderMedicine : OrderMedicineMutation
        OrderLabmProceduresMut: OrderLabmProceduresMut
    }

    schema {
        query : OrderQuery
        mutation : orderMut
    }  
`)