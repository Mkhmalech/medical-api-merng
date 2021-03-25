import { buildSchema } from "graphql";

const acteCode = "acteCode : String";
const actLabel = "actLabel : String";

export const ICDSchema = buildSchema(`
    type Symptom {
        _id : ID
        ${acteCode}
        ${actLabel}
    }
    type ICDQuery {
        fetchIcd(q: String) : String
        findSymptoms(q: String) : [Symptom]
    }

    type ICDMutation {
        addMultipleICD : String
    }

    schema {
        query : ICDQuery
        mutation : ICDMutation
    }
`)