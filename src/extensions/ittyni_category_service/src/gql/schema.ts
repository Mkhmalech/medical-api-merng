import { buildSchema } from "graphql";
export const CategorySchema = buildSchema(`

    type Category {
        name: String
        description: String
        parentsCategory: ID
        subcategories : ID
        image: String
        icon: String
        displayOrder: Int
        isActive: Boolean
    }

    type CategotyQuery {
        read_category : Category
    }

    type CategoryMutation {
        write_category: String
    }

    schema {
        query : CategotyQuery
        mutation : CategoryMutation
    }
`)