import * as Cabinet from '../controller/cabinet'
export const cabinetResolver = {
    // queries
    
    listAllCabinets: Cabinet.listAllCabinets,
    cabinetSearchTest: Cabinet.cabinetSearchTest,
    listCabinetPatients: Cabinet.listCabinetPatients,
    cabinetPatientDetails: Cabinet.cabinetPatientDetails,
    cabinetFindPatient: Cabinet.cabinetFindPatient,
    cabinetAddLabOrder: Cabinet.cabinetAddLabOrder,
    listCabinetsCities: Cabinet.listCabinetsCities,
    listCabinetsTwntyByCity: Cabinet.listCabinetsTwntyByCity,
    listCabinetsAllByCity: Cabinet.listCabinetsAllByCity,
    listWaitingPatients: Cabinet.listWaitingPatients,
    listCabinetDetailsById: Cabinet.listCabinetDetailsById,
    CabinetListOnScroll: Cabinet.CabinetListOnScroll,
    
    // mutations

    /**update data */
    updatePatientToViewed: Cabinet.updatePatientToViewed,
    updatePatientToFinished: Cabinet.updatePatientToFinished,
    
    /**create data on cabinets */
    addMultipleCabinets: Cabinet.addMultipleCabinets,
    addNewPatientToCabinet: Cabinet.addNewPatientToCabinet,
    addPatientToWaitingRoom: Cabinet.addPatientToWaitingRoom,
    setPatientToViewed: Cabinet.setPatientToViewed,
    setPatientToFinished: Cabinet.setPatientToFinished,
    setPatientToWaiting: Cabinet.setPatientToWaiting,
    /**extensions */
    activateExtensionOnCabinet: Cabinet.activateExtensionOnCabinet,

    /**create data on table */
    createNewCabinet: Cabinet.createNewCabinet,
    createCabinetsSiteMap: Cabinet.createCabinetsSiteMap,
    
};
