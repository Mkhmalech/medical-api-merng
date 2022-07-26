import { buildSchema } from "graphql";

// variables
const departmnetId = '_id: ID'
const nameFr = 'fr:String'
const descriptionFr = 'fr:String'
const mnemonic='mnemonic: String'
// types
const name = `Name{${nameFr}}`
const description=`Description{${descriptionFr}}`
export const DepartmentSchema = buildSchema(`

    type ${name}

    type ${description}

    type Department {
        ${departmnetId}
        name : Name
        ${mnemonic}
        description : Description     
    }

    type DepartmentQuery {
        departmentsList : [Department]
        departmentDetailsByID(${departmnetId}) : Department
    }
    type DepartmentMutation {
        addDepartment(${nameFr},${mnemonic} ,${descriptionFr}) : String
    }
    schema {
        query : DepartmentQuery
        mutation : DepartmentMutation
    }
`)