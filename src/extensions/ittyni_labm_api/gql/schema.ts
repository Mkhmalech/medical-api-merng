import { buildSchema } from 'graphql';
import { Setting, LaboCatalog, LaboTeam, LaboTeamQuery } from './schema/index'
// global
const id = `_id : ID`
const name = 'name:String'
// account fragment
const ice = `ice:String`
const rc = `rc:String`
const code = `code:String`
const inp = `inp:String`
const yearofcreation = `yearofcreation:String`
const Account = `Account {
        ${name} ${code}
        ${ice} ${rc}
        ${inp} ${yearofcreation}
    }
`
// tele fragment
const fix = `fix:[String]`
const fax = `fax:[String]`
const type = `type:String`
const value = `value:String`
const owner = `owner:String`
const Tele = `Tele {
    ${fix} ${fax}        
    ${type} ${value}        
    ${owner}      
}`
// email fragment
const Email = `Email{
    ${type} ${value} ${owner}  
}`
// address fragment
const region = `region :String`
const province = `province :String`
const commune = `commune :String`
const street = `street :String`
const city = `city :String`
const Address = `Address {
        ${region}  ${province}
        ${commune}  ${street}
        ${city}
    }
`
// extension
const componentId = 'componentId : ID'
const componentName = 'componentName : ID'
const component = `type Component { ${id} ${name}}`
const accountId = 'accountId : ID'
const accountType = 'accountType : String'



/**
 * location
 */
const latitude = `latitude: String`
const longitude = `longitude: String`
const location = `Location{${latitude} ${longitude}}`
const Contact = `Contact {
        tele : Tele
        email : Email
        address : Address
    }
`
const Types = `

    type ${Tele}

    type ${Address}

    type ${Account}

    type ${Contact}

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
const Inputs = `

    input _${Account}
    input _${Tele}
    input _${Email}
    input _${Address}
    input _Contact {
        tele: _Tele
        email: _Email
        address: _Address
    }
`

export const LaboSchema = buildSchema(`

    ${component}

    ${LaboCatalog}    

    ${Types}

    ${Setting}

    ${LaboTeam}

    ${LaboTeamQuery}

    ${Inputs}

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

        update_labmIdentification(${id}!, account: _Account): String
        update_labmContact(${id}!, contact: _Contact): String
    }

    schema {
        query : LaboQuery
        mutation : laboMutation
    }

`)

