import { Db } from "../../../../gateway/db";
import { SPACE } from "../../../ittyni_space_service/src/module/space";
import { CATEGORY } from "../module/category";

export const write_category = async (
  { category, icon }: any,
  { user, message, permissions, account }: any
) => {
  const isExist = await CATEGORY.findOne({ name: category.name });

  if (!isExist) {
    const newCategory = new CATEGORY({
      name: category.name,
      description: category.description
    });
    newCategory.icon = icon;

    let savedCategory = await newCategory.save();

    // save category to account
    if (savedCategory) {
      const space = new Db(SPACE);
      space.setSubDocsPushWithoutFilter(
        { _id: account._id },
        { categories: savedCategory._id }
      );

      return "success";
    } else return "error";
  } else return "Already_Existing";
};

export const read_categories = async (
  { category, icon }: any,
  { user, message, permissions }: any
) => {
  return await CATEGORY.find();
};
