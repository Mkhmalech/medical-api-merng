import { buildSchema } from "graphql";

export const ProductSchema = buildSchema(`
    type Price {
        value: Float
        currency: String
    }
    type Icon { _id: ID, filename: String, originName: String, extension: String}
    type Image { _id: ID, filename: String, originName: String, extension: String}
    type Category {
        _id: ID
        name: String
        description: String
        parentsCategory: ID
        subcategories : ID
        icon: Icon
        status: Boolean
    }
    type Product {
        _id: ID
        name : String
        description: String
        price: Price
        categories: [Category]
        stockQuantity: String
        images: [Image]
        barcode: String
    }
    input _Price {
        value: Float
        currency: String
    }
    input _Image {
        filename: String
        originName: String
        extension: String
    }
    input _Product {
        _id: ID
        name: String
        description: String
        price: String
        categories: [ID]
        stockQuantity: String
        images: [ID]
        barcode: String
    }

    type ProductQuery {
        read_account_products : [Product]
        read_product_by_id(_id:ID) : Product
    }

    type ProductMutation {
        write_product(product: _Product): Product
        update_product(product: _Product): Product
        delete_product(_id: ID!): String
    }

    schema {
        query : ProductQuery
        mutation : ProductMutation
    }
`)