import { buildSchema } from "graphql";

const civility = `civility : String`
const firstname = `firstname : String`
const lastname = `lastname : String`
const tele = `tele : String`
const DOB = `DOB : String`
const IDType = `IDType : String`
const IDNum = `IDNum : String`
const mobile = `mobile : String`
const email = `email : String`
const region = `region : String`
const street = `street : String`
const city = `city : String`
export const PatientSchema = buildSchema(`

    type PatientQuery {
        searchPatient : String
    }
    type PatientMut {
        addNewPatientToAccount(
            ${civility}, ${firstname}!, ${lastname}!,
            ${tele}, ${DOB}!, ${IDType}, ${IDNum},
            ${email}, ${region}, ${street}, ${city},
        ): String
    }
    schema {
        query : PatientQuery
        mutation : PatientMut
    }
`)