import { buildSchema } from "graphql";



export const CabinetSchema = buildSchema(`
    type RootQuery {
        findCabinet: String
    }
    type RootMutation {
        createNewCabinet(name : String) : String
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)