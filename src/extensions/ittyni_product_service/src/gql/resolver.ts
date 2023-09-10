import * as ProductManager from "../controller/productController";
export const productResolver = {
    write_product : ProductManager.write_product,
    upload_file : ProductManager.upload_file
};