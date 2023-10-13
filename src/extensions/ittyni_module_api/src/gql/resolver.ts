import * as component from '../controller/moduleController'


export const componentResolver = {
    createComponent : component.create,
    getAllComponents : component.getAll,
    removeComponentById : component.remove, 
    readActiveComponents : component.readActiveComponents, 
    readActiveExtensionsBySpace : component.readActiveExtensionsBySpace
};
