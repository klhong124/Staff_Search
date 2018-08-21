const style = require('../style')
var setTable = (staff,skills) => {
    var html =`
    <!DOCTYPE html>
    <html>
    <head>
    <title>Best Staff</title>
    <style>
        ${style}
    </style>
    </head>
    <body>
        <h1>Staff Information</h1>
        `+staffs(staff,skills)+`
        <a href="../../">Return Home</a> 
    </body>
    </html> 
    
    `;
    return html;
};

var staffs = (staff,skills) => {
    var htmlarray = [];
    for(var i=0;i<staff.length;i++){
    var skillcount = {Material:0,Testing:0,Management:0, Supervision: 0,Hand_On:0};
    countskill(skillcount,JSON.parse(staff[i].skilltable));
    var totalscore = skillcount.Material+skillcount.Testing+skillcount.Management+skillcount.Supervision+skillcount.Hand_On
    htmlarray.push({html:`
    <div class="staffinfo">
        <p>Staff ID : ${staff[i].id}</p>
        <p>Name : ${staff[i].name}</p>
        <p>Age : ${staff[i].age}</p>
    </div><br>
    <table>
        <tr>
        <th rowspan="2">Locations</th>
        <th rowspan="2">Trades</th>
        <th rowspan="2">Speciality</th>
        <th rowspan="2">Weighting</th>
        <th colspan="`+countcol(skills)+`">Skill</th>
        <th colspan="2">Year</th>
        </tr>
        <tr style="background-color:white">
        `+showcol(skills,"Material",`<th  class = "upright">Material</th>`)+`
        `+showcol(skills,"Testing",`<th  class = "upright">Testing</th>`)+`
        `+showcol(skills,"Management",`<th  class = "upright">Management</th>`)+`
        `+showcol(skills,"Supervision",`<th  class = "upright">Supervision</th>`)+`
        `+showcol(skills,"Hand_On",`<th  class = "upright">Hand On</th>`)+`
        <th>From</th>
        <th style="padding: 0 16px">To</th>
        </tr>
        
        `+inserttables(JSON.parse(staff[i].skilltable), skills)+`
        <tr style="background-color:white">
        <td colspan="4"><b>Total :</b></td>
        `+showcol(skills,"Material",`<td class="tick">${skillcount.Material}</td>`)+`
        `+showcol(skills,"Testing",`<td class="tick">${skillcount.Testing}</td>`)+`
        `+showcol(skills,"Management",`<td class="tick">${skillcount.Management}</td>`)+`
        `+showcol(skills,"Supervision",`<td class="tick">${skillcount.Supervision}</td>`)+`
        `+showcol(skills,"Hand_On",`<td class="tick">${skillcount.Hand_On}</td>`)+`
        <td style="border-right:0px">Score : </td>
        <td style="border-left:0px;font-size: 30px;"><b>${totalscore}</b></td>
        </tr>
        
    </table><br><hr><br>`,score:totalscore});
    }
    var html = ""
    htmlarray.sort(function(a,b) {return (a.score > b.score) ? -1 : ((b.score > a.score) ? 1 : 0);} )
    for (var i=0;i<htmlarray.length;i++){
        html = html + htmlarray[i].html;
    }
    return (html);
};




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
    
    var html = '';
    for (var specialities in datas) {
        html = html + `
        <td>${specialities}</td>
        <td class="tick">${datas[specialities].weighting}x</td>
        `+showcol(skills,"Material",`<td class="tick">`+showture(datas[specialities].area.Material)+`</td>`)+`
        `+showcol(skills,"Testing",`<td class="tick">`+showture(datas[specialities].area.Testing)+`</td>`)+`
        `+showcol(skills,"Management",`<td class="tick">`+showture(datas[specialities].area.Management)+`</td>`)+`
        `+showcol(skills,"Supervision",`<td class="tick">`+showture(datas[specialities].area.Supervision)+`</td>`)+`
        `+showcol(skills,"Hand_On",`<td class="tick">`+showture(datas[specialities].area.Hand_On)+`</td>`)+`
        <td>${datas[specialities].area.From}</td>
        <td>${datas[specialities].area.To}</td>
        </tr><tr>`;            
    }
    return (html);
};
var showture = (data) => {
    if (data){
        return "&#10003;"
    }else{
        return""
    }

}
var showcol = (skills,skill,col) => {
    
    if(skills[skill]==="1"){
        return col
    }else{
        return""
    }
}
var countcol = (skills) =>{
    var number = Number(skills.Material)+Number(skills.Testing)+Number(skills.Management)+Number(skills.Supervision)+Number(skills.Hand_On);
    return number;
}
var countskill = (countskill,datas) => {
    for (var locations in datas) {
        for(var trades in datas[locations]){
            for(var specialities in datas[locations][trades]){
                for(var skills in datas[locations][trades][specialities].area){
                    if(datas[locations][trades][specialities].area[skills]===true){  
                        countskill[skills]=countskill[skills]+Number(datas[locations][trades][specialities].weighting)
                    }
                }
            }
        }
    }
    return countskill
}
module.exports = setTable;

    /*
            <tr></tr><tr>
            <td rowspan="3+2" style="background-color:white">Site</td>  
    
                    <td rowspan="3" style="background-color:white">Demolition</td>
    
                            <td>Scaffold</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>
    
                            <td>Demlish</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>
    
                            <td>Shoring</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>
    
                    <td rowspan="2" style="background-color:white">Excavation</td>
    
                            <td>Excavation</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>
    
                            <td>Backfilling</td>
                            <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>
                            </tr><tr>
    
            </tr>
    */