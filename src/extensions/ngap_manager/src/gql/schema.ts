import { buildSchema } from "graphql";
export const NgapSchema = buildSchema(`

    type NGAPQuery {
        fetchActe : String
    }
    type NGAPMutation {
        modifyActe(code: String) : String
    }
    schema {
        query : NGAPQuery
        mutation : NGAPMutation
    }
`)