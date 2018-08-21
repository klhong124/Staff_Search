const style = require('../style')
var setStaff = (staff) => {
var skillcount = {Material:0,Testing:0,Management:0, Supervision: 0,Hand_On:0};
countskill(skillcount,staff.skilltable);
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
        
        `+inserttables(staff.skilltable)+`
        <tr style="background-color:white">
            <td colspan="3">Number of '&#10003' :</td>
            <td class="tick">${skillcount.Material}</td>
            <td class="tick">${skillcount.Testing}</td>
            <td class="tick">${skillcount.Management}</td>
            <td class="tick">${skillcount.Supervision}</td>
            <td class="tick">${skillcount.Hand_On}</td>
            <th colspan="2">Total : ${skillcount.Material+skillcount.Testing+skillcount.Management+skillcount.Supervision+skillcount.Hand_On}</th>
        </tr>

      </table>
      <a href="../../">Return Home</a> 
</body>
</html> 

`;

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
        inserttrades(datas[locationdata].trades)+`</tr>`;
    }
    return (html);
};
var inserttrades = (datas) => {
    var html = '';
    for (tradedata = 0; tradedata < datas.length; tradedata++) { 
        html = html + `
        <td rowspan="${datas[tradedata].specialities.length}" style="background-color:white">${datas[tradedata].Trade}</td>`+
        insertspecialities(datas[tradedata].specialities);
    }
    return (html);
};

var insertspecialities = (datas) => {
    var html = '';
    for (specialitiesdata = 0; specialitiesdata < datas.length; specialitiesdata++) { 
        html = html + `
        <td>${datas[specialitiesdata].Speciality}</td>
        <td class="tick">`+return_show(datas[specialitiesdata].skills.Material)+`</td>
        <td class="tick">`+return_show(datas[specialitiesdata].skills.Testing)+`</td>
        <td class="tick">`+return_show(datas[specialitiesdata].skills.Management)+`</td>
        <td class="tick">`+return_show(datas[specialitiesdata].skills.Supervision)+`</td>
        <td class="tick">`+return_show(datas[specialitiesdata].skills.Hand_On)+`</td>
        <td>${datas[specialitiesdata].skills.From}</td>
        <td>${datas[specialitiesdata].skills.To}</td>
        </tr><tr>`;            
    }
    return (html);
};

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