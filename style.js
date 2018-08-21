var style = `
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 90%;
    margin-left:5%;
}
td, th {
    border: 1px solid #a5a5a5;
    padding: 8px;
}
tr:nth-child(even) {
    background-color: #dddddd;
}
.staffinfo{
    border-style: double;
    width: 90%;
    margin-left:5%;
}
.staffinfo p{
    padding-left:20px;
}
.skill_selection{
    border-style: double;
    padding:10px 0px 10px 10px;
    width: 90%;
    margin-left:5%;
}
.skill_selection input{
    padding-left:20px;
}
.upright {
    writing-mode: vertical-rl;
    text-orientation: upright;
    height:90px;
    width:20px;
    padding:20px
}
.tick{
    text-align: center;
    width:20px;
    text-align: center;
}
.weighting{
    width:20px;
    text-align: center;
}

`;
module.exports = style;