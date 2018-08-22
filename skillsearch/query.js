var setQuery = (skill) => {
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
          `+skillrequest(skill)+`
          From
          To
       }
     }
   }
}


`;
return query;
}
var skillrequest = (skills) => {
  str = ``;
  for(var skill in skills){
    if(Boolean(Number(skills[skill]))){
      str = `${str}\n   ${skill}`;
    }
  }
  return str;
}
module.exports = setQuery;
