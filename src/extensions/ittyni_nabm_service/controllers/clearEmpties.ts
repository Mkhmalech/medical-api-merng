export const clearEmpties = (o:any)=> {
    for (var k in o) {
      if (!o[k] || typeof o[k] !== 'object' ) {// if null or not object
         (!o[k]||!o[k].toString().length)&& delete o[k];
          continue;
      }
      
      clearEmpties(o[k]);
  
      if (Object.keys(o[k]).length === 0) {
        delete o[k]; // The object had no properties, so delete that property
      }
      
    }
      return o
  }