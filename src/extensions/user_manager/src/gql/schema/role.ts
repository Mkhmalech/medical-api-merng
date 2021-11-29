const addOrUpdate = `
    id : ID
    addedBy : ID
    updatedBy : ID
`
export const role =`
    {
        name : String
        addedBy : ID
        createdAt : String       
    }
`

const permissions = `
    {
        canRead : Boolean
        canCreate : Boolean
        canUpdate : Boolean
        canDelete : Boolean
        canPublish : Boolean
        ${addOrUpdate}
    }
`
export const roleAndPermissions = `
    type Role ${role}
    input InputRole ${role}

    type Permissions ${permissions}
    input inputPermissions ${permissions}

    type RoleAndPermissions  {
        addRoleToUser(inputRole : InputRole) : String
        updateRoleOfUser(id : ID, updatedBy : ID) : String
        addPermissionsToUser(id : ID, addedBy : ID) : String
        updatePermissionsOfUser(id : ID, updatedBy : ID) : String
    }
`