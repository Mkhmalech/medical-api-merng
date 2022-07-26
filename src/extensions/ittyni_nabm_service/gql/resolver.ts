import nabm from "../controllers/nabm"

export const NabmResolver = {
    createProcedure : nabm.createProcedure,
    proceduresList : nabm.proceduresList,
    addMultipleProcedures : nabm.addMultipleProcedures,
    procedureDetailsById : nabm.procedureDetailsById,
}