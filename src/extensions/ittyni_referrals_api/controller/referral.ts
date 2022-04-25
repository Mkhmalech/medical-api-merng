import { CABINET } from "../../ittyni_cabinet_api/src/module/cabinets";
import { LABO } from "../../ittyni_labm_api/module/labo";
import { TESTS } from "../../ittyni_nabm_api/module/labtests";

export const searchTests = async ({query} : any, {user} : any) => {
    let q = query;
    q = new RegExp(q, 'ig');
    const res = await TESTS.find({$or : [{"name.fr" : q}, {"reference.Mnemonic" : q}]})
        .select('id name.fr finance reference');
    if(res){
        const resCat = await LABO.find({'catalogs.addressedTo' : 'SubContractors'})
            .select('id catalogs account.name contact')
            .then((cat:any)=>{
                return cat.map((ct:any)=>{
                    let price : any;
                        return res.map((t:any)=>{
                            const i = ct.catalogs[0].list.findIndex((c:any)=>c.testId == t._id.toString());
                            if(i>=0){
                                price = ct.catalogs[0].list[i].testPrice
                            }
                            else {
                                const bcode : any= (t.finance[0] && t.finance[0].Bcode);
                                price = Math.floor(ct.catalogs[0].bFactor * bcode);
                            }
                            return ({
                                CatalogId : ct.catalogs[0]._id,
                                LaboName : ct.account.name,
                                LaboId : ct._id,
                                price : price,
                                TestName : t.name.fr,
                                TestId : t._id,
                                bcode : t.finance[0].Bcode,
                                Labcontact : ct.contact
                            })
                    })
                })
            })
            return([].concat(...resCat))
    } else {
        return new Error("no_test_founded");
    }
}
export const searchContributorTests = async ({query} : any, {user} : any) => {
    let q = query;
    q = new RegExp(q, 'ig');
    // find test info
    const res = await TESTS.find({$or : [{"name.fr" : q}, {"reference.Mnemonic" : q}]})
        .select('id name.fr finance reference');
    if(res){
    // find labo contributor
        const resCat = await LABO.findOne({'account.name' : "FES"}).select('catalogs account.name contact')
            .then((doc:any)=>{
                const catalog = doc.catalogs.find((ct:any)=>ct.addressedCabinetId == user.accountId.toString());
                // check if test exist in list
                let price : any;
                return res.map((t:any)=>{
                    const i = catalog.list.findIndex((c:any)=>c.testId == t._id.toString());
                    if(i>=0){
                        price = catalog.list[i].testPrice
                    }
                    else {
                        const bcode : any= (t.finance[0] && t.finance[0].Bcode);
                        price = Math.floor(catalog.bFactor * bcode);
                    }
                    return({
                        CatalogId : catalog._id,
                        LaboName : "FES",
                        LaboId : doc._id,
                        price : price,
                        TestName : t.name.fr,
                        TestId : t._id,
                        bcode : t.finance[0].Bcode,
                        Labcontact : doc.contact
                    })
                })
            })
            return(resCat)
    } else {
        return new Error("no_test_founded");
    }
}