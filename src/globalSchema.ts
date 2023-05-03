// globals
export const _id = `_id: ID`
export const status = `status:String`
export const value = `value:String`
export const type = `type:String`
export const name = `name: String`
export const total = `total: Int`
export const rural = `rural: Int`
export const urbain = `urbain: Int`


// date time
export const YEAR = `year: Int`

// personal
export const civility = `civility: String`
export const gender = `gender: String`
export const firstname = "firstname : String"
export const lastname = "lastname : String"
export const email = "email : String"
export const picture = "picture : String"
export const username = "username : String"
export const day_of_birth = `dob: String`
export const city_of_birth = `pob: String`
export const cne = `cne: String`
// account 
export const code = `code: String` 
export const start = `start: String` 
export const ice = `ice: String` 
export const rc = `rc: String` 
export const account = `Account {
    ${name} ${code} ${ice} ${rc}
    ${start}
}`

// contact 
export const area_unit = `area_unit: ID`
export const area = `region: ID`
export const country = `country: String`
export const zipcode = `zipcode: String`
export const street = `street: String`
export const tele_fix = `fix: [String]`
export const tele_fax = `fax: [String]`
export const tele_mobile = `mobile: [String]`
export const tele = `tele {
    ${tele_fix} ${tele_fax} ${tele_mobile}
}`

export const ADDRESS = `Address {
    ${area_unit} ${area} ${street}
}`
// location
export const latitude = `latitude: String`
export const longitude = `longitude: String`
export const location = `location{${latitude} ${longitude}}`

// professional 
export const INP = `inp: String`

// insurance
export const policy_number = `policy_number: String`
export const policy_matriculation = `policy_number: String`
export const insurance = `Insurance {
    ${name} ${policy_number}
    ${policy_matriculation}
}`
