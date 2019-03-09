//miaog.js 本miaog是miaog的node版本
//miaog是一个基于点、线、路径、的矢量类（点构成线，线构成路径，路径构成图），可以输出svg格式
//依赖模块：class-extender, xmldom, fs, buffer, path, lodash
//var Class = require('class-extender');
var DOMParser = require('xmldom').DOMParser;

var fs = require('fs');//文件模块
var buffer = require('buffer');//文件模块
var path = require('path');//路径模块

var Common = require('./common.js');
var ColorLib= require('./colorlib.js');
var ColorClass = require('./color_class.js');
var PointClass = require('./point_class.js');
var LineClass = require('./line_class.js');
var RectangleClass = require('./rectangle_class.js');
var AnnularClass = require('./annular_class.js');
var ArcClass = require('./arc_class.js');
var CircleClass = require('./circle_class.js');
var EllipseClass = require('./ellipse_class.js');
var GearClass = require('./gear_class.js');
var HeartClass = require('./heart_class.js');
var HelicalLineClass = require('./helicalline_class.js');
var HexagonClass = require('./hexagon_class.js');
var RhombicClass = require('./rhombic_class.js');
var RegularTriangleClass = require('./regulartriangle_class.js');

var QuadraticBezierCurveClass = require('./quadraticbeziercurve_class.js');
var ThreeBezierCurveClass = require('./threebeziercurve_class.js');
var RegularPolygonClass = require('./regularpolygon_class.js');
var RoundRectangleClass = require('./roundrectangle_class.js');
var SizeClass = require('./size_class.js');
var StarClass = require('./star_class.js');
var RoundStarClass = require('./roundstar_class.js');
var TriangleClass = require('./triangle_class.js');

var MiaoG = {
  JsName: 'miaog',
  Website: 'miaoxiaoer.com',
  LastUpdaeVersion: '2.0.0.11',
  Common: Common,
  //颜色库
  ColorLib: ColorLib,
  //颜色类
  NewColorClass: function(){return eval(Common.GetNewClassFunStr('ColorClass',arguments));},
  //点类
  NewPointClass: function(){return eval(Common.GetNewClassFunStr('PointClass',arguments));},
  //线类
  NewLineClass: function(){return eval(Common.GetNewClassFunStr('LineClass',arguments));},
  //尺寸类
  NewSizeClass: function(){return eval(Common.GetNewClassFunStr('SizeClass',arguments));},
  //矩形类
  NewRectangleClass: function(){return eval(Common.GetNewClassFunStr('RectangleClass',arguments));},
  //环形类
  NewAnnularClass: function(){return eval(Common.GetNewClassFunStr('AnnularClass',arguments));},
  //弧线类
  NewArcClass: function(){return eval(Common.GetNewClassFunStr('ArcClass',arguments));},
  //圆类
  NewCircleClass: function(){return eval(Common.GetNewClassFunStr('CircleClass',arguments));},
  //椭圆类
  NewEllipseClass: function(){return eval(Common.GetNewClassFunStr('EllipseClass',arguments));},
  //弧线类
  NewGearClass: function(){return eval(Common.GetNewClassFunStr('GearClass',arguments));},
  //心类
  NewHeartClass: function(){return eval(Common.GetNewClassFunStr('HeartClass',arguments));},
  //螺旋线类
  NewHelicalLineClass: function(){return eval(Common.GetNewClassFunStr('HelicalLineClass',arguments));},
  //六边形类
  NewHexagonClass: function(){return eval(Common.GetNewClassFunStr('HexagonClass',arguments));},
  //菱形类（正菱形，每一个角是60,120度，用来拼接平面，做2.5D游戏地面坐标）
  NewRhombicClass: function(){return eval(Common.GetNewClassFunStr('RhombicClass',arguments));},
  //正三角类（每一个角是60）
  NewRegularTriangleClass: function(){return eval(Common.GetNewClassFunStr('RegularTriangleClass',arguments));},
  //二次贝塞尔曲线类
  NewQuadraticBezierCurveClass: function(){return eval(Common.GetNewClassFunStr('QuadraticBezierCurveClass',arguments));},
  //三次贝塞尔曲线类
  NewThreeBezierCurveClass: function(){return eval(Common.GetNewClassFunStr('ThreeBezierCurveClass',arguments));},
  //正多边形类
  NewRegularPolygonClass: function(){return eval(Common.GetNewClassFunStr('RegularPolygonClass',arguments));},
  //圆角矩形类
  NewRoundRectangleClass: function(){return eval(Common.GetNewClassFunStr('RoundRectangleClass',arguments));},
  //星类
  NewStarClass: function(){return eval(Common.GetNewClassFunStr('StarClass',arguments));},
  //圆角星类
  NewRoundStarClass: function(){return eval(Common.GetNewClassFunStr('RoundStarClass',arguments));},
  //三角类
  NewTriangleClass: function(){return eval(Common.GetNewClassFunStr('TriangleClass',arguments));}
};
module.exports = MiaoG;