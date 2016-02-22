function generateText(str){
    var el = document.createElement("h2");
    el.innerHTML = str;
    return el;
}

module.exports = {
    generateText : generateText
};