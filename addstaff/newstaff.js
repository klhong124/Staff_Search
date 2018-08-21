var setNewstaff = (datas) => {
    var newstaff = `
    {
        id: "${datas.staffid}",
        name: "${datas.name}",
        age: `+return_null(datas.age)+`,
        skilltable:[
            `+locations(datas)+`
        ]
    }
    `;
    return newstaff;
}
/* 
    {
      id: "TS00155", 
      name: "Chan Ma Ma", 
      age: 200, 
      skilltable: 
      [
        {
          Master: {id: "TS00155"}, 
          Location: "Site Formation", 
          trades: [
            {
              Trade: "Demolition", 
              specialities: [
                {
                  Speciality: "Scaffold", 
                  skills: {
                    Material: false, 
                    Testing: true,
                    Management: false, 
                    Supervision: true, 
                    Hand_On: false
                    From: 2018, 
                    To: 2019
                  }
                },
              ]
            },
          ]
        },
      ]
    }
*/

var locations = (datas) => {
    var html ="";
    for(var locations in datas.skilltable){
        html = html + `
        {	
            Master: {id: "${datas.staffid}"},
            Location: "${locations}",
            trades: [
                `+trades(datas.skilltable[locations])+`
            ]
        },
        `
    };
return html;
};

var trades = (datas) => {
    var html = "";
    for(var trades in datas){
        html = html + `
        {
            Trade: "${trades}",
            specialities:[
                `+specialities(datas[trades])+`
            ]
        },
        `
    };
return html;
};

var specialities = (datas) => {
    var html = "";
    for(var specialities in datas){
        html = html + `
        {
            Speciality: "${specialities}",
            skills:{ 
                Material: `+Boolean(Number(datas[specialities].Material))+`,
                Testing: `+Boolean(Number(datas[specialities].Testing))+`,
                Management: `+Boolean(Number(datas[specialities].Management))+`,
                Supervision: `+Boolean(Number(datas[specialities].Supervision))+`,
                Hand_On: `+Boolean(Number(datas[specialities].Hand_On))+`,
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