import * as ProductManager from "../controller/productController";
export const productResolver = {
  // pm queries
  read_account_products: ProductManager.read_account_products,
  read_product_by_id: ProductManager.read_product_by_id,
  // pm mutations
  write_product: ProductManager.write_product,
  update_product: ProductManager.update_product,
  delete_product: ProductManager.delete_product,
};
