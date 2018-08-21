const style = require('../style')
var setTable = (table) => {
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Skill Search</title>
    <style>
    ${style}
    </style>
    </head>

    <body>
    <h1>Find Best Staff</h1>
    <form action="/search_skill" method="POST">
        <div class="skill_selection">
            <input type="hidden" value=1 name="[skills][Material]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value" checked>Material
            <input type="hidden" value=1 name="[skills][Testing]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value" checked>Testing
            <input type="hidden" value=1 name="[skills][Management]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value" checked>Management
            <input type="hidden" value=1 name="[skills][Supervision]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value" checked>Supervision
            <input type="hidden" value=1 name="[skills][Hand_On]"><input type="checkbox" onclick="this.previousSibling.value=1-this.previousSibling.value" checked>Hand On
        </div><br>
        <table>
            <tr>
              <th>Locations</th>
              <th>Trades</th>
              <th>Speciality</th>
              <th>Require</th>
              <th>Weighting</th>
            </tr>
            `+inserttables(table)+`
          </table><br>
        <input type="submit" value="Find Best Staff">
    </form><hr>
    <a href="../../">Return Home</a> 
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
        <td rowspan="`+rowspan()+`" style="background-color:white;">${datas[locationdata].Location}
        <input type="checkbox" 
            onclick = "
                var _checkboxs = document.getElementsByClassName('${toclickclass}');
                for (_checkbox = 0; _checkbox < _checkboxs.length; _checkbox++) {
                    if (this.checked){
                        _checkboxs[_checkbox].checked = false;
                        _checkboxs[_checkbox].click();
                    }else{
                        _checkboxs[_checkbox].checked = true;
                        _checkboxs[_checkbox].click();
                    }
                }"
        >
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
        <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white">${datas[tradedata].Trade}
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
        <td>${S}</td>
        <td class="tick">
        <input type="checkbox"
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
        ></td>
        <td class="weighting"><input style="border:none;background: transparent;text-align: center;" id="${inputid}" type="number" size=5 value=1 name="skilltable[${L}][${T}][${S}][weighting]" disabled></td>

        </tr><tr>`;
    }
    return (html);
};
module.exports = setTable;