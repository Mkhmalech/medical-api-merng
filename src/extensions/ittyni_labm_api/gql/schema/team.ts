const permission = `{
    componentName : String
    read : Boolean
    create : Boolean
    update : Boolean
    delete : Boolean
}`
const ComponentPermission= `type ComponentPermission ${permission}`
const InputPermission= `input InputPermission ${permission}`
const AccountRoles = `
    ${ComponentPermission}
    ${InputPermission}
    type AccountRoles {
        _id : ID
        role : String
        permissions : [ComponentPermission]
    }
`

export const LaboTeam =`
    type LaboTeam {
        addNewRole(status : String) : String
        updateRole(name : String) : String
        deleteRole(role : String) : String
        addPermissionToRole(permission : Boolean) : String
        updatePermissionOfRole(role : String, permissions : [InputPermission]) : String
        deletePermissionOfRole(permissions : Boolean) : String
    }
`
export const LaboTeamQuery =`

    ${AccountRoles}

    type LaboTeamQuery {
        fetchAccountRoles : [AccountRoles]
    }
`