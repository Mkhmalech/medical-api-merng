// User Module here we stock every 
// data recorded from user
type UserId = string;
type UserEmail = string
type UserPassword = string
type UserCode = number
type UserCreatedAt = Date

// User entry data

//== Profile
type UserProfileFirstName = string
type UserProfileLastName = string
type UserProfileMiddleName =string

//== Account
type UserAccountTypeCode = number
type UserAccountTypeName = string

interface UserAccountType {
    typeCode : UserAccountTypeCode
    typeName : UserAccountTypeName
}
// user session 
// last connected

/// Profile Parameters

interface ProfileName {
    first_Name : UserProfileFirstName
    last_Name : UserProfileLastName
    middleName? : UserProfileMiddleName
}
// Profile 
// is data information about 
// user address location male female age
interface Profile {
    name : ProfileName
}

// Account Type :
// User Create Account type which decide if he 
// is a doctor patient ....

interface Account {
    type : UserAccountType
}


// user Token

interface DecodeToken {
    userId: string,
    email: string,
    iat?: number | string,
    exp?: number | string
}


// Roles and Permissions
declare enum Roles {
    SupAdmin = 0,
    Admin = 1,
    UnderAdmin = 2,
    Director = 3, 
    Manager = 4,
    User = 5
}

declare enum RolesPermissions {
    CAN_CREATE = 0,
    CAN_READ = 1,
    CAN_UPDATE = 3,    
    CAN_DELETE = 4
}