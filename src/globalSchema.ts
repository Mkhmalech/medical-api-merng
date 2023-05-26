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

/** Contact */
// address
export const area_unit = `area_unit: ID`
export const region = `region: String`
export const region_id = `region_id: ID`
export const area_name = `area_name: String`
export const area_id = `area_id: ID!`
export const country = `country: String`
export const zipcode = `zipcode: String`
export const street = `street: String`
export const ADDRESS = `Address {
    ${area_unit} ${area_name} ${street}
}`

/** tele */
export const tele_fix = `fix: [String]`
export const tele_fax = `fax: [String]`
export const tele_mobile = `mobile: [String]`
export const country_code = `country_code: String`
export const country_name = `country_name: String`
export const country_dial_code = `country_dial_code: String`
export const dial_numero = `dial_numero: String`
export const dial_operator = `dial_operator: String`
export const dial_type = `dial_type: String` 
export const tele = `TELE{
    ${tele_fix} ${tele_fax} 
    ${tele_mobile} ${country_code} 
    ${country_name} ${country_dial_code}
    ${dial_numero} ${dial_operator}
    ${dial_type}
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

/**
 * command schema
 */
// contractor part
export const product_id = `product_id: String`
export const consumer_id = `consumer_id: ID`
export const provider_id = `provider_id: ID`
// command details
export const price_unit = `price_unit: String`
export const quantity_unit = `quantity_unit: String`
export const promotion_number = `promotion_number: String`
export const discount = `discount: String`
export const comment = `comment: String`
export const order_date = `order_date: String`
// delivery info
export const delivery_date = `delivery_date: String`
export const delivery_method = `delivery_method: String`
export const delivery_cost = `delivery_cost: String`
export const delivery_address = `delivery_address: String`
// payment
export const payment_date = `payment_date: String`
export const payment_method = `payment_method: String`
export const total_paid = `total_paid: String`
export const commande = `Commande {
    ${product_id} ${consumer_id} ${provider_id} 
    ${price_unit} ${quantity_unit}
    ${promotion_number} ${delivery_date}
    ${delivery_method}  ${delivery_cost}
    ${discount} ${status} ${comment}
    ${order_date} ${payment_date} ${payment_method} 
    ${total_paid}
}`
