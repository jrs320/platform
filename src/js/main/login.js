require('../../styles/login.scss');
var assist = require('./assist');
var a = require('../components/a');
var b = require('../components/b');
var app = document.createElement("div");
app.innerHTML = "<h1>Hello Login " + a.getA()+ b.getB()+"</h1>";
app.appendChild(assist.generateText("title login"));
$("#e").append(app);