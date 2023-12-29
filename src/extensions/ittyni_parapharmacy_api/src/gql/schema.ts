import { buildSchema } from "graphql";
import * as GlobalShema from "../../../../globalSchema"
export const ParapharmacySchema = buildSchema(`
    type ${GlobalShema.account}

    type Parapharmacy {
        _id: String
        name: String
        brand: String
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
        read_parpharmacy_by_id(index: Int): Parapharmacy
        read_parapharmacy_brands: [String]
        read_parapharmacy_by_brand(brand: String): [Parapharmacy]
    }
    type ParapharmacyMutation {
        write_parapharmacies(index: Int) : String
    }
    schema {
        query : ParapharmacyQuery
        mutation : ParapharmacyMutation
    }
`)