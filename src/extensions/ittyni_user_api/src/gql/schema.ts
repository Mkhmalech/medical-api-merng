import { buildSchema } from "graphql";
import { roleAndPermissions } from "./schema/role";

// global variable
const id = "_id : ID"

// user schema variables 
const fname = "firstname : String"
const lname = "lastname : String"
const email = "email : String!"
const picture = "picture : String"
const username = "username : String"

// user updates
const userId = "userId: ID"
const addedBy = "addedby: ID"
const addedAt = "addedAt: String"
const updatedBy = "updatedBy: ID"
const updatedAt = "updatedAt: String"

// registered account
const labId = "labId : ID"
const cabinetId = "cabinetId : ID"
const pharmaId = "pharmaId : ID"

// role
const roleName = "name : String"
const roleStatus = "status : String"
const role = `type Role {${roleName} ${roleStatus}}`

// component permissions 
const componentId = "componentId: ID"
const component = "component: String"
const canCreate = "create: Boolean"
const canRead = "read: Boolean"
const canUpdate = "update: Boolean"
const canPublish = "publish : Boolean"
const canDelete = "delete: Boolean"

/**
 * users
 */
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
/**
 * account
 */
const accountId = `accountId:ID`
const accoutType = `accountType: String`
const accountName = `name: String`
const Account = `type Account {${accountName}}`

const linkAccount = `
    id : String
    accountName : String
`

export const UserSchema = buildSchema(`

    ${Account}

    type RoleName {
        name : String
    }
    type GGUser {
        ${id}
        email : String
        picture : String
        firstName : String
        lastName : String
        token : String
        tokenExpired : Int
        role : Role
        accounts : [UserAccountName]
    }

    type UserWithoutPassword { ${userWithoutPassword} }

    type UserWithRole { ${UserWithRole} }

    type UserRoleAndPermissions {
        ${id}
        component: ID
        create: Boolean
        read: Boolean
        update: Boolean
        publish : Boolean
        delete: Boolean
    }
    type UserRole {
        ${id}
      addedby: ID
      role: String
      permissions: [ UserRoleAndPermissions ]          
    }
    type UserAccountName {
        labo : ID
        cabinet : ID
        pharma : ID
        role : RoleName
        permissions : [ UserRoleAndPermissions ]
    }

    type ReturnedUser {
        ${id}
        username : String
        role : RoleName
        status : String
        accounts : [UserAccountName]
    }

    type FrontUser {
        ${id},
         email  : String,
         picture : String,
         firstName : String,
         lastName : String
         role : RoleName
         accounts : [UserAccountName]
    }

    type User {
        ${id}!
        email : String!
        password : String!
    }

    type UserAuth {
        ${id}!
        token : String!
        username : String!
        email : String!
        accountName : String
        accountId : String
    }

    type UserSession {
        token : String!
        tokenExpired : Int!
    }

    input UserInput {
        email : String!
        password : String!
    }

    input UserSignUp {
        email : String!
        password : String!
        ConfirmPassword : String!
    }

    type Extension {
        _id : ID!
        name : String!        
        canRead : Boolean
        canCreate : Boolean
        canUpdate : Boolean
        canDelete : Boolean
        canPublish : Boolean
    }

    input inputLinkAccount { ${linkAccount} }

    ${roleAndPermissions}

    type RootQuery {
        userProfile(token : String ) : User
        verifyToken( token : String!) : ReturnedUser
        verifyFrontToken( token : String!) : FrontUser

        listAll : [UserWithoutPassword!]!

        listAllWithRole : [UserWithRole]

        subscribedAccounts : [Account]

        readUserExtensions : [Extension]
    }

    type RootMutation {
        roleAndPermissions : RoleAndPermissions

        linkAccountToUser(iLinkAccount : inputLinkAccount) : String
        activateModuleInAccount(userId : String!, accountId : String!, extensions : [String!]) : String
        addPermissions(${userId}, ${componentId}, ${accountId}, ${accoutType}) : String
        
        createNewUser(userInput : UserSignUp) : UserSession 
        upgradeToUser(userInput : UserSignUp) : UserSession 
        addNewUser(addedby : ID, email : String, password: String, role: String, status: String) : String 
        login(userInput: UserInput) : UserAuth!
        getUserDetails(id : String) : UserWithRole
        linkUserToAccount(${userId}, ${accountId}, ${accoutType} ) : String
        signupWithGoogle(email:String, fname:String, lname:String, picture:String) : GGUser
        activateExtension(_id: ID!) : [Extension]
    }
    
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)