import { buildSchema } from "graphql";
export const paramedicalSchema = buildSchema(`
    type ParamedicalQuery {
        read_Paramedicals : String
    }
    type ParamedicalMutation {
        write_Paramedical : String
    }
    schema {
        query : ParamedicalQuery
        mutation : ParamedicalMutation
    }
`)