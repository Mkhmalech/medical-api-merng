import { buildSchema } from 'graphql';

const Departement = `
    type Departement {
        name : String
        _id : ID
    }
`

const Employer = `

    ${Departement}
    type Role {
        role : String
        _id : ID
    }
    type Employer {
        id : ID
        addedBy  : ID
        civility : String
        firstName : String
        lastName : String
        ppr : Int
        role : Role 
        password : String
        departement : Departement
    }
`
const Cabinet = `
    type CabinetAccount {
        name : String
    }
    type Cabinet {
        _id : ID
        account : CabinetAccount
    }
`

const shift = `
    type Shift {
        id: ID,
        mounth: Int,
        year: Int,
        type: String,
        days : [Int],
        addedBy: ID,
        createdAt: String,
        employer: Employer,
        departement : Departement
    }
`
const inputEmployer = `
    input EmployerInput {
        civility : String
        firstName : String
        lastName : String
        ppr : Int
        password : String
        role : ID
        departementName : String
        accountName : String
    }
`

const StaffQuery = `
    type StaffQuery {
        employerListAll(accountName : String) : [Employer]
        findEmployer(query : String) : Employer
        fetchAllShifts(accountName : String) : [Shift]
        fetchExistingEmployer(employerId : String, accountName : String) : Employer
        fetchContributorCabinets : [Cabinet]
    }
`

const StaffMutation = `
    type StaffMutation {
        employerAddNew(employer : EmployerInput) : String
        employerDelete(id : ID) : String
        assignShiftsToEmployer(userId : ID, type : String, days : [Int], mounth: Int, year: Int, departementId: ID, accountName : String): String
        deleteShift(id : ID) : String
        addContributorCabinet(id : ID) : String
    }
`

export const staffSchema = buildSchema(`

    ${Employer} 

    ${Cabinet} 

    ${inputEmployer} 

    ${StaffQuery}

    ${StaffMutation}

    ${shift}

    schema {
        query : StaffQuery
        mutation : StaffMutation
    }    
`)