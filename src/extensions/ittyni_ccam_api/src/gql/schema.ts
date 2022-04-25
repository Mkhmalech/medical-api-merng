import { buildSchema } from "graphql";
export const CCAMSchema = buildSchema(`

    type CCAMQuery {
        fetchActe : String
    }
    type CCAMMutation {
        modifyActe(code: String) : String
        addMultiActes : String
    }
    schema {
        query : CCAMQuery
        mutation : CCAMMutation
    }
`)