import { Labo } from "../controllers/labo";

const labo = new Labo();

export const LaboResolver = {
  catalog: {
    
    // catalog operation
    fetchCatalogs : labo.fetchCatalogs,
    fetchCatalog : labo.fetchCatalog,
    addNewCatalog : labo.addNewCatalog,
    updateCatalog : labo.updateCatalog, 

    // catalog list operations
    catalogModiyTestPrice : labo.catalogModiyTestPrice,
    catalogModiyTestReferred : labo.catalogModiyTestReferred,
    catalogModiyTestReported : labo.catalogModiyTestReported,
    catalogFetchModiedTest : labo.catalogFetchModiedTest,

    // old operations
    laboCatalogListing: labo.catalogTests,
    laboCatalogListTest: labo.catalogListTest,
    catalogListTests: labo.catalogListTests,
    findCatalogTest: labo.findCatalogTest,
    findCatalogTests: labo.findCatalogTests,
    addupdateTest: labo.catalogTestUpdateOne
  },
  setting: {
    // list
    listDepartement: labo.departementsListing,
    listHoliday: labo.holidaysListing,
    listLeave: labo.leavesListing,
    listAutomate: labo.automatesListing,

    // update 
    addDepartement: labo.addDepartement,
    addHoliday: labo.addHoliday,
    addLeave: labo.addLeave,
    addAutomate: labo.addAutomate,
  },

  team: {
    addNewRole: labo.addNewRole,
    updateRole: labo.updateRole,
    deleteRole: labo.deleteRole,
    addPermissionToRole: labo.addPermissionToRole,
    updatePermissionOfRole: labo.updatePermissionOfRole,
    deletePermissionOfRole: labo.deletePermissionOfRole,
    fetchAccountRoles : labo.fetchAccountRoles,
  },
  LaboListAll: labo.LaboListAll,

  LaboListByCity: labo.LaboListByCity,

  LaboListTwentyByCity: labo.LaboListTwentyByCity,

  LaboDetails: labo.getLaboByName,

  fetchLaboById: labo.fetchLaboById,

  addNewAccountLab: labo.addNewAccountLab,

  searchLaboByName: labo.searchLaboByName,

  LaboUpdateAddress : labo.LaboUpdateAddress,

  LaboAddNewLabos : labo.LaboAddNewLabos,

  LaboDeleteRepeatedAccount : labo.LaboDeleteRepeatedAccount,

  activateModules : labo.activateModules,

  LaboFetchComponents : labo.LaboFetchComponents,
};
