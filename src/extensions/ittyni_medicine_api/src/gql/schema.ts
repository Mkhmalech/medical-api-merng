import { buildSchema } from "graphql";

const composition = `composition : String`
const categoty = `category : String`
const atc = `atc : String`

const title = `title : String`
const presentation = `presentation : String`
const ppv = `ppv : String`
const statut = `statut : String`
const distributor = `distributor : String`

export const MedicineSchema = buildSchema(`
    type Category {
        title : String
        code : String
    }
    type Name {
        ${title}
        ${presentation}
        ${ppv}
        ${statut}
        ${distributor}
    }
    type Medicine {
        _id : ID
        names : [Name]
        ${composition}
        ${categoty}
        ${atc}
    }

    type MedicineQuery {
        fetchMedicine(id : String) : Medicine
        fetchMedicneByAlphabete(letter : String): [Medicine]
        fetchMedicneByName(name : String) : [Medicine]
        ListAllCategories : [String]
        ListByCategory(${categoty}) : [Medicine]
        ListByCompositions : [String]
        ListByDCI(${composition}) : [Medicine]
        listAtcCategories : [String]
        listAtcChapter(chapter : String) : [String]
        listAtcGroup(sousChapter : String) : [String]
        listAtcSousGroup(group : String) : [Category]
        listDrugByAtc(code : String) : [Medicine]
        
    }
    type MedicineMutation {
        addMultiMedicine : String
        createSiteMapDrugs : String
    }
    schema {
        query : MedicineQuery
        mutation : MedicineMutation
    }
`)