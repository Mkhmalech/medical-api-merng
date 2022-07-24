import {default as depart} from '../controller/department'
export const DepartmentResolver = {
    departmentsList : depart.departmentsList
};

// === Lab departements
// addDepartment = ({ depart, mnem, descript }: any, { user }: any) => {

//     const newDepartment = new DEPARTMENTS({
//       name: {
//         fr: depart
//       },
//       mnemonic: mnem && mnem,
//       description: {
//         fr: descript && descript
//       }
//     })

//     return newDepartment.save((e: any) => e ? Error("department_not_saved") : ("saved_successfully"))
//   }

//   fetchDepartments = async ({ user }: any) => await DEPARTMENTS.find();