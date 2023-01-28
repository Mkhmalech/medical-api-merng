import { buildSchema } from "graphql";

// cabinet varaibles
const cabinetName = `name : String`
const cabinetType = `type : String`
// test 
const laboName = `LaboName : String`
const laboId = `LaboId : ID`
const testName = `TestName : String`
const testId = `TestId : String`
const catalogId = `CatalogId : String`
const bcode = `bcode : Int`
const price = `price : Int`
// patient
const civility = `civility : String`
const firstname = `firstname : String`
const lastname = `lastname : String`
const gender = `gender : String`
const mobile = `mobile : String`
const DOB = `dob : String`
const IDType = `IDType : String`
const IDNum = `IDNum : String`
const email = `email : String`
const region = `region : String`
const street = `street : String`
const city = `city : String`
// cabinet properties
const cabinetAccount = `type CabinetAccount {
    ${cabinetName} ${cabinetType}
}`
const Street = `street : String`
const City = `city : String`
const Fix = `fix : [String]`
const acteCode = "acteCode : String";
const actLabel = "actLabel : String";
export const CabinetSchema = buildSchema(`
    ${cabinetAccount}
    type OrderTest {
        ${testName}
        ${catalogId}
        ${testId}
        ${bcode}
        ${price}        
    }
    type PatientID {
        ${IDNum}
        ${IDType}
    }
    type PatientTele {
        ${mobile}
    }
    type PatientAddress {
        ${region}
        ${street}
        ${city}
    }
    type PatientContact {
        tele: [PatientTele],
        address: PatientAddress,
        ${email}
      }
    type Patient {
        _id : ID
        ${civility}
        ${firstname} 
        ${lastname}
        ${DOB}
        ${gender}
        ID : PatientID
        contact: PatientContact
    }
    type Address {
        ${Street}
        ${City}
    }
    type Tele {
        ${Fix}
    }
    type ICD {
        _id : ID
        ${acteCode}
        ${actLabel}
    }
    type CabinetContact {
        address : Address
        tele : Tele
    }
    type Cabinet {
        _id : ID
        account : CabinetAccount
        contact : CabinetContact
        views : Int
    }
    type CabinetByCity {
        city : String
        total : Float
    }
    type WaitingStatus{
        updatedAt : String
        updatedBy : String
        now : String
        before : String
    }
    type WaitingRoom {
        patient : Patient
        arrivedAt : String
        finishedAt : String
        viewedAt : String
        number : Int
        motif : String
        icd : ICD
        visitType : String
        status : [WaitingStatus]
    }
    type CabinetOnScroll {
        cabinets : [Cabinet]
        showed : Int
        rest : Int 
        total : Int
    }
    type Extension {
        _id : ID!
        name : String!        
        canRead : Boolean
        canCreate : Boolean
        canUpdate : Boolean
        canDelete : Boolean
        canPublish : Boolean
    }
    type RootQuery {
        findCabinet: String
        listAllCabinets: [Cabinet]
        listCabinetPatients(_id: ID!) : [Patient]
        cabinetPatientDetails(id : String) : Patient
        cabinetFindPatient(query : String) : [Patient]
        listCabinetsCities : [CabinetByCity]
        listCabinetsTwntyByCity(city : String) : [Cabinet]
        listCabinetsAllByCity(city : String) : [Cabinet]
        CabinetListOnScroll(limit: Int!, skip: Int!) : CabinetOnScroll
        listCabinetDetailsById(id : String) : Cabinet
        listWaitingPatients : [WaitingRoom]
    }
    type RootMutation {
        createNewCabinet(name : String) : String
        cabinetSearchTest(test : String) : [OrderTest]
        addNewPatientToCabinet(
            ${civility}, ${firstname}!, ${lastname}!,
            ${mobile}, ${DOB}, ${IDType}, ${IDNum},
            ${email}, ${region}, ${street}, ${city},${gender}
        ): String
        cabinetAddLabOrder(
            id : String, panel : [String], laboId : String
        ) : String
        addMultipleCabinets : String
        addPatientToWaitingRoom(id : ID, motif : String, visitType : String): String
        updatePatientToViewed(id : ID): [WaitingRoom]
        updatePatientToFinished(id : ID): [WaitingRoom]
        setPatientToViewed(num : Int): WaitingRoom
        setPatientToFinished(num : Int): WaitingRoom
        setPatientToWaiting(num : Int): String
        createCabinetsSiteMap : String
        activateExtensionOnCabinet(_id: ID!, componentId: ID!): [Extension]
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)