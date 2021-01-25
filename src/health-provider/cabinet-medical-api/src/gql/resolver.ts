import * as Cabinet from '../controller/cabinet'
export const cabinetResolver = {
    createNewCabinet : Cabinet.createNewCabinet,
    listAllCabinets : Cabinet.listAllCabinets,
    cabinetSearchTest : Cabinet.cabinetSearchTest,
    addNewPatientToCabinet : Cabinet.addNewPatientToCabinet,
    listCabinetPatients : Cabinet.listCabinetPatients,
    cabinetPatientDetails : Cabinet.cabinetPatientDetails,
    cabinetFindPatient : Cabinet.cabinetFindPatient,
    cabinetAddLabOrder : Cabinet.cabinetAddLabOrder,
    addMultipleCabinets : Cabinet.addMultipleCabinets,
};
