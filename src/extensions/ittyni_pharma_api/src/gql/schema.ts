import { buildSchema } from "graphql";

const Name = `name : String`
const Street = `street : String`
const City = `city : String`
const Fix = `fix : [String]`


export const PharmaSchema = buildSchema(`
    type Account {${Name}}
    type Address {
        ${Street}
        ${City}
    }
    type Tele {
        ${Fix}
    }
    type Contact {
        address : Address
        tele : Tele
    }
    type Pharmacie {
        _id : ID
        account : Account
        contact : Contact
        views : Int
    }

    type PharmaQuery {
        fetchAllPharmacies : String
        fetchTwentyPharmacy(letter : String!) : [Pharmacie]
        fetchTwentyByCity(city : String!) : [Pharmacie]
        fetchAllByCity(city : String!) : [Pharmacie]
        fetchPharmaDetails(name : String) : Pharmacie
        searchPharmaByName(name : String) : [Pharmacie]
        fetchPharmaById(id : String) : Pharmacie
    }

    type PharmaMutation {
        addNewPharmacy : String,
        addMultiplePharmacies :String
    }

    schema {
        query : PharmaQuery
        mutation : PharmaMutation
    }
`)