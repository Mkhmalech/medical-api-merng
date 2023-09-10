import axios, { AxiosResponse } from "axios";
import { PRODUCT } from "../module/productModel";
async function sendGetRequest(url: string): Promise<AxiosResponse> {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error(`Error sending GET request: ${error}`);
  }
}
export const write_product = async ({ product }: any, req: any) => {
  const newProduct = new PRODUCT({
    name: product.name,
    desctiption: product.desctiption,
    price: {
      value: product.price,
      currency: "mad",
    },
    stockQuantity: product.stockQuantity,
  });

  newProduct.icon = product.icon;

  const savedProduct = await newProduct.save();

  console.log(savedProduct)
};

export const upload_file = async (_: any, { file }: any, req: any) => {
  // const { createReadStream, filename, mimetype } = file;

  console.log("file : ", req);
  console.log("args : ", _);

  return "good reading";
};
