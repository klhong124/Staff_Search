const style = require('../style')
var setTable = (table) => {
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Add New Staff</title>
    <style>
        ${style}
    </style>
    </head>
    <body>
        <h1>Staff Information</h1>
        <form action="/create_staff" method="POST">
        <div class="staffinfo">
            <p>Staff ID : <input type="text" name="staffid"></p>
            <p>Name : <input type="text" name="name"></p>
            <p>Age : <input type="text" name="age"></p>
        </div><br>
        <table>
            <tr>
              <th rowspan="2">Locations</th>
              <th rowspan="2">Trades</th>
              <th rowspan="2">Speciality</th>
              <th colspan="5">Skill</th>
              <th colspan="2">Year</th>
            </tr>
            <tr style="background-color:white">
              <th class = "upright">Material</th>
              <th class = "upright">Testing</th>
              <th class = "upright">Management</th>
              <th class = "upright">Supervision</th>
              <th class = "upright">Hand On</th>
              <th>From</th>
              <th style="padding: 0 16px">To</th>
            </tr>
            `+inserttables(table)+`
          </table><br>
          <input type="submit" value="Add Staff">
          </form><hr>
          <a href="../../">Return Home</a> 
    </body>
    </html> 
    `;
    
    /*      //Location
            <tr></tr><tr>
            <td rowspan="2+1" style="background-color:white">Site</td>  

                    //Trades
                    <td rowspan="2" style="background-color:white">Demolition</td>

                            //Speciality
                            <td>Scaffold</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>

                            //Speciality
                            <td>Demlish</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>


                    //Trades
                    <td rowspan="1" style="background-color:white">Excavation</td>
    
                            <td>Excavation</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>

            </tr>  //Location-End
    */
    return html;
    };
    var inserttables = (datas) => {
        var html = '';
        for (locationdata = 0; locationdata < datas.length; locationdata++) {
            var rowspan = () => {
                var rowspanvalue = 0;
                for (rowspandata = 0; rowspandata < datas[locationdata].trades.length; rowspandata++) {
                    rowspanvalue = rowspanvalue + datas[locationdata].trades[rowspandata].specialities.length;
                }
                return rowspanvalue;
            }
            html = html + `
            <tr></tr><tr>
            <td rowspan="`+rowspan()+`" style="background-color:white;">${datas[locationdata].Location}</td>`+
            inserttrades(datas[locationdata].trades,datas[locationdata].Location)+`</tr>`;
        }
        return (html);
    };
    var inserttrades = (datas,L) => {
        var html = '';
        for (tradedata = 0; tradedata < datas.length; tradedata++) { 
            html = html + `
            <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white">${datas[tradedata].Trade}</td>`+
            insertspecialities(datas[tradedata].specialities,L,datas[tradedata].Trade);
        }
        return (html);
    };
    
    var insertspecialities = (datas,L,T) => {
        var html = '';
        for (specialitiesdata = 0; specialitiesdata < datas.length; specialitiesdata++) { 
            var S = datas[specialitiesdata].Speciality;
            html = html + `
            <td>${S}</td>
            <td class="tick">
            <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][Material]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
            <td class="tick">
            <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][Testing]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
            <td class="tick">
            <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][Management]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
            <td class="tick">
            <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][Supervision]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
            <td class="tick">
            <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][Hand_On]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
            
            <td class="tick"><input type="text" name="skilltable[${L}][${T}][${S}][From]" size="4"></td>
            <td class="tick"><input type="text" name="skilltable[${L}][${T}][${S}][To]" size="4"></td>
            </tr><tr>`;            
        }
        return (html);
    };
    
    module.exports = setTable;