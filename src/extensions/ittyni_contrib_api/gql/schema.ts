import { buildSchema } from "graphql"

const laboName = `LaboName : String`
const laboId = `LaboId : ID`
const testName = `TestName : String`
const testId = `TestId : String`
const catalogId = `CatalogId : String`
const bcode = `bcode : Int`
const price = `price : Int`

export const labReferralSchema = buildSchema(`

    type Referral {
        ${laboName}
        ${laboId}
        ${testName}
        ${catalogId}
        ${testId}
        ${bcode}
        ${price}        
    }
    input Refs {
        ${laboName}
    }

    type refferalQuery {
        searchTests(query : String) : [Referral]
    }

    type refferalMutation {
        searchTests : String
    }

    schema {
        query : refferalQuery
        mutation : refferalMutation
    }  
`)