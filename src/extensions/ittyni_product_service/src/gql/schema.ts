import { buildSchema } from "graphql";
export const ProductSchema = buildSchema(`

    schema {
        query : ProductQuery
        mutation : ProductMutation
    }
`)