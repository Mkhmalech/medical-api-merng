import { Db } from "../../../../gateway/db"
import { COMPONENTS } from "../module/component"

export const create = async (args:any, {user}:any)=>{

    const component = new Db(COMPONENTS);
    
    const res :any = await component.checkExisting({'name' : args.name});

    if(!res) return component.createNewDoc({...args, createdAt : new Date().toUTCString(), createdBy : user._id });
    
    if(res) return res;
}

export const remove = ({_id}:any, {user}:any)=>{
    const component = new Db(COMPONENTS);

    return component.removeDocById(_id)
}
export const update = (args:any, {user}:any)=>{

}
export const getOneById = (args:any, {user}:any)=>{

}
export const getAll = (args:any, {user}:any)=>{
    const component = new Db(COMPONENTS);

    return component.getAllDocs();
}
export const readActiveComponents = (args:any, {user, permissions, message}:any)=>{
    // if (message) return Error(message);

    return COMPONENTS.find({status: 'active'});
}