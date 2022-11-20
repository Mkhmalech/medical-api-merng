import { buildSchema } from "graphql";
export const AreaSchema = buildSchema(`

    schema {
        query : AMQuery
        mutation : AMMutation
    }
`)