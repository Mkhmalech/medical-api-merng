import { buildSchema } from "graphql";
import * as GlobalShema from "../../../../globalSchema"
export const ParapharmacySchema = buildSchema(`
    type ${GlobalShema.account}
    input _${GlobalShema.account}
    type ParapharmacyQuery {
        read_parapharmacies: String
    }
    type ParapharmacyMutation {
        write_parapharmacy(account: _Account) : String
    }
    schema {
        query : ParapharmacyQuery
        mutation : ParapharmacyMutation
    }
`)