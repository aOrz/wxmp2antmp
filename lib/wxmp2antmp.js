var wxml2axml = require('wxml2axml');
var fs = require('fs');

function to (from, to) {
    file = fs.readFileSync(from, 'utf8');
    if (/\.wxml$/.test(from)) {
        // console.log(from)
        file = wxml2axml.compiler(file);
    } else if (/\.js$/.test(from)) {
        file = 'const wx = my;\n' + file;
    }

    fs.writeFile(to, file, function (err) {
        if (err) throw err;
    });
}
module.exports = {
    to: to 
}