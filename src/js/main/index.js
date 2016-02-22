require('../../styles/index.scss');
var assist = require('./assist');
var a = require('../components/a');
var b = require('../components/b');
var app = document.createElement("div");
app.innerHTML = "<h1>Hello Index " +  a.getA()+ b.getB() +"</h1>";
app.appendChild(assist.generateText("title index"));
$("#e").append(app);
//$("#e").html("心灵上的风拉伸法第三");