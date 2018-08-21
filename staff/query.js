var setQuery = (staffid) => {
var query = `
{
  staff(id: "${staffid}") {
    id
    name
    age
    skilltable {
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
          Material
          Testing
          Management
          Supervision
          Hand_On
          From
          To
       }
     }
   }
}


`;
return query;
}

  module.exports = setQuery;