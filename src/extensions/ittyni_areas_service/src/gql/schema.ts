import { buildSchema } from "graphql";
import { 
    country, name, area, rural, total, type, urbain, YEAR, zipcode, _id 
} from "../../../../globalSchema";

const AREA = `Area {
    ${_id}
    ${name} ${type}
    ${area} ${country}
    population : [Population]
}`

const AreaUnit = `AreaUnit {
    ${name} ${type} ${zipcode}
    areaId : ID!
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
        read_countryAreas(${country}) : [Area]
        read_areaAreas(${area}) : [Area]
        read_areaByname(${name}) : [Area]
        read_areaBytype(${type}) : [Area]
        read_areasOfarea(${area}): [Area]
        read_zipcodesOfArea(areaId: ID!): [AreaUnit]
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
