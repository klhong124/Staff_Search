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
    height:90px;
    width:20px;
    padding:5px
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
input[type=checkbox] {
  transform: scale(3);
  -webkit-appearance: initial;
  appearance: initial;
  background: transparent;
  width: 15px;
  height: 13px;
  border: none;
}
input[type="checkbox"]:checked {
    background: red;
}
input[type="checkbox"]:checked:after {
    content: "✓";
}
`;
module.exports = style;
