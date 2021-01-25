import { buildSchema } from "graphql";
export const NgapSchema = buildSchema(`

    type NGAPQuery {
        fetchActe : String
    }
    type NGAPMutation {
        modifyActe(code: String) : String
        addMultiActes : String
    }
    schema {
        query : NGAPQuery
        mutation : NGAPMutation
    }
`)