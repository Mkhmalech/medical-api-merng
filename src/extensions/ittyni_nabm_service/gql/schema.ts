import { buildSchema } from "graphql";

// variables
const procedureId = `_id: ID`
const name = `name : String`;
const CPT = `CPT : Int`
const mnemonic = `mnemonic : String`
const country = `country : String`
const code = `code : String`
const type = `type : String`
const value = `value : Int`
const price = `price : Int`
const currency = `currency : String`
const financeDesc = `description : String`
const sampleType = `nature : [String]`
const tubeColor = `tubecolor : [String]`
const anticoagulant = `anticoagulant : [String]`
const tubeNumber = `numberoftube : Int`
const volumeMin = `volumemin : Int`
const updatedAt = `updatedAt : String`
const userId = `_id : ID `
const fname = `firstName : String `
const lname = `lastName : String `
const picture = `picture : String `
const updatedBy=`type User {${userId} ${fname} ${lname} ${picture}}`
// test descriptio
const descOverview = `overview: String`
const descWhy = `why : String `
const descHow = `how : String `
const descWhat = `what : String`
const when = `when: String `
const testDescription = `type Description {${descOverview} ${descWhy} ${descHow} ${descWhat} ${when}}` 
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
// test sample



export const NabmSchema = buildSchema(`
    directive @supadmin(if: Boolean!) on 
    | QUERY
    | MUTATION
    | SUBSCRIPTION
    | FIELD
    | FRAGMENT_DEFINITION
    | FRAGMENT_SPREAD
    | INLINE_FRAGMENT
    | VARIABLE_DEFINITION
    type ${departmentName}
    type ${departmentDescription}
    type ${department}
    ${updatedBy}
    
    type Procedure  { 
        ${name} ${code} ${mnemonic} ${procedureId}
        departements : [Departement]
        updates : [ProcedureUpdate]
    }
    type ProcedureUpdate {
        ${name} ${code} ${mnemonic} ${procedureId} ${updatedAt}
        updatedBy : User
    }

    type nabmQuery {
        proceduresList : [Procedure]  
        procedureDetailsById(${procedureId}) : Procedure
        procedureUpdates: [Procedure] 
    }
   
    type nabmMutation {
        createProcedure(${name}!, ${code}!, ${mnemonic}) : String
        addMultipleProcedures : String
        updateProcedureDetails(${procedureId}, ${code}, ${mnemonic}, ${type}) : Procedure
    }
    
    schema {
        query : nabmQuery
        mutation : nabmMutation
    }

`)