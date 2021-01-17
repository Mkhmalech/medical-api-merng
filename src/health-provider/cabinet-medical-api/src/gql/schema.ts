import { buildSchema } from "graphql";

// cabinet varaibles
const cabinetName = `name : String`
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
const DOB = `DOB : String`
const IDType = `IDType : String`
const IDNum = `IDNum : String`
const email = `email : String`
const region = `region : String`
const street = `street : String`
const city = `city : String`
// cabinet properties
const cabinetAccount = `type CabinetAccount {
    ${cabinetName}
}`

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
    type Cabinet {
        _id : ID
        account : CabinetAccount
    }
    type RootQuery {
        findCabinet: String
        listAllCabinets: [Cabinet]
        listCabinetPatients : [Patient]
        cabinetPatientDetails(id : String) : Patient
        cabinetFindPatient(query : String) : [Patient]
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
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)