import { requestData } from "../../../../common/request";
import { PARAPHARMACY } from "../module/parapharmacy"
const http = require("http");


export const read_parapharmacies = () => "read_parapharmacies"
export const write_parapharmacy = async (args: any, { user, permission, message }: any) => {
    const res = await PARAPHARMACY.findOne({ "account.name": args.name }).then(async (result: any) => {
        if (res) return "ACCOUNT_ALREADY_EXIST";

        const newParapharma = new PARAPHARMACY({ ...args });

        let saved = await newParapharma.save();
        return saved

    })

    requestData(
        'path',
        `query Read_LABMDetails($_id : ID!){
            readLabmDetailsById(_id: $_id){
                account { name }
            }
            }`, 
        data => data);


    console.log(res);

    return "ACCOUNT_SAVED_SUCCESSFULLY";
}