import * as CATALOG from "../controller/catalog";
export const catalogResolver = {
    read_space_catalogs: CATALOG.read_space_catalogs,
    read_space_catalog: CATALOG.read_space_catalog,
    write_space_catalog: CATALOG.write_space_catalog,
    update_space_catalog: CATALOG.update_space_catalog,
    write_catalog_tests: CATALOG.write_catalog_tests,
    update_catalog_test_price: CATALOG.update_catalog_test_price,
    delete_catalog_test: CATALOG.delete_catalog_test,
};