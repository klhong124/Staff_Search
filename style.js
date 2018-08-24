var style = `
table {
    font-family: arial, sans-serif;
    font-size:15px;
    border-collapse: collapse;
    width:100%;
}
td, th {
    border: 1.2px solid #a5a5a5 !important;
    padding: 8px;
}
tr:hover{
  background-color:#F5F5F5;
}
tr:nth-child(even):hover{
  background-color:#D0D0D0;
}
tr:nth-child(even) {
    background-color: #e0e0e0;
}

.staffinfo{
    border-style: double;
    width:100%;
}
.staffinfo p{
    padding-left:20px;
}

.submitbutton{
  border-radius: 25px;
  border: 2px solid #4CAF50;
  background-color: white;
  color: green;
  padding: 10px 50px;
}
.submitbutton:hover{
  background-color:#4CAF50;
  color: white;
}
.editbutton{
  background-color:#D7F5FC !important;
  border-color:#B0C7FF !important;
}
.editbutton:hover{
  background-color:#D0E6EB !important;
}
.delbutton{
  background-color:#F7DADA !important;
  border-color:#FFB6B6 !important;
}
.delbutton:hover{
  background-color:#EBD0D0 !important;
}

.upright {
    writing-mode: vertical-rl;
    height:90px;
    width:20px;
    padding:5px
}
.textinput{
  border:none;
  background: transparent;
  text-align: center;
  padding:5px;
}
.tick{
    text-align:center;
    width:20px
}
.weighting{
    width:20px;
    text-align: center;
}
.weighting>input:disabled{
  opacity: .2;
}

.tickcontainer {
    position: relative;
    cursor: pointer;
}
.tickcontainer input {
    opacity: 0;
    cursor: pointer;
}
.checkmark {
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: transparent;
}
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}
.tickcontainer input:checked ~ .checkmark:after {
    display: block;
}
.tickcontainer .checkmark:after {
    width: 100%;
    content: "✓";
    font-size:19px;
    text-align: center;
    bottom:10px;
}

`;
module.exports = style;
