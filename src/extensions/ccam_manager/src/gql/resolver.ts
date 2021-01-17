import * as CCAM from '../controller/ccam'
export const ccamResolver = {
    fetchActe : CCAM.fetchActe,
    modifyActe : CCAM.addMultiActes,
    addMultiActes : CCAM.modifyActe,
};