var wxml2axml = require('wxml2axml');
var fs = require('fs');

function to (from, to) {
    file = fs.readFileSync(from, 'utf8');
    if (/\.wxml$/i.test(from)) {
        // console.log(from)
        file = wxml2axml.compiler(file);
    } else if (/\.js$/i.test(from)) {
        file = 'const wx = my;\n' + file;
    } else if (/\.wxss$/i.test(from)) {
        file = file.replace('.wxss"', '.acss"').replace('.wxss\'', '.acss\'');
    }

    fs.writeFile(to, file, function (err) {
        if (err) throw err;
    });
}
module.exports = {
    to: to 
}