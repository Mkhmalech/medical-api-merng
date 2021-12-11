import { buildSchema } from "graphql";

// variables
const id = `_id: ID`
const nameEn = `en : String`;
const nameFr = `fr : String`;
const CPT = `CPT : Int`
const Mnemonic = `Mnemonic : String`
const country = `country : String`
const Bcode = `Bcode : Int`
const sampleType = `nature : [String]`
const tubeColor = `tubecolor : [String]`
const anticoagulant =`anticoagulant : [String]`
const tubeNumber = `numberoftube : Int`
const volumeMin = `volumemin : Int`
const updatedAt = `updatedAt : String`
const userId = `_id : ID `
const fname = `firstName : String `
const lname = `lastName : String `
const picture = `picture : String `
// lab departments variable
const departmentNameFr = `fr : String!`
const departmentNameEn = `en : String`
const depMnem = `mnemonic : String `
const depDescriptionFr = `fr : String `

// test types
const names = `type Name { ${nameEn} ${nameFr}}`
const reference = `type Reference { ${CPT} ${Mnemonic} }`
const finance = `type Finance {${id} ${country} ${Bcode} }`
const specimen = `type Specimen { ${sampleType} ${tubeColor} ${anticoagulant} ${tubeNumber} ${volumeMin}}`
const updatedBy = `type UpdatedBy { ${userId} ${fname} ${lname} ${picture}}`

// departments types
const departmentName = `type DepName {${departmentNameFr} ${departmentNameEn}} `
const depDescription = `type DepDescription { ${depDescriptionFr} }`

export const LabTestsSchema = buildSchema(`

    ${names}
    
    ${reference}

    ${finance} 

    ${specimen}

    ${updatedBy}

    ${departmentName}

    ${depDescription}

    type Department {
        _id : ID
        ${depMnem}
        name : DepName
        description : DepDescription
    }

    type Update {
        _id : ID
        ${updatedAt}
        updatedBy : UpdatedBy
        name : Name
        reference : Reference
        finance : [Finance]
        specimen : Specimen
        testId : ID
    }

    type EnTest {
        _id: ID
        name : Name
        reference : Reference
        finance : [Finance]
        updates : [Update]
    }

    type FrTest {
        id : ID
        name : Name
        reference : Reference
        finance : [Finance]
        specimen : Specimen
        updates : [Update]
    }

    input LabTestsNames { 
        en : String
        fr : String
    }
    
    input LabTestsReference {
        code : [Int]
        CPT : Int
        Mnemonic : String
    }

    input LabTestsFinance { ${id} ${country} ${Bcode} }

    input LabTestsClassification {
        Panels : String
        LabDepartement : String!
        Molecule : String
    }

    input LabTestPreAnalytics {
        sampleType : [String] ,
        sampleCollectorColor : [String],
        SampleCollectorQuantity : Int ,
        sampleVolumeMin : Int,
        SampleAnticoagulant : [String]
    }

    input User {
        id : String!
    }

    type LabTestsQuery {
        AllLabTests_en : [EnTest]
        AllLabTests_fr : [FrTest]
        fetchTwentyLabTests_fr : [FrTest]
        LabTestView_en( name : LabTestsNames ) : FrTest
        LabTestView_fr( name : String ) : FrTest
        LabTestFrViewByAbbr( abbr : String ) : FrTest
        LabTestFrenchSearch( query : String) : [FrTest]
        LabTestFrenchById (id : String ) : FrTest
        LabTestFrenchByIds (ids : [String] ) : [FrTest]
        fetchTestsByFirstLetter (letter : String) : [EnTest]
        nameEnFilter (en : String ) : [FrTest]
        fetchUpdates : [FrTest]
        fetchUpdateById(id: String) : Update

        fetchDepartments : [Department]
    }

    type LabTestsMutation {
        LabTestNamesUpdate (  testId: ID, names : LabTestsNames) : String
        LabTestReferenceUpdate ( id : ID, reference : LabTestsReference ) : String
        LabTestFinanceUpdate ( name : String, finance : LabTestsFinance, user : User ) : Boolean
        LabTestClassificationUpdate(
            id : ID, departements : [ID], components : [ID], structure : [ID],
            parameter : Boolean, group : Boolean, panel : Boolean,
        ) : Boolean

        LabTestAllUpdate ( 
            names : LabTestsNames,                      
            reference : LabTestsReference, 
            finance : LabTestsFinance,
            preAnalytics : LabTestPreAnalytics
        ) : Boolean 
        createTestsSiteMap : String  
        modifyUpdate (
            id:String, names : LabTestsNames,                      
            reference : LabTestsReference, 
            finance : LabTestsFinance,
            preAnalytics : LabTestPreAnalytics
        ) : String  
        
        modifyUpdateNames(
            testId: String
            updateId : String
            name : LabTestsNames
        ) : String

        modifyUpdateReference(
            testId: String
            updateId : String
            reference : LabTestsReference, 
        ) : String

        modifyUpdateSpecimen(
            testId: String
            updateId : String
            specimen : LabTestPreAnalytics
        ) : String

        modifyUpdateFinance(
            testId: String
            updateId : String
            finance : LabTestsFinance
        ) : String

        addDepartment(depart : String!, mnem: String, descript : String) : String

    }

    schema {
        query : LabTestsQuery
        mutation : LabTestsMutation
    }

`)