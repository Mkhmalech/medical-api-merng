import * as component from '../controller'


export const componentResolver = {
    createComponent : component.create,
    getAllComponents : component.getAll,
    removeComponentById : component.remove, 
    readActiveComponents : component.readActiveComponents, 
};