var setNewstaff = (datas,col) => {
    var newstaff = `
    {
        id: "${datas.staffid}",
        name: "${datas.name}",
        age: `+return_null(datas.age)+`,
        skilltable:[
            `+locations(datas,col)+`
        ]
    }
    `;
    return newstaff;
}

var locations = (datas,col) => {
    var html ="";
    for(var locations in datas.skilltable){
        html = html + `
        {
            Master: {id: "${datas.staffid}"},
            Location: "${locations}",
            trades: [
                `+trades(datas.skilltable[locations],col)+`
            ]
        },
        `
    };
return html;
};

var trades = (datas,col) => {
    var html = "";
    for(var trades in datas){
        html = html + `
        {
            Trade: "${trades}",
            specialities:[
                `+specialities(datas[trades],col)+`
            ]
        },
        `
    };
return html;
};

var colskill = (skills,datas) => {
  str = "";
  for (col = 0; col < skills.length; col++) {
    str = str+`\t\t${skills[col].replace(/\s+/g, '')}: ${Boolean(Number(datas[skills[col]]))},\n`;
  }
  return str;
}

var specialities = (datas,col) => {
    var html = "";
    for(var specialities in datas){
        html = html + `
        {
            Speciality: "${specialities}",
            skills:{
`+colskill(col,datas[specialities])+`
                From: `+return_null(datas[specialities].From)+`,
                To: `+return_null(datas[specialities].To)+`
            }
        },
        `
    };
    return html;
};
var return_null = (data) =>{
    if (data === undefined){
        return null;
    }
    if (data === ""){
        return null;
    }
    else{
        return Number(data);
    }
};

module.exports = setNewstaff;
