var stapp = [{userId : "myId", name : "mohammed", appId: "2"}];
var app = [{id : "1", name : "bio"}, {id:"2", app : "hem"}]

let staff = async(array1 , array2 ) =>{
    let staffwithDepartement  = []
    staffwithDepartement = await array1.map(ele1=>{
        const departement = array2.find(ele2=> ele2.id = ele1.appId);
        ele1.depart = departement.app;
      return ele1
    })

    return staffwithDepartement
  }

console.log(staff(stapp, app))