import Staff from '../controllers/staff';


export const staffResolver = {
    employerListAll : Staff.employerListAll,
    employerAddNew : Staff.employerAddNew,
    employerDelete : Staff.employerDelete,
    findEmployer : Staff.findEmployerByName,
    fetchExistingEmployer : Staff.fetchExistingEmployer,
    assignShiftsToEmployer : Staff.assignShiftsToEmployer,
    fetchAllShifts : Staff.listShifts,
    deleteShift : Staff.deleteShift,
    addContributorCabinet : Staff.addContributorCabinet,
    fetchContributorCabinets : Staff.fetchContributorCabinets,
}