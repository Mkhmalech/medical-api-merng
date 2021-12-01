import { buildSchema } from "graphql";
// global 
const id = '_id : ID'
// desks
const deskId = 'deskId : ID'
const deskNum = 'deskNum : Number'
// token
const token = 'token : String'
//  queuing
const Qname = 'name : String ';
const Qsymbol = 'symbol : String ';
const Qcolor = 'color : String ';
const Qdescription = 'description : String ';
const queuing = `type Queuing { ${Qname} ${Qsymbol} ${Qcolor} ${Qdescription}}`
// machine data
const number = `number : Int `
const user = `type User {${id} firstName : String lastName : String, picture : String} `
const status = `status : String `
const type = `type : String `
const worker = 'type Worker { user : ID, connectedAt : String }'
const workerWithUser = 'type WU { user : User, connectedAt : String }'
// user agent
const ua = 'ua : String'
// tickets
const updatedAt = "updatedAt : String"
const ticketStatus = `type TicketStatus { ${updatedAt} ${type}}`
const ticket = `type Ticket { ${id} ${number} status : [TicketStatus]}`

export const QueuingSchema = buildSchema(`

    ${ticketStatus}

    ${ticket}

    ${worker}

    ${user}

    ${workerWithUser}

    type Machine {
        ${id}
        ${number}
        worker : WU
        ${status}
        ${type}
    }
    type QueuingQuery {
        getMachine(${token}) : Machine
        getAllMachines(${type}) : [Machine]
        getLastTicket : String
        getTickets : [Ticket]
    }
    type QueuingMutation {
        createQueuing(${Qname},${Qsymbol},${Qcolor},${Qdescription}) : String
        addNewDesk : String
        addNewLabeler : String
        setWorker(${token}) : Worker
        setDeskStatus(${token}, ${status}) : Machine        
        deleteMachine(${token}) : String
        addTicket : String
        setTicketStatus(${status}) : String
    }
    schema {
        query : QueuingQuery
        mutation : QueuingMutation
    }
`)