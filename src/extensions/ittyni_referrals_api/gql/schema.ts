import { buildSchema } from "graphql"

const laboName = `LaboName : String`
const laboId = `LaboId : ID`
const testName = `TestName : String`
const testId = `TestId : String`
const catalogId = `CatalogId : String`
const bcode = `bcode : Int`
const price = `price : Int`

export const labReferralSchema = buildSchema(`
    type Account {name: String}
    type Name {fr: String}
    type Space {account: Account}
    type Finance {
        price: Int
        currency: String
    }
    type DefaultTest {
        name: Name
        _id: ID
    }
    type Test {
        default: DefaultTest
    }
    type PPV {
        country: String
        Bcode : String
    }
    type Catalog {
        _id: String
        title: String
    }
    type RefSpace {
        _id: String
        name: String
    }
    type RefTest {
        _id: ID
        name: String
    }
    type Referral {
        test: RefTest
        ppv: PPV
        refPrice: String
        mnemonic: String
        space: RefSpace
        catalog: Catalog
    }
    input Refs {
        ${laboName}
    }

    type refferalQuery {
        searchTests(query : String, addressedTo : String) : [Referral]
        searchContributorTests(query : String) : [Referral]

        read_referral_test(query : String): [Referral]
    }

    type refferalMutation {
        searchTests : String
    }

    schema {
        query : refferalQuery
        mutation : refferalMutation
    }  
`)