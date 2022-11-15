import nabm from "../controllers/nabm"

export const NabmResolver = {
    createProcedure : nabm.createProcedure,
    proceduresList : nabm.proceduresList,
    addMultipleProcedures : nabm.addMultipleProcedures,
    procedureDetailsById : nabm.procedureDetailsById,
    updateProcedureDetails : nabm.updateProcedureDetails,
    procedureUpdates : nabm.procedureUpdates,
    userNabmList : nabm.userNabmList,
    nabmUpdateDetailsById : nabm.nabmUpdateDetailsById,
    mergeUpdatesWithNabm : nabm.mergeUpdatesWithNabm,
    userNabmListOnScroll :  nabm.userNabmListOnScroll

}
