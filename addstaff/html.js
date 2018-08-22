const style = require('../style')
var setTable = (table) => {
  var colskill = (skills) => {
    html = "";
    for (col = 0; col < skills.length; col++) {
      html = html+`<th><span class = "upright">${skills[col]}</span></th>`;
    }
    return html;
  }
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
              <th colspan="${table.col.length}">Skill</th>
              <th colspan="2">Year</th>
            </tr>
            <tr style="background-color:white">
              `+colskill(table.col)+`
              <th>From</th>
              <th style="padding: 0 16px">To</th>
            </tr>
            `+inserttables(table.row,table.col)+`
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
    var inserttables = (datas,col) => {
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
            inserttrades(datas[locationdata].trades,datas[locationdata].Location,col)+`</tr>`;
        }
        return (html);
    };
    var inserttrades = (datas,L,col) => {
        var html = '';
        for (tradedata = 0; tradedata < datas.length; tradedata++) {
            html = html + `
            <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white">${datas[tradedata].Trade}</td>`+
            insertspecialities(datas[tradedata].specialities,L,datas[tradedata].Trade,col);
        }
        return (html);
    };
    var colskillbox = (L,T,S,skills) => {
      html = "";
      for (col = 0; col < skills.length; col++) {
        html = html+`
        <td class="tick">
        <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][${skills[col]}]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value"></td>
        `;
      }
      return html;
    }
    var insertspecialities = (datas,L,T,col) => {
        var html = '';
        for (specialitiesdata = 0; specialitiesdata < datas.length; specialitiesdata++) {
            var S = datas[specialitiesdata].Speciality;
            html = html + `
            <td>${S}</td>
            `+colskillbox(L,T,S,col)+`
            <td class="tick"><input type="text" name="skilltable[${L}][${T}][${S}][From]" size="4"></td>
            <td class="tick"><input type="text" name="skilltable[${L}][${T}][${S}][To]" size="4"></td>
            </tr><tr>`;
        }
        return (html);
    };

    module.exports = setTable;
