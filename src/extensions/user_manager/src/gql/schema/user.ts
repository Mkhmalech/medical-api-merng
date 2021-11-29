const userWithoutPassword = `
    id : ID!
    email : String!
`

const UserWithRole = `
    id : ID!
    email : String!
    role : Role 
    status : String
    picture : String
    firstname : String
    lastname : String
`

export const users = `
    type RoleName {
        name : String
    }
    type GGUser {
        _id : ID
        email : String
        picture : String
        firstName : String
        lastName : String
        token : String
        tokenExpired : Int
        role : RoleName
        accounts : UserAccountName
    }

    type UserWithoutPassword { ${userWithoutPassword} }

    type UserWithRole { ${UserWithRole} }

`