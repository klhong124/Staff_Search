var setMutation = (newstaff,col) => {
  var colskill = (skills) => {
    str = "";
    for (col = 0; col < skills.length; col++) {
      str = str+` ${skills[col].replace(/\s+/g, '')}`;
    }
    return str;
  }
    var mutation = `
    mutation {
        addStaff(input: ${newstaff}) {
          id
          name
          age
          skilltable {
            ...fullskilltable
          }
        }
      }

      fragment fullskilltable on Location {
        Master {
          id
        }
        Location
        trades {
          Trade
          specialities {
            Speciality
            skills{
              `+colskill(col)+`
              From
              To
            }
          }
        }
      }

    `;
    return mutation;
    }

module.exports = setMutation;
