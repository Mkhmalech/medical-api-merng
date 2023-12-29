import * as PPharma from "../controller/parapharmacy"
export const ParapharmacyResolver = {
    read_ParaPharamaciesOnScroll : PPharma.read_ParaPharamaciesOnScroll,
    read_parpharmacy_by_id: PPharma.read_parpharmacy_by_id,
    read_parapharmacy_brands: PPharma.read_parapharmacy_brands,
    read_parapharmacy_by_brand: PPharma.read_parapharmacy_by_brand,

    write_parapharmacies : PPharma.write_parapharmacies,
};