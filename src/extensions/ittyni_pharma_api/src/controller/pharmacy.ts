import { PHARMA } from "../module/pharma"
import { Pharmacies } from './pharma'


export const addMultiplePharmacies = async () => {

    // for (let i = 0; i < Pharmacies.length; i++) {
    //     const pharm = Pharmacies[i];

    //     let pharmacy = new PHARMA({
    //         account: { name: pharm.name },

    //         contact: {
    //             address: {
    //                 street: pharm.street,
    //                 city: pharm.city
    //             }
    //         }
    //     })
    //     pharmacy.contact.tele.fix.push(pharm.tele)

    //    const res = await pharmacy.save();

    //    if(res) console.log(`${i} saved rest ${Pharmacies.length - i} => ${(100-(((Pharmacies.length - i)/Pharmacies.length)*100)).toFixed(2)}% completed`)
    // }
}

export const fetchTwentyPharmacy = async ({ letter }: any) => {
    const res: any = await PHARMA.find({ 'contact.address.city': { $regex: '^' + letter, $options: 'i' } }).select('account contact views');
    return res;
}

export const fetchTwentyByCity = async ({ city }: any) => {
    const res: any = await PHARMA.find({ 'contact.address.city': city.toUpperCase() }).select('account contact views');
    if (!res) return "no_result_founded";
    else return res.slice(0, 20).map(() =>
        res.splice(Math.floor(Math.random() * res.length), 1)[0]
    );
}
export const fetchAllByCity = async ({ city }: any) => {
    const res: any = await PHARMA.find({ 'contact.address.city': city.toUpperCase() }).select('account contact views');
    if (!res) return "no_result_founded";
    else return res;
}
export const fetchPharmaDetails = async ({ name }: any) => {
    const res: any = await PHARMA.findOne({ 'account.name': name }).select('account contact views');
    if (!res) return "no_result_founded";
    else return res;
}
export const searchPharmaByName = async ({ name }: any) => {
    const res: any = await PHARMA.find({ 'account.name': new RegExp(name, 'ig') }).select('account contact views');
    if (!res) return "no_result_founded";
    else return res;
}
export const fetchPharmaById = async ({ id }: any) => {
    const res: any = await PHARMA.findByIdAndUpdate(id,{$inc : {'views' : 1}}).select('account contact views');
    if (!res) return "no_result_founded";
    else return res;
}