import { buildSchema } from "graphql";
export const NameSchema = buildSchema(`

    schema {
        query : AMQuery
        mutation : AMMutation
    }
`)