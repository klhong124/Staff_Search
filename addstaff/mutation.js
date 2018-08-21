var setMutation = (newstaff) => {
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
    return mutation;
    }
    
module.exports = setMutation;