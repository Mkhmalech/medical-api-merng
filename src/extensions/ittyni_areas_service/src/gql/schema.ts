import { buildSchema } from "graphql";
export const AreaSchema = buildSchema(`
    type AreaQuery {
        get_area : String
    }

    type AreaMutation {
        update_area : String
    }

    schema {
        query : AreaQuery
        mutation : AreaMutation
    }
`)