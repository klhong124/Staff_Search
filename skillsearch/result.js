const style = require('../style')
var setTable = (allstaff,skills) => {
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Best Staff</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
        ${style}
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Staff Information</h1><hr>
        `+staffs(allstaff,skills)+`
        <ul class="pager">
          <li><a href="../skill_search">Previous</a></li>
          <li><a href="../../">Return Home</a></li>
        </ul>
    </div>
    </body>
    </html>

    `;
    return html;
};

var staffs = (allstaff,scoretable) => {
  var htmlarray = [];
  for(var i=0;i<allstaff.length;i++){
    var skillcolspan = 0;
    for(var skill in scoretable){ scoretable[skill] = 0;skillcolspan++;} // scoretable reset
  var skilltable = JSON.parse(allstaff[i].skilltable);
  countskill(scoretable,skilltable);
  var totalscore = 0
    for (var skill in scoretable){
        totalscore = totalscore + scoretable[skill];
    }
    htmlarray.push({html:`
        <p>Staff ID : ${allstaff[i].id}</p>
        <p>Name : ${allstaff[i].name}</p>
        <p>Age : ${allstaff[i].age}</p>
    </div><br>
    <table class="table">
        <tr style="background-color:white;">
        <th rowspan="2">Locations</th>
        <th rowspan="2">Trades</th>
        <th rowspan="2">Speciality</th>
        <th rowspan="2">Weighting</th>
        <th colspan="${skillcolspan}">Skill</th>
        <th colspan="2">Year</th>
        </tr>
        <tr style="background-color:white">
        `+colskill(scoretable)+`
        <th>From</th>
        <th>To</th>
        </tr>

        `+inserttables(skilltable, scoretable)+`
        <tr style="background-color:white;">
        <td colspan="4" style="vertical-align: middle;"><b>Total :</b></td>
        `+showscore(scoretable)+`
        <td style="border-right:0px!important;vertical-align: middle">Score : </td>
        <td style="border-left:0px!important;font-size: 35px;"><b>${totalscore}</b></td>
        </tr>

    </table><br><hr><br>`,score:totalscore});
    }
    var html = ""
    htmlarray.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} )
    for (var i=0;i<htmlarray.length;i++){
        html = html + `
        <div class="staffinfo well-lg">
            <p style="font-size: 30px;float:right;margin-right:30px"># ${i+1}</p>
        ` + htmlarray[i].html;
    }
    return (html);
};

var colskill = (skills) => {
  html = "";
  for (var skill in skills) {
    html = html+`<th><span class = "upright">${skill}</span></th>`;
  }
  return html;
}

var inserttables = (datas, skills) => {
    var html = '';
    for (var locations in datas) {
        var rowspan_of_location = 0;
        for(var trades in datas[locations]){
            for(var specialities in datas[locations][trades]){
                rowspan_of_location++
            }
        }
        html = html + `
        <tr></tr><tr>
        <td rowspan="${rowspan_of_location}" style="background-color:white;">${locations}</td>`+
        inserttrades(datas[locations], skills)+`</tr>`;
    }
    return (html);
};
var inserttrades = (datas, skills) => {
    var html = '';
    for (var trades in datas) {
        var rowspan_of_trade = 0;
        for(var specialities in datas[trades]){
            rowspan_of_trade++
        }
        html = html + `
        <td rowspan="${rowspan_of_trade}" style="background-color:white">${trades}</td>`+
        insertspecialities(datas[trades], skills);
    }
    return (html);
};
var insertspecialities = (datas, skills) => {
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
    for (var specialities in datas) {
        html = html + `
        <td>${specialities}</td>
        <td class="tick">${datas[specialities].weighting*100}%</td>
        `+showticks(datas[specialities].area,skills)+`
        `+ifold(datas[specialities].area.From,datas[specialities].area.To)+`
        </tr><tr>`;
    }
    return (html);
};

var showscore = (skills) => {
  html = "";
  for (var socre in skills) {
    html = html+`<td class="tick"style="vertical-align: middle;"><b>${skills[socre]}</b></td>`;
  }
  return html;
}

var showticks = (data,skills) => {
  html = "";
  for (var skill in skills) {
    html = html+`<td class="tick">`+showtick(data[skill])+`</td>`;
  }
  return html;
}

var showtick = (data) => {
  if (data){
      return "&#10003;"
  }else{
      return""
  }
}

var countskill = (skills,datas) => {
    for (var locations in datas) {
        for(var trades in datas[locations]){
            for(var specialities in datas[locations][trades]){
                for(var skill in datas[locations][trades][specialities].area){
                    if(skills.hasOwnProperty(skill) && datas[locations][trades][specialities].area[skill]===true){
                        skills[skill]=skills[skill]+Number(datas[locations][trades][specialities].weighting)
                    }
                }
            }
        }
    }
    return skills
}
module.exports = setTable;
