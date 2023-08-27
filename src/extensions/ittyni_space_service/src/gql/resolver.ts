import * as SM from '../controller/sm'
export const SMResolver = {
    updateAccountName : SM.updateAccountName,
    updateAccountType : SM.updateAccountType,
    updateAccountStartDate : SM.updateAccountStartDate,
    updateContact : SM.updateContact,
    fetchAccountData : SM.fetchAccountData,
    // read data
    read_user_spaces: SM.read_user_spaces,
    read_space_details: SM.read_space_details,
    // write data
    write_linkSpaceToUser: SM.write_linkSpaceToUser,
    write_activateExtensionOnSpace: SM.write_activateExtensionOnSpace,
    read_spaceExtensions: SM.read_spaceExtensions,
};
