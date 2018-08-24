const style = require('../style')
var skill_selection = (skills) => {
  html = "";
  for (col = 0; col < skills.length; col++) {
    html = html+`<label class="btn btn-default">${skills[col]}<input class="badgebox" type="checkbox" value=1 name="[skills][${skills[col].replace(/\s+/g, '')}]" checked><span class="badge">&check;</span></label>
`;
  }
  return html;
}
var setTable = (table) => {
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Skill Search</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
    .badgebox{
        opacity: 0;
    }
    .badgebox + .badge{
        text-indent: -999999px;
        width: 25px;
    }
    .badgebox:focus + .badge{
        box-shadow: inset 0px 0px 1px;
    }
    .badgebox:checked + .badge{
    	text-indent: 0;
    }
    ${style}
    .checkmask{
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: transparent;
    }
    </style>
    </head>
    <body>
    <div class="container">
    <h1>Find Best Staff</h1>
    <hr>
    <form action="/search_skill" method="POST">
            `+skill_selection(table.col)+`
            <br><br>
        <table class="table">
            <tr style="background-color:white;">
              <th>Locations</th>
              <th>Trades</th>
              <th>Speciality</th>
              <th>Require</th>
              <th>Weighting</th>
            </tr>
            `+inserttables(table.row)+`
          </table><br>
          <div style="width:100%;text-align: center;">
            <input type="submit" class="submitbutton" value="Find Best Staff">
          </div>
          <hr>
          <ul class="pager">
            <li><a href="../../">Return Home</a></li>
            <li><a href="#" class="editbutton">Edit</a></li>
            <li><a href="#" class="delbutton">Delete</a></li>
          </ul>
    </form>
    </body>
    </html>
    `
    return html;
}
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
        var toclickclass = datas[locationdata].Location.replace(/\s+/g, '');
        html = html + `
        <tr></tr><tr>
        <td rowspan="`+rowspan()+`" style="background-color:white;" class="tickcontainer">${datas[locationdata].Location}
        <label>
        <input type="checkbox"
            onclick = "
                var _checkboxs = document.getElementsByClassName('${toclickclass}');
                for (_checkbox = 0; _checkbox < _checkboxs.length; _checkbox++) {
                        _checkboxs[_checkbox].checked = false;
                        _checkboxs[_checkbox].click();
                }"
        >
        <span class="checkmark" style="opacity: 0;"></span>
        </label>
        </td>`+
        inserttrades(datas[locationdata].trades,datas[locationdata].Location)+`</tr>`;
    }
    return (html);
};
var inserttrades = (datas,L) => {
    var html = '';
    for (tradedata = 0; tradedata < datas.length; tradedata++) {
        var toclickclass = `${L}_${datas[tradedata].Trade}`.replace(/\s+/g, '');
        var checkboxclass = `${L}`.replace(/\s+/g, '');
        html = html + `
        <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white" class="tickcontainer">${datas[tradedata].Trade}
        <label style="opacity: 0;">
        <input type="checkbox"
            class = "${checkboxclass}"
            onclick = "
                var checkboxs = document.getElementsByClassName('${toclickclass}');
                for (checkbox = 0; checkbox < checkboxs.length; checkbox++) {
                    if (this.checked){
                        checkboxs[checkbox].checked = false;
                        checkboxs[checkbox].click();
                    }else{
                        checkboxs[checkbox].checked = true;
                        checkboxs[checkbox].click();
                    }
                }"
        >
        <span class="checkmark"></span>
        </label>
        </td>`+
        insertspecialities(datas[tradedata].specialities,L,datas[tradedata].Trade);
    }
    return (html);
};

var insertspecialities = (datas,L,T) => {
    var html = '';
    for (specialitiesdata = 0; specialitiesdata < datas.length; specialitiesdata++) {
        var S = datas[specialitiesdata].Speciality;
        var inputid = `${L}_${T}_${S}`.replace(/\s+/g, '');
        var checkboxclass = `${L}_${T}`.replace(/\s+/g, '');
        html = html + `
        <td class="tickcontainer">${S}<span class="checkmask" onclick="document.getElementById('_${inputid}').click()"></span></td>
        <td class="tickcontainer">
        <label>
        <input type="checkbox"
            id = "_${inputid}"
            class = "${checkboxclass}"
            value="&#10003;"
            name="skilltable[${L}][${T}][${S}][area]"
            onclick="
                var input = document.getElementById('${inputid}');
                if (this.checked){
                    input.disabled = false;
                }else{
                    input.disabled = true
                }"
        >
        <span class="checkmark"></span>
        </label>
        </td>
        <td class="weighting"><input class="textinput" id="${inputid}" type="float" size=5 value=1.0 name="skilltable[${L}][${T}][${S}][weighting]" disabled></td>

        </tr><tr>`;
    }
    return (html);
};
module.exports = setTable;
