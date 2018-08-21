var setQuery = (skills) => {

var query = `
{
  skill {
    id
    name
    age
    skilltable{
      ...fullskilltable
    }
  }
}

fragment fullskilltable on Location {
  Location
    trades {
      Trade
      specialities {
        Speciality
        skills {
          `+skillrequest(skills,'Material')+`
          `+skillrequest(skills,'Testing')+`
          `+skillrequest(skills,'Management')+`
          `+skillrequest(skills,'Supervision')+`
          `+skillrequest(skills,'Hand_On')+`
          From
          To
       }
     }
   }
}


`;
return query;
}
var skillrequest = (skills,skill) => {
  if(Boolean(Number(skills[skill]))){
    return skill
  }else{
    return ``
  }
}

  module.exports = setQuery;