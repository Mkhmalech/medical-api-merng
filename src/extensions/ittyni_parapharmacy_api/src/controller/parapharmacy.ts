import { requestData } from "../../../../common/request";
import { PARAPHARMACY } from "../module/parapharmacy"
import { para_1 } from './paraProductDetails_2'
import mongoose from 'mongoose'


export const read_ParaPharamaciesOnScroll= async ({ limit, skip }: any, { permissions, message, user }: any) => {
    const parapharmas = await PARAPHARMACY.aggregate([
        { $match: {} },
        {
            $facet: {
                "data": [{ $limit: limit + skip }, { $skip: skip }],
                "metadata": [
                    { $count: 'total' },
                    { $addFields: { showed: limit + skip } }
                ]
            }
        },
        { $sort: { 'name': 1 } },
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
export const write_parapharmacies = async (args: any, { user, permission, message }: any) => {
    for (let i = args.index; i < para_1.length; i++) {
        const para: any = para_1[i];
        if( para.product.length >= 0 ){
            let paraPharmacy: any = new PARAPHARMACY({
                name: para.product,
                brand: para.distributeur,
                createdBy: mongoose.Types.ObjectId('605b97864a4db74074bc86e2')
            })
            paraPharmacy.forms = para.package.map((p:any)=>({
                form: p.name,
                code: { 
                    type: "EAN",
                    value: p.EAN
                },
                status: {
                    value: p.status,
                    createdBy:mongoose.Types.ObjectId('605b97864a4db74074bc86e2')
                }
    
            }))
           const res = await paraPharmacy.save();
           
           if(res) console.log(`${i} saved rest ${para_1.length - i} => ${(100-(((para_1.length - i)/para_1.length)*100)).toFixed(2)}% completed`)
        }

    }
}

export const read_parpharmacy_by_id = (args: any, req: any) => {
  return para_1[args.index]
}

export const read_parapharmacy_brands = async (args: any, req: any) =>{
    const brands = await PARAPHARMACY.aggregate()
    .group({ _id: "$brand", brand: {$first: "$brand"}})
    .sort({_id: 1})

    return brands? brands.map((f:any)=>f.brand) : Error("NO_BRAND_FOUNDED");
}

export const read_parapharmacy_by_brand = async (args: any, req: any) =>{
    const parapharmas = await PARAPHARMACY.find({brand: args.brand});

    return parapharmas? parapharmas: Error("NO_PARAPHARMA_FOUNDED");
}