import { MEDICINE } from '../module/medicine';
import { cities } from './cities';
import { Atc } from './atc';
import { PHARMA } from '../../../../health-provider/pharmacy-medical-api/src/module/pharma';
const fs = require('fs');

export const fetchMedicine = async ({id}:any)=>{
    const res : any = await MEDICINE.findById(id);
    if(!res) return "no_result_founded"
    return(res);
}
export const addMultiMedicine = async ()=>{
    // for (let i = 0; i < medicine.length; i++) {
        
    //     let drug : any= new MEDICINE({
    //         composition : medicine[i].composition,
    //         category : medicine[i].famille,
    //         atc : medicine[i].atc
    //     });
    
    //     drug.names.push({
    //         country : 'maroc', 
    //         title : medicine[i].name,
    //         ppv : medicine[i].ppv,
    //         presentation : medicine[i].presentation,
    //         statut : medicine[i].statut,
    //         distributor : medicine[i].distributeur
    //     })
    
    //     const res = await drug.save()
        
    //     if(res) console.log(`${i} finished rest ${medicine.length-i} => ${(100-(((medicine.length-i)/medicine.length))*100).toFixed(2)}% completed`)
    // }
}

export const fetchMedicneByAlphabete = async ({letter}: any) =>{
    const res = await MEDICINE.find({'names.title' : { $regex: '^' + letter, $options: 'i' }});
    if(!res) return "no_result_founded"
    return(res);
}
export const fetchMedicneByName = async ({name}: any) =>{
    const res = await MEDICINE.find({'names.title' : new RegExp(name, 'ig')});
    if(!res) return "no_result_founded"
    return(res);
}
export const ListAllCategories = async () =>{
    const res : any= await MEDICINE.find().distinct('category');
    if(!res) return "no_result_founded"
    return(res);
}
export const ListByCategory = async ({category}: any) =>{
    const res :any = await MEDICINE.find({'category' : category});
    if(!res) return "no_result_founded"
    return(res);
}
export const ListByCompositions = async () =>{
    const res : any = await MEDICINE.find().distinct('composition');
    if(!res) return "no_result_founded"
    return(res);
}
export const ListByDCI = async ({composition}: any) =>{
    const res : any = await MEDICINE.find({'composition' : composition});
    if(!res) return "no_result_founded"
    return(res);
}

export const listAtcCategories = ()=>{
    const category : any = new Set(Atc.map((atc:any)=>atc.chapter));
    return category
}
export const listAtcChapter = ({chapter}:any)=>{
    const category : any = Atc.filter((atc:any)=>atc.chapter == chapter).map((c:any)=>c.sousChapter);
    return new Set(category)
}
export const listAtcGroup = ({sousChapter}:any)=>{
    const category : any = Atc.filter((atc:any)=>atc.sousChapter == sousChapter).map((s:any)=>s.group);
    return new Set(category)
}
export const listAtcSousGroup = ({group}:any)=>{
    const category : any = Atc.find((atc:any)=>atc.group == group);
    return category.sousGroup
}
export const listDrugByAtc = async({code}:any)=>{
    let Code = new RegExp(code, 'ig');
    const res : any = await MEDICINE.find({'atc' : Code});
    if(!res) return "no_result_founded"
    return(res);
}
export const listDrugById = async({id}:any)=>{
    const res : any = await MEDICINE.findById(id);
    if(!res) return "no_result_founded"
    return(res);
}
export const createSiteMapDrugs = async ({id}:any)=>{
    // let sitmap : string = '';    
    // let sitemap : string = '';    

    // for (let i = 0; i < cities.length; i++) {
    //     const res = await PHARMA.find({'contact.address.city': cities[i].city}).then((r:any)=>{
    //         if(r){
    //             r.map((m:any)=>{
    //                 sitmap += `<url><loc>https://ittyni.com/annuaire/pharmacie/maroc/${cities[i].city}/${m._id}</loc><lastmod>${new Date().toISOString()}</lastmod><priority>0.80</priority></url>`;
    //             })
    //         }
    //     })

    //     console.log(`city ${cities[i].city} finished`)
        
    // }

    // fs.writeFileSync(`./sitemap.xml`, sitmap, (err:any, doc:any) => {
    //     if (err) throw err
    //     console.log(doc)
    // });
    return "no_permissions_to_be_here"
}