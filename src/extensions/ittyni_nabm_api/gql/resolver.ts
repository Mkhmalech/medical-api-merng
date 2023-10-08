import { LabTests } from "../controllers/LabTests"

const labTests = new LabTests()


export const LabTestsResolver = {

    AllLabTests_en: labTests.listAllTests,
    AllLabTests_fr: labTests.listAllTestsFr,
    fetchTwentyLabTests_fr: labTests.fetchTwentyLabTests_fr,
    LabTestView_en: labTests.LabTestView,
    LabTestView_fr: labTests.LabTestFrView,
    LabTestFrViewByAbbr: labTests.LabTestFrViewByAbbr,
    LabTestFrenchSearch: labTests.LabTestsFrFilterByNameAndMnemonic,
    LabTestFrenchById : labTests.LabTestFrenchById,
    LabTestFrenchByIds : labTests.LabTestFrenchByIds,
    nameEnFilter : labTests.nameEnFilter,
    createTestsSiteMap : labTests.createTestsSiteMap,
    fetchTestsByFirstLetter : labTests.fetchTestsByFirstLetter,

    read_testsOnScroll : labTests.read_testsOnScroll,
    read_labmTestsOnScroll : labTests.read_labmTestsOnScroll,

    // add test
    LabTestAddNew : labTests.addNewTest,

    // update a test
    LabTestNamesUpdate : labTests.namesUpdate,
    LabTestReferenceUpdate : labTests.referenceUpdate,
    updateDescription : labTests.updateDescription,
    LabTestFinanceUpdate : labTests.financeUpdate,
    LabTestAddFinance : labTests.addNewfinance,
    LabTestClassificationUpdate : labTests.classificationUpdate,
    LabTestSpecimenUpdate : labTests.specimenUpdate,
    updateSpecimen : labTests.updateSpecimen,
    LabTestAllUpdate : labTests.updateAll,

    read_labm_tests: labTests.read_labm_tests,
    
    // fetch updates
    fetchUpdates : labTests.fetchUpdates,
    fetchUpdateById : labTests.fetchUpdateById,

    // modify updates
    modifyUpdate : labTests.modifyUpdate,
    modifyUpdateNames : labTests.modifyUpdateNames,
    modifyUpdateReference : labTests.modifyUpdateReference,
    modifyUpdateSpecimen : labTests.modifyUpdateSpecimen,
    modifyUpdateFinance : labTests.modifyUpdateFinance,

    // mutations
    write_labm_test: labTests.write_labm_test,
}