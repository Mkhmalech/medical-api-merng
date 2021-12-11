const departement = `
    name : String
`
const holiday = `
    holiday : String
    duration : Int
`
const leave = `
    leave : String
    duration : Int
`
const automate = `
    brand : String
    analyzer : String
    entryDate : String
`
const types = `
    type holiday { ${holiday} id : ID }
    type departement { ${departement} id : ID }
    type leave { ${leave} id : ID }
    type automate { ${automate} id : ID }
`
const inputs = `
    input Holiday { 
        ${holiday} 
        accountName : String!
    }
    input Departement { 
        ${departement} 
        accountName : String!
    }
    input Leave { 
        ${leave} 
        accountName : String! 
    }
    input Automate { 
        ${automate} 
        accountName : String!
    }
`
export const Setting = `

    ${types}

    ${inputs}

    type LaboSetting {

        listDepartement(accountName : String) : [departement]
        listHoliday(accountName : String) : [holiday]
        listLeave(accountName : String) : [leave]
        listAutomate(accountName : String) : [automate]

        addHoliday (holiday : Holiday) : String
        addDepartement (departement : Departement) : String
        addLeave (leave : Leave): String
        addAutomate (automate : Automate) : String
    }
`