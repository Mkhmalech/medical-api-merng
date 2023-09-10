import { buildSchema } from "graphql";
const iconDef = `Icon { filename: String, originName: String, extension: String}`;
const category = `Category {
    _id: ID
    name: String
    description: String
    parentsCategory: ID
    subcategories : ID
    displayOrder: Int
    isActive: Boolean
}`;
export const CategorySchema = buildSchema(`

    type ${iconDef}
    type ${category}
    type CategoryResponse {
        _id: ID
        name: String
        description: String
        parentsCategory: ID
        subcategories : ID
        icon: Icon
        status: Boolean
    }
    input _${iconDef}
    input _${category}

    type CategotyQuery {
        read_categories : [CategoryResponse]
    }

    type CategoryMutation {
        write_category(category: _Category, icon: _Icon): String
    }

    schema {
        query : CategotyQuery
        mutation : CategoryMutation
    }
`);
