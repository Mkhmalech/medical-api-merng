import { buildSchema } from "graphql";

const name = `name : String`
const start = `start : String`
const type = `type : String`
const region = `region : String`
const province = `province : String`
const commune =  `commune : String`
const street =   `street : String`
const city = `city : String`
const fix = `fix : [String]`
const fax = `fax : [String]`

const Tele =`
    type Tele {
        ${fix}
        ${fax}
    }
`
const Address = `
    type Address {
        ${region}
        ${province}
        ${commune}
        ${street}
        ${city}
    }
`
const account = `
    type Account {
        ${name}
        ${type}
        ${start}
    }
`
const contact = `
    ${Tele}
    ${Address}
    type Contact {
        tele : Tele
        address : Address
    }
`

export const SpaceSchema = buildSchema(`

    ${contact}

    ${account}

    type Provider {
        account : Account
        contact : Contact
    }

    type SMQuery {
        fetchAccountData : Provider
    }
    type SMMutation {
        updateAccountName(${name}): String
        updateAccountType(${type}): String
        updateAccountStartDate(${start}): String
        updateContact(
            address: String, region: String, city:String, tele: String, fax:String, website:String
        ): String
    }
    schema {
        query : SMQuery
        mutation : SMMutation
    }
`)