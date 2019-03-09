//miaog.js 本miaog是miaog的node版本
//miaog是一个基于点、线、路径、的矢量类（点构成线，线构成路径，路径构成图），可以输出svg格式
//版本：2.0.0.3
//依赖模块：ES6, xmldom, fs, buffer, path, underscore, miaocommon.js
//var Class = require('class-extender');
var DOMParser = require('xmldom').DOMParser;

var fs = require('fs');//文件模块
var buffer = require('buffer');//文件模块
var path = require('path');//路径模块

var miaocommon = require('./miaocommon.js');

var MiaoG = {
  JsName: 'MiaoGN',
  Website: 'miaoxiaoer.com',
  FixedNumber: 5,//默认的精度为5位小数
  CCKey: 'RmH5La7VF6XsN4Pu2e1JTq8k3oic0yBZ',
  DatetimeFormat: 'yyyy-MM-dd H:mm:ss',
  DateFormat: 'yyyy-MM-dd',
  CommonCounterVar: 50,
  LastUpdaeVersion: '2.0.0.0',
  MiaoGraphicalErrorStr: '',
  mycolorstrreg: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
  mycolorargbstrreg: /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/
};
module.exports = MiaoG;