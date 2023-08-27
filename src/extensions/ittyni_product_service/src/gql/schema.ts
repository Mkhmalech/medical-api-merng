import { buildSchema } from "graphql";
export const ProductSchema = buildSchema(`

    type Product {
        _id: ID
        name : String
    }

    type ProductQuery {
        read_product : Product
    }

    type ProductMutation {
        write_product: String
    }

    schema {
        query : ProductQuery
        mutation : ProductMutation
    }
`)