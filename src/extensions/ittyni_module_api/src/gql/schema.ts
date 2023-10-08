import { buildSchema } from "graphql";
// global
const id = `_id : ID`
// schema variables
const componentName = `name : String!`
const componentIco = `ico : String`
const componentDescrpt = `description : String`
const createdBy = `createdBy : ID`
const createdAt = `createdAt : String`
const version = `version : String`
const space = `space: String!`
const extension = `Extension {
    ${id}
    ${componentName}
    ${componentDescrpt}
    ${createdBy}
    ${createdAt}
    ${version}
    ${space}
}`
export const ComponentSchema = buildSchema(`
    
    type ${extension}

    input _${extension}

    type COMPONENTQ {
        getAllComponents : [Extension]
        readActiveComponents : [Extension]
        readActiveExtensionsBySpace(space : String) : [Extension]
    }
    type COMPONENTM {
        createComponent(extension: _Extension) : String
        removeComponentById(${id}) : String
    }
    schema {
        query : COMPONENTQ
        mutation : COMPONENTM
    }
`)
