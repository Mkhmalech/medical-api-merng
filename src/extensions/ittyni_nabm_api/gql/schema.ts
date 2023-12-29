import { buildSchema } from "graphql";

// variables
const id = `_id: ID`;
const nameEn = `en : String`;
const nameFr = `fr : String`;
const CPT = `CPT : Int`;
const Mnemonic = `Mnemonic : String`;
const country = `country : String`;
const Bcode = `Bcode : Int`;
const code = `code : String`;
const value = `value : Int`;
const price = `price : Int`;
const currency = `currency : String`;
const financeDesc = `description : String`;
const financeSymbol = `symbol : String`;
const sampleType = `nature : [String]`;
const tubeColor = `tubecolor : [String]`;
const anticoagulant = `anticoagulant : [String]`;
const tubeNumber = `numberoftube : Int`;
const volumeMin = `volumemin : Int`;
const updatedAt = `updatedAt : String`;
const userId = `_id : ID `;
const fname = `firstName : String `;
const lname = `lastName : String `;
const picture = `picture : String `;
// test descriptio
const descOverview = `overview: String`;
const descWhy = `why : String `;
const descHow = `how : String `;
const descWhat = `what : String`;
const when = `when: String `;
const testDescription = `type Description {${descOverview} ${descWhy} ${descHow} ${descWhat} ${when}}`;
// lab departments variable
const departmentNameFr = `fr : String!`;
const departmentNameEn = `en : String`;
const depMnem = `mnemonic : String `;
const depDescriptionFr = `fr : String `;
const depDescriptionEn = `en : String `;
// test sample

// test types
const names = `type Name { ${nameEn} ${nameFr}}`;
const reference = `type Reference { ${CPT} ${Mnemonic} }`;
const finance = `Finance {${id} ${country} ${Bcode} ${code} ${value} ${price} ${currency} ${financeDesc} ${financeSymbol} }`;
const specimen = `type Specimen { ${sampleType} ${tubeColor} ${anticoagulant} ${tubeNumber} ${volumeMin}}`;
const updatedBy = `type UpdatedBy { ${userId} ${fname} ${lname} ${picture}}`;
const depDescription = `type DepDescription {${depDescriptionFr} ${depDescriptionEn}}`;
const delivery = `Delivery{time: String}`
const transport = `Transport{temperature: String}`
// departments types
const departmentName = `type DepName {${departmentNameFr} ${departmentNameEn}} `;

const testDepartements = `type Departement {name: DepName ${depMnem} description: Description }`;

export const LabTestsSchema = buildSchema(`

    ${names}
    
    ${reference}

    ${testDescription}

    type ${finance}
    input _${finance}

    ${specimen}

    ${updatedBy}

    ${departmentName}

    ${depDescription}

    type ${delivery}

    type ${transport}

    ${testDepartements}

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
        _id : ID
        name : Name
        reference : Reference
        finance : [Finance]
        specimen : Specimen
        updates : [Update]
        departements : [Departement]
        parameter: Boolean
        group: Boolean
        description : Description
        delivery: Delivery
        transport: Transport
    }

    type OnScrollNabmList {
        procedures : [FrTest]
        total : Int 
        rest : Int
        showed: Int
    }

    input _${delivery}

    input _${transport}

    input LabTestsNames { 
        en : String
        fr : String
    }
    
    input LabTestsReference {
        code : [Int]
        CPT : Int
        Mnemonic : String
    }

    input LabTestsFinance { ${id} ${country} ${Bcode} ${code} }

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

    input _TestSpecimen {
        nature: [String]
        tubecolor: [String]
        anticoagulant: [String]
        numberoftube: Int
        volumemin: Int
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
        read_tests_multiple_ids (_ids : [ID!] ) : [FrTest]
        fetchTestsByFirstLetter (letter : String) : [EnTest]
        nameEnFilter (en : String ) : [FrTest]
        fetchUpdates : [FrTest]
        fetchUpdateById(id: String) : Update
        fetchDepartments : [Department]

        read_testsOnScroll(limit: Int, skip: Int) : OnScrollNabmList
        read_labmTestsOnScroll(limit: Int, skip: Int) : OnScrollNabmList
        read_labm_tests: [FrTest]
        read_tests_name_mnemonic(query: String): [FrTest]
        read_test_by_id(_id: ID!) : FrTest
        read_test_by_query(query: String) : [FrTest]
    }

    type LabTestsMutation {
        LabTestAddNew (${nameFr}, ${nameEn}, ${Mnemonic}, ${CPT}) : String
        LabTestNamesUpdate (  testId: ID, names : LabTestsNames) : String
        LabTestReferenceUpdate ( ${id}, reference : LabTestsReference ) : String
        LabTestFinanceUpdate ( ${id}, ${country}, ${Bcode}, ${code}, ${value}, ${price}, ${currency},${financeDesc} ) : String
        LabTestAddFinance ( ${id}, ${country}, ${Bcode}, ${code}, ${value}, ${price}, ${currency},${financeDesc} ) : String
        updateDescription(${id},${descOverview},${descWhy},${descHow},${descWhat},${when}) : String
        updateSpecimen(${id},${sampleType}, ${tubeColor}, ${anticoagulant}, ${tubeNumber},${volumeMin}):String
        LabTestClassificationUpdate(
            ${id}, departements : [String], components : [String], structure : [String],
            type: String,
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

        write_labm_test(
            name: LabTestsNames, 
            reference: LabTestsReference,
            delivery:_Delivery, transport:_Transport
            specimen: _TestSpecimen
        ): String
        
        write_new_test(
            name: LabTestsNames, 
            reference: LabTestsReference,
            delivery:_Delivery, transport:_Transport
            specimen: _TestSpecimen
            finance: _Finance
        ): String

    }

    schema {
        query : LabTestsQuery
        mutation : LabTestsMutation
    }

`);
