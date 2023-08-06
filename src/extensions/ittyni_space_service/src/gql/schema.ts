import { buildSchema } from "graphql";
import { _id, account, location, photo, tele, viewport } from "../../../../globalSchema";



export const SpaceSchema = buildSchema(`
    type ${tele}
    input _${tele}
    type ${location}
    input _${location}
    type ${viewport}
    input _${viewport}
    type Geometry{
        location: Location
        viewport: Viewport
    }
    input _Geometry{
        location: _Location
        viewport: _Viewport
    }
    type ${account}
    input _${account}
    type Space {
        account: Account
        geometry: Geometry
        viewport: Viewport
        tele: TELE
    }

    input _Space{
        ${photo}
        account: _Account
        geometry: _Geometry
        viewport: _Viewport
        tele: _TELE
    }

    type SMQuery {
        read_user_spaces: [Account]
        read_space_details(${_id}): Space
    }

    type SMMutation {
       write_linkSpaceToUser(space: _Space): Account
    }
    schema {
        query : SMQuery
        mutation : SMMutation
    }
`)