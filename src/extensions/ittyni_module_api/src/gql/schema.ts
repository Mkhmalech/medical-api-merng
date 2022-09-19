import { buildSchema } from "graphql";
// global
const id = `_id : ID`
// schema variables
const componentName = `name : String`
const componentIco = `ico : String`
const componentDescrpt = `description : String`
const createdBy = `createdBy : ID`
const createdAt = `createdAt : String`
const version = `version : String`

export const ComponentSchema = buildSchema(`
    
    type component {
        ${id}
        ${componentName}
        ${componentIco}
        ${componentDescrpt}
        ${createdBy}
        ${createdAt}
        ${version}
    }

    type COMPONENTQ {
        getAllComponents : [component],
        readActiveComponents : [component],
    }
    type COMPONENTM {
        createComponent(${componentName},${componentIco},${componentDescrpt}) : String
        removeComponentById(${id}) : String
    }
    schema {
        query : COMPONENTQ
        mutation : COMPONENTM
    }
`)