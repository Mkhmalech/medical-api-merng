import * as Category from "../controller/categoryController"
export const categoryResolver = {
    write_category: Category.write_category,
    read_categories: Category.read_categories
};