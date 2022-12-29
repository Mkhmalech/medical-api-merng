import { buildSchema } from "graphql";

// pack variables
const _id = `_id : ID!`
const title = `title:String`
const description = `description:String`
const overviews = `overviews:String`
const procedures = `procedures : [String]`
const price = `price:String`
const currency = `currency:String`

const labm = `
    type Account {
        name : String
    }
    type Labm {
        account : Account
    }
`
const user = `User { firstName: String lastName: String _id : ID}`
const pack = `Pack {${title} ${description} ${procedures} ${price} ${currency}}`

export const PackSchema = buildSchema(`

    ${labm}
    type ${user}
    
    type PackDetails {
       ${title} ${description} ${procedures} 
       ${price} ${currency}
       createdBy : User
       labm : Labm
    }
    
    type ${pack}

    input _${pack}

    type PackQuery {
        readAllPacks : [PackDetails]
    }

    type PackMutation {
        createPackForLab(${_id}, pack: _Pack): String
    }

    schema {
        query : PackQuery
        mutation : PackMutation
    }
`)