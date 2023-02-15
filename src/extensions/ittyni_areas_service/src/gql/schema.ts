import { buildSchema } from "graphql";
import { 
    COUNTRY, NAME, REGION, RURAL, TOTAL, TYPE, URBAIN, YEAR, ZIPCODE, _id 
} from "../../../../globalSchema";

const AREA = `Area {
    ${_id}
    ${NAME} ${TYPE}
    ${REGION} ${COUNTRY}
    population : [Population]
}`

const AreaUnit = `AreaUnit {
    ${NAME} ${TYPE} ${ZIPCODE}
    areaId : ID!
}`

const POPULATION = `Population {
    ${TOTAL} ${RURAL}
    ${URBAIN} ${YEAR}
}`
export const AreaSchema = buildSchema(`

    type ${POPULATION}
    type ${AREA}

    input _${AreaUnit}

    type AreaQuery {
        read_areaParents(${COUNTRY}): [String]
        read_countryAreas(${COUNTRY}) : [Area]
        read_regionAreas(${REGION}) : [Area]
        read_areaByName(${NAME}) : [Area]
        read_areaByType(${TYPE}) : [Area]
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