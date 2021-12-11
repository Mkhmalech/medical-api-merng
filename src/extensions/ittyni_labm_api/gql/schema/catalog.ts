const catalogId = `CatalogId : ID`

const catalog = `
    _id : ID
    title : String
    description : String
    bFactor : Float
    addressedTo : String
`
const catalogTest = `
    catalogId: ID 
    testId : ID 
    testPrice : Int
    testReferred : Boolean
    testReported : Int
`
export const LaboCatalog = `

type LabCatalog {${catalog}}
input Catalog {${catalog}}

type LabCatalogTest {${catalogTest}}

input ListTest {
    testId   : String
    testName : String
    Bcode    : Int
    laboName : String
}

type Update {
    testId   : String
    testName : String
    Bcode    : Int
    testReported : Int
    testPrice    : Int
    testReferred : String
}

input update {
    testId   : String
    testName : String
    Bcode    : Int
    testReported : Int
    testPrice    : Int
    testReferred : String
}
input ListTests {
    laboName : String
    updates : [update]
}

type LaboCatalogListUpdate {
    testReported : Int
    testPrice    : Int
    testReferred : String
}

input CatalogList {
    testId : String
    testReported : Int
    testPrice : Int
    testReferred : String
}
    
input CatalogUpdate {
    laboName : String, 
    catalogList: [CatalogList], 
    token : String
}

input CatalogUpdateOne {
    laboName : String, 
    catalogList: CatalogList, 
    token : String
}

type LaboCatalog {

    fetchCatalogs : [LabCatalog]
    fetchCatalog(id : ID!) : LabCatalog
    updateCatalog(catalog : Catalog) : String

    catalogModiyTestPrice(catalogId: ID, testId : ID , price : Int) : String
    catalogModiyTestReferred(catalogId: ID, testId : ID , referred : Boolean) : String
    catalogModiyTestReported(catalogId: ID, testId : ID , reported : Int) : String

    catalogFetchModiedTest(catalogId: ID) : [LabCatalogTest]

    addNewCatalog(
        title: String, description: String,  bFactor: Float, 
        addressedTo : String, addressedToId: ID
    ) : String

    laboCatalogListing (catalogUpdate : CatalogUpdate) : [LaboCatalogListUpdate]

    laboCatalogListTest (listTest : ListTest) : LaboCatalogListUpdate

    catalogListTests (listTests : ListTests) : [Update]

    findCatalogTest (labTest : ListTest) : Update

    findCatalogTests (laboName : String) : [Update]

    addupdateTest (addUpdate : CatalogUpdateOne) : String

}
`