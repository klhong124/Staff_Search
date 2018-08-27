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
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
        ${style}
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Staff Information</h1>
      <hr>
    <form class="form-horizontal" action="/create_staff" method="POST">
      <div class="staffinfo  well-lg">
        <div class="form-group">
          <label class="control-label col-sm-1" for="staffid">Staff ID:</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" id="staffid" placeholder="Enter staff ID" name="staffid">
          </div>
        </div>
        <div class="form-group">
          <label class="control-label col-sm-1" for="name">Name:</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" id="name" placeholder="Enter name" name="name">
          </div>
        </div>
            <div class="form-group">
          <label class="control-label col-sm-1" for="age">Age:</label>
          <div class="col-sm-3">
            <input type="text" class="form-control" id="age" placeholder="Enter age" name="age">
          </div>
        </div>
    </div><br>
    <table class="table">
        <tr style="background-color:white">
              <th rowspan="2">Locations</th>
              <th rowspan="2">Trades</th>
              <th rowspan="2">Speciality</th>
              <th colspan="${table.col.length}">Skill</th>
              <th colspan="2">Year</th>
            </tr>
            <tr style="background-color:white">
              `+colskill(table.col)+`
              <th>From</th>
              <th>To</th>
            </tr>
            `+inserttables(table.row,table.col)+`
          </table><br>
          <div style="width:100%;text-align: center;">
            <input type="submit" class="submitbutton" value="Add Staff">
          </div>
          <hr>
          <ul class="pager">
            <li><a href="../skill_search">Previous</a></li>
            <li><a href="../../">Return Home</a></li>
          </ul>
    </form>
    </div>
    </body>
    </html>
    `;

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
        <td class="tickcontainer">
        <label>
          <input type="hidden" value=0 name="skilltable[${L}][${T}][${S}][${skills[col]}]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value">
          <span class="checkmark"></span>
        <label>
        </td>
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
            <td class="tick"><input class="textinput" type="text" name="skilltable[${L}][${T}][${S}][From]" size="4" placeholder="From"></td>
            <td class="tick"><input class="textinput" type="text" name="skilltable[${L}][${T}][${S}][To]" size="4" placeholder="To"></td>
            </tr><tr>`;
        }
        return (html);
    };

    module.exports = setTable;
