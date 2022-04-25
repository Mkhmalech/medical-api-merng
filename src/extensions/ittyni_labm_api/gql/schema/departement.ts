
const Departement = `
    name : String!
`

export const departement = `

 type Department { ${Departement} }

 input iDepartement {
    accountName : String
    ${Departement}
 }

 type LaboDepartement { 
    departementList(accountName : String) : [Department]
    addDepartement(departement : iDepartement ) : String
 }
`