const style = require('../style')
var skilltoObj = (skills) => {
  obj = {};
  for (col = 0; col < skills.length; col++) {
    obj[`${skills[col].replace(/\s+/g, '')}`] = 0;
  }
  return obj;
}

var setStaff = (staff,col) => {
var html =`
<!DOCTYPE html>
<html>
<head>
<title>Skill Table - ${staff.id}</title>
<style>
    ${style}
</style>
</head>
<body>
    <h1>Staff Information</h1>
    <div class="staffinfo">
        <p>Staff ID : ${staff.id}</p>
        <p>Name : ${staff.name}</p>
        <p>Age : ${staff.age}</p>
    </div><br>
    <table>
        <tr>
          <th rowspan="2">Locations</th>
          <th rowspan="2">Trades</th>
          <th rowspan="2">Speciality</th>
          <th colspan="${col.length}">Skill</th>
          <th colspan="2">Year</th>
        </tr>
        <tr style="background-color:white">
          `+colskill(col)+`
          <th>From</th>
          <th style="padding: 0 16px">To</th>
        </tr>

        `+inserttables(staff.skilltable,col)+`
        <tr style="background-color:white">
            <td colspan="3">Number of '&#10003' :</td>
            `+showscore(countskill(skilltoObj(col),staff.skilltable))+`
            <th colspan="2">Total : `+totalsocre(countskill(skilltoObj(col),staff.skilltable))+`</th>
        </tr>

      </table>
      <a href="../../">Return Home</a>
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
        inserttrades(datas[locationdata].trades,col)+`</tr>`;
    }
    return (html);
};
var inserttrades = (datas,col) => {
    var html = '';
    for (tradedata = 0; tradedata < datas.length; tradedata++) {
        html = html + `
        <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white">${datas[tradedata].Trade}</td>`+
        insertspecialities(datas[tradedata].specialities,col);
    }
    return (html);
};
var colskillbox = (datas,skills) => {
  html = "";
  for (col = 0; col < skills.length; col++) {
      html = html+`
      <td class="tick">`+return_show(datas.skills[`${skills[col].replace(/\s+/g, '')}`])+`</td>
      `;
  }
  return html;
}
var insertspecialities = (datas,col) => {
    var ifold = (from,to) => {
        if(from === undefined){
          var html = `<td colspan = "2" style="color:gray">(update required)</td>`;
        }else{
          var html = `
          <td>${from}</td>
          <td>${to}</td>
          `;}
        return html;
    }
    var html = '';
    for (specialitiesdata = 0; specialitiesdata < datas.length; specialitiesdata++) {
        html = html + `
        <td>${datas[specialitiesdata].Speciality}</td>
        `+colskillbox(datas[specialitiesdata],col)+`
        `+ifold(datas[specialitiesdata].skills.From,datas[specialitiesdata].skills.To)+`
        </tr><tr>`;
    }
    return (html);
};

var colskill = (skills) => {
  html = "";
  for (col = 0; col < skills.length; col++) {
    html = html+`<th><span class = "upright">${skills[col]}</span></th>`;
  }
  return html;
}

var showscore = (skillcount) => {
  html = "";
  for (var skill in skillcount){
    html = html + `<td class="tick">${skillcount[skill]}</td>`;
  }
  return html;
}

var totalsocre = (skillcount) => {
  socre = 0;
  for (var skill in skillcount){
    socre = socre + skillcount[skill];
  }
  return socre;
}

var return_show = (data) =>{
    if (data){
        return "&#10003;"
    }else{
        return""
    }

}

var countskill = (countskill,datas) => {
    for (locationdata = 0; locationdata < datas.length; locationdata++) {
        for (tradedata = 0; tradedata < datas[locationdata].trades.length; tradedata++) {
            for (specialitiesdata = 0; specialitiesdata <  datas[locationdata].trades[tradedata].specialities.length; specialitiesdata++) {
                for(var skills in datas[locationdata].trades[tradedata].specialities[specialitiesdata].skills){
                    if(datas[locationdata].trades[tradedata].specialities[specialitiesdata].skills[skills]===true){
                        countskill[skills]++;
                    }
                }
            }
        }
    }
    return countskill
}

module.exports = setStaff;
