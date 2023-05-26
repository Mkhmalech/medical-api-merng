import { buildSchema } from "graphql";
import { 
    country, name, rural, total, type, urbain, YEAR, 
    zipcode, _id, area_name, area_id, region 
} from "../../../../globalSchema";

const AREA = `Area {
    ${_id}
    ${name} ${type}
    ${region} ${country}
    population : [Population]
}`

const AreaUnit = `AreaUnit {
    ${name} ${type} ${zipcode}
    areaId : ID! ${_id}
}`

const POPULATION = `Population {
    ${total} ${rural}
    ${urbain} ${YEAR}
}`
export const AreaSchema = buildSchema(`

    type ${POPULATION}
    type ${AREA}
    type ${AreaUnit}

    input _${AreaUnit}

    type AreaQuery {
        read_areaParents(${country}): [String]
        read_countryAreas(${country}) : [String]
        read_regionAreas(${region}) : [Area]
        read_areaByname(${name}) : [Area]
        read_areaBytype(${type}) : [Area]
        read_areasOfarea(${area_id}): [Area]
        read_zipcodesByAreaId(${area_id}): [AreaUnit]
        read_zipcodesByAreaName(${area_name}): [AreaUnit]
    }

    type AreaMutation {
        write_areaUnit(unit: _AreaUnit): String
        saveFile : String
    }

    schema {
        query : AreaQuery
        mutation : AreaMutation
    }
`)
