#!/usr/bin/env node
var path = require('path');
var fs = require('fs');
var argv = process.argv;
var wxmp2antmp = require('./lib/wxmp2antmp');

if (argv.length < 4) {
    console.log('请输入正确的参数，w2a 微信小程序目录 支付宝小程序目录 如： w2a wxmp antmp');
}
var fromPath = path.resolve(argv[2]);
var toPath = path.resolve(argv[3]);

function walk (fromPath, toPath) {
    var fileList = fs.readdirSync(fromPath);
    for (var index = 0; index < fileList.length; index++) {
        var name = fileList[index];
        var filePath = path.resolve(fromPath, name);
        var toFilePath = path.resolve(toPath, name.replace(/\.wxml$/, '.axml').replace(/\.wxss$/, '.acss'));
        if (isUnwanted(name)) {
            continue;
        }
        if (fs.lstatSync(filePath).isDirectory()) {
            fs.mkdirSync(toFilePath);
            walk(filePath, toFilePath);
        } else {
            wxmp2antmp.to(filePath, toFilePath)
            // fs.createReadStream(filePath).pipe(fs.createWriteStream(toFilePath));
        }
    }
}

if (fs.existsSync(toPath)) {
    console.log(`${fromPath}文件夹已存在`);
} else if (fs.existsSync(fromPath)) {
    fs.mkdirSync(toPath);
    walk(fromPath, toPath);
} else {
    console.log(`${fromPatth}文件夹不存在`);
}
  
function isUnwanted(filename) {
return /(?:Thumbs\.db|\.DS_Store|\.git|node_modules)$/i.test(filename);
}