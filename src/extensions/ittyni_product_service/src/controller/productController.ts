import axios, { AxiosResponse } from "axios";
import { PRODUCT } from "../module/productModel";
import { SPACE } from "../../../ittyni_space_service/src/module/space";
async function sendGetRequest(url: string): Promise<AxiosResponse> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(`Error sending GET request: ${error}`);
  }
}
export const write_product = async ({ product }: any, { account, user }: any) => {
  const isExist = await PRODUCT.findOne({ name: product.name });
  if (!isExist) {
    const newProduct = new PRODUCT({
      name: product.name,
      description: product.description,
      price: product.price,
      stockQuantity: product.stockQuantity,
      barcode: product.barcode,
      space: account._id
    });

    newProduct.images = product.images;
    newProduct.categories = product.categories;
    newProduct.status.push({ updatedBy: user._id})

    const savedProduct = await newProduct.save();

    // update space products
    const saveToSpace = await SPACE.findOneAndUpdate(
      { _id: account._id },
      { $push: { products: savedProduct._id } },
      { new: true }
    );

    return savedProduct;
  } else return isExist;
};

export const read_account_products = async (_: any, {user, account}: any) => {
  const res = await PRODUCT.find({$and : [{"space": account._id}, {"status.value": {$ne: "deleted"}}]})

  return res;
};

export const read_product_by_id = ({ _id }: any, req: any) => {
  return PRODUCT.findById(_id).populate("categories images");
};

export const update_product = async ({ product }: any, req: any) => {
  return PRODUCT.findOneAndUpdate(
    { _id: product._id },
    { $set: { ...product } }
  );
};

export const delete_product = async ({_id}: any, {user}:any) => {
  const res = await PRODUCT.findOneAndUpdate({_id}, {$push: { status: {value: 'deleted', updatedBy: user._id}}}, {new : true});

  return res? "SAVED_SUCCESSFULLY" : "FAIL_SAVING"
}

export const upload_file = async (_: any, { file }: any, req: any) => {
  // const { createReadStream, filename, mimetype } = file;

  console.log("file : ", req);
  console.log("args : ", _);

  return "good reading";
};
