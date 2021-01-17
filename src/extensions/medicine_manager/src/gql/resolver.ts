import * as Medicine from '../controller/medicine'
export const MedicineResolver = {
    fetchMedicine: Medicine.fetchMedicine,
    addMultiMedicine: Medicine.addMultiMedicine,
    fetchMedicneByAlphabete: Medicine.fetchMedicneByAlphabete,
    fetchMedicneByName: Medicine.fetchMedicneByName,
    ListAllCategories: Medicine.ListAllCategories,
    ListByCategory: Medicine.ListByCategory,
    ListByCompositions: Medicine.ListByCompositions,
    ListByDCI: Medicine.ListByDCI,
    listAtcCategories: Medicine.listAtcCategories,
    listAtcChapter: Medicine.listAtcChapter,
    listAtcGroup: Medicine.listAtcGroup,
    listAtcSousGroup: Medicine.listAtcSousGroup,
    listDrugByAtc: Medicine.listDrugByAtc
};