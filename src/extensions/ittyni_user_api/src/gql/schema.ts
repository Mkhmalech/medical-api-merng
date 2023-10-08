import { buildSchema } from "graphql";
import { roleAndPermissions } from "./schema/role";
import { tele } from "../../../../globalSchema";

// global variable
const id = "_id : ID"

// user schema variables 
const civility = `civility: String`
const gender = `gender: String`
const firstname = "firstName : String"
const lastname = "lastName : String"
const email = "email : String"
const picture = "picture : String"
const username = "username : String"
const dayofbirth = `dob: String`
const cityofbirth = `pob: String`
const cne = `cne: String`
const inp = `inp: String`
const address = `address: String`
const city = `city: String`
const subdivision = `subdivision: String`
const division = `division: String`
const region = `region: String`
const country = `country: String`
const latitude = `latitude: String`
const longitude = `longitude: String`
const status = `status:String`
const value = `value:String`
const type = `type:String`
const location = `LOCATION{${latitude} ${longitude}}`
const USER_TELE = `USER_${tele}`

// Insurance
const provider = `provider: String`;
const beneficiary = `beneficiary: String`;
const numAffiliation = `numAffiliation: String`;
const numImmatriculation = `numImmatriculation: String`;

// user personal information
const user_profile_personal = `USER_PROFILE_PERSONAL {
    ${civility}  ${gender} ${firstname} 
    ${lastname} ${username} ${dayofbirth} 
    ${cityofbirth} ${cne}
}`
// user profile contact 
const user_profile_contact = `USER_PROFILE_CONTACT {
    ${email} ${address} 
    ${city} ${country}
}`
// user professional profile
const user_profile_professional = `USER_PROFILE_PROFESSIONAL {
    ${inp}
}`
const user_insurance = `USER_INSURANCE {
    ${provider}
    ${beneficiary}
    ${numAffiliation}
    ${numImmatriculation}
}`
export const _USER_PROFILE_PERSONAL = `input _${user_profile_personal}`
export const _USER_PROFILE_CONTACT = `input _${user_profile_contact}`
export const _USER_LOCATION = `input _${location}`
export const _USER_TELE = `input _${USER_TELE}`
export const _USER_PROFILE_PROFESSIONAL = `input _${user_profile_professional}`
export const _USER_INSURANCE = `input _${user_insurance}`

export const newUser_inputs = `input _NewUser {
    personal: _USER_PROFILE_PERSONAL
    contact : _USER_PROFILE_CONTACT
    profession : _USER_PROFILE_PROFESSIONAL
}`


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
const Account = `type Account {${accountName} ${id} }`

const linkAccount = `
    id : String
    accountName : String
`

export const UserSchema = buildSchema(`

    ${Account}

    type ${user_profile_personal}
    type ${user_profile_contact}
    type ${location}
    type ${USER_TELE}

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
    type Extension {
        _id: ID
        name: String
        status: String
        space: String
        description: String
    }
    type ExtensionPermissions {
        ${id}
        component: Extension
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
        labo : UserSubscribedAccounts
        cabinet : UserSubscribedAccounts
        pharma : UserSubscribedAccounts
        space : UserSubscribedAccounts
        role : RoleName
        permissions : [ UserRoleAndPermissions ]
    }

    type ReturnedUser {
        ${id}
        username : String
        role : RoleName
        status : String
        accounts : [UserAccountName]
        personal : USER_PROFILE_PERSONAL
        permissions : [ UserRoleAndPermissions ]
    }

    type SubscribedAccount {
        _id: ID
        name: String
    }

    type UserSubscribedAccounts {
        _id : ID
        account : SubscribedAccount
    }

    type FrontUser {
        ${id},
        email  : String,
        picture : String,
        ${gender} ${firstname} 
        ${lastname} ${username} 
        ${dayofbirth} ${cityofbirth} 
        ${cne} ${inp}
        role : RoleName
        accounts : [UserAccountName]
        contact : USER_PROFILE_CONTACT
        tele : [USER_TELE]
        permissions : [ ExtensionPermissions ]
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

    input inputLinkAccount { ${linkAccount} }

    ${roleAndPermissions}

    ${_USER_PROFILE_PERSONAL}
    ${_USER_PROFILE_CONTACT}
    ${_USER_LOCATION}
    ${_USER_TELE}
    ${_USER_INSURANCE}
    

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
        addNewUser(_id: String) : String 
        login(userInput: UserInput) : UserAuth!
        getUserDetails(id : String) : UserWithRole
        linkUserToAccount(${userId}, ${accountId}, ${accoutType} ) : String
        signupWithGoogle(email:String, fname:String, lname:String, picture:String) : GGUser
        activateExtension(_id: ID!) : [Extension]

        user_updateProfileInformation(_id: ID!, iPersonal: _USER_PROFILE_PERSONAL): String
        user_updateProfileContact(_id: ID!, iContact: _USER_PROFILE_CONTACT): String
        user_updateProfileLocation(_id: ID!, iLocation: _LOCATION): String
        user_updateProfileTele(_id: ID!, iTele: _USER_TELE) : String
        user_addLabSpace(${id},tele: String, role: String): String
        user_addCabinetSpace(${id},tele: String, role: String): String
    }
    
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`)
