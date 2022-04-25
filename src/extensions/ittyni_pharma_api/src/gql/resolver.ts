import * as pharma from '../controller/pharmacy'
export const pharmaResolver = {
    addMultiplePharmacies : pharma.addMultiplePharmacies,
    fetchTwentyPharmacy : pharma.fetchTwentyPharmacy,
    fetchTwentyByCity : pharma.fetchTwentyByCity,
    fetchAllByCity : pharma.fetchAllByCity,
    fetchPharmaDetails : pharma.fetchPharmaDetails,
    searchPharmaByName : pharma.searchPharmaByName,
    fetchPharmaById : pharma.fetchPharmaById,
};