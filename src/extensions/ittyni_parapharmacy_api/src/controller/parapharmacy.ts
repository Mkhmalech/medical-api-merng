import { requestData } from "../../../../common/request";
import { PARAPHARMACY } from "../module/parapharmacy"
const http = require("http");


export const read_ParaPharamaciesOnScroll= async ({ limit, skip }: any, { permissions, message, user }: any) => {
    const parapharmas = await PARAPHARMACY.aggregate([
        { $match: {} },
        { $sort: { 'account.name': 1 } },
        {
            $facet: {
                "data": [{ $limit: limit + skip }, { $skip: skip }],
                "metadata": [
                    { $count: 'total' },
                    { $addFields: { showed: limit + skip } }
                ]
            }
        },
        {
            $project: {
                parapharmas: '$data',
                showed: { $first: '$metadata.showed' },
                total: { $first: '$metadata.total' },
                rest: {
                    $subtract: [
                        { $first: '$metadata.total' },
                        { $first: '$metadata.showed' }
                    ]
                }
            }
        }
    ])

    return parapharmas.shift();
}
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