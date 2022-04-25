import * as NGAP from '../controller/ngap'
export const ngapResolver = {
    fetchActes : NGAP.fetchActes,
    modifyActe : NGAP.modifyActe,
    addMultiActes : NGAP.addMultiActes,
    fetchChapters : NGAP.fetchChapters,
    fetchGroups : NGAP.fetchGroups,
    fetchActeDetails : NGAP.fetchActeDetails,
    searchNgapActe : NGAP.searchNgapActe,
    createNgapSiteMap : NGAP.createNgapSiteMap,
};