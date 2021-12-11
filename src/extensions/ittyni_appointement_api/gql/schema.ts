import { buildSchema } from "graphql"

const fullname = `fullname : String`

const tele = `tele : String`

const appointement = `appointement : String`

const appointementsubmited = `appointementsubmited : String`

const details = `details : String`

const needphlebotomist = `needphlebotomist : Boolean`

export const labAppointementSchema = buildSchema(`

    type Appointement {
        ${fullname}
        ${tele}
        ${appointement}
        ${appointementsubmited}
        ${details}
        ${needphlebotomist}
    }
    input Appoint {
        ${fullname}
        ${tele}
        ${appointement}
        ${appointementsubmited}
        ${details}
        ${needphlebotomist}
    }

    type appointementQuery {
        fetchAppointements : [Appointement]
    }

    type appointementMutation {
        createAppointement(appoint : Appoint) : String
    }

    schema {
        query : appointementQuery
        mutation : appointementMutation
    }  
`)