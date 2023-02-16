import * as Area from '../controller/area'
export const areaResolver = {
    saveFile: Area.saveAllPrivincesAndPrefecture,
    // read
    read_areaParents: Area.read_areaParents,
    read_countryAreas: Area.read_countryAreas,
    read_regionAreas: Area.read_regionAreas,
    read_areaByName: Area.read_areaByName,
    read_areaByType: Area.read_areaByType,
    read_areasOfRegion: Area.read_areasOfRegion,
    read_zipcodesOfArea: Area.read_zipcodesOfArea,

    // write 
    write_areaUnit: Area.write_areaUnit,
};
