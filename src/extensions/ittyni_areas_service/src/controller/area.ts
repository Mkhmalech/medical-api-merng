import { AREA } from "../module/area";
import { AREAUNIT } from "../module/areaUnit";
import { regions } from "./regions"

export const saveAllPrivincesAndPrefecture = async (args: any) => {

    // for (let i = 0; i < regions.length; i++) {
    //     const c: any = regions[i];

    //     let newRegion: any = new AREA({
    //         type: c.type,
    //         name: c.name,
    //         region: c.region,
    //         country: c.country
    //     })

    //     newRegion.population.push({
    //         total: c.total,
    //         urbain: c.urbain,
    //         rural: c.rural,
    //         year: c.year
    //     })

    //     const res = await newRegion.save();

    //     if (res) console.log(`${i} from ${regions.length}`)

    // }
}

export const read_areaParents = ({ country }: any) => {
    return AREA.find({ country }).sort('region').distinct('region')
}

export const read_areas = ({ country }: any, { user }: any) => {
    return AREA.find({ country: country });
}

export const read_countryAreas = ({ country }: any, { user }: any) => {
    return AREA.find({ country }).sort('region').distinct('region')
}
export const read_regionAreas = ({ region }: any, { user }: any) => {
    return AREA.find({ region });
}
export const read_areaByName = ({ name }: any, { user }: any) => {

    return AREA.find({ name });
}
export const read_areaByType = ({ type }: any, { user }: any) => {

    return AREA.find({ type });
}

export const read_areasOfRegion = ({ region }: any, { user }: any) => {
    return AREA.find({ region }).sort('name');
}

export const read_zipcodesByAreaId = ({area_id}: any, {user}: any) =>{
    return AREAUNIT.find({area : area_id}).sort('name')
}
export const read_zipcodesByAreaName = ({area_name}: any, {user}: any) =>{
    return AREAUNIT.find({area : area_name}).sort('name')
}
// write data functions
export const write_areaUnit = async ({ unit }: any, { user }: any) => {

    const area = await AREA.findById(unit.areaId);

    if (area) {

        const isExist = await AREAUNIT.find({ zipcode: unit.zipcode });

  
        if (!!isExist.length) return new Error("ZIPCODE_ALREADY_EXIST");


        const newUnit = new AREAUNIT({
            name: unit.name,
            type: unit.type,
            area: unit.areaId,
            zipcode: unit.zipcode
        });

        newUnit.save();

        return "ZIPCODE_SAVED_SUCCESSFULLY"


    } else {
        return "NO_AREA_FOUND"
    }
}