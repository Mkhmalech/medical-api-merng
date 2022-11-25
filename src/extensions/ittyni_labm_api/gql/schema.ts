import { buildSchema } from 'graphql';
import { Setting, LaboCatalog, LaboTeam, LaboTeamQuery } from './schema/index'
// global
const id = `_id : ID`
const name = 'name:String'
// extension
const componentId = 'componentId : ID'
const componentName = 'componentName : ID'
const component = `type Component { ${id} ${name}}`
const accountId = 'accountId : ID'
const accountType = 'accountType : String'
const Tele =`
    type Tele {
        fix : [String]
        fax : [String]
    }
`
const Account = `
    type Account {
        name : String
        code : Int
    }
`
const Address = `
    type Address {
        region : String
        province : String
        commune : String
        street : String
        city : String
    }
`
/**
 * location
 */
const latitude=`latitude: String`
const longitude=`longitude: String`
const location =`Location{${latitude} ${longitude}}`
const Contact = `
    ${Tele}
    ${Address}
    type Contact {
        tele : Tele
        address : Address
    }
`
const Labo = `

    ${Account}
    ${Contact}

    type ${location}

    type LaboInfo {
        _id : ID
        account : Account
        contact : Contact
        location: Location
        views : Int
    }
    type Labo {
        LaboInfoListAll : [LaboInfo]
        addNewAccountLab(
            name : String,
            Fix : String,
            fax : String,
            street : String,
            city : String
        ) : String
    }
`

export const LaboSchema = buildSchema(`

    ${component}

    ${LaboCatalog}    

    ${Labo}

    ${Setting}

    ${LaboTeam}

    ${LaboTeamQuery}

    type LaboListOnScroll {
      labos : [LaboInfo]
      showed : Int
      rest : Int 
      total : Int
    }
    type LaboQuery {
        catalog : LaboCatalog
        LaboListAll : [LaboInfo]
        LaboListOnScroll(limit: Int, skip: Int) : LaboListOnScroll
        LaboListByCity(city : String) : [LaboInfo]
        LaboListTwentyByCity(city : String) : [LaboInfo]
        LaboDetails(name : String) : LaboInfo
        fetchLaboById(id : String) : LaboInfo
        searchLaboByName(query : String) : [LaboInfo]
        team : LaboTeamQuery
        LaboFetchComponents(${accountId}) : [Component]


        readLabmDetailsById(_id: ID!): LaboInfo
    }

    type laboMutation {
        LaboUpdateAddress(city : String) : String 
        LaboAddNewLabos : String 
        setting : LaboSetting
        team : LaboTeam
        addNewAccountLab(
            name : String,
            Fix : String,
            fax : String,
            street : String,
            city : String
        ) : String
        LaboDeleteRepeatedAccount : String
        activateModules(${componentId}, ${accountId}, ${accountType}) : String
    }

    schema {
        query : LaboQuery
        mutation : laboMutation
    }

`)

