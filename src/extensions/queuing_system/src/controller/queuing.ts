import { Db } from "../../../../common/db"
import { LABO } from "../../../lab-manager/src/labos/module/labo"
import { QUEUING } from "../module/queuing";
import jwt from "jsonwebtoken";

// create queuing
export const createQueuing = async (args: any, {user} : any) =>{
    // check user 
    // if (!user._id) return Error("USER_NOT_CONNECTED");
    // insert data
    const res = await new Db(QUEUING).createNewDoc({...args, activatedBy:"5dc3f2e86e6e3e21d027bed1", activatedAt: new Date().toUTCString()});
    return res;
}
// add new desk
export const addNewDesk = async (args: any, { user, account, machine }: any) => {
    let newDeskNum: number;
    // check if already is Machine
    if (machine._id) return Error("MACHINE_ALREADY_EXIST");

    // check if installed
    const labo = await new Db(LABO).getDocById(account._id);

    // get available desks numbers
    const deskNums = await new Db(QUEUING).subDocPropertyInArray(labo.queuing, 'desks');

    newDeskNum = (deskNums && missingNumber(deskNums)) || 1;

    if (labo.queuing) {
        const qu = await new Db(QUEUING).getDocByIdAndUpdate(labo.queuing, {
            desks: {
                number: newDeskNum,
                addedBy: user._id,
                userAgent: user.ua
            }
        })

        let newDesk = qu.desks.find((d: any) => ((d.number === newDeskNum) && (d.status != "deleted")));

        return qu ? jwt.sign({
            _id: newDesk._id, type: 'desks',
            number: newDesk.number, createdAt: new Date().toUTCString(), queuingId: labo.queuing,
        }, "iTTyniTokenApplicationByKHM@MEDv1.1") : Error("DESK_NOT_SAVED")
    } else {
        return Error("QUEUING_SYSTEM_NOT_INSTALLED")
    }
}
export const addNewLabeler = async (args: any, { user, account, machine }: any) => {
    let newLabelerNum: number;
    // check if already is Machine
    if (machine._id) return Error("MACHINE_ALREADY_EXIST");

    // check if installed
    const labo = await new Db(LABO).getDocById(account._id);

    // get available desks numbers
    const labelerNums = await new Db(QUEUING).subDocPropertyInArray(labo.queuing, 'labelers');

    newLabelerNum = (labelerNums && missingNumber(labelerNums));

    if (labo.queuing) {
        const qu = await new Db(QUEUING).getDocByIdAndUpdate(labo.queuing, {
            labelers: {
                number: newLabelerNum,
                addedBy: user._id,
                userAgent: user.ua
            }
        })

        let newLabeler = qu.labelers.find((d: any) => ((d.number === newLabelerNum) && (d.status != "deleted")));


        return qu ? jwt.sign({
            _id: newLabeler._id, type: 'labelers',
            number: newLabeler.number, createdAt: new Date().toUTCString(), queuingId: labo.queuing,
        }, "iTTyniTokenApplicationByKHM@MEDv1.1") : Error("LABELER_NOT_SAVED");

    } else {
        return Error("QUEUING_SYSTEM_NOT_INSTALLED")
    }
}
export const installQueing = async (args: any, { user, account }: any) => {

}
export const getMachine = async ({ token }: any, { user, account }: any) => {

    let { _id, type }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

    const Machine = await new Db(QUEUING).getSubDocById({ [`${type}._id`]: _id }, { [`${type}.$`]: 1 }, type);

    return ({
        _id: Machine._id,
        number: Machine.number,
        workers: Machine.workes,
        status: Machine.status,
        type: type
    })
}
export const setWorker = async ({ token }: any, { user, account }: any) => {

    let { _id, type }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

    const Machine = await new Db(QUEUING).updateSubDocs({ [`${type}._id`]: _id },
        { arrayFilters: [{ [`i._id`]: _id }], new: true }
        , {
            [`${type}.$[i].workers`]: { user: user._id, connectedAt: new Date().toUTCString() }
        });

    const machine = Machine[type][Machine[type].findIndex((d: any) => d._id == _id)];

    const worker = machine.workers[machine.workers.length - 1];

    return (worker)
}
export const setDeskStatus = async ({ token, status }: any, { user, account }: any) => {

    let { _id, type }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

    const Machine = await new Db(QUEUING).setSubDocs({ "desks._id": _id },
        { arrayFilters: [{ "i._id": _id }], new: true }
        , {
            [`${type}.$[i].status`]: status
        });

    const desk = Machine.desks[Machine.desks.findIndex((d: any) => d._id == _id)];

    return ({
        _id: desk._id,
        number: desk.number,
        workers: desk.workes,
        status: desk.status,
        type: "desks"
    })
}
export const deleteMachine = async ({ token }: any, { user, account }: any) => {
    let { _id, type }: any = jwt.verify(token, 'iTTyniTokenApplicationByKHM@MEDv1.1');

    const Machine = await new Db(QUEUING).setSubDocs({ [`${type}._id`]: _id },
        { arrayFilters: [{ [`i._id`]: _id }], new: true }
        , {
            [`${type}.$[i].status`]: "deleted"
        });

    return Machine ? "DELETED_SUCCESSFULLY" : Error("NOT_DELETED")
}
export const getAllMachines = async ({ type }: any, { user, account }: any) => {
    // check if installed
    const labo = await new Db(LABO).getDocById(account._id);

    // get available desks numbers
    const Machines = await new Db(QUEUING).getSubDoc(labo.queuing, type, type + ".workers.user");

    let machines = Machines.filter((m: any) => m.status != 'deleted');

    return (machines.map((m: any) => ({
        status: m.status,
        _id: m._id,
        number: m.number,
        worker: (m.workers.length > 0 && m.workers.reduce((a: any, b: any) => new Date(a.connectedAt) > new Date(b.connectedAt) ? a : b)) || undefined,
        type: type
    })))
}
/**
 * tickets 
 */
