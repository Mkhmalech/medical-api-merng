import * as NGAP from '../controller/ngap'
export const ngapResolver = {
    fetchActe : NGAP.fetchActe,
    modifyActe : NGAP.addMultiActes,
    addMultiActes : NGAP.modifyActe,
};