import { buildSchema } from "graphql";
export const ProductSchema = buildSchema(`
    scalar Upload
    
    type Product {
        _id: ID
        name : String
    }
    input _Image {
        filename: String
        originName: String
        extension: String
    }
    input _Product {
        name: String
        description: String
        price: String
        category: String
        stockQuantity: String
        images: [_Image]
    }

    type ProductQuery {
        read_product : Product
    }

    type ProductMutation {
        write_product(product: _Product): String
        upload_file(file: Upload!) : String
    }

    schema {
        query : ProductQuery
        mutation : ProductMutation
    }
`)