var wxml2axml = require('wxml2axml');
var fs = require('fs');
var shelljs = require('shelljs');

function to (from, to) {
    file = fs.readFileSync(from, 'utf8');
    if (/\.wxml$/i.test(from)) {
        // console.log(from)
        file = wxml2axml.compiler(file);
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.js$/i.test(from)) {
        file = 'const wx = my;\n' + file;
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else if (/\.wxss$/i.test(from)) {
        file = file.replace(new RegExp('.wxss"', 'g'), '.acss"').replace(new RegExp('.wxss\'', 'g'), '.acss\'');
        fs.writeFile(to, file, function (err) {
            if (err) throw err;
        });
    } else {
        shelljs.cp(from, to);
    }
}
module.exports = {
    to: to 
}