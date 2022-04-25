import { Labo } from "../../ittyni_labm_api/controllers/labo";
import { LABO } from "../../ittyni_labm_api/module/labo";

class Staff extends Labo {

  constructor() {
    super();
  }

  // add personal
  addPersonal = (
    accountName: string,
    { user, message, hasAuthorization }: any,
    cb: (r: any) => any
  ) => {
    if (message !== "user_success") {
      return message;
    } else {
      if (hasAuthorization(user, accountName)) {
        LABO.findOne({ "account.name": accountName }, (e:any, r:any) => {
          if (e) throw new Error(e);
          if (!r) throw new Error("account_not_founded");
          cb(r);
        });
      } else {
        return "not_allowed";
      }
    }
  };
  /**
   * find in staff
   **/
  findStaff = async (
    accountName: string,
    { user, message, hasAuthorization }: any
  ) => {
    if (message !== "user_success") {
      return message;
    } else {
      if (hasAuthorization(user, accountName)) {
        const res = await LABO.findOne({ "account.name": accountName });
        if (res) {
          return res;
        } else {
          return "not_founded";
        }
      } else {
        return "not_allowed";
      }
    }
  };
  /**
   *
   */
  employerListAll = async (args: any, req: any) => {
    const { accountName } = req;
    let staff: any[] = [];
    const resultat: any = await this.findStaff(accountName, req);
    if (typeof resultat === "string") {
      return [resultat];
    } else {
      resultat.staff.map((personal: any) => {
        staff.push({
          id: personal._id,
          civility: personal.civility,
          firstName: personal.firstName,
          lastName: personal.lastName,
          ppr: personal.ppr,
          password: personal.password,
          role: resultat.setting.team.find(({ _id }: any) => `${_id}` === `${personal.role}`),
          departement: resultat.setting.departements.find(
            ({ _id }: any) => `${_id}` === `${personal.departementId}`
          ),
        });
      });
      return staff;
    }
  };
  /**
   * add employer
   */
  employerAddNew = async (args: any, req: any) => {
    const { employer } = args;
    try {
      const res = await this.addPersonal(req.accountName, req, (r) => {
        employer.addedBy = req.user._id;

        // check if departement set or not
        if (employer.departementName) {
          const dep = r.setting.departements.find(
            (ele: any) => ele.name === employer.departementName
          );
          employer.departementId = dep._id;
        }

        employer.createdAt = new Date().toString();

        r.staff.push(employer);
        r.save();
      });
      if (typeof res === "string") {
        return res;
      } else {
        return "success";
      }
    } catch (e) {
      return Error(`${e}`);
    }
  };
  /**
   * add employer
   */
  addContributorCabinet = async ({id}: any, req: any) => {
    let contributor : any = {cabinetId : id}
    try {
      const res = await this.addPersonal(req.accountName, req, (r) => {
        contributor.addedBy = req.user._id;

        contributor.createdAt = new Date().toString();

        r.contributors.push(contributor);
        r.save();
      });
      if (typeof res === "string") {
        return res;
      } else {
        return "success";
      }
    } catch (e) {
      return new Error(`${e}`);
    }
  };
  /**
   * add employer
   */
  fetchContributorCabinets = async ({id}: any, req: any) => {
    const doc = await LABO.findOne({ "account.name": "FES"}).select("contributors.cabinetId").populate("contributors.cabinetId");
    if(doc) {
      return ( doc.contributors.map((cab : any)=> cab.cabinetId))
    };
  };
  /**
   * delete employer
   */
  employerDelete = (args: any) => {
    try {
      LABO.findOne({ "account.name": "Centrale du CHU Hassan II" }, async (e:any, r:any) => {
        if (e) throw new Error(e);
        if (r) {
          const i = await r.staff.findIndex((s:any) => s._id == args.id);
          if (i < 0) return "shift_not_founded"
          r.staff.splice(i, 1);
          r.save();
        }
        return "no_result_founded"
      });
      return 'success';
    } catch (e) {
      throw new Error(`${e}`);
    }
  }
  /**
   * test populate
   */
  findEmployerByName = async (args: any, req: any) => {
    const { query } = args;
    let q = query;
    q = new RegExp(q, "ig");
    const result = await LABO.findOne({
      "account.name": "Centrale du CHU Hassan II",
    });
    if (result) {
      let employer: any = result.staff.filter((em: any) => em.firstName == q);
    }
  };
  /**
   * assign shift to employer
   */
  assignShiftsToEmployer = async (args: any, req: any) => {
    try {
      const res = await this.addPersonal(args.accountName, req, (r) => {
        r.shifts.push({
          employerId: args.userId,
          addedBy: req.user._id || "",
          departementId: args.departementId,
          mounth: args.mounth,
          year: args.year,
          type: args.type,
          days: args.days,
          createdAt: new Date().toString(),
        });
        r.save();
      });
      if (typeof res === "string") {
        return res;
      } else {
        return "success";
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * list all shifts
   */
  listShifts = async (args: any, req: any) => {
    const { accountName } = args;
    let shifts: any[] = [];
    const resultat: any = await this.findStaff(accountName, req);
    if (typeof resultat === "string") {
      return [resultat];
    } else {
      resultat.shifts.map((shift: any) => {
        shifts.push({
          id: shift._id,
          addedBy: shift.addedBy,
          mounth: shift.mounth,
          year: shift.year,
          type: shift.type,
          days: shift.days,
          createdAt: shift.createdAt,
          employer: resultat.staff.find(
            ({ _id }: any) => `${_id}` === `${shift.employerId}`
          ),
          departement: resultat.setting.departements.find(
            ({ _id }: any) => `${_id}` === `${shift.departementId}`
          ),
        });
      });
      return shifts;
    }
  };

  /**
   * delete existing shift
   */
  deleteShift = async (args: any, req : any) => {
    try {
      LABO.findOne({ "account.name": req.accountName }, async (e:any, r:any) => {
        if (e) throw new Error(e);
        if (r) {
          const i = await r.shifts.findIndex((s:any) => s._id == args.id);
          if (i < 0) return "shift_not_founded"
          r.shifts.splice(i, 1);
          r.save();
        }
        return "no_result_founded"
      });
      return 'success';
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  fetchExistingEmployer = async (args: any, req:any) => {
    var doc = await LABO.findOne({ "account.name": req.accountName });
    if (doc) {
      var index = doc.staff.findIndex((staff:any)=> staff._id == args.employerId);
      if (index > -1) {
        let employer = {
          firstName: doc.staff[index].firstName,
          id : doc.staff[index]._id,
          addedBy : doc.staff[index].addedBy,
          civility : doc.staff[index].civility,
          lastName : doc.staff[index].lastName,
          password : doc.staff[index].password,
          role : doc.setting.team.find(({_id} : any)=>`${_id}` == `${doc && doc.staff[index].role}`),
          departement : doc.setting.departements.find(({_id} : any)=>`${_id}` == `${doc && doc.staff[index].departementId}`),
        }
        return employer
      }
      else return { id: "no_employer_founded" }
    }
    return { id: "no_account_founded" }
  }
}

export default new Staff();
