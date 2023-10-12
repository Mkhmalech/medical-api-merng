import { buildSchema } from "graphql";
import { _id, account, location, photo, tele, viewport } from "../../../../globalSchema";

const extension = `Extension{
    _id: String
    name: String
    status: String
    space: String
    description: String
}`


export const SpaceSchema = buildSchema(`
    type ${extension}
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
        space_id: String
    }

    type SMQuery {
        read_user_spaces: [Account]
        read_space_details(${_id}): Space
        read_spaceExtensions(${_id}): [Extension]
    }

    type SMMutation {
       write_linkSpaceToUser(space: _Space): Account
       write_activateExtensionOnSpace(${_id}, componentId: ID!): [Extension]
    }
    schema {
        query : SMQuery
        mutation : SMMutation
    }
`)
