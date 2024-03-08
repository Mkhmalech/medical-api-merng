import { buildSchema } from "graphql";
const catalog = `Catalog{
    _id: ID
    title : String!
    description: String
    tests: [CatalogTest]
}`
const finance = `Finance {
    _id : ID
    country: String 
    Bcode: String 
    code:String 
    value:String 
    price:String 
    currency: String 
}`

export const CatalogSchema = buildSchema(`
    type ${finance}
    type Name {
        fr: String
    }
    type Reference{
        CPT : Int
        Mnemonic : String
    }
    type Test {
        _id: ID!
        name: Name
        reference: Reference
        finance: [Finance]
    }
    type CatalogTest {
        default: Test
        finance: Finance
    }
    type ${catalog}
    input _Catalog{
        _id: ID
        title : String!
        description: String
        tests: [ID]
        for: String!
    }
    type CatalogQuery {
        read_space_catalogs: [Catalog],
        read_space_catalog(_id: ID!): Catalog
    }
    type CatalogMutation {
        write_space_catalog(catalog: _Catalog): String
        write_catalog_tests(_id: ID!, tests: [ID!]): Catalog
        update_space_catalog(catalog: _Catalog): String
        update_catalog_test_price(_id: ID!, testId: ID!, price: Int): Catalog
        delete_catalog_test(_id: ID!, testId: ID!): Catalog
    }
    schema {
        query : CatalogQuery
        mutation : CatalogMutation
    }
`)