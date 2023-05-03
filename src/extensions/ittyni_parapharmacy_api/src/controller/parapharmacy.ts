import { PARAPHARMACY } from "../module/parapharmacy"


export const read_parapharmacies = () => "read_parapharmacies"
export const write_parapharmacy = async (args: any, { user, permission, message }: any) => {
    const res = await PARAPHARMACY.findOne({ "account.name": args.name }).then(result => {
        if (res) return "ACCOUNT_ALREADY_EXIST";

        const newParapharma = new PARAPHARMACY({ ...args });

        newParapharma.save();

        return "ACCOUNT_SAVED_SUCCESSFULLY";
    })

    return res;
}