import * as qu from '../controller/queuing'
export const QueuingResolver = {
    addNewDesk: qu.addNewDesk,
    addNewLabeler: qu.addNewLabeler,
    getMachine: qu.getMachine,
    setWorker: qu.setWorker,
    setDeskStatus: qu.setDeskStatus,
    deleteMachine: qu.deleteMachine,
    getAllMachines: qu.getAllMachines,
    addTicket: qu.addTicket,
    setTicketStatus: qu.setTicketStatus,
    getLastTicket: qu.getLastTicket,
    getTickets: qu.getTickets,
    createQueuing: qu.createQueuing,
    fetchQueuings: qu.fetchQueuings,
};