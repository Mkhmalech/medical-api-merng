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
    type Cabinet {
        _id : ID
        account : CabinetAccount
    }
    type RootQuery {
        findCabinet: String
        listAllCabinets: [Cabinet]
    }
    type RootMutation {
        createNewCabinet(name : String) : String
        cabinetSearchTest(test : String) : [OrderTest]
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)