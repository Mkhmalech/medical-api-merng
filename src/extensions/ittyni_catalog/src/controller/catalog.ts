import { SPACE } from "../../../ittyni_space_service/src/module/space";
import { CATALOG } from "../module/catalog";

export const read_space_catalogs = async (
  args: any,
  { account, user }: any
) => {
  return CATALOG.find({ space: account._id });
};
export const read_space_catalog = async ({ _id }: any, req: any) => {
  return CATALOG.findById(_id).populate("tests.default");
};
export const write_space_catalog = async (
  { catalog }: any,
  { account, user }: any
) => {
  const res = await CATALOG.findOne({ title: catalog.title });
  if (res) return Error("Catalog_Already_Exists");
  else {
    const newCatalog = new CATALOG({
      ...catalog,
      space: account._id,
      createdBy: user._id,
    });

    const saveCatalog = await newCatalog.save();

    if (saveCatalog) {
      const saveToSpace = await SPACE.findOneAndUpdate(
        { _id: account._id },
        { $push: { catalogs: saveCatalog._id } }
      );
      return saveToSpace ? "SAVED" : "NOT_SAVED";
    }
  }
};
export const update_space_catalog = async (args: any, req: any) => {};

export const write_catalog_tests = async ({ _id, tests }: any, req: any) => {
  return CATALOG.findOneAndUpdate(
    { _id },
    { $addToSet: { tests: tests.map((test: any) => ({ default: test })) } }
  );
};

export const update_catalog_test_price = async (
  { _id, testId, price }: any,
  req: any
) => {
  return CATALOG.findOneAndUpdate(
    { _id, "tests.default": testId },
    {
      $set: {
        "tests.$.finance.price": price,
        "tests.$.finance.currency": "MAD",
      },
    }
  );
};

export const delete_catalog_test = async ({ _id, testId }: any, req: any) => {
  return CATALOG.findOneAndUpdate(
    { _id },
    { $pull: { tests: { default: testId } } },
    { new: true }
  );
};
