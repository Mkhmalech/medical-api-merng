import { buildSchema } from "graphql";
export const PackSchema = buildSchema(`

    type PackQuery {
        readAllPacks : String
    }

    type PackMutation {
        createPackForLab(_id: String): String
    }

    schema {
        query : PackQuery
        mutation : PackMutation
    }
`)