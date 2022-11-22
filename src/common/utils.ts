export default {
    removeUndefinedFromObject : (obj : {[key:string]: unknown}) => {
        let newObj = obj;
        Object.keys(newObj).forEach(key=>{
            if (newObj[key] == undefined || newObj[key]==='')
                delete newObj[key]
        });
    
        return newObj;
    }
}