import { buildSchema } from "graphql";
export const ICDSchema = buildSchema(`

    type ICDQuery {
        fetchIcd(q: String) : String
    }

    type ICDMutation {
        addMultipleICD : String
    }

    schema {
        query : ICDQuery
        mutation : ICDMutation
    }
`)