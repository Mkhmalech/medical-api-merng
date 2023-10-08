import { buildSchema } from "graphql";
import * as GlobalShema from "../../../../globalSchema"
export const ParapharmacySchema = buildSchema(`
    type ${GlobalShema.account}
    type Parapharmacy {
        _id: String
        account : Account
    }
    type ParaPharmaOnScroll {
        parapharmas : [Parapharmacy]
        showed: Int,
        total: Int,
        rest: Int
    }
    input _${GlobalShema.account}

    type ParapharmacyQuery {
        read_ParaPharamaciesOnScroll(limit: Int!, skip: Int!): ParaPharmaOnScroll
    }
    type ParapharmacyMutation {
        write_parapharmacy(account: _Account) : String
    }
    schema {
        query : ParapharmacyQuery
        mutation : ParapharmacyMutation
    }
`)