import { buildSchema } from "graphql";

// variables
const procedureId = `_id: ID`
const updateId = `_id: ID`
const name = `name : String`;
const mnemonic = `mnemonic : String`
const type = `type : String`
const unit = `unit: String`
const component = `componentId: ID`
// test calculation
const formula=`Formula { 
    isOp: Boolean 
    isParam: Boolean, 
    nabm: ID
    op:String, 
    step: Int, 
    ${unit}
}`
// finance
const country = `country : String`
const symbol = `symbol : String`
const code = `code : String`
const value = `value : Int`
const price = `price : String`
const currency = `currency : String`
const financeDesc = `description : String`
// preanalytics
const sampleType = `nature : [String]`
const tubeColor = `tube : [String]`
const anticoagulant = `anticoagulant : [String]`
const tubeNumber = `numberoftube : Int`
const volumeMin = `volumemin : Int`
const updatedAt = `updatedAt : String`
// user updates
const userId = `_id : ID `
const fname = `firstName : String `
const lname = `lastName : String `
const picture = `picture : String `
const status = `status:String`
const updatedBy=`type User {${userId} ${fname} ${lname} ${picture}}`
// test descriptio
const descOverview = `overview: String`
const descWhy = `why : String `
const descHow = `how : String `
const descWhat = `what : String`
const descWhen = `when: String `
const nabmDescription = `NabmDescription {${descOverview} ${descWhy} ${descHow} ${descWhat} ${descWhen}}` 
// lab departments variable
const departmentId = `_id : ID`
const departmentNameFr = `fr : String`
const departmentName = `Name {fr : String}`
const departmentNameEn = `en : String`
const departmentMnem = `mnemonic : String `
const departmentDescriptionFr = `fr : String `
const departmentDescription = `Description {fr : String}`
const depDescriptionEn = `en : String `
const department = `Departement {name: Name description:Description ${mnemonic} ${departmentId}}`
// test samplespecimen
const specimen = `Specimen {
    ${sampleType}
    ${tubeColor}
    ${anticoagulant}
    ${tubeNumber}
    ${volumeMin}
}`

// finance
const finance = `Finance { ${country}, ${symbol}, ${code}, ${price}, ${currency} }`


export const NabmSchema = buildSchema(`
  
    type ${departmentName}
    type ${departmentDescription}
    type ${department}
    type ${specimen}
    ${updatedBy}
    type ${finance}
    type ${nabmDescription}
    type Formula { 
        isOp: Boolean 
        isParam: Boolean, 
        nabm: Procedure
        op:String, 
        step: Int, 
        ${unit}
    }
    type Procedure  { 
        ${name} ${code} ${mnemonic} 
        ${procedureId} ${type} ${unit}
        formula: [Formula]
        departements : [Departement]
        specimen: Specimen
        finance: [Finance]
        updates : [ProcedureUpdate]
        description: NabmDescription
    }

    type ProcedureUpdate {
        ${name} ${code} ${mnemonic} 
        ${procedureId} ${updatedAt}
        ${type} ${unit} 
        ${status}
        formula: [Formula]
        departements : [Departement]
        specimen: Specimen
        finance: [Finance]
        updatedBy : User
    }

    type OnScrollNabmList {
      procedures : [Procedure]
      total : Int 
      rest : Int
      showed: Int
    }
    type nabmQuery {
        proceduresList : [Procedure] 
        procedureDetailsById(${procedureId}) : Procedure
        procedureUpdates(${procedureId}): [ProcedureUpdate]
        nabmUpdateDetailsById(${updateId}): ProcedureUpdate
        userNabmList(limit: Int, skip: Int) : [Procedure]
        userNabmListOnScroll(limit: Int, skip: Int) : OnScrollNabmList
    }

    input _${finance}
    input _${specimen}
    input _${nabmDescription}
    input _${formula}
   
    type nabmMutation {
        createProcedure(${name}!, ${code}!, ${mnemonic}) : String
        addMultipleProcedures : String
        updateProcedureDetails(
            ${procedureId}!, ${mnemonic},
            formula:[_Formula],
            type: String, unit: String,
            finance: _Finance,
            specimen: _Specimen,
            description: _NabmDescription
            departements: [String],
            components: [String]
        ) : Procedure
        mergeUpdatesWithNabm(${updateId}) : Procedure
    }
    
    schema {
        query : nabmQuery
        mutation : nabmMutation
    }

`)
