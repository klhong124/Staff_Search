var setQuery = (staffid,col) => {
  var colskill = (skills) => {
    str = "";
    for (col = 0; col < skills.length; col++) {
      str = str+` ${skills[col].replace(/\s+/g, '')}`;
    }
    return str;
  }
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
          `+colskill(col)+`
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