export const addTicket = async ({ status }: any, { user, account, machine }: any) => {
    // check if already is Machine
    if (!machine._id) return Error("MACHINE_HAS_NO_RIGHT");
    // check if account exist
    if (!account._id) return Error("ACCOUNT_NOT_EXIST");
    // check if installed
    const labo = await new Db(LABO).getDocById(account._id);
    // check user 
    if (!user._id) return Error("USER_NOT_CONNECTED");

    const r = await new Db(QUEUING).getSubDoc(labo.queuing, 'workFlow');
    // workFlow never used
    if (r.length <= 0) {
        r.push({
            startAt: new Date().toUTCString(),
            tickets: [{
                number: 1,
                addedBy: user._id,
                addedAt: new Date().toUTCString(),
                userAgent: user.ua,
                status: [{
                    type: 'printed',
                    updatedAt: new Date().toUTCString(),
                    updatedBy: user._id
                }]
            }]
        });

        const u = await new Db(QUEUING).setSubDocsPushWithoutFilter({ '_id': labo.queuing }, {
            workFlow: r
        })

        return u ? u.workFlow[0]._id : Error("QUEUING_DOES_NOT_STARTED");
    }
    // we already worked with workFlow
    else {
        // check working day
        const i = r.findIndex((w: any) =>
            new Date(w.startAt).getFullYear() == new Date().getFullYear() &&
            new Date(w.startAt).getMonth() == new Date().getMonth() &&
            new Date(w.startAt).getDay() == new Date().getDay()
        )

        // we are working 
        if (i >= 0) {
            // console.log(i)
            // r[i].tickets.push);
            const u = await new Db(QUEUING).updateSubDocs({ '_id': labo.queuing },
                {
                    arrayFilters: [{ 'i._id': r[i]._id }], new: true
                }, {
                'workFlow.$[i].tickets': {
                    number: r[i].tickets[r[i].tickets.length - 1].number + 1,
                    addedBy: user._id,
                    addedAt: new Date().toUTCString(),
                    userAgent: user.ua,
                    status: [{
                        type: 'printed',
                        updatedAt: new Date().toUTCString(),
                        updatedBy: user._id
                    }]
                }
            })

            return u ? "TICKET_ADDED_SUCCESSFULLY" : Error("TICKET_NOT_ADDED")
        }
        // that is a new day
        else {
            const u = await new Db(QUEUING).updateSubDocs({ '_id': labo.queuing },
                {
                    new: true
                }, {
                'workFlow': {
                    startAt: new Date().toUTCString(),
                    tickets: [{
                        number: 1,
                        addedBy: user._id,
                        addedAt: new Date().toUTCString(),
                        userAgent: user.ua,
                        status: [{
                            type: 'printed',
                            updatedAt: new Date().toUTCString(),
                            updatedBy: user._id
                        }]
                    }]
                }
            })

            return u ? "NEW_DAY_STARTED_SUCCESSFULLY" : Error("NEW_DAY_DOES_NOT_STARTED")
        }

    }
}
export const setTicketStatus = async ({ status }: any, { user, account }: any) => {
}
export const getLastTicket = async ({ status }: any, { user, account }: any) => {
}
export const getTickets = async ({ status }: any, { user, account, machine }: any) => {
    // check if already is Machine
    if (!machine._id) return Error("MACHINE_HAS_NO_RIGHT");
    // check if account exist
    if (!account._id) return Error("ACCOUNT_NOT_EXIST");
    // check user 
    if (!user._id) return Error("USER_NOT_CONNECTED");
    // check queuing 
    if (!machine.queuingId) return Error("QUEUING_NOT_INSTALLED");
    // GET All ticket of the day
    const r = await new Db(QUEUING).getSubDoc(machine.queuingId, "workFlow");
    // get this day
    const i = r.findIndex((w: any) =>
        new Date(w.startAt).getFullYear() == new Date().getFullYear() &&
        new Date(w.startAt).getMonth() == new Date().getMonth() &&
        new Date(w.startAt).getDay() == new Date().getDay()
    )

    return i >= 0 ? r[i].tickets : Error("NO_TICKTES_FOR_THIS_DAY");
}
const missingNumber = (a: number[]) => {
    let missing: number = 0;
    for (var i = 1; i <= 20; i++) {
        if (a.indexOf(i) == -1) {
            missing = i;
            break;
        }
    }
    return missing;
}