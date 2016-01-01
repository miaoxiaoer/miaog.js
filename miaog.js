//miaog.js
//版本：0.0.1.8
//这是图形及本类，可以操作svg，ai，eps等矢量图形
'use strict';

//var global_transparentColor = new MiaoColorClass(0,0,0,0);
//var global_bgColor = new MiaoColorClass(0, 0, 0, 0);
var global_MiaoGraphicalErrorStr = '';
//十六进制颜色值的正则表达式
var global_mycolorstrreg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
var global_mycolorargbstrreg = /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/;


var MiaoCommonVar = {
  Website: 'miaoxiaoer.com',
  Author: 'Chen Chen',
  Email: 'chenx4@163.com',
  FixedNumber: 5,//默认的精度为5位小数
  CCKey: '7kyPR2mcsLuT5Z6J3X4oaVFi1Ne80BqH',
  ThumbNailWidth: 400,
  ThumbNailHeight: 300,
  DatetimeFormat: 'yyyy-MM-dd H:mm:ss',
  DateFormat: 'yyyy-MM-dd',
  CommonCounterVar: 50,
  LastUpdaeVersion: '0.0.1.8'
};

var MiaoCommonFun = {
  //旋转坐标eAngle为角度，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (ePoint, eAngle, eOrgPoint) {
    var iAngle = ((Math.PI / 180) * eAngle);
    var iOrgPoint = eOrgPoint || { "X": 0, "Y": 0 };
    var iX = 0;
    var iY = 0;
    //x1 = cos(angle) * x - sin(angle) * y; y1 = cos(angle) * y + sin(angle) * x;
    iX = (Math.cos(iAngle) * (ePoint.X - eOrgPoint.X)) - (Math.sin(iAngle) * (ePoint.Y - eOrgPoint.Y)) + eOrgPoint.X;
    iY = (Math.cos(iAngle) * (ePoint.Y - eOrgPoint.Y)) + (Math.sin(iAngle) * (ePoint.X - eOrgPoint.X)) + eOrgPoint.Y;
    iX = iX.toFixed(MiaoCommonVar.FixedNumber);
    iY = iY.toFixed(MiaoCommonVar.FixedNumber);
    return { "X": iX, "Y": iY };
  },
  IsProbablePrime:function(n){
    var b = true;
    if (n == 0) {
      return false;
    }
    if (n < 0) {
      n = 0 - n;
    }
    if (n == 1) {
      return false;
    }
    if (n == 2){
      b = true;
    }
    else
    {
      var sqr = Math.sqrt(n);
      for (var i = sqr; i > 2; i--)
      {
        if (n % i == 0)
      {
          b = false;
      }
    }
    }
    return b;
  },
  GetJiaoDianL2L: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y) {
    var resultPointArr = new Array();
    if (MiaoCommonFun.IsExistJiaoDianL2L(ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y)) {

      var denominator = (ep2y - ep1y) * (eq2x - eq1x) - (ep1x - ep2x) * (eq1y - eq2y);
      if (denominator != 0) {
        // 线段所在直线的交点坐标 (x , y)      
        var ix = ((ep2x - ep1x) * (eq2x - eq1x) * (eq1y - ep1y)
                    + (ep2y - ep1y) * (eq2x - eq1x) * ep1x
                    - (eq2y - eq1y) * (ep2x - ep1x) * eq1x) / denominator;
        var iy = -((ep2y - ep1y) * (eq2y - eq1y) * (eq1x - ep1x)
                    + (ep2x - ep1x) * (eq2y - eq1y) * ep1y
                    - (eq2x - eq1x) * (ep2y - ep1y) * eq1y) / denominator;
        ix = ix.toFixed(MiaoCommonVar.FixedNumber);
        iy = iy.toFixed(MiaoCommonVar.FixedNumber);
        resultPointArr.push({ X: ix, Y: iy });
      }
    }
    return resultPointArr;
  },
  IsExistJiaoDianL2L: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y) {
    //判断L2L线段是否相交
    // 三角形abc 面积的2倍  
    var area_abc = (ep1x - eq1x) * (ep2y - eq1y) - (ep1y - eq1y) * (ep2x - eq1x);
    // 三角形abd 面积的2倍  
    var area_abd = (ep1x - eq2x) * (ep2y - eq2y) - (ep1y - eq2y) * (ep2x - eq2x);
    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
    if (area_abc * area_abd >= 0) {
      return false;
    }
    // 三角形cda 面积的2倍  
    var area_cda = (eq1x - ep1x) * (eq2y - ep1y) - (eq1y - ep1y) * (eq2x - ep1x);
    // 三角形cdb 面积的2倍  
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
      return false;
    }
    return true;
  },
  GetJiaoDianL2Q: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y }, resultPointArr, 16, 0, 1.0);
    return resultPointArr;
  },
  IsExistJiaoDianL2Q: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y }, resultPointArr, 16, 0, 1.0);
    if (resultPointArr.length > 0) {
      return true;
    } else {
      return false;
    }
  },
  JiaoDianDiguiPanbieL2Q: function (eLine, eCurve, ePointArr, eUpL, eT1, eT2) {
    var iNewCP1x, iNewCP1y, iNewCP2x, iNewCP2y, iNewCP3x, iNewCP3y, iNewCP4x, iNewCP4y;
    var iNewCQ1x, iNewCQ1y, iNewCQ2x, iNewCQ2y, iNewCQ3x, iNewCQ3y, iNewCQ4x, iNewCQ4y;
    var iCurve1, iCurve2;
    var iFengePoint;
    var iCankaoPoint1, iCankaoPoint2;
    var iKongzhiPoint1, iKongzhiPoint2;
    var iBoundingBox;
    iBoundingBox = MiaoCommonFun.GetQBoundingBox(eCurve);
    if (MiaoCommonFun.IsLineIntersectBoundingBox(eLine, iBoundingBox)) {
      iCankaoPoint1 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.2);
      iCankaoPoint2 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.7);
      iFengePoint = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.5);
      iKongzhiPoint1 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(eCurve.X1, eCurve.Y1, iFengePoint.X, iFengePoint.Y, iCankaoPoint1.X, iCankaoPoint1.Y, 0.4);
      iKongzhiPoint2 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(iFengePoint.X, iFengePoint.Y, eCurve.X4, eCurve.Y4, iCankaoPoint2.X, iCankaoPoint2.Y, 0.4);
      iNewCP1x = eCurve.X1;
      iNewCP1y = eCurve.Y1;
      iNewCP2x = iKongzhiPoint1.X;
      iNewCP2y = iKongzhiPoint1.Y;
      iNewCP3x = iFengePoint.X;
      iNewCP3y = iFengePoint.Y;
      iCurve1 = { 'X1': iNewCP1x, 'Y1': iNewCP1y, 'X2': iNewCP2x, 'Y2': iNewCP2y, 'X3': iNewCP3x, 'Y3': iNewCP3y };
      iNewCQ1x = iFengePoint.X;
      iNewCQ1y = iFengePoint.Y;
      iNewCQ2x = iKongzhiPoint2.X;
      iNewCQ2y = iKongzhiPoint2.Y;
      iNewCQ3x = eCurve.X4;
      iNewCQ3y = eCurve.Y4;
      iCurve2 = { 'X1': iNewCQ1x, 'Y1': iNewCQ1y, 'X2': iNewCQ2x, 'Y2': iNewCQ2y, 'X3': iNewCQ3x, 'Y3': iNewCQ3y };
      if ((iBoundingBox.Width < 1) && (iBoundingBox.Height < 1)) {
        var ifindxiangtongzhi = false;
        if (ePointArr.length > 0) {
          for (var i = 0; i < ePointArr.length; i++) {
            if ((ePointArr[i].X == iFengePoint.X) && (ePointArr[i].Y == iFengePoint.Y)) {
              ifindxiangtongzhi = true;
            }else{
              if ((Math.approximatelyEqual(ePointArr[i].X, iFengePoint.X, 1.0)) && (Math.approximatelyEqual(ePointArr[i].Y, iFengePoint.Y, 1.0))) {
                ifindxiangtongzhi = true;
              }
            }
            
          }
        }
        if (ifindxiangtongzhi == false) {
          //alert(Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber));
          ePointArr.push({ 'X': iFengePoint.X, 'Y': iFengePoint.Y, 'T': Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber) });
        }
      } else {
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q(eLine, iCurve1, ePointArr, eUpL, eT1, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber));
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q(eLine, iCurve2, ePointArr, eUpL, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber), eT2);
        }
      }
    }
    return ePointArr;
  },
  GetJiaoDianL2C: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2C({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y, 'X4': eq4x, 'Y4': eq4y }, resultPointArr, 16, 0, 1.0);

    return resultPointArr;
  },
  JiaoDianDiguiPanbieL2C: function (eLine, eCurve, ePointArr, eUpL, eT1, eT2) {
    var iNewCP1x, iNewCP1y, iNewCP2x, iNewCP2y, iNewCP3x, iNewCP3y, iNewCP4x, iNewCP4y;
    var iNewCQ1x, iNewCQ1y, iNewCQ2x, iNewCQ2y, iNewCQ3x, iNewCQ3y, iNewCQ4x, iNewCQ4y;
    var iCurve1,iCurve2;
    var iFengePoint;
    var iCankaoPoint1, iCankaoPoint2, iCankaoPoint3, iCankaoPoint4;
    var iKongzhiPoint1, iKongzhiPoint2;
    var iBoundingBox;
    iBoundingBox = MiaoCommonFun.GetCBoundingBox(eCurve);
    if (MiaoCommonFun.IsLineIntersectBoundingBox(eLine, iBoundingBox)) {
      iCankaoPoint1 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, eCurve.X4, eCurve.Y4, 0.2);
      iCankaoPoint2 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, eCurve.X4, eCurve.Y4, 0.3);
      iCankaoPoint3 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, eCurve.X4, eCurve.Y4, 0.7);
      iCankaoPoint4 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, eCurve.X4, eCurve.Y4, 0.8);
      
      iFengePoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, eCurve.X4, eCurve.Y4, 0.5);
      iKongzhiPoint1 = MiaoCommonFun.GetBezierCurvaturesControlPoint(eCurve.X1, eCurve.Y1, iFengePoint.X, iFengePoint.Y, iCankaoPoint1.X, iCankaoPoint1.Y, 0.4, iCankaoPoint2.X, iCankaoPoint2.Y, 0.6);
      iKongzhiPoint2 = MiaoCommonFun.GetBezierCurvaturesControlPoint(iFengePoint.X, iFengePoint.Y, eCurve.X4, eCurve.Y4, iCankaoPoint3.X, iCankaoPoint3.Y, 0.4, iCankaoPoint4.X, iCankaoPoint4.Y, 0.6);
      iNewCP1x = eCurve.X1;
      iNewCP1y = eCurve.Y1;
      iNewCP2x = iKongzhiPoint1[0].X;
      iNewCP2y = iKongzhiPoint1[0].Y;
      iNewCP3x = iKongzhiPoint1[1].X;;
      iNewCP3y = iKongzhiPoint1[1].Y;;
      iNewCP4x = iFengePoint.X;
      iNewCP4y = iFengePoint.Y;
      iCurve1={ 'X1': iNewCP1x, 'Y1': iNewCP1y, 'X2': iNewCP2x, 'Y2': iNewCP2y, 'X3': iNewCP3x, 'Y3': iNewCP3y, 'X4': iNewCP4x, 'Y4': iNewCP4y };
      iNewCQ1x = iFengePoint.X;
      iNewCQ1y = iFengePoint.Y;
      iNewCQ2x = iKongzhiPoint2[0].X;
      iNewCQ2y = iKongzhiPoint2[0].Y;
      iNewCQ3x = iKongzhiPoint2[1].X;
      iNewCQ3y = iKongzhiPoint2[1].Y;
      iNewCQ4x = eCurve.X4;
      iNewCQ4y = eCurve.Y4;
      iCurve2={ 'X1': iNewCQ1x, 'Y1': iNewCQ1y, 'X2': iNewCQ2x, 'Y2': iNewCQ2y, 'X3': iNewCQ3x, 'Y3': iNewCQ3y, 'X4': iNewCQ4x, 'Y4': iNewCQ4y };
      
      if ((iBoundingBox.Width < 1) && (iBoundingBox.Height < 1)) {
        var ifindxiangtongzhi = false;
        if (ePointArr.length > 0) {
          for (var i = 0; i < ePointArr.length; i++) {
            if ((ePointArr[i].X == iFengePoint.X) && (ePointArr[i].Y == iFengePoint.Y)) {
              ifindxiangtongzhi = true;
            } else {
              if ((Math.approximatelyEqual(ePointArr[i].X, iFengePoint.X, 1.0)) && (Math.approximatelyEqual(ePointArr[i].Y, iFengePoint.Y, 1.0))) {
                ifindxiangtongzhi = true;
              }
            }
          }
        }
        if (ifindxiangtongzhi == false) {
          //alert(Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber));
          ePointArr.push({ 'X': iFengePoint.X, 'Y': iFengePoint.Y, 'T': Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber) });
        }
      } else {        
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2C(eLine, iCurve1, ePointArr, eUpL, eT1, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber));
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2C(eLine, iCurve2, ePointArr, eUpL, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, MiaoCommonVar.FixedNumber), eT2);
        }
      }
    }
    return ePointArr;
  },
  // 判断线段是否与贝塞尔曲线相交
  IsLineIntersectBoundingBox: function (eLine, eBoundingBox)
  {
    //判断点是否在凸包内
    if ((eLine.X1 >= eBoundingBox.Left) && (eLine.X1 <= eBoundingBox.Right) && (eLine.Y1 >= eBoundingBox.Top) && (eLine.Y1 <= eBoundingBox.Bottom)) {
      return true;
    }
    if ((eLine.X2 >= eBoundingBox.Left) && (eLine.X2 <= eBoundingBox.Right) && (eLine.Y2 >= eBoundingBox.Top) && (eLine.Y2 <= eBoundingBox.Bottom)) {
      return true;
    }
    //判断线段是否与凸包边界线相交
    if (MiaoCommonFun.IsExistJiaoDianL2L(eLine.X1, eLine.Y1, eLine.X2, eLine.Y2, eBoundingBox.Left, eBoundingBox.Top, eBoundingBox.Right, eBoundingBox.Top)) {
      return true;
    }
    if (MiaoCommonFun.IsExistJiaoDianL2L(eLine.X1, eLine.Y1, eLine.X2, eLine.Y2, eBoundingBox.Right, eBoundingBox.Top, eBoundingBox.Right, eBoundingBox.Bottom)) {
      return true;
    }
    if (MiaoCommonFun.IsExistJiaoDianL2L(eLine.X1, eLine.Y1, eLine.X2, eLine.Y2, eBoundingBox.Left, eBoundingBox.Bottom, eBoundingBox.Right, eBoundingBox.Bottom)) {
      return true;
    }
    if (MiaoCommonFun.IsExistJiaoDianL2L(eLine.X1, eLine.Y1, eLine.X2, eLine.Y2, eBoundingBox.Left, eBoundingBox.Top, eBoundingBox.Left, eBoundingBox.Bottom)) {
      return true;
    }
    return false;
  },
  IsExistJiaoDianL2C: function (ep1x, ep1y, ep2x, ep2y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y) {
    var resultIsExist = false;
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2C({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y, 'X4': eq4x, 'Y4': eq4y }, resultPointArr, 16, 0, 1.0);
    if (resultPointArr.length >= 1) {
      resultIsExist = true;
    }
    return resultIsExist;
  },
  GetXianduanJiaodu:function(epx1,epy1,epx2,epy2){
    return Math.atan2(epy2 - epy1, epx2 - epx1) / Math.PI * 180;
  },
  GetCBoundingBox: function (eCurve) {
    var iMaxPoint = { 'X': -999999, 'Y': -999999 };
    var iMinPoint = { 'X': 999999, 'Y': 999999 };

    if (eCurve.X1 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X1;
    }
    if (eCurve.X1 < iMinPoint.X) {
      iMinPoint.X = eCurve.X1;
    }
    if (eCurve.Y1 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y1;
    }
    if (eCurve.Y1 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y1;
    }
    if (eCurve.X2 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X2;
    }
    if (eCurve.X2 < iMinPoint.X) {
      iMinPoint.X = eCurve.X2;
    }
    if (eCurve.Y2 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y2;
    }
    if (eCurve.Y2 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y2;
    }
    if (eCurve.X3 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X3;
    }
    if (eCurve.X3 < iMinPoint.X) {
      iMinPoint.X = eCurve.X3;
    }
    if (eCurve.Y3 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y3;
    }
    if (eCurve.Y3 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y3;
    }
    if (eCurve.X4 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X4;
    }
    if (eCurve.X4 < iMinPoint.X) {
      iMinPoint.X = eCurve.X4;
    }
    if (eCurve.Y4 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y4;
    }
    if (eCurve.Y4 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y4;
    }
    var aRJson = { 'Left': iMinPoint.X, 'Top': iMinPoint.Y, 'Right': iMaxPoint.X, 'Bottom': iMaxPoint.Y, 'Width': iMaxPoint.X - iMinPoint.X, 'Height': iMaxPoint.Y - iMinPoint.Y };
    return aRJson;
  },
  GetQBoundingBox: function (eCurve) {
    var iMaxPoint = { 'X': -999999, 'Y': -999999 };
    var iMinPoint = { 'X': 999999, 'Y': 999999 };

    if (eCurve.X1 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X1;
    }
    if (eCurve.X1 < iMinPoint.X) {
      iMinPoint.X = eCurve.X1;
    }
    if (eCurve.Y1 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y1;
    }
    if (eCurve.Y1 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y1;
    }
    if (eCurve.X2 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X2;
    }
    if (eCurve.X2 < iMinPoint.X) {
      iMinPoint.X = eCurve.X2;
    }
    if (eCurve.Y2 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y2;
    }
    if (eCurve.Y2 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y2;
    }
    if (eCurve.X3 > iMaxPoint.X) {
      iMaxPoint.X = eCurve.X3;
    }
    if (eCurve.X3 < iMinPoint.X) {
      iMinPoint.X = eCurve.X3;
    }
    if (eCurve.Y3 > iMaxPoint.Y) {
      iMaxPoint.Y = eCurve.Y3;
    }
    if (eCurve.Y3 < iMinPoint.Y) {
      iMinPoint.Y = eCurve.Y3;
    }
    var aRJson = { 'Left': iMinPoint.X, 'Top': iMinPoint.Y, 'Right': iMaxPoint.X, 'Bottom': iMaxPoint.Y, 'Width': iMaxPoint.X - iMinPoint.X, 'Height': iMaxPoint.Y - iMinPoint.Y };
    return aRJson;
  },
  GetJiaoDianQ2Q: function (ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y, 'X3': ep3x, 'Y3': ep3y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y}, resultPointArr, 16, 0, 1.0, 0, 1.0);

    //var itestPoint;
    //for (var j = 0; j < resultPointArr.length; j++) {
    //  itestPoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, ep4x, ep4y, resultPointArr[j].T1);
    //  alert('x:' + itestPoint.X + ', y:' + itestPoint.Y);
    //  itestPoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y, resultPointArr[j].T2);
    //  //istrvid = istrvid + '\r\n X:' + jiaodian2[j].X + ', Y:' + jiaodian2[j].Y + ', T:' + jiaodian2[j].T;
    //  alert('x:' + itestPoint.X + ', y:' + itestPoint.Y);
    //}

    return resultPointArr;
  },
  JiaoDianDiguiPanbieQ2Q: function (eCurve1, eCurve2, ePointArr, eUpL, eT11, eT12, eT21, eT22) {
    //alert(eCurve1.X1);
    var iNewCP11x, iNewCP11y, iNewCP12x, iNewCP12y, iNewCP13x, iNewCP13y;
    var iNewCQ11x, iNewCQ11y, iNewCQ12x, iNewCQ12y, iNewCQ13x, iNewCQ13y;
    var iNewCP21x, iNewCP21y, iNewCP22x, iNewCP22y, iNewCP23x, iNewCP23y;
    var iNewCQ21x, iNewCQ21y, iNewCQ22x, iNewCQ22y, iNewCQ23x, iNewCQ23y;
    var iCurve11, iCurve12, iCurve21, iCurve22;
    var iFengePoint1, iFengePoint2;
    var iCankaoPoint11, iCankaoPoint12, iCankaoPoint21, iCankaoPoint22;
    var iKongzhiPoint11, iKongzhiPoint12, iKongzhiPoint21, iKongzhiPoint22;
    var iBoundingBox1, iBoundingBox2;
    iBoundingBox1 = MiaoCommonFun.GetQBoundingBox(eCurve1);
    iBoundingBox2 = MiaoCommonFun.GetQBoundingBox(eCurve2);


    if (MiaoCommonFun.IsBoundingBoxIntersectBoundingBox(iBoundingBox1, iBoundingBox2)) {
      iCankaoPoint11 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.2);
      iCankaoPoint12 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.7);

      iCankaoPoint21 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, 0.2);
      iCankaoPoint22 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, 0.7);

      iFengePoint1 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.5);
      iFengePoint2 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, 0.5);

      iKongzhiPoint11 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(eCurve1.X1, eCurve1.Y1, iFengePoint1.X, iFengePoint1.Y, iCankaoPoint11.X, iCankaoPoint11.Y, 0.4);
      iKongzhiPoint12 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(iFengePoint1.X, iFengePoint1.Y, eCurve1.X4, eCurve1.Y4, iCankaoPoint12.X, iCankaoPoint12.Y, 0.4);

      iKongzhiPoint21 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(eCurve2.X1, eCurve2.Y1, iFengePoint2.X, iFengePoint2.Y, iCankaoPoint21.X, iCankaoPoint21.Y, 0.4);
      iKongzhiPoint22 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(iFengePoint2.X, iFengePoint2.Y, eCurve2.X4, eCurve2.Y4, iCankaoPoint22.X, iCankaoPoint22.Y, 0.4);

      iNewCP11x = eCurve1.X1;
      iNewCP11y = eCurve1.Y1;
      iNewCP12x = iKongzhiPoint11.X;
      iNewCP12y = iKongzhiPoint11.Y;
      iNewCP13x = iFengePoint1.X;
      iNewCP13y = iFengePoint1.Y;
      iCurve11 = { 'X1': iNewCP11x, 'Y1': iNewCP11y, 'X2': iNewCP12x, 'Y2': iNewCP12y, 'X3': iNewCP13x, 'Y3': iNewCP13y };
      iNewCQ11x = iFengePoint1.X;
      iNewCQ11y = iFengePoint1.Y;
      iNewCQ12x = iKongzhiPoint12.X;
      iNewCQ12y = iKongzhiPoint12.Y;
      iNewCQ13x = eCurve1.X3;
      iNewCQ13y = eCurve1.Y3;
      iCurve12 = { 'X1': iNewCQ11x, 'Y1': iNewCQ11y, 'X2': iNewCQ12x, 'Y2': iNewCQ12y, 'X3': iNewCQ13x, 'Y3': iNewCQ13y};
      iNewCP21x = eCurve2.X1;
      iNewCP21y = eCurve2.Y1;
      iNewCP22x = iKongzhiPoint21.X;
      iNewCP22y = iKongzhiPoint21.Y;
      iNewCP23x = iFengePoint2.X;
      iNewCP23y = iFengePoint2.Y;
      iCurve21 = { 'X1': iNewCP21x, 'Y1': iNewCP21y, 'X2': iNewCP22x, 'Y2': iNewCP22y, 'X3': iNewCP23x, 'Y3': iNewCP23y};
      iNewCQ21x = iFengePoint2.X;
      iNewCQ21y = iFengePoint2.Y;
      iNewCQ22x = iKongzhiPoint22.X;
      iNewCQ22y = iKongzhiPoint22.Y;
      iNewCQ23x = eCurve2.X3;
      iNewCQ23y = eCurve2.Y3;
      iCurve22 = { 'X1': iNewCQ21x, 'Y1': iNewCQ21y, 'X2': iNewCQ22x, 'Y2': iNewCQ22y, 'X3': iNewCQ23x, 'Y3': iNewCQ23y};

      //写到这里
      if (((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) && ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1))) {
        var ifindxiangtongzhi = false;
        if (ePointArr.length > 0) {
          for (var i = 0; i < ePointArr.length; i++) {
            if ((ePointArr[i].X == iFengePoint1.X) && (ePointArr[i].Y == iFengePoint1.Y)) {
              ifindxiangtongzhi = true;
            } else {
              if ((Math.approximatelyEqual(ePointArr[i].X, iFengePoint1.X, 1.0)) && (Math.approximatelyEqual(ePointArr[i].Y, iFengePoint1.Y, 1.0))) {
                ifindxiangtongzhi = true;
              }
            }
          }
        }
        if (ifindxiangtongzhi == false) {
          //alert(eUpL);
          ePointArr.push({ 'X': iFengePoint1.X, 'Y': iFengePoint1.Y, 'T1': Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), 'T2': Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber) });
        }
      } else {
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          try {
            if ((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(eCurve1, iCurve21, ePointArr, eUpL, eT11, eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(eCurve1, iCurve22, ePointArr, eUpL, eT11, eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
            } else if ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1)) {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve11, eCurve2, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve12, eCurve2, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, eT22);
            } else {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve11, iCurve21, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve12, iCurve22, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve11, iCurve22, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2Q(iCurve12, iCurve21, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
            }
          } catch (ex) {
            alert(ex);
          }
        }
      }
    }
    return ePointArr;
  },
  GetJiaoDianQ2C: function (ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y, 'X3': ep3x, 'Y3': ep3y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y, 'X4': eq4x, 'Y4': eq4y }, resultPointArr, 16, 0, 1.0, 0, 1.0);
    return resultPointArr;
  },
  JiaoDianDiguiPanbieQ2C: function (eCurve1, eCurve2, ePointArr, eUpL, eT11, eT12, eT21, eT22) {
    //alert(eCurve1.X1);
    var iNewCP11x, iNewCP11y, iNewCP12x, iNewCP12y, iNewCP13x, iNewCP13y, iNewCP14x, iNewCP14y;
    var iNewCQ11x, iNewCQ11y, iNewCQ12x, iNewCQ12y, iNewCQ13x, iNewCQ13y, iNewCQ14x, iNewCQ14y;
    var iNewCP21x, iNewCP21y, iNewCP22x, iNewCP22y, iNewCP23x, iNewCP23y, iNewCP24x, iNewCP24y;
    var iNewCQ21x, iNewCQ21y, iNewCQ22x, iNewCQ22y, iNewCQ23x, iNewCQ23y, iNewCQ24x, iNewCQ24y;
    var iCurve11, iCurve12, iCurve21, iCurve22;
    var iFengePoint1, iFengePoint2;
    var iCankaoPoint11, iCankaoPoint12, iCankaoPoint13, iCankaoPoint14, iCankaoPoint21, iCankaoPoint22, iCankaoPoint23, iCankaoPoint24;
    var iKongzhiPoint11, iKongzhiPoint12, iKongzhiPoint21, iKongzhiPoint22;
    var iBoundingBox1, iBoundingBox2;
    iBoundingBox1 = MiaoCommonFun.GetQBoundingBox(eCurve1);
    iBoundingBox2 = MiaoCommonFun.GetCBoundingBox(eCurve2);


    if (MiaoCommonFun.IsBoundingBoxIntersectBoundingBox(iBoundingBox1, iBoundingBox2)) {
      iCankaoPoint11 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.2);
      iCankaoPoint12 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.3);
      iCankaoPoint13 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.7);
      iCankaoPoint14 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.8);



      iCankaoPoint21 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.2);
      iCankaoPoint22 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.3);
      iCankaoPoint23 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.7);
      iCankaoPoint24 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.8);

      iFengePoint1 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, 0.5);
      iFengePoint2 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.5);

      iKongzhiPoint11 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(eCurve1.X1, eCurve1.Y1, iFengePoint1.X, iFengePoint1.Y, iCankaoPoint11.X, iCankaoPoint11.Y, 0.4);
      iKongzhiPoint12 = MiaoCommonFun.GetBezierQurvaturesControlPoint(iFengePoint1.X, iFengePoint1.Y, eCurve1.X4, eCurve1.Y4, iCankaoPoint13.X, iCankaoPoint13.Y, 0.4);

      iKongzhiPoint21 = MiaoCommonFun.GetBezierCurvaturesControlPoint(eCurve2.X1, eCurve2.Y1, iFengePoint2.X, iFengePoint2.Y, iCankaoPoint21.X, iCankaoPoint21.Y, 0.4, iCankaoPoint21.X, iCankaoPoint22.Y, 0.6);
      iKongzhiPoint22 = MiaoCommonFun.GetBezierCurvaturesControlPoint(iFengePoint2.X, iFengePoint2.Y, eCurve2.X4, eCurve2.Y4, iCankaoPoint23.X, iCankaoPoint23.Y, 0.4, iCankaoPoint24.X, iCankaoPoint24.Y, 0.6);

      iNewCP11x = eCurve1.X1;
      iNewCP11y = eCurve1.Y1;
      iNewCP12x = iKongzhiPoint11.X;
      iNewCP12y = iKongzhiPoint11.Y;
      iNewCP13x = iKongzhiPoint11.X;;
      iNewCP13y = iKongzhiPoint11.Y;;
      iNewCP14x = iFengePoint1.X;
      iNewCP14y = iFengePoint1.Y;
      iCurve11 = { 'X1': iNewCP11x, 'Y1': iNewCP11y, 'X2': iNewCP12x, 'Y2': iNewCP12y, 'X3': iNewCP13x, 'Y3': iNewCP13y };
      iNewCQ11x = iFengePoint1.X;
      iNewCQ11y = iFengePoint1.Y;
      iNewCQ12x = iKongzhiPoint12[0].X;
      iNewCQ12y = iKongzhiPoint12[0].Y;
      iNewCQ13x = iKongzhiPoint12[1].X;
      iNewCQ13y = iKongzhiPoint12[1].Y;
      iNewCQ14x = eCurve1.X4;
      iNewCQ14y = eCurve1.Y4;
      iCurve12 = { 'X1': iNewCQ11x, 'Y1': iNewCQ11y, 'X2': iNewCQ12x, 'Y2': iNewCQ12y, 'X3': iNewCQ13x, 'Y3': iNewCQ13y };

      iNewCP21x = eCurve2.X1;
      iNewCP21y = eCurve2.Y1;
      iNewCP22x = iKongzhiPoint21[0].X;
      iNewCP22y = iKongzhiPoint21[0].Y;
      iNewCP23x = iKongzhiPoint21[1].X;;
      iNewCP23y = iKongzhiPoint21[1].Y;;
      iNewCP24x = iFengePoint2.X;
      iNewCP24y = iFengePoint2.Y;
      iCurve21 = { 'X1': iNewCP21x, 'Y1': iNewCP21y, 'X2': iNewCP22x, 'Y2': iNewCP22y, 'X3': iNewCP23x, 'Y3': iNewCP23y, 'X4': iNewCP24x, 'Y4': iNewCP24y };
      iNewCQ21x = iFengePoint2.X;
      iNewCQ21y = iFengePoint2.Y;
      iNewCQ22x = iKongzhiPoint22[0].X;
      iNewCQ22y = iKongzhiPoint22[0].Y;
      iNewCQ23x = iKongzhiPoint22[1].X;
      iNewCQ23y = iKongzhiPoint22[1].Y;
      iNewCQ24x = eCurve2.X4;
      iNewCQ24y = eCurve2.Y4;
      iCurve22 = { 'X1': iNewCQ21x, 'Y1': iNewCQ21y, 'X2': iNewCQ22x, 'Y2': iNewCQ22y, 'X3': iNewCQ23x, 'Y3': iNewCQ23y, 'X4': iNewCQ24x, 'Y4': iNewCQ24y };

      //写到这里
      if (((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) && ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1))) {
        var ifindxiangtongzhi = false;
        if (ePointArr.length > 0) {
          for (var i = 0; i < ePointArr.length; i++) {
            if ((ePointArr[i].X == iFengePoint1.X) && (ePointArr[i].Y == iFengePoint1.Y)) {
              ifindxiangtongzhi = true;
            } else {
              if ((Math.approximatelyEqual(ePointArr[i].X, iFengePoint1.X, 1.0)) && (Math.approximatelyEqual(ePointArr[i].Y, iFengePoint1.Y, 1.0))) {
                ifindxiangtongzhi = true;
              }
            }
          }
        }
        if (ifindxiangtongzhi == false) {
          //alert(eUpL);
          ePointArr.push({ 'X': iFengePoint1.X, 'Y': iFengePoint1.Y, 'T1': Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), 'T2': Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber) });
        }
      } else {
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          try {
            if ((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(eCurve1, iCurve21, ePointArr, eUpL, eT11, eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(eCurve1, iCurve22, ePointArr, eUpL, eT11, eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
            } else if ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1)) {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve11, eCurve2, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve12, eCurve2, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, eT22);
            } else {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve11, iCurve21, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve12, iCurve22, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve11, iCurve22, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieQ2C(iCurve12, iCurve21, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
            }
          } catch (ex) {
            alert(ex);
          }
        }
      }
    }
    return ePointArr;
  },
  GetJiaoDianC2C: function (ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, ep4x, ep4y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y) {
    var resultPointArr = new Array();
    resultPointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C({ 'X1': ep1x, 'Y1': ep1y, 'X2': ep2x, 'Y2': ep2y, 'X3': ep3x, 'Y3': ep3y, 'X4': ep4x, 'Y4': ep4y }, { 'X1': eq1x, 'Y1': eq1y, 'X2': eq2x, 'Y2': eq2y, 'X3': eq3x, 'Y3': eq3y, 'X4': eq4x, 'Y4': eq4y }, resultPointArr, 16, 0, 1.0, 0, 1.0);

    //var itestPoint;
    //for (var j = 0; j < resultPointArr.length; j++) {
    //  itestPoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, ep4x, ep4y, resultPointArr[j].T1);
    //  alert('x:' + itestPoint.X + ', y:' + itestPoint.Y);
    //  itestPoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y, resultPointArr[j].T2);
    //  //istrvid = istrvid + '\r\n X:' + jiaodian2[j].X + ', Y:' + jiaodian2[j].Y + ', T:' + jiaodian2[j].T;
    //  alert('x:' + itestPoint.X + ', y:' + itestPoint.Y);
    //}

    return resultPointArr;
  },
  JiaoDianDiguiPanbieC2C: function (eCurve1, eCurve2, ePointArr, eUpL, eT11, eT12, eT21, eT22) {
    //alert(eCurve1.X1);
    var iNewCP11x, iNewCP11y, iNewCP12x, iNewCP12y, iNewCP13x, iNewCP13y, iNewCP14x, iNewCP14y;
    var iNewCQ11x, iNewCQ11y, iNewCQ12x, iNewCQ12y, iNewCQ13x, iNewCQ13y, iNewCQ14x, iNewCQ14y;
    var iNewCP21x, iNewCP21y, iNewCP22x, iNewCP22y, iNewCP23x, iNewCP23y, iNewCP24x, iNewCP24y;
    var iNewCQ21x, iNewCQ21y, iNewCQ22x, iNewCQ22y, iNewCQ23x, iNewCQ23y, iNewCQ24x, iNewCQ24y;
    var iCurve11, iCurve12, iCurve21, iCurve22;
    var iFengePoint1, iFengePoint2;
    var iCankaoPoint11, iCankaoPoint12, iCankaoPoint13, iCankaoPoint14, iCankaoPoint21, iCankaoPoint22, iCankaoPoint23, iCankaoPoint24;
    var iKongzhiPoint11, iKongzhiPoint12, iKongzhiPoint21, iKongzhiPoint22;
    var iBoundingBox1, iBoundingBox2;
    iBoundingBox1 = MiaoCommonFun.GetCBoundingBox(eCurve1);
    iBoundingBox2 = MiaoCommonFun.GetCBoundingBox(eCurve2);

    
    if (MiaoCommonFun.IsBoundingBoxIntersectBoundingBox(iBoundingBox1, iBoundingBox2)) {
      iCankaoPoint11 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, eCurve1.X4, eCurve1.Y4, 0.2);
      iCankaoPoint12 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, eCurve1.X4, eCurve1.Y4, 0.3);
      iCankaoPoint13 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, eCurve1.X4, eCurve1.Y4, 0.7);
      iCankaoPoint14 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, eCurve1.X4, eCurve1.Y4, 0.8);



      iCankaoPoint21 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.2);
      iCankaoPoint22 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.3);
      iCankaoPoint23 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.7);
      iCankaoPoint24 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.8);

      iFengePoint1 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve1.X1, eCurve1.Y1, eCurve1.X2, eCurve1.Y2, eCurve1.X3, eCurve1.Y3, eCurve1.X4, eCurve1.Y4, 0.5);
      iFengePoint2 = MiaoCommonFun.GetCBezierCurvaturesPointByT(eCurve2.X1, eCurve2.Y1, eCurve2.X2, eCurve2.Y2, eCurve2.X3, eCurve2.Y3, eCurve2.X4, eCurve2.Y4, 0.5);

      iKongzhiPoint11 = MiaoCommonFun.GetBezierCurvaturesControlPoint(eCurve1.X1, eCurve1.Y1, iFengePoint1.X, iFengePoint1.Y, iCankaoPoint11.X, iCankaoPoint11.Y, 0.4, iCankaoPoint11.X, iCankaoPoint12.Y, 0.6);
      iKongzhiPoint12 = MiaoCommonFun.GetBezierCurvaturesControlPoint(iFengePoint1.X, iFengePoint1.Y, eCurve1.X4, eCurve1.Y4, iCankaoPoint13.X, iCankaoPoint13.Y, 0.4, iCankaoPoint14.X, iCankaoPoint14.Y, 0.6);

      iKongzhiPoint21 = MiaoCommonFun.GetBezierCurvaturesControlPoint(eCurve2.X1, eCurve2.Y1, iFengePoint2.X, iFengePoint2.Y, iCankaoPoint21.X, iCankaoPoint21.Y, 0.4, iCankaoPoint21.X, iCankaoPoint22.Y, 0.6);
      iKongzhiPoint22 = MiaoCommonFun.GetBezierCurvaturesControlPoint(iFengePoint2.X, iFengePoint2.Y, eCurve2.X4, eCurve2.Y4, iCankaoPoint23.X, iCankaoPoint23.Y, 0.4, iCankaoPoint24.X, iCankaoPoint24.Y, 0.6);

      iNewCP11x = eCurve1.X1;
      iNewCP11y = eCurve1.Y1;
      iNewCP12x = iKongzhiPoint11[0].X;
      iNewCP12y = iKongzhiPoint11[0].Y;
      iNewCP13x = iKongzhiPoint11[1].X;;
      iNewCP13y = iKongzhiPoint11[1].Y;;
      iNewCP14x = iFengePoint1.X;
      iNewCP14y = iFengePoint1.Y;
      iCurve11 = { 'X1': iNewCP11x, 'Y1': iNewCP11y, 'X2': iNewCP12x, 'Y2': iNewCP12y, 'X3': iNewCP13x, 'Y3': iNewCP13y, 'X4': iNewCP14x, 'Y4': iNewCP14y };
      iNewCQ11x = iFengePoint1.X;
      iNewCQ11y = iFengePoint1.Y;
      iNewCQ12x = iKongzhiPoint12[0].X;
      iNewCQ12y = iKongzhiPoint12[0].Y;
      iNewCQ13x = iKongzhiPoint12[1].X;
      iNewCQ13y = iKongzhiPoint12[1].Y;
      iNewCQ14x = eCurve1.X4;
      iNewCQ14y = eCurve1.Y4;
      iCurve12 = { 'X1': iNewCQ11x, 'Y1': iNewCQ11y, 'X2': iNewCQ12x, 'Y2': iNewCQ12y, 'X3': iNewCQ13x, 'Y3': iNewCQ13y, 'X4': iNewCQ14x, 'Y4': iNewCQ14y };

      iNewCP21x = eCurve2.X1;
      iNewCP21y = eCurve2.Y1;
      iNewCP22x = iKongzhiPoint21[0].X;
      iNewCP22y = iKongzhiPoint21[0].Y;
      iNewCP23x = iKongzhiPoint21[1].X;;
      iNewCP23y = iKongzhiPoint21[1].Y;;
      iNewCP24x = iFengePoint2.X;
      iNewCP24y = iFengePoint2.Y;
      iCurve21 = { 'X1': iNewCP21x, 'Y1': iNewCP21y, 'X2': iNewCP22x, 'Y2': iNewCP22y, 'X3': iNewCP23x, 'Y3': iNewCP23y, 'X4': iNewCP24x, 'Y4': iNewCP24y };
      iNewCQ21x = iFengePoint2.X;
      iNewCQ21y = iFengePoint2.Y;
      iNewCQ22x = iKongzhiPoint22[0].X;
      iNewCQ22y = iKongzhiPoint22[0].Y;
      iNewCQ23x = iKongzhiPoint22[1].X;
      iNewCQ23y = iKongzhiPoint22[1].Y;
      iNewCQ24x = eCurve2.X4;
      iNewCQ24y = eCurve2.Y4;
      iCurve22 = { 'X1': iNewCQ21x, 'Y1': iNewCQ21y, 'X2': iNewCQ22x, 'Y2': iNewCQ22y, 'X3': iNewCQ23x, 'Y3': iNewCQ23y, 'X4': iNewCQ24x, 'Y4': iNewCQ24y };

      //写到这里
      if (((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) && ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1))) {
        var ifindxiangtongzhi = false;
        if (ePointArr.length > 0) {
          for (var i = 0; i < ePointArr.length; i++) {
            if ((ePointArr[i].X == iFengePoint1.X) && (ePointArr[i].Y == iFengePoint1.Y)) {
              ifindxiangtongzhi = true;
            } else {
              if ((Math.approximatelyEqual(ePointArr[i].X, iFengePoint1.X, 1.0)) && (Math.approximatelyEqual(ePointArr[i].Y, iFengePoint1.Y, 1.0))) {
                ifindxiangtongzhi = true;
              }
            }
          }
        }
        if (ifindxiangtongzhi == false) {
          //alert(eUpL);
          ePointArr.push({ 'X': iFengePoint1.X, 'Y': iFengePoint1.Y, 'T1': Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), 'T2': Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber) });
        }
      } else {
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          try {
            if ((iBoundingBox1.Width < 1) && (iBoundingBox1.Height < 1)) {
                ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(eCurve1, iCurve21, ePointArr, eUpL, eT11, eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
                ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(eCurve1, iCurve22, ePointArr, eUpL, eT11, eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
            } else if ((iBoundingBox2.Width < 1) && (iBoundingBox2.Height < 1)) {
                ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve11, eCurve2, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, eT22);
                ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve12, eCurve2, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, eT22);
            } else {
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve11, iCurve21, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve12, iCurve22, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve11, iCurve22, ePointArr, eUpL, eT11, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber), eT22);
              ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieC2C(iCurve12, iCurve21, ePointArr, eUpL, Math.formatFloat(((eT12 - eT11) * 0.5) + eT11, MiaoCommonVar.FixedNumber), eT12, eT21, Math.formatFloat(((eT22 - eT21) * 0.5) + eT21, MiaoCommonVar.FixedNumber));
            }
          } catch (ex) {
            alert(ex);
          }
        }
      }
    }
    return ePointArr;
  },
  // 判断线段是否与贝塞尔曲线相交
  IsBoundingBoxIntersectBoundingBox: function (eBoundingBox1, eBoundingBox2) {
    //判断点是否在凸包内1
    if ((eBoundingBox1.Left >= eBoundingBox2.Left) && (eBoundingBox1.Left <= eBoundingBox2.Right) && (eBoundingBox1.Top >= eBoundingBox2.Top) && (eBoundingBox1.Top <= eBoundingBox2.Bottom)) {
      return true;
    }
    if ((eBoundingBox1.Left >= eBoundingBox2.Left) && (eBoundingBox1.Left <= eBoundingBox2.Right) && (eBoundingBox1.Bottom >= eBoundingBox2.Top) && (eBoundingBox1.Bottom <= eBoundingBox2.Bottom)) {
      return true;
    }
    if ((eBoundingBox1.Right >= eBoundingBox2.Left) && (eBoundingBox1.Right <= eBoundingBox2.Right) && (eBoundingBox1.Top >= eBoundingBox2.Top) && (eBoundingBox1.Top <= eBoundingBox2.Bottom)) {
      return true;
    }
    if ((eBoundingBox1.Right >= eBoundingBox2.Left) && (eBoundingBox1.Right <= eBoundingBox2.Right) && (eBoundingBox1.Bottom >= eBoundingBox2.Top) && (eBoundingBox1.Bottom <= eBoundingBox2.Bottom)) {
      return true;
    }
    //判断点是否在凸包内2
    if ((eBoundingBox2.Left >= eBoundingBox1.Left) && (eBoundingBox2.Left <= eBoundingBox1.Right) && (eBoundingBox2.Top >= eBoundingBox1.Top) && (eBoundingBox2.Top <= eBoundingBox1.Bottom)) {
      return true;
    }
    if ((eBoundingBox2.Left >= eBoundingBox1.Left) && (eBoundingBox2.Left <= eBoundingBox1.Right) && (eBoundingBox2.Bottom >= eBoundingBox1.Top) && (eBoundingBox2.Bottom <= eBoundingBox1.Bottom)) {
      return true;
    }
    if ((eBoundingBox2.Right >= eBoundingBox1.Left) && (eBoundingBox2.Right <= eBoundingBox1.Right) && (eBoundingBox2.Top >= eBoundingBox1.Top) && (eBoundingBox2.Top <= eBoundingBox1.Bottom)) {
      return true;
    }
    if ((eBoundingBox2.Right >= eBoundingBox1.Left) && (eBoundingBox2.Right <= eBoundingBox1.Right) && (eBoundingBox2.Bottom >= eBoundingBox1.Top) && (eBoundingBox2.Bottom <= eBoundingBox1.Bottom)) {
      return true;
    }
    //判断是否在十字交叉1
    if (MiaoCommonFun.IsExistJiaoDianL2L(eBoundingBox1.Left, eBoundingBox1.Top, eBoundingBox1.Right, eBoundingBox1.Top, eBoundingBox2.Left, eBoundingBox2.Top, eBoundingBox2.Left, eBoundingBox2.Bottom)) {

      return true;
    }
    if (MiaoCommonFun.IsExistJiaoDianL2L(eBoundingBox1.Left, eBoundingBox1.Top, eBoundingBox1.Left, eBoundingBox1.Bottom, eBoundingBox2.Left, eBoundingBox2.Top, eBoundingBox2.Right, eBoundingBox2.Top)) {
      return true;
    }
    return false;
  },
  IsExistJiaoDianC2C: function (ep1x, ep1y, ep2x, ep2y, ep3x, ep3y, ep4x, ep4y, eq1x, eq1y, eq2x, eq2y, eq3x, eq3y, eq4x, eq4y) {
    var resultIsExist = false;

    return resultIsExist;
  },
  GetEquationWithTwoUnknow: function (a11, a12, b1, a21, a22, b2) {
    var aResult;
    var x1 = Math.formatFloat(((b1 * a22) - (a12 * b2)) / ((a11 * a22) - (a12 * a21)), MiaoCommonVar.FixedNumber);
    var x2 = Math.formatFloat(((b2 * a11) - (a21 * b1)) / ((a11 * a22) - (a12 * a21)), MiaoCommonVar.FixedNumber);
    aResult = new Array(x1, x2);
    return aResult;
  },
  //读取二次贝塞尔曲线的控制点
  GetBezierQCurvaturesControlPoint: function (ePoint1X, ePoint1Y, ePoint2X, ePoint2Y, aBezierCurvaturesPoint1X, aBezierCurvaturesPoint1Y, et1) {
    var at, at2, at3, amt, amt2, amt3;
    at = et1;
    at2 = at * at;
    amt = 1 - at;
    amt2 = amt * amt;


    //2 * amt * at * x1 =resultpointx1-point1x * amt2 - point3x * at2;
    //2 * bmt * bt * x1 =resultpointx2-point1x * bmt2 - point3x * bt2;
    var ix, iy;
    ix = (aBezierCurvaturesPoint1X - (ePoint1X * amt2) - (ePoint2X * at2)) / (2 * amt * at);
    iy = (aBezierCurvaturesPoint1Y - (ePoint1Y * amt2) - (ePoint2Y * at2)) / (2 * amt * at);

    return { 'X': ix, 'Y': iy };
  },
  //读取三次贝塞尔曲线的控制点
  GetBezierCurvaturesControlPoint: function (ePoint1X, ePoint1Y, ePoint2X, ePoint2Y, aBezierCurvaturesPoint1X, aBezierCurvaturesPoint1Y, et1, aBezierCurvaturesPoint2X, aBezierCurvaturesPoint2Y, et2) {

    var at, at2, at3, amt, amt2, amt3;
    var bt, bt2, bt3, bmt, bmt2, bmt3;
    at = et1;
    at2 = at * at;
    at3 = at2 * at;
    amt = 1 - at;
    amt2 = amt * amt;
    amt3 = amt2 * amt;

    bt = et2;
    bt2 = bt * bt;
    bt3 = bt2 * bt;
    bmt = 1 - bt;
    bmt2 = bmt * bmt;
    bmt3 = bmt2 * bmt;
    var a11, a12, b1, a21, a22, b2;
    a11 = 3 * amt2 * at;
    a12 = 3 * amt * at2;
    b1 = aBezierCurvaturesPoint1X - (ePoint1X * amt3) - (ePoint2X * at3);
    a21 = 3 * bmt2 * bt;
    a22 = 3 * bmt * bt2;
    b2 = aBezierCurvaturesPoint2X - (ePoint1X * bmt3) - (ePoint2X * bt3);
    var aTwoUnknowNumX = MiaoCommonFun.GetEquationWithTwoUnknow(a11, a12, b1, a21, a22, b2);

    a11 = 3 * amt2 * at;
    a12 = 3 * amt * at2;
    b1 = aBezierCurvaturesPoint1Y - (ePoint1Y * amt3) - (ePoint2Y * at3);
    a21 = 3 * bmt2 * bt;
    a22 = 3 * bmt * bt2;
    b2 = aBezierCurvaturesPoint2Y - (ePoint1Y * bmt3) - (ePoint2Y * bt3);
    var aTwoUnknowNumY = MiaoCommonFun.GetEquationWithTwoUnknow(a11, a12, b1, a21, a22, b2);

    var BezierCurvaturesControlPoint1Json = { 'X': aTwoUnknowNumX[0], 'Y': aTwoUnknowNumY[0] };
    var BezierCurvaturesControlPoint2Json = { 'X': aTwoUnknowNumX[1], 'Y': aTwoUnknowNumY[1] };
    var aResultBezierCurvaturesControlPointArr = new Array(BezierCurvaturesControlPoint1Json, BezierCurvaturesControlPoint2Json);
    return aResultBezierCurvaturesControlPointArr;
  },
  //读取二次贝塞尔曲线的点
  GetQBezierCurvaturesPointByT: function (ePoint1X, ePoint1Y, ePoint2X, ePoint2Y, ePoint3X, ePoint3Y, et) {
    var t, t2, mt, mt2;
    t = et;
    t2 = t * t;
    mt = 1 - t;
    mt2 = mt * mt;
    var aPointJson = { 'X': Math.formatFloat((ePoint1X * mt2) + (ePoint2X * 2 * mt * t) + (ePoint3X * t2), MiaoCommonVar.FixedNumber), 'Y': Math.formatFloat((ePoint1Y * mt2) + (ePoint2Y * 2 * mt * t) + (ePoint3Y * t2), MiaoCommonVar.FixedNumber) };
    return aPointJson;
  },
  //读取三次贝塞尔曲线的点，返回值是一个拥有X和Y属性的JSON对象，可以直接用来创建MiaoPointClass对象
  GetCBezierCurvaturesPointByT: function (ePoint1X, ePoint1Y, ePoint2X, ePoint2Y, ePoint3X, ePoint3Y, ePoint4X, ePoint4Y, et) {
    var t, t2, t3, mt, mt2, mt3;
    t = et;
    t2 = t * t;
    t3 = t2 * t;
    mt = 1 - t;
    mt2 = mt * mt;
    mt3 = mt2 * mt;
    var aPointJson = { 'X': Math.formatFloat((ePoint1X * mt3) + (3 * ePoint2X * mt2 * t) + (3 * ePoint3X * mt * t2) + (ePoint4X * t3), MiaoCommonVar.FixedNumber), 'Y': Math.formatFloat((ePoint1Y * mt3) + (3 * ePoint2Y * mt2 * t) + (3 * ePoint3Y * mt * t2) + (ePoint4Y * t3), MiaoCommonVar.FixedNumber) };
    return aPointJson;
  },
  BiaoZhunHuaPointStr: function (eStr) {
    var aYuanlaideStr = eStr;
    var aResultStr = '';
    var aZhiQianChar = '?';
    for (var i = 0; i < aYuanlaideStr.length; i++) {
      if (aZhiQianChar != ',') {
        if (aYuanlaideStr[i] == '-') {
          if (aZhiQianChar != '?') {
            if (!('MLCSQTAZmlcsqtaz'.isContains(aZhiQianChar))) {
              aResultStr += ',';
            }
          }
        }
      }
      if ((aYuanlaideStr[i] != '\r') && (aYuanlaideStr[i] != '\n') && (aYuanlaideStr[i] != '\t')) {
        aResultStr += aYuanlaideStr[i];
      }
      aZhiQianChar = eStr[i];
    }

    if (aResultStr.isContains(' ')) {
      aResultStr = aResultStr.replace(/ /g, ',');
    }
    if (aResultStr.isContains(',,')) {
      aResultStr = aResultStr.replace(/,,/g, ',');
    }
    if (aResultStr.isContains(',,')) {
      aResultStr = aResultStr.replace(/,,/g, ',');
    }
    if (aResultStr[0] == ',') { aResultStr = aResultStr.substring(1) }
    if (aResultStr[aResultStr.length - 1] == ',') { aResultStr = aResultStr.substring(0, aResultStr.length - 1) }
    return aResultStr;
  }
};

//MiaoColorClass(A,R,G,B)颜色类
//R,G,B
var MiaoColorClass = Class.extend({
  init: function () {
    // 属性

    this.A = 0;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    if (!(arguments[0] === undefined)) {

      if (arguments.length == 4) {
        if (typeof arguments[0] === 'number') {
          this.A = arguments[0];
        }
        if (typeof arguments[1] === 'number') {
          this.R = arguments[1];
        }

        if (typeof arguments[2] === 'number') {
          this.G = arguments[2];
        }
        if (typeof arguments[3] === 'number') {
          this.B = arguments[3];
        }
      }
      if (arguments.length == 3) {
        this.A = 255;
        if (typeof arguments[0] === 'number') {
          this.R = arguments[0];
        }
        if (typeof arguments[1] === 'number') {
          this.G = arguments[1];
        }
        if (typeof arguments[2] === 'number') {
          this.B = arguments[2];
        }
      }

      if (arguments[0] instanceof MiaoColorClass) {

        this.A = arguments[0].A;
        this.R = arguments[0].R;
        this.G = arguments[0].G;
        this.B = arguments[0].B;
      }
      if (isJson(arguments[0])) {
        if (arguments[0].A === undefined) {
          this.A = 255;
        } else {
          if (typeof arguments[0].A === 'number') {
            this.A = arguments[0].A;
          }
        }
        if (typeof arguments[0].R === 'number') {
          this.R = arguments[0].R;
        }
        if (typeof arguments[0].G === 'number') {
          this.G = arguments[0].G;
        }
        if (typeof arguments[0].B === 'number') {
          this.B = arguments[0].B;
        }

      }
    }
  },
  //格式化SVG的List表
  FromRgb: function () {
    if (!(arguments[0] === undefined)) {

      this.A = 255;
      if (typeof arguments[0] === 'number') {
        this.R = arguments[0];
      }
      if (typeof arguments[1] === 'number') {
        this.G = arguments[1];
      }
      if (typeof arguments[2] === 'number') {
        this.B = arguments[2];
      }
      if (isJson(arguments[0])) {
        this.A = 255;
        if (typeof arguments[0].R === 'number') {
          this.R = arguments[0].R;
        }
        if (typeof arguments[0].G === 'number') {
          this.G = arguments[0].G;
        }
        if (typeof arguments[0].B === 'number') {
          this.B = arguments[0].B;
        }
      }
    }
  },
  FromArgb: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.A = arguments[0];
      }
      if (typeof arguments[1] === 'number') {
        this.R = arguments[1];
      }
      if (typeof arguments[2] === 'number') {
        this.G = arguments[2];
      }
      if (typeof arguments[3] === 'number') {
        this.B = arguments[3];
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].A === 'number') {
          this.A = arguments[0].A;
        }
        if (typeof arguments[0].R === 'number') {
          this.R = arguments[0].R;
        }
        if (typeof arguments[0].G === 'number') {
          this.G = arguments[0].G;
        }
        if (typeof arguments[0].B === 'number') {
          this.B = arguments[0].B;
        }
      }
    }
  },
  FromHexString: function (eStr) {
    var sColor = eStr.toLowerCase();
    if (sColor && global_mycolorstrreg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = '#';
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      this.A = 255;
      this.R = sColorChange[0];
      this.G = sColorChange[1];
      this.B = sColorChange[2];
    } else {
      //return sColor;
    }
  },
  FromARGBHexString: function (eStr) {
    var sColor = eStr.toLowerCase();
    if (sColor && global_mycolorargbstrreg.test(sColor)) {
      if (sColor.length === 5) {
        var sColorNew = '#';
        for (var i = 1; i < 5; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i = 1; i < 9; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      this.A = sColorChange[0];
      this.R = sColorChange[1];
      this.G = sColorChange[2];
      this.B = sColorChange[3];
    } else {
      //return sColor;
    }
  },
  FromRgbOrRgbaString: function (eStr) {
    var that = eStr.toLowerCase();
    if (/^(rgb)/.test(that)) {
      var aColor = that.replace(/(?:\(|\)|rgb|rgba)*/g, '').split(',');
      if (aColor.length == 3) {
        this.A = 255;
        this.R = parseInt(aColor[0]);
        this.G = parseInt(aColor[1]);
        this.B = parseInt(aColor[2]);
      }
      if (aColor.length == 4) {
        this.R = parseInt(aColor[0]);
        this.G = parseInt(aColor[1]);
        this.B = parseInt(aColor[2]);
        this.A = parseFloat(aColor[3]) * 255;
      }
    }
  },
  FromCMYK: function () {
    var ic = 0, im = 0, iy = 0, ik = 0;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        ic = arguments[0];
      }
      if (typeof arguments[1] === 'number') {
        im = arguments[1];
      }
      if (typeof arguments[2] === 'number') {
        iy = arguments[2];
      }
      if (typeof arguments[3] === 'number') {
        ik = arguments[3];
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].C === 'number') {
          ic = arguments[0].C;
        }
        if (typeof arguments[0].M === 'number') {
          im = arguments[0].M;
        }
        if (typeof arguments[0].Y === 'number') {
          iy = arguments[0].Y;
        }
        if (typeof arguments[0].K === 'number') {
          ik = arguments[0].K;
        }
      }
      c = ic / 100;
      m = im / 100;
      y = iy / 100;
      k = ik / 100;
      this.A = 255;
      this.R = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255);
      this.G = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255);
      this.B = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255);
    }
  },
  FromHSV: function () {
    var ih = 0, is = 0, iv = 0;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        ih = arguments[0];
      }
      if (typeof arguments[1] === 'number') {
        iv = arguments[1];
      }
      if (typeof arguments[2] === 'number') {
        is = arguments[2];
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].H === 'number') {
          ih = arguments[0].H;
        }
        if (typeof arguments[0].S === 'number') {
          is = arguments[0].S;
        }
        if (typeof arguments[0].V === 'number') {
          iv = arguments[0].V;
        }
      }

      var h = ih / 360;
      var s = is / 100;
      var v = iv / 100;

      if (s == 0) {
        this.R = v * 255;
        this.G = v * 255;
        this.B = v * 255;
      } else {
        var_h = h * 6;
        var_i = Math.floor(var_h);
        var_1 = v * (1 - s);
        var_2 = v * (1 - s * (var_h - var_i));
        var_3 = v * (1 - s * (1 - (var_h - var_i)));

        if (var_i == 0) { var_r = v; var_g = var_3; var_b = var_1 }
        else if (var_i == 1) { var_r = var_2; var_g = v; var_b = var_1 }
        else if (var_i == 2) { var_r = var_1; var_g = v; var_b = var_3 }
        else if (var_i == 3) { var_r = var_1; var_g = var_2; var_b = v }
        else if (var_i == 4) { var_r = var_3; var_g = var_1; var_b = v }
        else { var_r = v; var_g = var_1; var_b = var_2 };

        this.R = Math.round(var_r * 255);
        this.G = Math.round(var_g * 255);
        this.B = Math.round(var_b * 255);
      }
      this.A = 255;
    }
  },
  ToHSV: function () {
    var ih = 0, is = 0, iv = 0;
    r = this.R / 255;
    g = this.G / 255;
    b = this.B / 255;

    var minVal = Math.min(r, g, b);
    var maxVal = Math.max(r, g, b);
    var delta = maxVal - minVal;

    iv = maxVal;

    if (delta == 0) {
      ih = 0;
      is = 0;
    } else {
      is = delta / maxVal;
      var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
      var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
      var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

      if (r == maxVal) { ih = del_B - del_G; }
      else if (g == maxVal) { ih = (1 / 3) + del_R - del_B; }
      else if (b == maxVal) { ih = (2 / 3) + del_G - del_R; }

      if (ih < 0) { ih += 1; }
      if (ih > 1) { ih -= 1; }
    }

    ih = Math.round(ih * 360);
    is = Math.round(is * 100);
    iv = Math.round(iv * 100);

    return { H: ih, S: is, V: iv };
  },
  ToCMYK: function () {
    var ic = 0, im = 0, iy = 0, ik = 0;
    ik = Math.round((Math.min(1 - (this.R / 255), 1 - (this.G / 255), 1 - (this.B / 255))) * 100);
    ic = Math.round(((1 - (this.R / 255) - ik) / (1 - ik)) * 100);
    im = Math.round(((1 - (this.G / 255) - ik) / (1 - ik)) * 100);
    iy = Math.round(((1 - (this.B / 255) - ik) / (1 - ik)) * 100);
    return { C: ic, M: im, Y: iy, K: ik };
  },
  toARGB: function () {
    return { A: this.A, R: this.R, G: this.G, B: this.B };
  },
  toRGB: function () {
    return { R: this.R, G: this.G, B: this.B };
  },
  ToArgbString: function () {
    return 'argb(' + this.A + ',' + this.R + ',' + this.G + ',' + this.B + ')';
  },
  ToRgbString: function () {
    return 'rgb(' + this.R + ',' + this.G + ',' + this.B + ')';
  },
  ToRgbaString: function () {
    return 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + (this.A / 255).toFixed(1) + ')';
  },
  ToHtmlString: function () {
    return '#' + this.R.toString(16).padLeft(2) + this.G.toString(16).padLeft(2) + this.B.toString(16).padLeft(2);
  },
  ToArgbHtmlString: function () {
    return '#' + this.A.toString(16).padLeft(2) + this.R.toString(16).padLeft(2) + this.G.toString(16).padLeft(2) + this.B.toString(16).padLeft(2);
  },
  Set: function () {
    // 属性
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 4) {
        if (typeof arguments[0] === 'number') {
          this.A = arguments[0];
        }
        if (typeof arguments[1] === 'number') {
          this.R = arguments[1];
        }
        if (typeof arguments[2] === 'number') {
          this.G = arguments[2];
        }
        if (typeof arguments[3] === 'number') {
          this.B = arguments[3];
        }
      }
      if (arguments.length == 3) {
        if (typeof arguments[0] === 'number') {
          this.R = arguments[0];
        }
        if (typeof arguments[1] === 'number') {
          this.G = arguments[1];
        }
        if (typeof arguments[2] === 'number') {
          this.B = arguments[2];
        }
      }
      if (arguments[0] instanceof MiaoColorClass) {
        this.A = arguments[0].A;
        this.R = arguments[0].R;
        this.G = arguments[0].G;
        this.B = arguments[0].B;
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].A === 'number') {
          this.A = arguments[0].A;
        }
        if (typeof arguments[0].R === 'number') {
          this.R = arguments[0].R;
        }
        if (typeof arguments[0].G === 'number') {
          this.G = arguments[0].G;
        }
        if (typeof arguments[0].B === 'number') {
          this.B = arguments[0].B;
        }
      }
    }
  }
});

//MiaoCommonColor公共颜色类
var MiaoCommonColor = {
  BgColor: new MiaoColorClass(255, 255, 255, 255),
  TransparentColor: new MiaoColorClass(0, 0, 0, 0),
  AliceBlue: new MiaoColorClass(255, 240, 248, 255),
  LightSalmon: new MiaoColorClass(255, 255, 160, 122),
  AntiqueWhite: new MiaoColorClass(255, 250, 235, 215),
  LightSeaGreen: new MiaoColorClass(255, 32, 178, 170),
  Aqua: new MiaoColorClass(255, 0, 255, 255),
  LightSkyBlue: new MiaoColorClass(255, 135, 206, 250),
  Aquamarine: new MiaoColorClass(255, 127, 255, 212),
  LightSlateGray: new MiaoColorClass(255, 119, 136, 153),
  Azure: new MiaoColorClass(255, 240, 255, 255),
  LightSteelBlue: new MiaoColorClass(255, 176, 196, 222),
  Beige: new MiaoColorClass(255, 245, 245, 220),
  LightYellow: new MiaoColorClass(255, 255, 255, 224),
  Bisque: new MiaoColorClass(255, 255, 228, 196),
  Lime: new MiaoColorClass(255, 0, 255, 0),
  Black: new MiaoColorClass(255, 0, 0, 0),
  LimeGreen: new MiaoColorClass(255, 50, 205, 50),
  BlanchedAlmond: new MiaoColorClass(255, 255, 255, 205),
  Linen: new MiaoColorClass(255, 250, 240, 230),
  Blue: new MiaoColorClass(255, 0, 0, 255),
  Magenta: new MiaoColorClass(255, 255, 0, 255),
  BlueViolet: new MiaoColorClass(255, 128, 0, 0),
  Brown: new MiaoColorClass(255, 165, 42, 42),
  MediumAquamarine: new MiaoColorClass(255, 102, 205, 170),
  BurlyWood: new MiaoColorClass(255, 222, 184, 135),
  MediumBlue: new MiaoColorClass(255, 0, 0, 205),
  CadetBlue: new MiaoColorClass(255, 95, 158, 160),
  MediumOrchid: new MiaoColorClass(255, 186, 85, 211),
  Chartreuse: new MiaoColorClass(255, 127, 255, 0),
  MediumPurple: new MiaoColorClass(255, 147, 112, 219),
  Chocolate: new MiaoColorClass(255, 210, 105, 30),
  MediumSeaGreen: new MiaoColorClass(255, 60, 179, 113),
  Coral: new MiaoColorClass(255, 255, 127, 80),
  MediumSlateBlue: new MiaoColorClass(255, 123, 104, 238),
  CornflowerBlue: new MiaoColorClass(255, 100, 149, 237),
  MediumSpringGreen: new MiaoColorClass(255, 0, 250, 154),
  Cornsilk: new MiaoColorClass(255, 255, 248, 220),
  MediumTurquoise: new MiaoColorClass(255, 72, 209, 204),
  Crimson: new MiaoColorClass(255, 199, 21, 112),
  Cyan: new MiaoColorClass(255, 0, 255, 255),
  MidnightBlue: new MiaoColorClass(255, 25, 25, 112),
  DarkBlue: new MiaoColorClass(255, 0, 0, 139),
  MintCream: new MiaoColorClass(255, 245, 255, 250),
  DarkCyan: new MiaoColorClass(255, 0, 139, 139),
  MistyRose: new MiaoColorClass(255, 255, 228, 225),
  DarkGoldenrod: new MiaoColorClass(255, 184, 134, 11),
  Moccasin: new MiaoColorClass(255, 255, 228, 181),
  DarkGray: new MiaoColorClass(255, 169, 169, 169),
  NavajoWhite: new MiaoColorClass(255, 255, 222, 173),
  DarkGreen: new MiaoColorClass(255, 0, 0, 128),
  DarkKhaki: new MiaoColorClass(255, 189, 183, 107),
  OldLace: new MiaoColorClass(255, 253, 245, 230),
  DarkMagena: new MiaoColorClass(255, 128, 128, 0),
  DarkOliveGreen: new MiaoColorClass(255, 107, 142, 45),
  DarkOrange: new MiaoColorClass(255, 255, 140, 0),
  Orange: new MiaoColorClass(255, 255, 165, 0),
  DarkOrchid: new MiaoColorClass(255, 153, 50, 204),
  OrangeRed: new MiaoColorClass(255, 255, 69, 0),
  DarkRed: new MiaoColorClass(255, 139, 0, 0),
  Orchid: new MiaoColorClass(255, 218, 112, 214),
  DarkSalmon: new MiaoColorClass(255, 233, 150, 122),
  PaleGoldenrod: new MiaoColorClass(255, 238, 232, 170),
  DarkSeaGreen: new MiaoColorClass(255, 143, 188, 143),
  PaleGreen: new MiaoColorClass(255, 152, 251, 152),
  DarkSlateBlue: new MiaoColorClass(255, 72, 61, 139),
  PaleTurquoise: new MiaoColorClass(255, 175, 238, 238),
  DarkSlateGray: new MiaoColorClass(255, 219, 112, 147),
  DarkTurquoise: new MiaoColorClass(255, 0, 206, 209),
  PapayaWhip: new MiaoColorClass(255, 255, 239, 213),
  DarkViolet: new MiaoColorClass(255, 148, 0, 211),
  PeachPuff: new MiaoColorClass(255, 255, 218, 155),
  DeepPink: new MiaoColorClass(255, 205, 133, 63),
  DeepSkyBlue: new MiaoColorClass(255, 0, 191, 255),
  Pink: new MiaoColorClass(255, 255, 192, 203),
  DimGray: new MiaoColorClass(255, 105, 105, 105),
  Plum: new MiaoColorClass(255, 221, 160, 221),
  DodgerBlue: new MiaoColorClass(255, 30, 144, 255),
  PowderBlue: new MiaoColorClass(255, 176, 224, 230),
  Firebrick: new MiaoColorClass(255, 128, 0, 128),
  FloralWhite: new MiaoColorClass(255, 255, 250, 240),
  Red: new MiaoColorClass(255, 255, 0, 0),
  ForestGreen: new MiaoColorClass(255, 34, 139, 34),
  RosyBrown: new MiaoColorClass(255, 188, 143, 143),
  Fuschia: new MiaoColorClass(255, 255, 0, 255),
  RoyalBlue: new MiaoColorClass(255, 65, 105, 225),
  SaddleBrown: new MiaoColorClass(255, 139, 69, 19),
  GhostWhite: new MiaoColorClass(255, 248, 248, 255),
  Salmon: new MiaoColorClass(255, 250, 128, 114),
  Gold: new MiaoColorClass(255, 255, 215, 0),
  SandyBrown: new MiaoColorClass(255, 244, 164, 96),
  Goldenrod: new MiaoColorClass(255, 218, 165, 32),
  SeaGreen: new MiaoColorClass(255, 46, 139, 87),
  Gray: new MiaoColorClass(255, 128, 128, 128),
  Seashell: new MiaoColorClass(255, 255, 245, 238),
  Green: new MiaoColorClass(255, 160, 82, 45),
  GreenYellow: new MiaoColorClass(255, 173, 255, 47),
  Silver: new MiaoColorClass(255, 192, 192, 192),
  Honeydew: new MiaoColorClass(255, 240, 255, 240),
  SkyBlue: new MiaoColorClass(255, 135, 206, 235),
  HotPink: new MiaoColorClass(255, 255, 105, 180),
  SlateBlue: new MiaoColorClass(255, 106, 90, 205),
  IndianRed: new MiaoColorClass(255, 112, 128, 144),
  Indigo: new MiaoColorClass(255, 75, 0, 130),
  Snow: new MiaoColorClass(255, 255, 250, 250),
  Ivory: new MiaoColorClass(255, 255, 240, 240),
  SpringGreen: new MiaoColorClass(255, 0, 255, 127),
  Khaki: new MiaoColorClass(255, 240, 230, 140),
  SteelBlue: new MiaoColorClass(255, 70, 130, 180),
  Lavender: new MiaoColorClass(255, 230, 230, 250),
  Tan: new MiaoColorClass(255, 210, 180, 140),
  LavenderBlush: new MiaoColorClass(255, 255, 240, 245),
  Teal: new MiaoColorClass(255, 0, 128, 128),
  LawnGreen: new MiaoColorClass(255, 124, 252, 0),
  Thistle: new MiaoColorClass(255, 216, 191, 216),
  LemonChiffon: new MiaoColorClass(255, 255, 250, 205),
  Tomato: new MiaoColorClass(255, 253, 99, 71),
  LightBlue: new MiaoColorClass(255, 173, 216, 230),
  Turquoise: new MiaoColorClass(255, 64, 224, 208),
  LightCoral: new MiaoColorClass(255, 240, 128, 128),
  Violet: new MiaoColorClass(255, 238, 130, 238),
  LightCyan: new MiaoColorClass(255, 224, 255, 255),
  Wheat: new MiaoColorClass(255, 245, 222, 179),
  LightGoldenrodYellow: new MiaoColorClass(255, 250, 250, 210),
  White: new MiaoColorClass(255, 255, 255, 255),
  LightGreen: new MiaoColorClass(255, 144, 238, 144),
  WhiteSmoke: new MiaoColorClass(255, 245, 245, 245),
  LightGray: new MiaoColorClass(255, 211, 211, 211),
  Yellow: new MiaoColorClass(255, 255, 255, 0),
  LightPink: new MiaoColorClass(255, 255, 182, 193),
  YellowGreen: new MiaoColorClass(255, 154, 205, 50)
};

//MiaoPointClass
var MiaoPointClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.X = 0;
    this.Y = 0;
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }
      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y === 'number') {
          this.IsEmpty = false;
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Add: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
      }
      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Y += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y === 'number') {
          this.IsEmpty = false;
          this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.X += parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.Y += parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //减，参数类型：（miaosize）（miaopoint）（ew,eh）
  Subtract: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.X -= parseFloat(arguments[0].toFixed(this.FixedNumber));
      }
      if (typeof arguments[1] === 'number') {
        this.IsEmpty = false;
        this.Y -= parseFloat(arguments[1].toFixed(this.FixedNumber));
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.X -= parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        this.Y -= parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.X -= parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.Y -= parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
  },
  Ceil: function () {
    this.X = Math.ceil(this.X);
    this.Y = Math.ceil(this.Y);
  },
  Floor: function () {
    this.X = Math.floor(this.X);
    this.Y = Math.floor(this.Y);
  },
  Round: function () {
    this.X = Math.round(this.X);
    this.Y = Math.round(this.Y);
  },
  Random: function () {
    this.IsEmpty = false;
    this.X = Math.floor(Math.random() * 2000000 + 1);
    this.Y = Math.floor(Math.random() * 2000000 + 1);
    if (typeof arguments[0] === 'number') {
      this.X = Math.floor(Math.random() * arguments[0] + 1);
    }
    if (arguments.length > 1) {
      if (typeof arguments[1] === 'number') {
        this.Y = Math.floor(Math.random() * arguments[1] + 1);
      }
    }
    if (arguments[0] instanceof MiaoPointClass) {
      this.X = Math.floor(Math.random() * arguments[0].X + 1);
      this.Y = Math.floor(Math.random() * arguments[0].Y + 1);
    }
    if (isJson(arguments[0])) {
      if (typeof arguments[0].X === 'number') {
        this.IsEmpty = false;
        this.X = Math.floor(Math.random() * arguments[0].X + 1);
      }
      if (typeof arguments[0].Y === 'number') {
        this.IsEmpty = false;
        this.Y = Math.floor(Math.random() * arguments[0].Y + 1);
      }
    }
  },
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    var iAngle = ((Math.PI / 180) * eAngle);
    var iOrgPoint = eOrgPoint || { "X": 0, "Y": 0 };
    var iX = this.X;
    var iY = this.Y;
    //x1 = cos(angle) * x - sin(angle) * y; y1 = cos(angle) * y + sin(angle) * x;
    iX = (Math.cos(iAngle) * (this.X - eOrgPoint.X)) - (Math.sin(iAngle) * (this.Y - eOrgPoint.Y)) + eOrgPoint.X;
    iY = (Math.cos(iAngle) * (this.Y - eOrgPoint.Y)) + (Math.sin(iAngle) * (this.X - eOrgPoint.X)) + eOrgPoint.Y;
    iX = iX.toFixed(MiaoCommonVar.FixedNumber);
    iY = iY.toFixed(MiaoCommonVar.FixedNumber);
    this.X = iX;
    this.Y = iY;
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y === 'number') {
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
  },
  IsMiaoPointClass: function (e) { return e instanceof MiaoPointClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.X = 0;
    this.Y = 0;
  }
});


//MiaoSizeClass
var MiaoSizeClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.Width = 0;
    this.Height = 0;
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoSizeClass) {
        this.IsEmpty = false;
        this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Add: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Width += parseFloat(arguments[0].toFixed(this.FixedNumber));
      }
      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Height += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoSizeClass) {
        this.IsEmpty = false;
        this.Width += parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        this.Height += parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.Width += parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.Height += parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //减，参数类型：（miaosize）（miaopoint）（ew,eh）
  Subtract: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Width -= parseFloat(arguments[0].toFixed(this.FixedNumber));

        if (arguments.length > 1) {
          if (typeof arguments[1] === 'number') {
            this.IsEmpty = false;
            this.Height -= parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }
      if (arguments[0] instanceof MiaoSizeClass) {
        this.IsEmpty = false;
        this.Width -= parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        this.Height -= parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.Width -= parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.Height -= parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  },
  Ceil: function () {
    this.Width = Math.ceil(this.Width);
    this.Height = Math.ceil(this.Height);
  },
  Floor: function () {
    this.Width = Math.floor(this.Width);
    this.Height = Math.floor(this.Height);
  },
  Round: function () {
    this.Width = Math.round(this.Width);
    this.Height = Math.round(this.Height);
  },
  Random: function () {
    this.IsEmpty = false;
    this.Width = Math.floor(Math.random() * 2000000 + 1);
    this.Height = Math.floor(Math.random() * 2000000 + 1);
    if (typeof arguments[0] === 'number') {
      this.Width = Math.floor(Math.random() * arguments[0] + 1);

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.Height = Math.floor(Math.random() * arguments[1] + 1);
        }
      }
    }
    if (arguments[0] instanceof MiaoSizeClass) {
      this.Width = Math.floor(Math.random() * arguments[0].Width + 1);
      this.Height = Math.floor(Math.random() * arguments[0].Height + 1);
    }
    if (isJson(arguments[0])) {
      if (typeof arguments[0].Width === 'number') {
        this.IsEmpty = false;
        this.X = Math.floor(Math.random() * arguments[0].Width + 1);
      }
      if (typeof arguments[0].Height === 'number') {
        this.IsEmpty = false;
        this.Y = Math.floor(Math.random() * arguments[0].Height + 1);
      }
    }
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoSizeClass) {
        this.IsEmpty = false;
        this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].Width === 'number') {
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Height === 'number') {
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  },
  IsMiaoSizeClass: function (e) { return e instanceof MiaoSizeClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.Width = 0;
    this.Height = 0;
  }
});

//MiaoLineClass线段类，由两个点类组成的类
var MiaoLineClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.Point1 = new MiaoPointClass();
    this.Point2 = new MiaoPointClass();
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Add: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0]);
        this.Point2.Add(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0], arguments[1]);
        this.Point2.Add(arguments[0], arguments[1]);
      }
    }
  },
  //减，参数类型：（miaosize）（miaopoint）（ew,eh）
  Subtract: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0]);
        this.Point2.Subtract(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0], arguments[1]);
        this.Point2.Subtract(arguments[0], arguments[1]);
      }
    }
  },
  Ceil: function () {
    this.Point1.Ceil();
    this.Point2.Ceil();
  },
  Floor: function () {
    this.Point1.Floor();
    this.Point2.Floor();
  },
  Round: function () {
    this.Point1.Round();
    this.Point2.Round();
  },
  Random: function () {
    this.IsEmpty = false;
    if (arguments.length == 1) {
      this.Point1.Random(arguments[0]);
      this.Point2.Random(arguments[0]);
    } else if (arguments.length == 2) {
      this.Point1.Random(arguments[0], arguments[1]);
      this.Point2.Random(arguments[0], arguments[1]);
    }
  },
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    this.IsEmpty = false;
    this.Point1.Rotate(eAngle, eOrgPoint);
    this.Point2.Rotate(eAngle, eOrgPoint);
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
      }
    }
  },
  IsMiaoLineClass: function (e) { return e instanceof MiaoLineClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.Point1.SetEmpty();
    this.Point2.SetEmpty();
  }
});

//MiaoBezierCurveQClass二次贝塞尔曲线类，由三个点类组成的类
var MiaoBezierCurveQClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.Point1 = new MiaoPointClass();
    this.Point2 = new MiaoPointClass();
    this.Point3 = new MiaoPointClass();
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }


      if (arguments.length > 4) {
        if (typeof arguments[4] === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[4].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 5) {
        if (typeof arguments[5] === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[5].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[2].X);
          this.Point3.Y = parseFloat(arguments[2].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X3 === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[0].X3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y3 === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[0].Y3.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Add: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0]);
        this.Point2.Add(arguments[0]);
        this.Point3.Add(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0], arguments[1]);
        this.Point2.Add(arguments[0], arguments[1]);
        this.Point3.Add(arguments[0], arguments[1]);
      }
    }
  },
  //减，参数类型：（miaosize）（miaopoint）（ew,eh）
  Subtract: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0]);
        this.Point2.Subtract(arguments[0]);
        this.Point3.Subtract(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0], arguments[1]);
        this.Point2.Subtract(arguments[0], arguments[1]);
        this.Point3.Subtract(arguments[0], arguments[1]);
      }
    }
  },
  Ceil: function () {
    this.Point1.Ceil();
    this.Point2.Ceil();
    this.Point3.Ceil();
  },
  Floor: function () {
    this.Point1.Floor();
    this.Point2.Floor();
    this.Point3.Floor();
  },
  Round: function () {
    this.Point1.Round();
    this.Point2.Round();
    this.Point3.Round();
  },
  Random: function () {
    this.IsEmpty = false;
    if (arguments.length == 1) {
      this.Point1.Random(arguments[0]);
      this.Point2.Random(arguments[0]);
      this.Point3.Random(arguments[0]);
    } else if (arguments.length == 2) {
      this.Point1.Random(arguments[0], arguments[1]);
      this.Point2.Random(arguments[0], arguments[1]);
      this.Point3.Random(arguments[0], arguments[1]);
    }
  },
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    this.IsEmpty = false;
    this.Point1.Rotate(eAngle, eOrgPoint);
    this.Point2.Rotate(eAngle, eOrgPoint);
    this.Point3.Rotate(eAngle, eOrgPoint);
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }


      if (arguments.length > 4) {
        if (typeof arguments[4] === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[4].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 5) {
        if (typeof arguments[5] === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[5].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[2].X);
          this.Point3.Y = parseFloat(arguments[2].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X3 === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[0].X3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y3 === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[0].Y3.toFixed(this.FixedNumber));
        }
      }
    }
  },
  IsMiaoBezierCurveQClass: function (e) { return e instanceof MiaoBezierCurveQClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.Point1.SetEmpty();
    this.Point2.SetEmpty();
    this.Point3.SetEmpty();
  }
});

//MiaoBezierCurveCClass三次贝塞尔曲线类，由四个点类组成的类
var MiaoBezierCurveCClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.Point1 = new MiaoPointClass();
    this.Point2 = new MiaoPointClass();
    this.Point3 = new MiaoPointClass();
    this.Point4 = new MiaoPointClass();
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }


      if (arguments.length > 4) {
        if (typeof arguments[4] === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[4].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 5) {
        if (typeof arguments[5] === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[5].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length > 6) {
        if (typeof arguments[6] === 'number') {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[6].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 7) {
        if (typeof arguments[7] === 'number') {
          this.IsEmpty = false;
          this.Point4.Y = parseFloat(arguments[7].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[2].X);
          this.Point3.Y = parseFloat(arguments[2].Y);
        }
      }
      if (arguments.length > 3) {
        if (arguments[3] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[3].X);
          this.Point4.Y = parseFloat(arguments[3].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X3 === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[0].X3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y3 === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[0].Y3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X4 === 'number') {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[0].X4.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y4 === 'number') {
          this.IsEmpty = false;
          this.Point4.Y = parseFloat(arguments[0].Y4.toFixed(this.FixedNumber));
        }
      }
    }
  },
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Add: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0]);
        this.Point2.Add(arguments[0]);
        this.Point3.Add(arguments[0]);
        this.Point4.Add(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Add(arguments[0], arguments[1]);
        this.Point2.Add(arguments[0], arguments[1]);
        this.Point3.Add(arguments[0], arguments[1]);
        this.Point4.Add(arguments[0], arguments[1]);
      }
    }
  },
  //减，参数类型：（miaosize）（miaopoint）（ew,eh）
  Subtract: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments.length == 1) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0]);
        this.Point2.Subtract(arguments[0]);
        this.Point3.Subtract(arguments[0]);
        this.Point4.Subtract(arguments[0]);
      } else if (arguments.length == 2) {
        this.IsEmpty = false;
        this.Point1.Subtract(arguments[0], arguments[1]);
        this.Point2.Subtract(arguments[0], arguments[1]);
        this.Point3.Subtract(arguments[0], arguments[1]);
        this.Point4.Subtract(arguments[0], arguments[1]);
      }
    }
  },
  Ceil: function () {
    this.Point1.Ceil();
    this.Point2.Ceil();
    this.Point3.Ceil();
    this.Point4.Ceil();
  },
  Floor: function () {
    this.Point1.Floor();
    this.Point2.Floor();
    this.Point3.Floor();
    this.Point4.Floor();
  },
  Round: function () {
    this.Point1.Round();
    this.Point2.Round();
    this.Point3.Round();
    this.Point4.Round();
  },
  Random: function () {
    this.IsEmpty = false;
    if (arguments.length == 1) {
      this.Point1.Random(arguments[0]);
      this.Point2.Random(arguments[0]);
      this.Point3.Random(arguments[0]);
      this.Point4.Random(arguments[0]);
    } else if (arguments.length == 2) {
      this.Point1.Random(arguments[0], arguments[1]);
      this.Point2.Random(arguments[0], arguments[1]);
      this.Point3.Random(arguments[0], arguments[1]);
      this.Point4.Random(arguments[0], arguments[1]);
    }
  },
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    this.IsEmpty = false;
    this.Point1.Rotate(eAngle, eOrgPoint);
    this.Point2.Rotate(eAngle, eOrgPoint);
    this.Point3.Rotate(eAngle, eOrgPoint);
    this.Point4.Rotate(eAngle, eOrgPoint);
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
      }


      if (arguments.length > 4) {
        if (typeof arguments[4] === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[4].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 5) {
        if (typeof arguments[5] === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[5].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length > 6) {
        if (typeof arguments[6] === 'number') {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[6].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length > 7) {
        if (typeof arguments[7] === 'number') {
          this.IsEmpty = false;
          this.Point4.Y = parseFloat(arguments[7].toFixed(this.FixedNumber));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.Point1.X = parseFloat(arguments[0].X);
        this.Point1.Y = parseFloat(arguments[0].Y);
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[1].X);
          this.Point2.Y = parseFloat(arguments[1].Y);
        }
      }
      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[2].X);
          this.Point3.Y = parseFloat(arguments[2].Y);
        }
      }
      if (arguments.length > 3) {
        if (arguments[3] instanceof MiaoPointClass) {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[3].X);
          this.Point4.Y = parseFloat(arguments[3].Y);
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X1 === 'number') {
          this.IsEmpty = false;
          this.Point1.X = parseFloat(arguments[0].X1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y1 === 'number') {
          this.IsEmpty = false;
          this.Point1.Y = parseFloat(arguments[0].Y1.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X2 === 'number') {
          this.IsEmpty = false;
          this.Point2.X = parseFloat(arguments[0].X2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y2 === 'number') {
          this.IsEmpty = false;
          this.Point2.Y = parseFloat(arguments[0].Y2.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X3 === 'number') {
          this.IsEmpty = false;
          this.Point3.X = parseFloat(arguments[0].X3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y3 === 'number') {
          this.IsEmpty = false;
          this.Point3.Y = parseFloat(arguments[0].Y3.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].X4 === 'number') {
          this.IsEmpty = false;
          this.Point4.X = parseFloat(arguments[0].X4.toFixed(this.FixedNumber));
        }
        if (typeof arguments[0].Y4 === 'number') {
          this.IsEmpty = false;
          this.Point4.Y = parseFloat(arguments[0].Y4.toFixed(this.FixedNumber));
        }
      }
    }
  },
  IsMiaoBezierCurveCClass: function (e) { return e instanceof MiaoBezierCurveCClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.Point1.SetEmpty();
    this.Point2.SetEmpty();
    this.Point3.SetEmpty();
    this.Point4.SetEmpty();
  }
});

//MiaoRectangleClass
var MiaoRectangleClass = Class.extend({
  init: function () {
    //init参数类型：（miaosize）（miaopoint）（ew,eh）
    //arguments[0]
    this.IsEmpty = true;
    this.Location = new MiaoPointClass();
    this.Size = new MiaoSizeClass();
    //_Name的读写 
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;

        this.SetX(parseFloat(arguments[0].toFixed(this.FixedNumber)));

      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.SetY(parseFloat(arguments[1].toFixed(this.FixedNumber)));
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[2].toFixed(this.FixedNumber)));
        }
      }

      if (arguments.length > 1) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.SetHeight(parseFloat(arguments[3].toFixed(this.FixedNumber)));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.SetX(parseFloat(arguments[0].X));
        this.SetY(parseFloat(arguments[0].Y));
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoSizeClass) {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[1].Width));
          this.SetHeight(parseFloat(arguments[1].Height));
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.SetX(parseFloat(arguments[0].X.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Y === 'number') {
          this.IsEmpty = false;
          this.SetY(parseFloat(arguments[0].Y.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[0].Width.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.SetHeight(parseFloat(arguments[0].Height.toFixed(this.FixedNumber)));
        }
      }
    }
  },
  SetLeft(eLeft) { this.Location.X = eLeft.toFixed(this.FixedNumber); },
  GetLeft() { return parseFloat(this.Location.X); },
  SetRight(eRight) { this.Size.Width = eRight.toFixed(this.FixedNumber) - this.Location.X; },
  GetRight() { return (parseFloat(this.Location.X) + parseFloat(this.Size.Width)); },
  SetTop(eTop) { this.Location.Y = eTop.toFixed(this.FixedNumber); },
  GetTop() { return parseFloat(this.Location.Y); },
  SetBottom(eBottom) { this.Size.Height = eBottom.toFixed(this.FixedNumber) - this.Location.Y; },
  GetBottom() { return parseFloat(this.Location.Y) + parseFloat(this.Size.Height); },
  SetX(eX) { this.Location.X = eX.toFixed(this.FixedNumber); },
  GetX() { return parseFloat(this.Location.X); },
  SetY(eY) { this.Location.Y = eY.toFixed(this.FixedNumber); },
  GetY() { return parseFloat(this.Location.Y); },
  SetWidth(eWidth) { this.Size.Width = eWidth.toFixed(this.FixedNumber); },
  GetWidth() { return parseFloat(this.Size.Width); },
  SetHeight(eHeight) { this.Size.Height = eHeight.toFixed(this.FixedNumber); },
  GetHeight() { return parseFloat(this.Size.Height); },
  Ceil: function () {
    this.Location.Ceil();
    this.Size.Ceil();
  },
  Floor: function () {
    this.Location.Floor();
    this.Size.Floor();
  },
  Round: function () {
    this.Location.Round();
    this.Size.Round();
  },
  Random: function () {
    if (arguments.length == 1) {
      this.Location.Random(arguments[0]);
      this.Size.Random(arguments[0]);
    }else if (arguments.length == 2) {
      this.Location.Random(arguments[0], arguments[1]);
      this.Size.Random(arguments[0], arguments[1]);
    } else {
      this.Location.Random();
      this.Size.Random();
    }
  },
  MoveTo: function (ePoint) {
    if (ePoint instanceof MiaoPointClass) {
      this.Location = ePoint;
    }
  },
  SizeTo: function (eSize) {
    if (ePoint instanceof MiaoSizeClass) {
      this.Size = eSize;
    }
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'number') {
        this.IsEmpty = false;
        this.SetX(parseFloat(arguments[0].toFixed(this.FixedNumber)));
      }
      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.IsEmpty = false;
          this.SetY(parseFloat(arguments[1].toFixed(this.FixedNumber)));
        }
      }
      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[2].toFixed(this.FixedNumber)));
        }
      }
      if (arguments.length > 3) {
        if (typeof arguments[3] === 'number') {
          this.IsEmpty = false;
          this.SetHeight(parseFloat(arguments[3].toFixed(this.FixedNumber)));
        }
      }
      if (arguments[0] instanceof MiaoPointClass) {
        this.IsEmpty = false;
        this.SetX(parseFloat(arguments[0].X.toFixed(this.FixedNumber)));
        this.SetY(parseFloat(arguments[0].Y.toFixed(this.FixedNumber)));
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoSizeClass) {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[1].Width.toFixed(this.FixedNumber)));
          this.SetHeight(parseFloat(arguments[1].Height.toFixed(this.FixedNumber)));
        }
      }
      if (isJson(arguments[0])) {
        if (typeof arguments[0].X === 'number') {
          this.IsEmpty = false;
          this.SetX(parseFloat(arguments[0].X.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Y === 'number') {
          this.IsEmpty = false;
          this.SetY(parseFloat(arguments[0].Y.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Width === 'number') {
          this.IsEmpty = false;
          this.SetWidth(parseFloat(arguments[0].Width.toFixed(this.FixedNumber)));
        }
        if (typeof arguments[0].Height === 'number') {
          this.IsEmpty = false;
          this.SetHeight(parseFloat(arguments[0].Height.toFixed(this.FixedNumber)));
        }
      }
    }
  },
  IsMiaoRectangleClass: function (e) { return e instanceof MiaoRectangleClass; },
  SetEmpty: function () {
    this.IsEmpty = true;
    this.Location.SetEmpty();
    this.Size.SetEmpty();
  }
});

//MiaoDitemClass
var MiaoDitemClass = Class.extend({
  //init(Commend,Array)Commend是字符串（M,C,Q,L,Z），Array是数组（是MiaoPointClass组成的数组）
  init: function () {
    // 属性
    this.Commend = '';
    this.Points = new Array();
    this.PreviousPoints = new MiaoPointClass(0, 0);
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'string') {
        this.Commend = arguments[0];
      }

      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.Points.push(arguments[1]);
        }
      }

      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.Points.push(arguments[2]);
        }
      }
      if (arguments.length > 3) {
        if (arguments[3] instanceof MiaoPointClass) {
          this.Points.push(arguments[3]);
        }
      }

      if (arguments.length > 1) {
        if (arguments[1] instanceof Array) {
          if (arguments[1][0] instanceof MiaoPointClass) {
            this.Points = arguments[1];
          }
        }
      }
    }
  },
  //格式化SVG的List表
  Scale: function (eo) {
    if (this.Points.length >= 1) {
      for (var i = 0; i < this.Points.length; i++) {
        this.Points[i] = new MiaoPointClass(this.Points[i].X * eo, this.Points[i].Y * eo);
      }
    }
  },
  TransformNewPoint: function (ePoint) {
    if (this.Points.length >= 1) {
      for (var i = 0; i < this.Points.length; i++) {
        this.Points[i] = new MiaoPointClass(this.Points[i].X + ePoint.X, this.Points[i].Y + ePoint.Y);
      }
    }
  },
  SubtractNewPoint: function (ePoint) {
    if (this.Points.length >= 1) {
      for (var i = 0; i < this.Points.length; i++) {
        this.Points[i] = new MiaoPointClass(this.Points[i].X - ePoint.X, this.Points[i].Y - ePoint.Y);
      }
    }
  },
  isExistIntersectionPoint: function (eDitem) { },
  Flatten: function (eNowPoint, eSCount) {

  },
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    eOrgPoint = eOrgPoint || { "X": 0, "Y": 0 };
    if (this.Points.length >= 1) {
      for (var i = 0; i < this.Points.length; i++) {
        this.Points[i].Rotate(eAngle, eOrgPoint);
      }
    }
  },
  Set: function () {
    // 属性
    if (!(arguments[0] === undefined)) {
      if (typeof arguments[0] === 'string') {
        this.Commend = arguments[0];
      }

      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoPointClass) {
          this.Points.push(arguments[1]);
        }
      }
      if (arguments.length > 2) {
        if (arguments[2] instanceof MiaoPointClass) {
          this.Points.push(arguments[2]);
        }
      }
      if (arguments.length > 3) {
        if (arguments[3] instanceof MiaoPointClass) {
          this.Points.push(arguments[3]);
        }
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof Array) {
          if (arguments[1][0] instanceof MiaoPointClass) {
            this.Points = arguments[1];
          }
        }
      }
    }
  },
  IsMiaoDitemClass: function (e) { return e instanceof MiaoDitemClass; }
});

//MiaoPathClass
var MiaoPathClass = Class.extend({

  //FillColor,StrokeColor,BorderWidth,D,MarkList,IsVisible
  //IsG,PathList,MarkList,IsVisible
  init: function () {
    // 属性
    this.FillColor = new MiaoColorClass(0, 0, 0, 0);
    this.StrokeColor = new MiaoColorClass(0, 0, 0, 0);
    this.BorderWidth = 0;
    this.StrokeMiterLimit = 4;
    this.StrokeLineCap = 'butt';
    this.StrokeLineJoin = 'miter';
    this.StrokeDashArray = 'none';
    this.StrokeDashOffset = 'none';
    this.D = new Array();
    this.IsG = false;
    this.PathList = new Array();
    this.MarkList = {};
    this.IsVisible = true;//决定这个path是否被显示出来。

    if (!(arguments[0] === undefined)) {
      if (arguments[0] instanceof MiaoPathClass) {
        this.FillColor = arguments[0].FillColor;
        this.StrokeColor = arguments[0].StrokeColor;
        this.BorderWidth = arguments[0].BorderWidth;
        this.StrokeMiterLimit = arguments[0].StrokeMiterLimit;
        this.StrokeLineCap = arguments[0].StrokeLineCap;
        this.StrokeLineJoin = arguments[0].StrokeLineJoin;
        this.StrokeDashArray = arguments[0].StrokeDashArray;
        this.StrokeDashOffset = arguments[0].StrokeDashOffset;
        this.D = arguments[0].D;
        this.IsG = arguments[0].IsG;
        this.PathList = arguments[0].PathList;
        this.MarkList = arguments[0].MarkList;
        this.IsVisible = arguments[0].IsVisible;
      }
      if (arguments[0] instanceof MiaoColorClass) {
        this.FillColor = arguments[0];
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoColorClass) {
          this.StrokeColor = arguments[1];
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2]==='number') {
          this.BorderWidth = arguments[2];
        }
      }
      if (arguments.length > 4) {
        if (isJson(arguments[4])) {
          this.MarkList = arguments[4];
        }
      }

      if (arguments.length > 5) {
        if (arguments[5] instanceof Boolean) {
          this.IsVisible = arguments[5];
        }
      }
      if (arguments.length > 4) {
        if (arguments[3] instanceof Array) {
          if (arguments[3][0] instanceof MiaoDitemClass) {
            this.D = arguments[3];
          }
        }
      }

      if (arguments.length > 2) {
        if (arguments[2] instanceof Array) {
          if (arguments[2][0] instanceof MiaoDitemClass) {
            this.D = arguments[2];
          }
        }
      }

      if (arguments.length > 1) {
        if (arguments[1] instanceof Array) {
          if (arguments[1][0] instanceof MiaoDitemClass) {
            this.D = arguments[1];
          }
        }
      }
      if (arguments[0] instanceof Array) {
        if (arguments[0][0] instanceof MiaoDitemClass) {
          this.D = arguments[0];
        }
      }
      if (arguments[0] == true) {
        this.IsG = true;

        if (arguments.length > 1) {
          if (arguments[1] instanceof Array) {
            if (arguments[1][0] instanceof MiaoPathClass) {
              this.PathList = arguments[1];
            }
          }
        }
        if (arguments.length > 2) {
          if (isJson(arguments[2])) {
            this.MarkList = arguments[2];
          }
        }

        if (arguments.length > 3) {
          if (arguments[3] instanceof Boolean) {
            this.IsVisible = arguments[3];
          }
        }
      }


    }
  },
  //将Path绘制到一个Canvas对象上，eCtx是Canvas对象
  DrawToGraphics: function (eCtx) {
    this.refreshDPreviousPoint();
    if (!this.IsG) {
      if (this.D.length > 0) {
        //GraphicsPath iGP = new GraphicsPath();
        //Pen p = new Pen(StrokeColor, BorderWidth);//定义了一个蓝色,宽度为的画笔
        eCtx.lineWidth = this.BorderWidth;
        eCtx.beginPath();
        for (var i = 0; i < this.D.length; i++)
        {
          if (this.D[i].Commend == 'M') {
            eCtx.moveTo(this.D[i].Points[0].X, this.D[i].Points[0].Y);
          }
          else if (this.D[i].Commend == 'L') {
            //iGP.AddLine(this.D[i].PreviousPoints, this.D[i].Points[0]);
            eCtx.lineTo(this.D[i].Points[0].X, this.D[i].Points[0].Y);
          }
          else if (this.D[i].Commend == 'C') {
            //iGP.AddBezier(this.D[i].PreviousPoints, this.D[i].Points[0], this.D[i].Points[1], this.D[i].Points[2]);
            eCtx.bezierCurveTo(this.D[i].Points[0].X, this.D[i].Points[0].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y, this.D[i].Points[2].X, this.D[i].Points[2].Y);
          }
          else if (this.D[i].Commend == 'Q') {
            //iGP.AddBezier(this.D[i].PreviousPoints, this.D[i].Points[0], this.D[i].Points[1], this.D[i].Points[2]);
            eCtx.quadraticCurveTo(this.D[i].Points[0].X, this.D[i].Points[0].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y);
          }
          else if (this.D[i].Commend == 'Z') {
            //iGP.CloseAllFigures();
            eCtx.closePath();
          }
        }
        eCtx.strokeStyle = this.StrokeColor.ToHtmlString();//'green'
        eCtx.stroke();
        eCtx.fillStyle = this.FillColor.ToHtmlString();//'green'
        eCtx.fill();
        //SolidBrush sB = new SolidBrush(FillColor);
        //eGraphics.FillPath(sB, iGP);
        //eGraphics.DrawPath(p, iGP);
      }
      return true;
    }
    else {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].DrawToGraphics(eCtx);
      }
    }
    return false;
  },
  Scale: function (eo) {
    if (this.IsG == false) {
      var oldBorderWidth = this.BorderWidth;
      this.BorderWidth = Math.ceil(this.BorderWidth * eo);
      if ((oldBorderWidth >= 1) && (this.BorderWidth < 1)) {
        this.BorderWidth = 1;
      }

      if (this.D.length >= 1) {
        for (var i = 0; i < this.D.length; i++) {
          this.D[i].Scale(eo);
        }
      }
    }
      //G组
    else {
      if (this.PathList.length >= 1) {
        for (var j = 0; j < this.PathList.length; j++) {
          this.PathList[j].Scale(eo);
        }
      }
    }
  },
  ConcatMiaoPath: function (eMiaoPath) {
    //两个路径相加组成新的组G路径
    var result = new MiaoPathClass();
    result.IsG = true;
    result.PathList.push(this);
    result.PathList.push(eMiaoPath);
    return result;
  },
  TransformNewPoint: function (ePoint) {
    if (this.IsG == true) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].TransformNewPoint(ePoint);
      }
    } else {
      for (var i = 0; i < this.D.length; i++) {
        this.D[i].TransformNewPoint(ePoint);
      }
    }
  },
  Clone: function () {
    var aNewMiaoPath = new MiaoPathClass(this);
    return aNewMiaoPath;
  },
  ClearMarkers: function () {
    this.MarkList = {};
  },
  //旋转坐标eAngle为角度，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    eOrgPoint = eOrgPoint || { "X": 0, "Y": 0 };
    if (this.IsG == true) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].Rotate(eAngle, eOrgPoint);
      }
    } else {
      for (var i = 0; i < this.D.length; i++) {
        this.D[i].Rotate(eAngle, eOrgPoint);
      }
    }
  },
  SetMarkers: function (eKey, eVal) {
    this.MarkList.eKey = eVal;
  },
  //将当前图形与新的图形合并成一个图形，返回一个新的path
  Merge: function (ePath) {
    //合并图形
  },
  //将当前图形减去新的图形之后留下的一个图形，返回一个新的path
  Subtract: function (ePath) { },
  //将当前图形与新的图形相交之后重叠部分留下的一个图形，返回一个新的path
  Intersection: function (ePath) { },
  //将当前图形与新的图形相交之后留下不重叠的的一个图形，返回一个新的path
  NoOverlap: function (ePath) { },
  //获取焦点
  GetIntersectionPointList: function (ePath) {
    var iPointList = new Array();//由MiaoPointClass组成
    this.refreshDPreviousPoint();
    if (!this.IsG == true) {

    }
    else {
      for (var j = 0; j < this.PathList.length; j++) {
        iPointList.concat(this.PathList[j].GetIntersectionPointList(ePath));
      }
    }
    return iPointList;
    //需要在执行获取焦点之前先刷新D的PreviousPoint属性。否则无法计算机啊。
  },
  GetBoundsCenterPoint:function(){
    var aBoundsBox = this.GetBounds(true);
    var iX = aBoundsBox.GetX() + (aBoundsBox.GetWidth() / 2);
    var iY = aBoundsBox.GetY() + (aBoundsBox.GetHeight() / 2);
    var iPoint = new MiaoPointClass(iX, iY);
    return iPoint;
  },
  GetBounds: function (eByT) {
    eByT = eByT || false;
    this.refreshDPreviousPoint();
    var minX = 99999999, maxX = -99999999, minY = 99999999, maxY = -99999999;
    var findMinX = false, findMaxX = false, findMinY = false, findMaxY = false;
    var aLastPoint = new MiaoPointClass(0, 0);
    var aBoundsBox = new MiaoRectangleClass();
    var iTempTtPoint;
    var iTempT = 0;
    if (this.IsG != true) {
      for (var i = 0; i < this.D.length; i++) {

        if (this.D[i].Commend == 'M') {
          if (!findMinX) {
            minX = this.D[i].Points[0].X;
            findMinX = true;
          }
          if (!findMinY) {
            minY = this.D[i].Points[0].Y;
            findMinX = true;
          }
          if (!findMaxX) {
            maxX = this.D[i].Points[0].X;
            findMaxX = true;
          }
          if (!findMaxY) {
            maxY = this.D[i].Points[0].Y;
            findMaxY = true;
          }
          minX = (this.D[i].Points[0].X < minX) ? this.D[i].Points[0].X : minX;
          maxX = (this.D[i].Points[0].X > maxX) ? this.D[i].Points[0].X : maxX;
          minY = (this.D[i].Points[0].Y < minY) ? this.D[i].Points[0].Y : minY;
          maxY = (this.D[i].Points[0].Y > maxY) ? this.D[i].Points[0].Y : maxY;
          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'L') {

          if (aLastPoint.X < minX) minX = aLastPoint.X;
          if (aLastPoint.X > maxX) maxX = aLastPoint.X;
          if (aLastPoint.Y < minY) minY = aLastPoint.Y;
          if (aLastPoint.Y > maxY) maxY = aLastPoint.Y;

          if (this.D[i].Points[0].X < minX) minX = this.D[i].Points[0].X;
          if (this.D[i].Points[0].X > maxX) maxX = this.D[i].Points[0].X;
          if (this.D[i].Points[0].Y < minY) minY = this.D[i].Points[0].Y;
          if (this.D[i].Points[0].Y > maxY) maxY = this.D[i].Points[0].Y;

          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'C') {
          if (eByT == true) {
            iTempT = 0;
            if (aLastPoint.X < minX) minX = aLastPoint.X;
            if (aLastPoint.X > maxX) maxX = aLastPoint.X;
            if (aLastPoint.Y < minY) minY = aLastPoint.Y;
            if (aLastPoint.Y > maxY) maxY = aLastPoint.Y;
            for (var j = 1; j < 100; j++){
              iTempT = j / 100;
              iTempTtPoint = MiaoCommonFun.GetCBezierCurvaturesPointByT(aLastPoint.X, aLastPoint.Y, this.D[i].Points[0].X, this.D[i].Points[0].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y, this.D[i].Points[2].X, this.D[i].Points[2].Y, iTempT);
              if (iTempTtPoint.X < minX) minX = iTempTtPoint.X;
              if (iTempTtPoint.X > maxX) maxX = iTempTtPoint.X;
              if (iTempTtPoint.Y < minY) minY = iTempTtPoint.Y;
              if (iTempTtPoint.Y > maxY) maxY = iTempTtPoint.Y;
            }
            if (this.D[i].Points[2].X < minX) minX = this.D[i].Points[0].X;
            if (this.D[i].Points[2].X > maxX) maxX = this.D[i].Points[0].X;
            if (this.D[i].Points[2].Y < minY) minY = this.D[i].Points[0].Y;
            if (this.D[i].Points[2].Y > maxY) maxY = this.D[i].Points[0].Y;
          } else {
            if (aLastPoint.X < minX) minX = aLastPoint.X;
            if (aLastPoint.X > maxX) maxX = aLastPoint.X;
            if (aLastPoint.Y < minY) minY = aLastPoint.Y;
            if (aLastPoint.Y > maxY) maxY = aLastPoint.Y;

            if (this.D[i].Points[0].X < minX) minX = this.D[i].Points[0].X;
            if (this.D[i].Points[0].X > maxX) maxX = this.D[i].Points[0].X;
            if (this.D[i].Points[0].Y < minY) minY = this.D[i].Points[0].Y;
            if (this.D[i].Points[0].Y > maxY) maxY = this.D[i].Points[0].Y;


            if (this.D[i].Points[1].X < minX) minX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].X > maxX) maxX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].Y < minY) minY = this.D[i].Points[1].Y;
            if (this.D[i].Points[1].Y > maxY) maxY = this.D[i].Points[1].Y;

            if (this.D[i].Points[2].X < minX) minX = this.D[i].Points[2].X;
            if (this.D[i].Points[2].X > maxX) maxX = this.D[i].Points[2].X;
            if (this.D[i].Points[2].Y < minY) minY = this.D[i].Points[2].Y;
            if (this.D[i].Points[2].Y > maxY) maxY = this.D[i].Points[2].Y;
          }
          aLastPoint = this.D[i].Points[2];
        }
        else if (this.D[i].Commend == 'Q') {
          if (eByT == true) {
            iTempT = 0;
            if (aLastPoint.X < minX) minX = aLastPoint.X;
            if (aLastPoint.X > maxX) maxX = aLastPoint.X;
            if (aLastPoint.Y < minY) minY = aLastPoint.Y;
            if (aLastPoint.Y > maxY) maxY = aLastPoint.Y;
            for (var j = 1; j < 100; j++) {
              iTempT = j / 100;
              iTempTtPoint = MiaoCommonFun.GetQBezierCurvaturesPointByT(aLastPoint.X, aLastPoint.Y, this.D[i].Points[0].X, this.D[i].Points[0].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y, iTempT);
              if (iTempTtPoint.X < minX) minX = iTempTtPoint.X;
              if (iTempTtPoint.X > maxX) maxX = iTempTtPoint.X;
              if (iTempTtPoint.Y < minY) minY = iTempTtPoint.Y;
              if (iTempTtPoint.Y > maxY) maxY = iTempTtPoint.Y;
            }
            if (this.D[i].Points[1].X < minX) minX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].X > maxX) maxX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].Y < minY) minY = this.D[i].Points[1].Y;
            if (this.D[i].Points[1].Y > maxY) maxY = this.D[i].Points[1].Y;
          } else {
            if (aLastPoint.X < minX) minX = aLastPoint.X;
            if (aLastPoint.X > maxX) maxX = aLastPoint.X;
            if (aLastPoint.Y < minY) minY = aLastPoint.Y;
            if (aLastPoint.Y > maxY) maxY = aLastPoint.Y;

            if (this.D[i].Points[0].X < minX) minX = this.D[i].Points[0].X;
            if (this.D[i].Points[0].X > maxX) maxX = this.D[i].Points[0].X;
            if (this.D[i].Points[0].Y < minY) minY = this.D[i].Points[0].Y;
            if (this.D[i].Points[0].Y > maxY) maxY = this.D[i].Points[0].Y;

            if (this.D[i].Points[1].X < minX) minX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].X > maxX) maxX = this.D[i].Points[1].X;
            if (this.D[i].Points[1].Y < minY) minY = this.D[i].Points[1].Y;
            if (this.D[i].Points[1].Y > maxY) maxY = this.D[i].Points[1].Y;
          }
          aLastPoint = this.D[i].Points[1];
        } else {

        }
      }

    }
    else {
      var aSubBoundsBox = new MiaoRectangleClass();

      for (var j = 0; j < this.PathList.length; j++) {
        try{
          aSubBoundsBox = this.PathList[j].GetBounds(eByT);
          minX = (aSubBoundsBox.GetLeft() < minX) ? aSubBoundsBox.GetLeft() : minX;
          maxX = (aSubBoundsBox.GetRight() > maxX) ? aSubBoundsBox.GetRight() : maxX;
          minY = (aSubBoundsBox.GetTop() < minY) ? aSubBoundsBox.GetTop() : minY;
          maxY = (aSubBoundsBox.GetBottom() > maxY) ? aSubBoundsBox.GetBottom() : maxY;
        } catch (ex) {
          $("#textbox4").append(ex);
        }
      }
    }


    aBoundsBox.SetLeft(minX);
    aBoundsBox.SetRight(maxX);
    aBoundsBox.SetTop(minY);
    aBoundsBox.SetBottom(maxY);
    return aBoundsBox;
  },
  fromXMLStr: function (eXmlString) {
    eXmlString = '<?xml version="1.0" encoding="utf-8" ?><svg>' + eXmlString + '</svg>';
    var xml = $.parseXML(eXmlString);
    if (this.formSvgXml(xml) == true) {
      return true;
    } else {
      return false;
    }
  },
  formSvgXml: function (eSvgXml) {

    var xmlDocRoot = eSvgXml.documentElement;
    var imiaomarkname = '';
    var thisobj = this;
    var SvgNodePathList = $(xmlDocRoot).children();
    if (SvgNodePathList.length > 1) {
      this.IsG = true;
      this.formSvgNodeList(SvgNodePathList, this.PathList);
    } else if (SvgNodePathList.length == 1) {
      var ele = SvgNodePathList[0];
      if (ele.nodeName == 'g')//组
      {
        this.IsG = true;
        this.PathList = new Array();

        var myPathList = $(ele).children();
        this.formSvgNodeList(myPathList, this.PathList);
      }
      else if (ele.nodeName == 'rect')//矩形
      {
        this.Set(this.RectConvert(ele));
      }
      else if (ele.nodeName == 'circle')//圆
      {
        this.Set(this.CircleConvert(ele));
      }
      else if (ele.nodeName == 'ellipse')//椭圆
      {
        this.Set(this.EllipseConvert(ele));
      }
      else if (ele.nodeName == 'line')//线
      {
        this.Set(this.LineConvert(ele));
      }
      else if (ele.nodeName == 'polyline')//折线
      {
        this.Set(this.PolylineConvert(ele));
      }
      else if (ele.nodeName == 'polygon')//多边形
      {
        this.Set(this.PolygonConvert(ele));
      }
      else if (ele.nodeName == 'path')//路径
      {
        this.Set(this.PathConvert(ele));
      }
    }
    return true;
  },
  //格式化SVG的List表
  formSvgNodeList: function (eSvgNodePathList, ePathList) {
    var thisobj = this;
    $.each(eSvgNodePathList, function (index, ele) {
      if (ele.nodeName == 'g')//组
      {
        var aPath = new MiaoPathClass();
        aPath.IsG = true;
        aPath.PathList = new Array();

        var myPathList = $(ele).children();
        thisobj.formSvgNodeList(myPathList, aPath.PathList);
        ePathList.push(aPath);
      }
      else if (ele.nodeName == 'rect')//矩形
      {
        ePathList.push(thisobj.RectConvert(ele));
      }
      else if (ele.nodeName == 'circle')//圆
      {
        ePathList.push(thisobj.CircleConvert(ele));
      }
      else if (ele.nodeName == 'ellipse')//椭圆
      {
        ePathList.push(thisobj.EllipseConvert(ele));
      }
      else if (ele.nodeName == 'line')//线
      {
        ePathList.push(thisobj.LineConvert(ele));
      }
      else if (ele.nodeName == 'polyline')//折线
      {
        ePathList.push(thisobj.PolylineConvert(ele));
      }
      else if (ele.nodeName == 'polygon')//多边形
      {
        ePathList.push(thisobj.PolygonConvert(ele));
      }
      else if (ele.nodeName == 'path')//路径
      {
        ePathList.push(thisobj.PathConvert(ele));
      }
    });
  },

  //格式化多边形
  PolygonConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = ''
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    
    
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;
    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);

    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }

    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    
    var pointsv = $(SvgNodePathItem).attr('points');
    var pArray = pointsv.split(' ');
    for (var i = 0; i < pArray.length; i++) {
      if ((pArray[i] != '') && (pArray[i].isContains(','))) {
        var XAndY = pArray[i].split(',');
        var aX = 0;
        var aY = 0;
        try {
          aX = parseFloat(XAndY[0]);
        }
        catch (e) {
          aX = 0;
        }
        try {
          aY = parseFloat(XAndY[1]);
        }
        catch (e) {
          aY = 0;
        }
        var aNewPoint = new MiaoPointClass(aX, aY);
        if (i == 0) {
          aPath.D.push(new MiaoDitemClass('M', aNewPoint));
        }
        else {
          aPath.D.push(new MiaoDitemClass('L', aNewPoint));
        }
      }
    }
    if (aPath.D.length > 0) {
      aPath.D.push(new MiaoDitemClass('Z'));
    }
    return aPath;
  },
  //格式化多条线段
  PolylineConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';

    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);

    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }


    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }

    var pointsv = $(SvgNodePathItem).attr('points');
    //dv = dv.ToUpper();
    //dv = dv.replace(/ /g, ',');
    var pArray = pointsv.split(' ');
    for (var i = 0; i < pArray.length; i++) {
      if ((pArray[i] != '') && (pArray[i].isContains(','))) {
        var XAndY = pArray[i].split(',');
        var aX = 0;
        var aY = 0;
        try {
          aX = parseFloat(XAndY[0]);
        }
        catch (e) {
          aX = 0;
        }
        try {
          aY = parseFloat(XAndY[1]);
        }
        catch (e) {
          aY = 0;
        }
        var aNewPoint = new MiaoPointClass(aX, aY);
        if (i == 0) {
          aPath.D.push(new MiaoDitemClass('M', aNewPoint));
        }
        else {
          aPath.D.push(new MiaoDitemClass('L', aNewPoint));
        }
      }
    }
    return aPath;
  },
  //格式化椭圆
  EllipseConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var rxv = '';
    var ryv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var circle_x = 0;
    var circle_y = 0;
    var circle_rx = 0;
    var circle_ry = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;
    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    if ($(SvgNodePathItem).attr('cx') != undefined) {
      xv = $(SvgNodePathItem).attr('cx');
      circle_x = parseFloat(xv);
    }
    else {
      circle_x = 0;
    }
    if ($(SvgNodePathItem).attr('cy') != undefined) {
      yv = $(SvgNodePathItem).attr('cy');
      circle_y = parseFloat(yv);
    }
    else {
      circle_y = 0;
    }
    if ($(SvgNodePathItem).attr('rx') != undefined) {
      rxv = $(SvgNodePathItem).attr('rx');
      circle_rx = parseFloat(rxv);
    }
    else {
      circle_rx = 1;
    }
    if ($(SvgNodePathItem).attr('ry') != undefined) {
      ryv = $(SvgNodePathItem).attr('ry');
      circle_ry = parseFloat(ryv);
    }
    else {
      circle_ry = 1;
    }

    this.GetFillColorHtmlString(ePathItem, path_fill);
    this.GetStrokeColorHtmlString(ePathItem, path_stroke);


    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }

    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    //(Math.Sqrt(2)-1)*4/2 =0.55228475
    //0.551784为正负误差调整后的数值，实际数值应该是上面那个
    var CKeyValueX = circle_rx * 0.551784;
    var CKeyValueY = circle_ry * 0.551784;

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(circle_x, circle_y + circle_ry)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + CKeyValueX, circle_y + circle_ry), new MiaoPointClass(circle_x + circle_rx, circle_y + CKeyValueY), new MiaoPointClass(circle_x + circle_rx, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + circle_rx, circle_y - CKeyValueY), new MiaoPointClass(circle_x + CKeyValueX, circle_y - circle_ry), new MiaoPointClass(circle_x, circle_y - circle_ry)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - CKeyValueX, circle_y - circle_ry), new MiaoPointClass(circle_x - circle_rx, circle_y - CKeyValueY), new MiaoPointClass(circle_x - circle_rx, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - circle_rx, circle_y + CKeyValueY), new MiaoPointClass(circle_x - CKeyValueX, circle_y + circle_ry), new MiaoPointClass(circle_x, circle_y + circle_ry)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  GetFillColorHtmlString: function (SvgNodePathItem, eFillColor) {
    var fillv;
    if ($(SvgNodePathItem).attr('fill') != undefined) {
      fillv = $(SvgNodePathItem).attr('fill');
      if (fillv != 'none') {
        fillv = fillv.toLowerCase();
        if (global_mycolorstrreg.test(fillv)) {
          eFillColor.FromHexString(fillv);
        } else {
          if (global_mycolorargbstrreg.test(fillv)) {
            eFillColor.FromARGBHexString(fillv);
          } else {
            if (/^(rgb)/.test(fillv)) {
              eFillColor.FromRgbOrRgbaString(fillv);
            } else {
              eFillColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      }
      else {
        eFillColor.FromArgb(0, 0, 0, 0);
      }
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'fill') {

            //iStyleArrKV[0] = iStyleArrKV[0].substr(iStyleArrKV[0].indexOf(';'));
            var fillv = iStyleArrKV[1];
            if (global_mycolorstrreg.test(fillv)) {
              eFillColor.FromHexString(fillv);
            } else {
              if (global_mycolorargbstrreg.test(fillv)) {
                eFillColor.FromARGBHexString(fillv);
              } else {
                if (/^(rgb)/.test(fillv)) {
                  eFillColor.FromRgbOrRgbaString(fillv);
                } else {
                  eFillColor.FromArgb(0, 0, 0, 0);
                }
              }
            }
          }
        }
      }

    }
    else {
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.fill != undefined) {
          fillv = SvgNodePathItem.style.fill;
          fillv = fillv.toLowerCase();
          if (global_mycolorstrreg.test(fillv)) {
            eFillColor.FromHexString(fillv);
          } else {
            if (global_mycolorargbstrreg.test(fillv)) {
              eFillColor.FromARGBHexString(fillv);
            } else {
              if (/^(rgb)/.test(fillv)) {
                eFillColor.FromRgbOrRgbaString(fillv);
              } else {
                eFillColor.FromArgb(0, 0, 0, 0);
              }
            }
          }
        } else {
          eFillColor.FromArgb(0, 0, 0, 0);
        }
      } else {
        eFillColor.FromArgb(0, 0, 0, 0);
      }
    }
  },
  GetStrokeXdString: function (eSvgNodePathItem, eStrokeLineCap, eStrokeLineJoin, eStrokeDashArray, eStrokeDashOffset) {
    //GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    if ($(eSvgNodePathItem).attr('stroke-linecap') != undefined) {
      eStrokeLineCap = $(eSvgNodePathItem).attr('stroke-linecap');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-linecap') {
            eStrokeLineCap = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeLineCap = 'butt';
      if (eSvgNodePathItem.style.strokeLinecap != undefined) {
        if (eSvgNodePathItem.style.strokeLinecap != '') {
          eStrokeLineCap = eSvgNodePathItem.style.strokeLinecap;
        }
      }
    }

    if ($(eSvgNodePathItem).attr('stroke-linejoin') != undefined) {
      eStrokeLineJoin = $(eSvgNodePathItem).attr('stroke-linejoin');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-linejoin') {
            eStrokeLineJoin = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeLineJoin = 'miter';
      if (eSvgNodePathItem.style.strokeLinecap != undefined) {
        if (eSvgNodePathItem.style.strokeLinejoin != '') {
          eStrokeLineJoin = eSvgNodePathItem.style.strokeLinejoin;
        }
      }
    }


    if ($(eSvgNodePathItem).attr('stroke-dasharray') != undefined) {
      eStrokeDashArray = $(eSvgNodePathItem).attr('stroke-dasharray');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-dasharray') {
            eStrokeDashArray = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeDashArray = 'none';
      if (eSvgNodePathItem.style.strokeDasharray != undefined) {
        if (eSvgNodePathItem.style.strokeDasharray != '') {
          eStrokeDashArray = eSvgNodePathItem.style.strokeDasharray;
        }
      }
    }

    if ($(eSvgNodePathItem).attr('stroke-dashoffset') != undefined) {
      eStrokeDashOffset = $(eSvgNodePathItem).attr('stroke-dashoffset');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-dashoffset') {
            eStrokeDashOffset = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeDashOffset = 'none';
      if (eSvgNodePathItem.style.strokeDashoffset != undefined) {
        if (eSvgNodePathItem.style.strokeDashoffset != '') {
          eStrokeDashOffset = eSvgNodePathItem.style.strokeDashoffset;
        }
      }
    }

  },
  GetStrokeColorHtmlString: function (SvgNodePathItem, eStrokeColor) {
    var strokev;
    if ($(SvgNodePathItem).attr('stroke') != undefined) {
      strokev = $(SvgNodePathItem).attr('stroke');
      if (strokev != 'none') {
        strokev = strokev.toLowerCase();
        if (global_mycolorstrreg.test(strokev)) {
          eStrokeColor.FromHexString(strokev);
        } else {
          if (global_mycolorargbstrreg.test(strokev)) {
            eStrokeColor.FromARGBHexString(strokev);
          } else {
            if (/^(rgb)/.test(strokev)) {
              eStrokeColor.FromRgbOrRgbaString(strokev);
            } else {
              eStrokeColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      }
      else {
        eStrokeColor.FromArgb(0, 0, 0, 0);
      }
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke') {
            //iStyleArrKV[0] = iStyleArrKV[0].substr(iStyleArrKV[0].indexOf(';'));
            var fillv = iStyleArrKV[1];
            if (global_mycolorstrreg.test(fillv)) {
              eStrokeColor.FromHexString(fillv);
            } else {
              if (global_mycolorargbstrreg.test(fillv)) {
                eStrokeColor.FromARGBHexString(fillv);
              } else {
                if (/^(rgb)/.test(fillv)) {
                  eStrokeColor.FromRgbOrRgbaString(fillv);
                } else {
                  eStrokeColor.FromArgb(0, 0, 0, 0);
                }
              }
            }
          }
        }
      }
    }
    else {
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.stroke != undefined) {
          strokev = SvgNodePathItem.style.stroke;
          strokev = strokev.toLowerCase();
          if (global_mycolorstrreg.test(strokev)) {
            eStrokeColor.FromHexString(strokev);
          } else {
            if (global_mycolorargbstrreg.test(strokev)) {
              eStrokeColor.FromARGBHexString(strokev);
            } else {
              if (/^(rgb)/.test(strokev)) {
                eStrokeColor.FromRgbOrRgbaString(strokev);
              } else {
                eStrokeColor.FromArgb(0, 0, 0, 0);
              }
            }
          }
        } else {
          eStrokeColor.FromArgb(0, 0, 0, 0);
        }
      } else {
        eStrokeColor.FromArgb(0, 0, 0, 0);
      }
    }
  },
  //格式化路径
  PathConvert: function (SvgNodePathItem) {

    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';

    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);

    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }

    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeWidth != undefined) {
          if (SvgNodePathItem.style.strokeWidth != '') {
            path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
          }
        }
      }

    }
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    //alert(aPath.BorderWidth);
    var dv = $(SvgNodePathItem).attr('d');
    //dv = dv.ToUpper();
    //dv = dv.replace(/ /g, ',');

    var CommandStrOne = '';

    if (dv.length < 1) {

    }
    else {
      if (dv[0] == 'M') {
        CommandStrOne = 'M';
        dv = dv.substring(1);
      }


      var sArray = dv.split(/M|Z|L|H|V|S|C|Q|T|A|m|z|l|h|v|s|c|q|t|a/);
      dv = CommandStrOne + dv;
      var chars = dv.split('');
      var commandchars = '';
      var aTestCommandStr = 'MZLHVSCQTAmzlhvscqta';
      for (var j = 0; j < chars.length; j++) {
        if (aTestCommandStr.isContains(chars[j])) {
          commandchars += chars[j];
        }
      }
      var chars2 = commandchars.split('');
      var aLastPointF = new MiaoPointClass(0, 0);
      var aLastCSPointF = new MiaoPointClass(0, 0);
      var aLastQTPointF = new MiaoPointClass(0, 0);
      for (var i = 0; i < sArray.length; i++) {
        //sArray[i] pointStr
        //chars2[i] command
        sArray[i] = MiaoCommonFun.BiaoZhunHuaPointStr(sArray[i]);

        var aPointXandY = sArray[i].split(',');

        var aPoint1, aPoint2, aPoint3, aBezierCurvaturesPoint1, aBezierCurvaturesPoint2;
        var aBezierCurvaturesControlPointArr = new Array();

        switch (chars2[i]) {
          case 'M':
            aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'Z':
            aPath.D.push(new MiaoDitemClass('Z'));
            break;
          case 'L':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'H':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'V':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]))));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'S':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + (parseFloat(aPointXandY[2])) - parseFloat(aPointXandY[0]), parseFloat(aPointXandY[3]) + (parseFloat(aPointXandY[3])) - parseFloat(aPointXandY[1]));
            aLastQTPointF = aLastPointF;
            break;
          case 'C':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3])), new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]));

            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + (parseFloat(aPointXandY[4])) - parseFloat(aPointXandY[2]), parseFloat(aPointXandY[5]) + (parseFloat(aPointXandY[5])) - parseFloat(aPointXandY[3]));
            aLastQTPointF = aLastPointF;
            break;
          case 'Q':
            //把Q转成C的
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));

            //添加默认Q的标签
            aPath.D.push(new MiaoDitemClass('Q', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'T':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));

            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'A':
            break;
          case 'm':
            aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'z':
            aPath.D.push(new MiaoDitemClass('Z'));
            break;
          case 'l':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'h':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'v':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 's':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + parseFloat(aPointXandY[2]) - parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[3]) + parseFloat(aPointXandY[3]) - parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'c':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + parseFloat(aPointXandY[4]) - parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[5]) + parseFloat(aPointXandY[5]) - parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'q':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 't':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'a':
            break;
          default:
            break;
        }
      }
    }
    return aPath;
  },
  //格式化线段
  LineConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var x1v = '';
    var y1v = '';
    var x2v = '';
    var y2v = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var line_x1 = 0;
    var line_y1 = 0;
    var line_x2 = 0;
    var line_y2 = 0;
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;
    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    if ($(SvgNodePathItem).attr('x1') != undefined) {
      x1v = $(SvgNodePathItem).attr('x1');
      line_x1 = parseFloat(x1v);
    }
    else {
      line_x1 = 0;
    }
    if ($(SvgNodePathItem).attr('y1') != undefined) {
      y1v = $(SvgNodePathItem).attr('y1');
      line_y1 = parseFloat(y1v);
    }
    else {
      line_y1 = 0;
    }


    if ($(SvgNodePathItem).attr('x2') != undefined) {
      x2v = $(SvgNodePathItem).attr('x2');
      line_x2 = parseFloat(x2v);
    }
    else {
      line_x2 = 0;
    }
    if ($(SvgNodePathItem).attr('y2') != undefined) {
      y2v = $(SvgNodePathItem).attr('y2');
      line_y2 = parseFloat(y2v);
    }
    else {
      line_y2 = 0;
    }

    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);


    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
          if (SvgNodePathItem.style.strokeMiterlimit != '') {
            path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
          }
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeWidth != undefined) {
          if (SvgNodePathItem.style.strokeWidth != '') {
            path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
          }
        }
      }

    }

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(line_x1, line_y1)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(line_x2, line_y2)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor.FromArgb(0, 0, 0, 0);
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  //格式化圆形
  CircleConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var rv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var circle_x = 0;
    var circle_y = 0;
    var circle_r = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;
    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    if ($(SvgNodePathItem).attr('cx') != undefined) {
      xv = $(SvgNodePathItem).attr('cx');
      circle_x = parseFloat(xv);
    }
    else {
      circle_x = 0;
    }
    if ($(SvgNodePathItem).attr('cy') != undefined) {
      yv = $(SvgNodePathItem).attr('cy');
      circle_y = parseFloat(yv);
    }
    else {
      circle_y = 0;
    }
    if ($(SvgNodePathItem).attr('r') != undefined) {
      rv = $(SvgNodePathItem).attr('r');
      circle_r = parseFloat(rv);
    }
    else {
      circle_r = 1;
    }

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);

    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
          if (SvgNodePathItem.style.strokeMiterlimit != '') {
            path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
          }
        }
      }
    }

    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeWidth != undefined) {
          if (SvgNodePathItem.style.strokeWidth != '') {
            path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
          }
        }
      }

    }

    //(Math.Sqrt(2)-1)*4/2 =0.55228475
    //0.551784为正负误差调整后的数值，实际数值应该是上面那个
    var CKeyValue = circle_r * 0.551784;
    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(circle_x, circle_y + circle_r)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + CKeyValue, circle_y + circle_r), new MiaoPointClass(circle_x + circle_r, circle_y + CKeyValue), new MiaoPointClass(circle_x + circle_r, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + circle_r, circle_y - CKeyValue), new MiaoPointClass(circle_x + CKeyValue, circle_y - circle_r), new MiaoPointClass(circle_x, circle_y - circle_r)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - CKeyValue, circle_y - circle_r), new MiaoPointClass(circle_x - circle_r, circle_y - CKeyValue), new MiaoPointClass(circle_x - circle_r, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - circle_r, circle_y + CKeyValue), new MiaoPointClass(circle_x - CKeyValue, circle_y + circle_r), new MiaoPointClass(circle_x, circle_y + circle_r)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  //格式化方块
  RectConvert: function (ePathItem) {

    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var wv = '';
    var hv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var rect_x = 0;
    var rect_y = 0;
    var rect_w = 0;
    var rect_h = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;
    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    if ($(ePathItem).attr('x') != undefined) {
      xv = $(ePathItem).attr('x');
      rect_x = parseFloat(xv);
    }
    else {
      rect_x = 0;
    }
    if ($(ePathItem).attr('y') != undefined) {
      yv = $(ePathItem).attr('y');
      rect_y = parseFloat(yv);
    }
    else {
      rect_y = 0;
    }
    if ($(ePathItem).attr('width') != undefined) {
      wv = $(ePathItem).attr('width');
      rect_w = parseFloat(wv);
    }
    else {
      rect_w = 1;
    }
    if ($(ePathItem).attr('height') != undefined) {
      hv = $(ePathItem).attr('height');
      rect_h = parseFloat(hv);
    }
    else {
      rect_h = 1;
    }

    this.GetFillColorHtmlString(ePathItem, path_fill);
    this.GetStrokeColorHtmlString(ePathItem, path_stroke);

    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
          if (SvgNodePathItem.style.strokeMiterlimit != '') {
            path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
          }
        }
      }
    }
    if ($(ePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(ePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(rect_x, rect_y)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x + rect_w, rect_y)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x + rect_w, rect_y + rect_h)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x, rect_y + rect_h)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x, rect_y)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  fromDStr: function (eDStr) {
    this.D.length = 0;
    var aD = new Array();
    var dv = eDStr;
    var CommandStrOne = '';
    if (dv.length < 1) {

    }
    else {
      if (dv[0] == 'M') {
        CommandStrOne = 'M';
        dv = dv.substring(1);
      }
      var sArray = dv.split(/M|Z|L|H|V|S|C|Q|T|A|m|z|l|h|v|s|c|q|t|a/);
      dv = CommandStrOne + dv;
      var chars = dv.split('');
      var commandchars = '';
      var aTestCommandStr = 'MZLHVSCQTAmzlhvscqta';
      for (var j = 0; j < chars.length; j++) {
        if (aTestCommandStr.isContains(chars[j])) {
          commandchars += chars[j];
        }
      }
      var chars2 = commandchars.split('');
      var aLastPointF = new MiaoPointClass(0, 0);
      var aLastCSPointF = new MiaoPointClass(0, 0);
      var aLastQTPointF = new MiaoPointClass(0, 0);

      for (var i = 0; i < sArray.length; i++) {
        sArray[i] = MiaoCommonFun.BiaoZhunHuaPointStr(sArray[i]);

        var aPointXandY = sArray[i].split(',');

        var aPoint1, aPoint2, aPoint3, aBezierCurvaturesPoint1, aBezierCurvaturesPoint2;
        var aBezierCurvaturesControlPointArr = new Array();

        switch (chars2[i]) {
          case 'M':
            this.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'Z':
            this.D.push(new MiaoDitemClass('Z'));
            break;
          case 'L':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'H':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'V':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]))));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'S':
            this.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + (parseFloat(aPointXandY[2])) - parseFloat(aPointXandY[0]), parseFloat(aPointXandY[3]) + (parseFloat(aPointXandY[3])) - parseFloat(aPointXandY[1]));
            aLastQTPointF = aLastPointF;
            break;
          case 'C':
            this.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3])), new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]));

            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + (parseFloat(aPointXandY[4])) - parseFloat(aPointXandY[2]), parseFloat(aPointXandY[5]) + (parseFloat(aPointXandY[5])) - parseFloat(aPointXandY[3]));
            aLastQTPointF = aLastPointF;
            break;
          case 'Q':
            //把Q转成C的
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));

            //添加默认Q的标签
            this.D.push(new MiaoDitemClass('Q', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;

          case 'T':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));

            this.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'A':
            break;
          case 'm':
            this.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'z':
            this.D.push(new MiaoDitemClass('Z'));
            break;
          case 'l':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'h':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'v':
            this.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 's':
            this.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + parseFloat(aPointXandY[2]) - parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[3]) + parseFloat(aPointXandY[3]) - parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'c':
            this.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + parseFloat(aPointXandY[4]) - parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[5]) + parseFloat(aPointXandY[5]) - parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'q':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            this.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 't':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            this.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'a':
            //this.D.push(new MiaoDitemClass('A', new MiaoPointClass(0, 0), new MiaoPointClass(0, 0), new MiaoPointClass(0, 0), new MiaoPointClass(0, 0)));
            break;
          default:
            break;
        }
      }
    }
    return true;
  },
  refreshDPreviousPoint: function () {
    var aLastPoint = new MiaoPointClass(0, 0);
    var i;
    if (this.HasLastPoint() == true) {
      if (this.IsG != true) {
        for (i = 0; i < this.D.length; i++) {
          if (this.D[i].Commend == 'M') {
            this.D[i].PreviousPoints = aLastPoint;
            aLastPoint = this.D[i].Points[0];
          }
          else if (this.D[i].Commend == 'L') {
            this.D[i].PreviousPoints = aLastPoint;
            aLastPoint = this.D[i].Points[0];
          }
          else if (this.D[i].Commend == 'C') {
            this.D[i].PreviousPoints = aLastPoint;
            aLastPoint = this.D[i].Points[2];
          }
          else if (this.D[i].Commend == 'Q') {
            this.D[i].PreviousPoints = aLastPoint;
            aLastPoint = this.D[i].Points[1];
          }
        }
      }
      else {
        for (i = 0; i < this.PathList.length; i++) {
          if (this.PathList[i].HasLastPoint() == true) {
            this.PathList[i].refreshDPreviousPoint();
          }
        }
      }
    }
  },
  //	获取此 GraphicsPath 的 PathPoints 数组中的最后的点。
  GetLastPoint: function () {
    var aLastPoint = new MiaoPointClass(0, 0);
    var i;
    if (this.HasLastPoint() == true) {
      if (this.IsG != true) {

        for (i = 0; i < this.D.length; i++) {
          if (this.D[i].Commend == 'M') {
            aLastPoint = this.D[i].Points[0];
          }
          else if (this.D[i].Commend == 'L') {
            aLastPoint = this.D[i].Points[0];
          }
          else if (this.D[i].Commend == 'C') {
            aLastPoint = this.D[i].Points[2];
          }
          else if (this.D[i].Commend == 'Q') {
            aLastPoint = this.D[i].Points[1];
          }
        }
      }
      else {
        for (i = 0; i < this.PathList.length; i++) {
          if (this.PathList[i].HasLastPoint() == true) {
            aLastPoint = this.PathList[i].GetLastPoint();
          }
        }
      }

    }
    return aLastPoint;
  },
  HasLastPoint: function () {
    var i;
    if (this.IsG != true) {
      for (i = 0; i < this.D.length; i++) {
        if (this.D[i].Commend == 'M') {
          return true;
        }
        else if (this.D[i].Commend == 'L') {
          return true;
        }
        else if (this.D[i].Commend == 'C') {
          return true;
        }
        else if (this.D[i].Commend == 'Q') {
          return true;
        }
      }
    }
    else {
      for (i = 0; i < this.PathList.length; i++) {
        if (this.PathList[i].HasLastPoint()) {
          return true;
        }
      }
    }
    return false;
  },
  //清空 PathPoints 和 PathTypes 数组并将 FillMode 设置为 Alternate。
  Reset: function () {
    this.IsG = false;
    this.D.length = 0;
    this.FillColor.FromRgb(0, 0, 0, 0);
    this.StrokeColor.FromRgb(0, 0, 0, 0);
    this.BorderWidth = 0;
    this.PathList.length = 0;
    this.MarkList = {};
    this.StrokeMiterLimit = 4;
    this.IsVisible = true;//决定这个path是否被显示出来。
  },
  CloseFigure: function () {
    if (this.IsG != true) {
      if (this.D.length > 0) {
        if (this.D[this.D.length - 1].Commend != 'Z') {
          this.D.push(new MiaoDitemClass('Z'));
        }
      }
    }
    else {
      if (this.PathList.length > 0) {
        for (var i = 0; i < this.PathList.length; i++) {
          this.PathList[i].CloseFigure();
        }
      }
    }
  },
  ConvertCurveC2Q:function(){
    var eSCount = 16;
    if (arguments[0] === undefined) {
      eSCount = 16;
    } else {
      if (typeof arguments[0] === 'number') {
        eSCount = Math.floor(arguments[0]);
      }
    }
    var i = 0;
    if (eSCount < 4) eSCount = 4;
    if (this.IsG != true) {
      var aNewD = new Array();
      var aLastPoint = new MiaoPointClass(0, 0);

      for (i = 0; i < this.D.length; i++) {
        if (this.D[i].Commend == 'M') {
          aNewD.push(this.D[i]);
          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'L') {
          aNewD.push(this.D[i]);
          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'C') {
          //this.D[i].Points.Clear();
          var aIPointListJson = new Array();
          if (eSCount == 16) {
            if (MiaoCommonFun.IsExistJiaoDianL2L(aLastPoint.X, aLastPoint.Y, this.D[i].Points[0].X, this.D[i].Points[0].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y, this.D[i].Points[2].X, this.D[i].Points[2].Y)) {
              eSCount = 17;
            } else {
              var iJiajiaoJiaodu1 = 0;
              var iJiajiaoJiaodu2 = 0;
              var iJiajiaoJiaodu0 = 0;
              var iJiajiaoJiaodu3 = 0;
              var iJiajiaoJiaodu4 = 0;
              iJiajiaoJiaodu1 = MiaoCommonFun.GetXianduanJiaodu(aLastPoint.X, aLastPoint.Y, this.D[i].Points[0].X, this.D[i].Points[0].Y);
              iJiajiaoJiaodu1 = iJiajiaoJiaodu1 % 360;
              if (iJiajiaoJiaodu1 < 0) iJiajiaoJiaodu1 = 360 + iJiajiaoJiaodu1;
              iJiajiaoJiaodu2 = MiaoCommonFun.GetXianduanJiaodu(this.D[i].Points[2].X, this.D[i].Points[2].Y, this.D[i].Points[1].X, this.D[i].Points[1].Y);
              iJiajiaoJiaodu2 = iJiajiaoJiaodu2 % 360;
              if (iJiajiaoJiaodu2 < 0) iJiajiaoJiaodu2 = 360 + iJiajiaoJiaodu2;
              iJiajiaoJiaodu0 = MiaoCommonFun.GetXianduanJiaodu(aLastPoint.X, aLastPoint.Y, this.D[i].Points[2].X, this.D[i].Points[2].Y);
              iJiajiaoJiaodu0 = iJiajiaoJiaodu0 % 360;
              if (iJiajiaoJiaodu0 < 0) iJiajiaoJiaodu0 = 360 + iJiajiaoJiaodu0;
              iJiajiaoJiaodu3 = iJiajiaoJiaodu1 - iJiajiaoJiaodu0;
              iJiajiaoJiaodu3 = iJiajiaoJiaodu3 % 360;
              if (iJiajiaoJiaodu3 < 0) iJiajiaoJiaodu3 = 360 + iJiajiaoJiaodu3;
              iJiajiaoJiaodu4 = iJiajiaoJiaodu2 - iJiajiaoJiaodu0;
              iJiajiaoJiaodu4 = iJiajiaoJiaodu4 % 360;
              if (iJiajiaoJiaodu4 < 0) iJiajiaoJiaodu4 = 360 + iJiajiaoJiaodu4;
              iJiajiaoJiaodu4 = 180 - iJiajiaoJiaodu4;
              iJiajiaoJiaodu4 = iJiajiaoJiaodu4 % 360;
              if (iJiajiaoJiaodu4 < 0) iJiajiaoJiaodu4 = 360 + iJiajiaoJiaodu4;
              iJiajiaoJiaodu4 = iJiajiaoJiaodu3 + iJiajiaoJiaodu4;
              iJiajiaoJiaodu4 = iJiajiaoJiaodu4 % 360;
              if (iJiajiaoJiaodu4 < 0) iJiajiaoJiaodu4 = 360 + iJiajiaoJiaodu4;
              eSCount = Math.floor(iJiajiaoJiaodu4 / 22.5);
              if (eSCount < 4) eSCount = 4;
            }
          }
          aIPointListJson = this.GetFenGePointForC2Q(eSCount, this.D[i].Points, aLastPoint);
          var iLastPoint = aLastPoint;

          for (var j = 0; j < eSCount; j++) {
            //aIPointList[j]每个C的结束点,同时也是Q的结束点
            
            try {
              aNewD.push(new MiaoDitemClass('Q', aIPointListJson.KongZhi[j],aIPointListJson.FenGe[j]));
            } catch (ex) {
              alert(ex);
            }
          }
          aLastPoint = this.D[i].Points[2];
        }
        else if (this.D[i].Commend == 'Q') {
          aNewD.push(this.D[i]);
          aLastPoint = this.D[i].Points[1];
        }
        else if (this.D[i].Commend == 'Z') {
          aNewD.push(this.D[i]);
        }
      }
      this.D = aNewD;
    }
    else {
      for (i = 0; i < this.PathList.length; i++) {
        this.PathList[i].ConvertCurveC2Q(eSCount);
      }
    }
  },
  Flatten: function () {
    var eSCount = 3;
    if (arguments[0] === undefined) {
      eSCount = 3;
    } else {
      if (typeof arguments[0] === 'number') {
        eSCount = Math.floor(arguments[0]);
      }
    }
    var i = 0;
    if (eSCount < 1) eSCount = 1;
    if (this.IsG != true) {
      var aNewD = new Array();
      var aLastPoint = new MiaoPointClass(0, 0);
      
      for (i = 0; i < this.D.length; i++) {
        if (this.D[i].Commend == 'M') {
          aNewD.push(this.D[i]);
          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'L') {
          aNewD.push(this.D[i]);
          aLastPoint = this.D[i].Points[0];
        }
        else if (this.D[i].Commend == 'C') {
          //this.D[i].Points.Clear();
          var aIPointList = new Array();
          aIPointList = this.GetFenGePoint(eSCount, this.D[i].Points, aLastPoint);
          for (var j = 0; j < eSCount; j++) {
            aNewD.push(new MiaoDitemClass('L', aIPointList[j]));
          }
          aNewD.push(new MiaoDitemClass('L', this.D[i].Points[2]));
          aLastPoint = this.D[i].Points[2];
        }
        else if (this.D[i].Commend == 'Q') {
          //this.D[i].Points.Clear();
          var aIPointList = new Array();
          aIPointList = this.GetFenGeQPoint(eSCount, this.D[i].Points, aLastPoint);
          for (var j = 0; j < eSCount; j++) {
            aNewD.push(new MiaoDitemClass('L', aIPointList[j]));
          }
          aNewD.push(new MiaoDitemClass('L', this.D[i].Points[1]));
          aLastPoint = this.D[i].Points[1];
        }
        else if (this.D[i].Commend == 'Z') {
          aNewD.push(this.D[i]);
        }
      } 
      this.D = aNewD;
    }
    else {

      for (i = 0; i < this.PathList.length; i++) {
        this.PathList[i].Flatten(eSCount);
      }
    }
  },
  GetFenGePointForC2Q: function (eSCount, eDPoints, eLastPoint) {
    var aResultPoints = new Array(eSCount);
    var aResultTs = new Array(eSCount);
    var aResultKongzhiPoints = new Array(eSCount);
    var iNewT = 0.0;
    var iNewT1 = 0.0, iNewT2 = 0.0;
    var iZhongjianDian = 0;
    var iLastPoint = eLastPoint;
    var ikongzhijson;
    for (var i = 0; i < eSCount; i++) {
      aResultPoints[i] = new MiaoPointClass(MiaoCommonFun.GetCBezierCurvaturesPointByT(eLastPoint.X, eLastPoint.Y, eDPoints[0].X, eDPoints[0].Y, eDPoints[1].X, eDPoints[1].Y, eDPoints[2].X, eDPoints[2].Y, (1.0 / eSCount) * (i + 1)));;
      aResultTs[i] = Math.formatFloat((1.0 / eSCount) * (i + 1), MiaoCommonVar.FixedNumber);
      iNewT = Math.formatFloat(((-(1.0 / eSCount) * 0.5)) + ((1.0 / eSCount) * (i + 1)), MiaoCommonVar.FixedNumber);
      iZhongjianDian = new MiaoPointClass(MiaoCommonFun.GetCBezierCurvaturesPointByT(eLastPoint.X, eLastPoint.Y, eDPoints[0].X, eDPoints[0].Y, eDPoints[1].X, eDPoints[1].Y, eDPoints[2].X, eDPoints[2].Y, iNewT));

      ikongzhijson = MiaoCommonFun.GetBezierQCurvaturesControlPoint(iLastPoint.X, iLastPoint.Y, aResultPoints[i].X, aResultPoints[i].Y, iZhongjianDian.X, iZhongjianDian.Y, 0.5);


      aResultKongzhiPoints[i] = new MiaoPointClass(ikongzhijson.X, ikongzhijson.Y);

      iLastPoint = aResultPoints[i];
    }
    return { 'FenGe': aResultPoints, 'T': aResultTs, 'KongZhi': aResultKongzhiPoints };
  },
  GetFenGePoint: function (eSCount, eDPoints, eLastPoint) {
    var aResultPoints = new Array(eSCount);
    for (var i = 0; i < eSCount; i++) {
      aResultPoints[i]= new MiaoPointClass(MiaoCommonFun.GetCBezierCurvaturesPointByT(eLastPoint.X, eLastPoint.Y, eDPoints[0].X, eDPoints[0].Y, eDPoints[1].X, eDPoints[1].Y, eDPoints[2].X, eDPoints[2].Y, (1.0 / eSCount) * (i + 1)));
    }
    return aResultPoints;
  },
  GetFenGeQPoint: function (eSCount, eDPoints, eLastPoint) {
    var aResultPoints = new Array(eSCount);
    for (var i = 0; i < eSCount; i++) {
      aResultPoints[i] = new MiaoPointClass(MiaoCommonFun.GetQBezierCurvaturesPointByT(eLastPoint.X, eLastPoint.Y, eDPoints[0].X, eDPoints[0].Y, eDPoints[1].X, eDPoints[1].Y, (1.0 / eSCount) * (i + 1)));
    }
    return aResultPoints;
  },
  Reverse: function () {
    if (this.IsG != true) {
      var aNewD = new Array();
      var aQtPointList = new Array();
      var aLastPoint = new MiaoPointClass(0, 0);
      var i;
      var isZ = false;

      for (i = 0; i < this.D.length; i++) {
        if (this.D[i].Commend == 'M') {
          aQtPointList.push(this.D[i].Points[0]);
        }
        else if (this.D[i].Commend == 'L') {
          aQtPointList.push(this.D[i].Points[0]);
        }
        else if (this.D[i].Commend == 'C') {
          aQtPointList.push(this.D[i].Points[2]);
        }
        else if (this.D[i].Commend == 'Q') {
          aQtPointList.push(this.D[i].Points[1]);
        }
        else if (this.D[i].Commend == 'Z') {
          aQtPointList.push(new MiaoPointClass(0, 0));
        }
      }

      if (this.HasLastPoint()) {
        aLastPoint = this.GetLastPoint();
        aNewD.push(new MiaoDitemClass('M', aLastPoint));
      }
      this.D.reverse();
      aQtPointList.reverse();
      var aaLPoint = new MiaoPointClass(0, 0);
      for (i = 0; i < this.D.length; i++) {
        if (this.D[i].Commend == 'M') {
        }
        else if (this.D[i].Commend == 'L') {
        }
        else if (this.D[i].Commend == 'C') {
        }
        else if (this.D[i].Commend == 'Q') {
        }
        else if (this.D[i].Commend == 'Z') {
          if ((i + 1) < this.D.length) {
            aQtPointList[i] = aQtPointList[i + 1];
          }
        }
      }
      //aNewD

      for (i = 0; i < this.D.length; i++) {
        if ((i == 0) && (this.D[i].Commend == 'Z')) {
          isZ = true;
        }
        else {
          if (i + 1 < aQtPointList.length) {
            if (this.D[i].Commend == 'M') {
              aNewD.push(new MiaoDitemClass('M', aQtPointList[i + 1]));
            }
            else if (this.D[i].Commend == 'L') {
              aNewD.push(new MiaoDitemClass('L', aQtPointList[i + 1]));
            }
            else if (this.D[i].Commend == 'C') {

              aNewD.push(new MiaoDitemClass('C', this.D[i].Points[1], this.D[i].Points[0], aQtPointList[i + 1]));

            }
            else if (this.D[i].Commend == 'Q') {
              aNewD.push(new MiaoDitemClass('Q', this.D[i].Points[0], aQtPointList[i + 1]));

            }
            else if (this.D[i].Commend == 'Z') {
              aNewD.push(new MiaoDitemClass('Z'));
            }
          }
          else {
            if (isZ == true) {
              aNewD.push(new MiaoDitemClass('Z'));
            }
          }

        }
      }
      this.D = aNewD;

    }
    else {
      this.PathList.reverse();
      for (var j = 0; j < this.PathList.length; j++) {
        this.PathList[j].Reverse();
      }
    }

  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments[0] instanceof MiaoPathClass) {
        this.FillColor = arguments[0].FillColor;
        this.StrokeColor = arguments[0].StrokeColor;
        this.BorderWidth = arguments[0].BorderWidth;
        this.D = arguments[0].D;
        this.IsG = arguments[0].IsG;
        this.PathList = arguments[0].PathList;
        this.MarkList = arguments[0].MarkList;
        this.IsVisible = arguments[0].IsVisible;
      }
      if (arguments[0] instanceof MiaoColorClass) {
        this.FillColor = arguments[0];
      }
      if (arguments.length > 1) {
        if (arguments[1] instanceof MiaoColorClass) {
          this.StrokeColor = arguments[1];
        }
      }
      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.BorderWidth = arguments[2];
        }
      }
      if (arguments.length > 4) {
        if (isJson(arguments[4])) {
          this.MarkList = arguments[4];
        }
      }

      if (arguments.length > 5) {
        if (arguments[5] instanceof Boolean) {
          this.IsVisible = arguments[5];
        }
      }
      if (arguments.length > 3) {
        if (arguments[3] instanceof Array) {
          if (arguments[3][0] instanceof MiaoDitemClass) {
            this.D = arguments[3];
          }
        }
      }

      if (arguments.length > 2) {
        if (arguments[2] instanceof Array) {
          if (arguments[2][0] instanceof MiaoDitemClass) {
            this.D = arguments[2];
          }
        }
      }

      if (arguments.length > 1) {
        if (arguments[1] instanceof Array) {
          if (arguments[1][0] instanceof MiaoDitemClass) {
            this.D = arguments[1];
          }
        }
      }
      if (arguments[0] instanceof Array) {
        if (arguments[0][0] instanceof MiaoDitemClass) {
          this.D = arguments[0];
        }
      }

      //isG
      if (arguments[0] == true) {
        this.IsG = true;

        if (arguments.length > 1) {
          if (arguments[1] instanceof Array) {
            if (arguments[1][0] instanceof MiaoPathClass) {
              this.PathList = arguments[1];
            }
          }
        }
        if (arguments.length > 2) {
          if (isJson(arguments[2])) {
            this.MarkList = arguments[2];
          }
        }

        if (arguments.length > 3) {
          if (arguments[3] instanceof Boolean) {
            this.IsVisible = arguments[3];
          }
        }
      }
    }
  },
  IsMiaoPathClass: function (e) { return e instanceof MiaoPathClass; }
});

//var p = new MiaoGraphical('Jack');
var MiaoGraphicalClass = Class.extend({
  init: function (etitle) {
    // 属性
    this.GId = this.getNewGuid();
    this.Width = 1800;
    this.Height = 900;
    this.PathList = [];
    this.Title = '';
    this.Tag = '';
    this.Describe = '';
    this.OrgPoint = new MiaoPointClass(0, 0);
    this.MarkList = {};
    this.BgColor = MiaoCommonColor.BgColor;
    this.TransparentColor = MiaoCommonColor.TransparentColor;
    this.Ascent = 0;
    this.Descent = 0;
    this.UnitSperEm = 900;
    this.X = 0;
    this.Y = 0;
    this.ViewBox = '0 0 1800 900';

    //public Graphical(var eGId, var eWidth, var eHeight, List<MiaoPath> ePathList, var eTitle, var eDescribe, var eTag, PointF eOrgPoint, Dictionary<string, string> eMarkList)
    if (!(arguments[0] === undefined)) {
      if (arguments[0] instanceof MiaoGraphicalClass) {
        this.GId = arguments[0].GId;
        this.Width = arguments[0].Width;
        this.Height = arguments[0].Height;
        this.PathList = arguments[0].PathList;
        this.Title = arguments[0].Title;
        this.Tag = arguments[0].Tag;
        this.Describe = arguments[0].Describe;
        this.OrgPoint = arguments[0].OrgPoint;
        this.MarkList = arguments[0].MarkList;
        this.BgColor = arguments[0].BgColor;
        this.TransparentColor = arguments[0].TransparentColor;
        this.Ascent = arguments[0].Ascent;
        this.Descent = arguments[0].Descent;
        this.UnitSperEm = arguments[0].UnitSperEm;
        this.ViewBox = arguments[0].ViewBox;
        this.X = arguments[0].X;
        this.Y = arguments[0].Y;
      }
      if (arguments[0] instanceof String) {
        this.GId = arguments[0];
      }

      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.Width = arguments[1];
        }
      }

      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.Height = arguments[2];
        }
      }

      if (arguments.length > 3) {
        if ((arguments[3] instanceof Array) && (arguments[3][0] instanceof MiaoPathClass)) {
          this.PathList = arguments[3];
        }
      }

      if (arguments.length > 4) {
        if (arguments[4] instanceof String) {
          this.Title = arguments[4];
        }
      }

      if (arguments.length > 5) {
        if (arguments[5] instanceof String) {
          this.Tag = arguments[5];
        }
      }

      if (arguments.length > 6) {
        if (arguments[6] instanceof String) {
          this.Describe = arguments[6];
        }
      }

      if (arguments.length > 7) {
        if (arguments[7] instanceof MiaoPointClass) {
          this.OrgPoint = arguments[7];
        }
      }

      if (arguments.length > 8) {
        if (isJson(arguments[8])) {
          this.MarkList = arguments[8];
        }
      }

      if (arguments.length > 9) {
        if (arguments[9] instanceof MiaoColorClass) {
          this.BgColor = arguments[9];
        }
      }
      if (arguments.length > 10) {
        if (arguments[10] instanceof MiaoColorClass) {
          this.TransparentColor = arguments[10];
        }
      }
      if (isJson(arguments[0])) {
        if (arguments[0].GId instanceof String) {
          this.GId = arguments[0].GId;
        }
        if (typeof arguments[0].Width === 'number') {
          this.Width = arguments[0].Width;
        }
        if (typeof arguments[0].Height === 'number') {
          this.Height = arguments[0].Height;
        }
        if ((arguments[0].PathList instanceof Array) && (arguments[0].PathList[0] instanceof MiaoPathClass)) {
          this.PathList = arguments[0].PathList;
        }
        if (arguments[0].Title instanceof String) {
          this.Title = arguments[0].Title;
        }
        if (arguments[0].Tag instanceof String) {
          this.Tag = arguments[0].Tag;
        }
        if (arguments[0].Describe instanceof String) {
          this.Describe = arguments[0].Describe;
        }
        if (arguments[0].OrgPoint instanceof MiaoPointClass) {
          this.OrgPoint = arguments[0].OrgPoint;
        }
        if (isJson(arguments[0].MarkList)) {
          this.MarkList = arguments[0].MarkList;
        }
        if (arguments[0].BgColor instanceof MiaoColorClass) {
          this.BgColor = arguments[0].BgColor;
        }
        if (arguments[0].TransparentColor instanceof MiaoColorClass) {
          this.TransparentColor = arguments[0].TransparentColor;
        }
        if (typeof arguments[0].Ascent === 'number') {
          this.Ascent = arguments[0].Ascent;
        }
        if (typeof arguments[0].Descent === 'number') {
          this.Descent = arguments[0].Descent;
        }
        if (typeof arguments[0].UnitSperEm === 'number') {
          this.UnitSperEm = arguments[0].UnitSperEm;
        }
        if (arguments[0].ViewBox instanceof String) {
          this.ViewBox = arguments[0].ViewBox;
        }
        if (typeof arguments[0].X === 'number') {
          this.X = arguments[0].X;
        }
        if (typeof arguments[0].Y === 'number') {
          this.X = arguments[0].Y;
        }
      }

    }

  },
  getNewGuid: function () {
    var guid = '';
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    return guid;
  },
  //从Svg读取Graphical数据xmlString
  GraphicalFormSvgFile: function (eSvgXmlFilepath, eCallback) {
    var thisobj = this;
    var htmlobj = $.ajax({
      type: 'get',
      url: eSvgXmlFilepath,
      dataType: 'xml',
      timeout: 2000,
      beforeSend: function () { },
      success: function (xml) {
        if ((xml != undefined) && ($.isXMLDoc(xml))) {
          if (thisobj.GraphicalFormSvgXml(xml) == true) {

            if (eCallback && eCallback instanceof Function) {
              //判断是否传参，以及参数类型
              eCallback();
            }
          } else {
            //throw new error('GraphicalFormSvgXml Failed!');
            return false;
          }
        } else {
          //alert('读取的svg/xml格式是错误的!');
          //throw new error('Ajax readed svg/xml is error!');
          return false;
        }
      },
      error: function () {
        //throw new error('Ajax GraphicalFormSvgFile Failed!');
        //alert('Ajax GraphicalFormSvgFile Failed!');
        return false;
      }
    });
  },
  //注意eSvgXmlString对象必须有<xml></xml>包裹
  GraphicalFormSvgStr: function (eXmlString) {
    var xml = $.parseXML(eXmlString);
    if (this.GraphicalFormSvgXml(xml) == true) {
      return true;
    } else {
      return false;
    }

  },
  GraphicalFormSvgXml: function (eSvgXml) {
    var xmlDocRoot = eSvgXml.documentElement;
    var imiaomarkname = '';
    var thisobj = this;
    $.each(xmlDocRoot.attributes, function (index, attrele) {
      //alert(i + ' : ' + attrib.name + ' : ' + attrib.value);
      if (attrele.name.isContains('miaomark-')) {
        imiaomarkname = attrele.name.replace(/miaomark-/g, '');
        if (imiaomarkname != '') {
          thisobj.MarkList.imiaomarkname = attrele.value;
        }
      }
      if (attrele.name == 'gid') {
        thisobj.GId = attrele.value;
      }
      if (attrele.name == 'title') {
        thisobj.Title = attrele.value;
      }
      if (attrele.name == 'describe') {
        thisobj.Title = attrele.value;
      }

      if (attrele.name == 'tag') {
        thisobj.Tag = attrele.value;
      }
      if (attrele.name == 'width') {
        thisobj.Width = parseInt(attrele.value);
      }
      if (attrele.name == 'height') {
        thisobj.Height = parseInt(attrele.value);
      }
    });
    var SvgNodePathList = $(xmlDocRoot).children();
    this.GraphicalFormSvgNodeList(SvgNodePathList, this.PathList);
    return true;
  },
  //格式化SVG的List表
  GraphicalFormSvgNodeList: function (eSvgNodePathList, ePathList) {
    var thisobj = this; 
    $.each(eSvgNodePathList, function (index, ele) {
      if (ele.nodeName == 'g')//组
      {
        var aPath = new MiaoPathClass();
        aPath.IsG = true;
        aPath.PathList = new Array();

        var myPathList = $(ele).children();
        thisobj.GraphicalFormSvgNodeList(myPathList, aPath.PathList);

        ePathList.push(aPath);
      }
      else if (ele.nodeName == 'rect')//矩形
      {
        ePathList.push(thisobj.GraphicalRectConvert(ele));
      }
      else if (ele.nodeName == 'circle')//圆
      {
        ePathList.push(thisobj.GraphicalCircleConvert(ele));
      }
      else if (ele.nodeName == 'ellipse')//椭圆
      {
        ePathList.push(thisobj.GraphicalEllipseConvert(ele));
      }
      else if (ele.nodeName == 'line')//线
      {
        ePathList.push(thisobj.GraphicalLineConvert(ele));
      }
      else if (ele.nodeName == 'polyline')//折线
      {
        ePathList.push(thisobj.GraphicalPolylineConvert(ele));
      }
      else if (ele.nodeName == 'polygon')//多边形
      {
        ePathList.push(thisobj.GraphicalPolygonConvert(ele));
      }
      else if (ele.nodeName == 'path')//路径
      {
        try {
          ePathList.push(thisobj.GraphicalPathConvert(ele));
        } catch (ex) {
          alert(ex);
        }
      }
      else {
      }

    });
  },
  //格式化多边形
  GraphicalPolygonConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';

    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';
    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }

    var pointsv = $(SvgNodePathItem).attr('points');
    var pArray = pointsv.split(' ');
    for (var i = 0; i < pArray.length; i++) {
      if ((pArray[i] != '') && (pArray[i].isContains(','))) {
        var XAndY = pArray[i].split(',');
        var aX = 0;
        var aY = 0;
        try {
          aX = parseFloat(XAndY[0]);
        }
        catch (e) {
          aX = 0;
        }
        try {
          aY = parseFloat(XAndY[1]);
        }
        catch (e) {
          aY = 0;
        }
        var aNewPoint = new MiaoPointClass(aX, aY);
        if (i == 0) {
          aPath.D.push(new MiaoDitemClass('M', aNewPoint));
        }
        else {
          aPath.D.push(new MiaoDitemClass('L', aNewPoint));
        }
      }
    }
    if (aPath.D.length > 0) {
      aPath.D.push(new MiaoDitemClass('Z'));
    }
    return aPath;
  },
  //格式化多条线段
  GraphicalPolylineConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';

    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }


    var pointsv = $(SvgNodePathItem).attr('points');
    //dv = dv.ToUpper();
    //dv = dv.replace(/ /g, ',');
    var pArray = pointsv.split(' ');
    for (var i = 0; i < pArray.length; i++) {
      if ((pArray[i] != '') && (pArray[i].isContains(','))) {
        var XAndY = pArray[i].split(',');
        var aX = 0;
        var aY = 0;
        try {
          aX = parseFloat(XAndY[0]);
        }
        catch (e) {
          aX = 0;
        }
        try {
          aY = parseFloat(XAndY[1]);
        }
        catch (e) {
          aY = 0;
        }
        var aNewPoint = new MiaoPointClass(aX, aY);
        if (i == 0) {
          aPath.D.push(new MiaoDitemClass('M', aNewPoint));
        }
        else {
          aPath.D.push(new MiaoDitemClass('L', aNewPoint));
        }
      }
    }
    return aPath;
  },
  //格式化椭圆
  GraphicalEllipseConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var rxv = '';
    var ryv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var circle_x = 0;
    var circle_y = 0;
    var circle_rx = 0;
    var circle_ry = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    if ($(SvgNodePathItem).attr('cx') != undefined) {
      xv = $(SvgNodePathItem).attr('cx');
      circle_x = parseFloat(xv);
    }
    else {
      circle_x = 0;
    }
    if ($(SvgNodePathItem).attr('cy') != undefined) {
      yv = $(SvgNodePathItem).attr('cy');
      circle_y = parseFloat(yv);
    }
    else {
      circle_y = 0;
    }
    if ($(SvgNodePathItem).attr('rx') != undefined) {
      rxv = $(SvgNodePathItem).attr('rx');
      circle_rx = parseFloat(rxv);
    }
    else {
      circle_rx = 1;
    }
    if ($(SvgNodePathItem).attr('ry') != undefined) {
      ryv = $(SvgNodePathItem).attr('ry');
      circle_ry = parseFloat(ryv);
    }
    else {
      circle_ry = 1;
    }


    this.GetFillColorHtmlString(ePathItem, path_fill);
    this.GetStrokeColorHtmlString(ePathItem, path_stroke);
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    //(Math.Sqrt(2)-1)*4/2 =0.55228475
    //0.551784为正负误差调整后的数值，实际数值应该是上面那个
    var CKeyValueX = circle_rx * 0.551784;
    var CKeyValueY = circle_ry * 0.551784;

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(circle_x, circle_y + circle_ry)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + CKeyValueX, circle_y + circle_ry), new MiaoPointClass(circle_x + circle_rx, circle_y + CKeyValueY), new MiaoPointClass(circle_x + circle_rx, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + circle_rx, circle_y - CKeyValueY), new MiaoPointClass(circle_x + CKeyValueX, circle_y - circle_ry), new MiaoPointClass(circle_x, circle_y - circle_ry)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - CKeyValueX, circle_y - circle_ry), new MiaoPointClass(circle_x - circle_rx, circle_y - CKeyValueY), new MiaoPointClass(circle_x - circle_rx, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - circle_rx, circle_y + CKeyValueY), new MiaoPointClass(circle_x - CKeyValueX, circle_y + circle_ry), new MiaoPointClass(circle_x, circle_y + circle_ry)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  GetFillColorHtmlString: function (SvgNodePathItem, eFillColor) {
    var fillv;
    if ($(SvgNodePathItem).attr('fill') != undefined) {
      fillv = $(SvgNodePathItem).attr('fill');
      if (fillv != 'none') {
        fillv = fillv.toLowerCase();
        if (global_mycolorstrreg.test(fillv)) {
          eFillColor.FromHexString(fillv);
        } else {
          if (global_mycolorargbstrreg.test(fillv)) {
            eFillColor.FromARGBHexString(fillv);
          } else {
            if (/^(rgb)/.test(fillv)) {
              eFillColor.FromRgbOrRgbaString(fillv);
            } else {
              eFillColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      }
      else {
        eFillColor.FromArgb(0, 0, 0, 0);
      }
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'fill') {

            //iStyleArrKV[0] = iStyleArrKV[0].substr(iStyleArrKV[0].indexOf(';'));
            var fillv = iStyleArrKV[1];
            if (global_mycolorstrreg.test(fillv)) {
              eFillColor.FromHexString(fillv);
            } else {
              if (global_mycolorargbstrreg.test(fillv)) {
                eFillColor.FromARGBHexString(fillv);
              } else {
                if (/^(rgb)/.test(fillv)) {
                  eFillColor.FromRgbOrRgbaString(fillv);
                } else {
                  eFillColor.FromArgb(0, 0, 0, 0);
                }
              }
            }
          }
        }
      }

    }
    else {
      if (SvgNodePathItem.style.fill != undefined) {
        fillv = SvgNodePathItem.style.fill;
        fillv = fillv.toLowerCase();
        if (global_mycolorstrreg.test(fillv)) {
          eFillColor.FromHexString(fillv);
        } else {
          if (global_mycolorargbstrreg.test(fillv)) {
            eFillColor.FromARGBHexString(fillv);
          } else {
            if (/^(rgb)/.test(fillv)) {
              eFillColor.FromRgbOrRgbaString(fillv);
            } else {
              eFillColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      } else {
        eFillColor.FromArgb(0, 0, 0, 0);
      }
    }
  },
  GetStrokeXdString: function (eSvgNodePathItem, eStrokeLineCap, eStrokeLineJoin, eStrokeDashArray, eStrokeDashOffset) {
    //GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    if ($(eSvgNodePathItem).attr('stroke-linecap') != undefined) {
      eStrokeLineCap = $(eSvgNodePathItem).attr('stroke-linecap');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-linecap') {
            eStrokeLineCap = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeLineCap = 'butt';
      if (eSvgNodePathItem.style.strokeLinecap != undefined) {
        if (eSvgNodePathItem.style.strokeLinecap != '') {
          eStrokeLineCap = eSvgNodePathItem.style.strokeLinecap;
        }
      }
    }

    if ($(eSvgNodePathItem).attr('stroke-linejoin') != undefined) {
      eStrokeLineJoin = $(eSvgNodePathItem).attr('stroke-linejoin');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-linejoin') {
            eStrokeLineJoin = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeLineJoin = 'miter';
      if (eSvgNodePathItem.style.strokeLinecap != undefined) {
        if (eSvgNodePathItem.style.strokeLinejoin != '') {
          eStrokeLineJoin = eSvgNodePathItem.style.strokeLinejoin;
        }
      }
    }


    if ($(eSvgNodePathItem).attr('stroke-dasharray') != undefined) {
      eStrokeDashArray = $(eSvgNodePathItem).attr('stroke-dasharray');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-dasharray') {
            eStrokeDashArray = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeDashArray = 'none';
      if (eSvgNodePathItem.style.strokeDasharray != undefined) {
        if (eSvgNodePathItem.style.strokeDasharray != '') {
          eStrokeDashArray = eSvgNodePathItem.style.strokeDasharray;
        }
      }
    }

    if ($(eSvgNodePathItem).attr('stroke-dashoffset') != undefined) {
      eStrokeDashOffset = $(eSvgNodePathItem).attr('stroke-dashoffset');
    }
    else if ($(eSvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(eSvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-dashoffset') {
            eStrokeDashOffset = iStyleArrKV[1];
          }
        }
      }
    }
    else {
      eStrokeDashOffset = 'none';
      if (eSvgNodePathItem.style.strokeDashoffset != undefined) {
        if (eSvgNodePathItem.style.strokeDashoffset != '') {
          eStrokeDashOffset = eSvgNodePathItem.style.strokeDashoffset;
        }
      }
    }

  },
  GetStrokeColorHtmlString: function (SvgNodePathItem, eStrokeColor) {
    var strokev;
    if ($(SvgNodePathItem).attr('stroke') != undefined) {
      strokev = $(SvgNodePathItem).attr('stroke');
      if (strokev != 'none') {
        strokev = strokev.toLowerCase();
        if (global_mycolorstrreg.test(strokev)) {
          eStrokeColor.FromHexString(strokev);
        } else {
          if (global_mycolorargbstrreg.test(strokev)) {
            eStrokeColor.FromARGBHexString(strokev);
          } else {
            if (/^(rgb)/.test(strokev)) {
              eStrokeColor.FromRgbOrRgbaString(strokev);
            } else {
              eStrokeColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      }
      else {
        eStrokeColor.FromArgb(0, 0, 0, 0);
      }
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke') {
            //iStyleArrKV[0] = iStyleArrKV[0].substr(iStyleArrKV[0].indexOf(';'));
            var fillv = iStyleArrKV[1];
            if (global_mycolorstrreg.test(fillv)) {
              eStrokeColor.FromHexString(fillv);
            } else {
              if (global_mycolorargbstrreg.test(fillv)) {
                eStrokeColor.FromARGBHexString(fillv);
              } else {
                if (/^(rgb)/.test(fillv)) {
                  eStrokeColor.FromRgbOrRgbaString(fillv);
                } else {
                  eStrokeColor.FromArgb(0, 0, 0, 0);
                }
              }
            }
          }
        }
      }
    }
    else {
      if (SvgNodePathItem.style.stroke != undefined) {
        strokev = SvgNodePathItem.style.stroke;
        strokev = strokev.toLowerCase();
        if (global_mycolorstrreg.test(strokev)) {
          eStrokeColor.FromHexString(strokev);
        } else {
          if (global_mycolorargbstrreg.test(strokev)) {
            eStrokeColor.FromARGBHexString(strokev);
          } else {
            if (/^(rgb)/.test(strokev)) {
              eStrokeColor.FromRgbOrRgbaString(strokev);
            } else {
              eStrokeColor.FromArgb(0, 0, 0, 0);
            }
          }
        }
      } else {
        eStrokeColor.FromArgb(0, 0, 0, 0);
      }
    }
  },
  //格式化路径
  GraphicalPathConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();

    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';

    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';
    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }
      
    }
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;

    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    //alert(aPath.BorderWidth);

    var dv = $(SvgNodePathItem).attr('d');
    //dv = dv.ToUpper();
    //dv = dv.replace(/ /g, ',');

    var CommandStrOne = '';

    if (dv.length < 1) {

    }
    else {
      if (dv[0] == 'M') {
        CommandStrOne = 'M';
        dv = dv.substring(1);
      }
      var sArray = dv.split(/M|Z|L|H|V|S|C|Q|T|A|m|z|l|h|v|s|c|q|t|a/);
      dv = CommandStrOne + dv;
      var chars = dv.split('');
      var commandchars = '';
      var aTestCommandStr = 'MZLHVSCQTAmzlhvscqta';
      for (var j = 0; j < chars.length; j++) {
        if (aTestCommandStr.isContains(chars[j])) {
          commandchars += chars[j];
        }
      }
      var chars2 = commandchars.split('');
      var aLastPointF = new MiaoPointClass(0, 0);
      var aLastCSPointF = new MiaoPointClass(0, 0);
      var aLastQTPointF = new MiaoPointClass(0, 0);

      for (var i = 0; i < sArray.length; i++) {
        //sArray[i] pointStr
        //chars2[i] command
        sArray[i] = MiaoCommonFun.BiaoZhunHuaPointStr(sArray[i]);

        var aPointXandY = sArray[i].split(',');

        var aPoint1, aPoint2, aPoint3, aBezierCurvaturesPoint1, aBezierCurvaturesPoint2;
        var aBezierCurvaturesControlPointArr = new Array();

        switch (chars2[i]) {
          case 'M':
            aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'Z':
            aPath.D.push(new MiaoDitemClass('Z'));
            break;
          case 'L':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'H':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]), aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'V':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]))));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'S':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + (parseFloat(aPointXandY[2])) - parseFloat(aPointXandY[0]), parseFloat(aPointXandY[3]) + (parseFloat(aPointXandY[3])) - parseFloat(aPointXandY[1]));
            aLastQTPointF = aLastPointF;
            break;
          case 'C':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3])), new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]), parseFloat(aPointXandY[5]));

            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + (parseFloat(aPointXandY[4])) - parseFloat(aPointXandY[2]), parseFloat(aPointXandY[5]) + (parseFloat(aPointXandY[5])) - parseFloat(aPointXandY[3]));
            aLastQTPointF = aLastPointF;
            break;
          case 'Q':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));

            //添加默认Q的标签
            aPath.D.push(new MiaoDitemClass('Q', new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1])), new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]))));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]), parseFloat(aPointXandY[3]));
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;

            break;
          case 'T':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]), parseFloat(aPointXandY[1]));

            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'A':
            break;
          case 'm':
            aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'z':
            aPath.D.push(new MiaoDitemClass('Z'));
            break;
          case 'l':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'h':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 'v':
            aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y)));
            aLastPointF = new MiaoPointClass(aLastPointF.X, parseFloat(aPointXandY[0]) + aLastPointF.Y);
            aLastCSPointF = aLastPointF;
            aLastQTPointF = aLastPointF;
            break;
          case 's':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(aLastCSPointF.X, aLastCSPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + parseFloat(aPointXandY[2]) - parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[3]) + parseFloat(aPointXandY[3]) - parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'c':
            aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y), new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y)));
            aLastCSPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + parseFloat(aPointXandY[4]) - parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[5]) + parseFloat(aPointXandY[5]) - parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aLastPointF = new MiaoPointClass(parseFloat(aPointXandY[4]) + aLastPointF.X, parseFloat(aPointXandY[5]) + aLastPointF.Y);
            aLastQTPointF = aLastPointF;
            break;
          case 'q':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[2]) + aLastPointF.X, parseFloat(aPointXandY[3]) + aLastPointF.Y);
            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 't':
            aPoint1 = aLastPointF;
            aPoint2 = new MiaoPointClass(aLastQTPointF.X, aLastQTPointF.Y);
            aPoint3 = new MiaoPointClass(parseFloat(aPointXandY[0]) + aLastPointF.X, parseFloat(aPointXandY[1]) + aLastPointF.Y);
            aPath.D.push(new MiaoDitemClass('Q', aPoint2, aPoint3));
            aLastPointF = aPoint3;
            aLastCSPointF = aLastPointF;
            aLastQTPointF = new MiaoPointClass(aPoint3.X + (aPoint3.X - aPoint2.X), aPoint3.Y + (aPoint3.Y - aPoint2.Y));
            break;
          case 'a':
            break;
          default:
            break;
        }
      }
    }
    return aPath;
  },
  //格式化线段
  GraphicalLineConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var x1v = '';
    var y1v = '';
    var x2v = '';
    var y2v = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var line_x1 = 0;
    var line_y1 = 0;
    var line_x2 = 0;
    var line_y2 = 0;
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';
    if ($(SvgNodePathItem).attr('x1') != undefined) {
      x1v = $(SvgNodePathItem).attr('x1');
      line_x1 = parseFloat(x1v);
    }
    else {
      line_x1 = 0;
    }
    if ($(SvgNodePathItem).attr('y1') != undefined) {
      y1v = $(SvgNodePathItem).attr('y1');
      line_y1 = parseFloat(y1v);
    }
    else {
      line_y1 = 0;
    }


    if ($(SvgNodePathItem).attr('x2') != undefined) {
      x2v = $(SvgNodePathItem).attr('x2');
      line_x2 = parseFloat(x2v);
    }
    else {
      line_x2 = 0;
    }
    if ($(SvgNodePathItem).attr('y2') != undefined) {
      y2v = $(SvgNodePathItem).attr('y2');
      line_y2 = parseFloat(y2v);
    }
    else {
      line_y2 = 0;
    }

    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(line_x1, line_y1)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(line_x2, line_y2)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor.FromArgb(0, 0, 0, 0);
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  //格式化圆形
  GraphicalCircleConvert: function (SvgNodePathItem) {
    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var rv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var strokemiterlimitv = '';
    var strokelinecapv = '';
    var strokelinejoinv = '';
    var strokedasharrayv = '';
    var strokedashoffsetv = '';
    var circle_x = 0;
    var circle_y = 0;
    var circle_r = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    var path_strokemiterlimit = 4;

    var path_strokelinecap = 'butt';//butt, round, square, inherit
    var path_strokelinejoin = 'miter';//miter, round, bevel, inherit
    var path_strokedasharray = 'none';
    var path_strokedashoffset = 'none';
    if ($(SvgNodePathItem).attr('cx') != undefined) {
      xv = $(SvgNodePathItem).attr('cx');
      circle_x = parseFloat(xv);
    }
    else {
      circle_x = 0;
    }
    if ($(SvgNodePathItem).attr('cy') != undefined) {
      yv = $(SvgNodePathItem).attr('cy');
      circle_y = parseFloat(yv);
    }
    else {
      circle_y = 0;
    }
    if ($(SvgNodePathItem).attr('r') != undefined) {
      rv = $(SvgNodePathItem).attr('r');
      circle_r = parseFloat(rv);
    }
    else {
      circle_r = 1;
    }

    this.GetFillColorHtmlString(SvgNodePathItem, path_fill);
    this.GetStrokeColorHtmlString(SvgNodePathItem, path_stroke);
    this.GetStrokeXdString(SvgNodePathItem, path_strokelinecap, path_strokelinejoin, path_strokedasharray, path_strokedashoffset);
    if ($(SvgNodePathItem).attr('stroke-miterlimit') != undefined) {
      strokemiterlimitv = $(SvgNodePathItem).attr('stroke-miterlimit');
      path_strokemiterlimit = parseInt(strokemiterlimitv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-miterlimit') {
            path_strokemiterlimit = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokemiterlimit = 4;
      if (SvgNodePathItem.style.strokeMiterlimit != undefined) {
        if (SvgNodePathItem.style.strokeMiterlimit != '') {
          path_strokemiterlimit = parseInt(SvgNodePathItem.style.strokeMiterlimit);
        }
      }
    }
    if ($(SvgNodePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(SvgNodePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    //(Math.Sqrt(2)-1)*4/2 =0.55228475
    //0.551784为正负误差调整后的数值，实际数值应该是上面那个
    var CKeyValue = circle_r * 0.551784;
    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(circle_x, circle_y + circle_r)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + CKeyValue, circle_y + circle_r), new MiaoPointClass(circle_x + circle_r, circle_y + CKeyValue), new MiaoPointClass(circle_x + circle_r, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x + circle_r, circle_y - CKeyValue), new MiaoPointClass(circle_x + CKeyValue, circle_y - circle_r), new MiaoPointClass(circle_x, circle_y - circle_r)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - CKeyValue, circle_y - circle_r), new MiaoPointClass(circle_x - circle_r, circle_y - CKeyValue), new MiaoPointClass(circle_x - circle_r, circle_y)));
    aPath.D.push(new MiaoDitemClass('C', new MiaoPointClass(circle_x - circle_r, circle_y + CKeyValue), new MiaoPointClass(circle_x - CKeyValue, circle_y + circle_r), new MiaoPointClass(circle_x, circle_y + circle_r)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  //格式化方块
  GraphicalRectConvert: function (ePathItem) {

    var aPath = new MiaoPathClass();
    var aD = new Array();
    var xv = '';
    var yv = '';
    var wv = '';
    var hv = '';
    var fillv = '';
    var strokev = '';
    var strokewidthv = '';
    var rect_x = 0;
    var rect_y = 0;
    var rect_w = 0;
    var rect_h = 0;
    var path_fill = new MiaoColorClass(0, 0, 0, 0);
    var path_stroke = new MiaoColorClass(0, 0, 0, 0);
    var path_strokewidth = 0;
    if ($(ePathItem).attr('x') != undefined) {
      xv = $(ePathItem).attr('x');
      rect_x = parseFloat(xv);
    }
    else {
      rect_x = 0;
    }
    if ($(ePathItem).attr('y') != undefined) {
      yv = $(ePathItem).attr('y');
      rect_y = parseFloat(yv);
    }
    else {
      rect_y = 0;
    }
    if ($(ePathItem).attr('width') != undefined) {
      wv = $(ePathItem).attr('width');
      rect_w = parseFloat(wv);
    }
    else {
      rect_w = 1;
    }
    if ($(ePathItem).attr('height') != undefined) {
      hv = $(ePathItem).attr('height');
      rect_h = parseFloat(hv);
    }
    else {
      rect_h = 1;
    }

    this.GetFillColorHtmlString(ePathItem, path_fill);
    this.GetStrokeColorHtmlString(ePathItem, path_stroke);

    if ($(ePathItem).attr('stroke-width') != undefined) {
      strokewidthv = $(ePathItem).attr('stroke-width');
      path_strokewidth = parseInt(strokewidthv);
    }
    else if ($(SvgNodePathItem).attr('style') != undefined) {
      var iStyleStr = $(SvgNodePathItem).attr('style');
      iStyleStr = iStyleStr.toLowerCase();
      var iStyleArr = iStyleStr.split(';');
      for (var i = 0; i < iStyleArr.length; i++) {
        iStyleArr[i] = iStyleArr[i].trim();
        if (iStyleArr[i] != '');
        if (iStyleArr[i].isContains(':')) {
          var iStyleArrKV = iStyleArr[i].split(':');
          iStyleArrKV[0] = iStyleArrKV[0].trim();
          iStyleArrKV[1] = iStyleArrKV[1].trim();
          if (iStyleArrKV[0] == 'stroke-width') {
            path_strokewidth = parseInt(iStyleArrKV[1]);
          }
        }
      }
    }
    else {
      path_strokewidth = 0;
      if (SvgNodePathItem.style.strokeWidth != undefined) {
        if (SvgNodePathItem.style.strokeWidth != '') {
          path_strokewidth = parseInt(SvgNodePathItem.style.strokeWidth);
        }
      }

    }

    aPath.D.push(new MiaoDitemClass('M', new MiaoPointClass(rect_x, rect_y)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x + rect_w, rect_y)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x + rect_w, rect_y + rect_h)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x, rect_y + rect_h)));
    aPath.D.push(new MiaoDitemClass('L', new MiaoPointClass(rect_x, rect_y)));
    aPath.D.push(new MiaoDitemClass('Z'));
    aPath.FillColor = path_fill;
    aPath.BorderWidth = path_strokewidth;
    aPath.StrokeColor = path_stroke;
    aPath.StrokeMiterLimit = path_strokemiterlimit;
    aPath.StrokeLineCap = path_strokelinecap;
    aPath.StrokeLineJoin = path_strokelinejoin;
    aPath.StrokeDashArray = path_strokedasharray;
    aPath.StrokeDashOffset = path_strokedashoffset;
    if ((aPath.StrokeColor.A != 0) && (aPath.BorderWidth == 0)) {
      aPath.BorderWidth = 1;
    }
    return aPath;
  },
  //缩放
  Scale: function (eo) {
    this.Width = Math.round(this.Width * eo);
    this.Height = Math.round(this.Height * eo);

    if (this.PathList.length >= 1) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].Scale(eo);
      }
    }
  },
  ScaleFittingWidth: function (eWidth) {
    var eo = eWidth / this.Width;
    this.Scale(eo);
    this.Width = eWidth;
  },
  ScaleFittingHeight: function (eHeight) {
    var eo = eHeight / this.Height;
    this.Scale(eo);
    this.Height = eHeight;
  },
  ScaleFittingWidthAndHeight: function (eWidth, eHeight) {
    var eo;
    var ewlh = eWidth / eHeight;
    var wlh = this.Width / this.Height;
    if (ewlh > wlh) {
      eo = eWidth / this.Width;
    }
    else {
      eo = eHeight / this.Height;
    }
    this.Scale(eo);
    var iNewPoint = new MiaoPointClass((eWidth - this.Width) / 2, (eHeight - this.Height) / 2);
    this.XYToNewPoint(iNewPoint);
    this.Width = eWidth;
    this.Height = eHeight;
  },
  ScaleFittingWidthAndHeightIn: function (eWidth, eHeight) {
    var eo;
    var ewlh = eWidth / eHeight;
    var wlh = this.Width / this.Height;
    if (ewlh > wlh) {
      eo = eHeight / this.Height;
    }
    else {
      eo = eWidth / this.Width;
    }
    this.Scale(eo);
    var iNewPoint = new MiaoPointClass((eWidth - this.Width) / 2, (eHeight - this.Height) / 2);
    this.XYToNewPoint(iNewPoint);
    this.Width = eWidth;
    this.Height = eHeight;
  },
  ScaleFittingGraphical: function (ePadding) {
    //第一步，获取当前graphical的图形的外框
    var bWidth;
    var bHeight;
    var bX;
    var bY;
    var iRect = MiaoRectangleClass();
    iRect.SetWidth(bWidth);
    iRect.SetHeight(bHeight);
    iRect.SetX(bX);
    iRect.SetY(bY);

    //第二步，确保ePadding要比高或者宽的一半的数值要小，否则epadding清零。
    if ((ePadding >= this.Height / 2) || (ePadding >= this.Width / 2)) {
      ePadding = 0;
    }

    //第三步，计算边框到0的距离，然后把边框移动到0位置。
    var iNewPoint;
    iNewPoint = new MiaoPointClass(0 - bX, 0 - bY);
    this.XYToNewPoint(iNewPoint);
    var orgWidth = this.Width;
    var orgHeight = this.Height;
    this.Width = bWidth;
    this.Height = bHeight;


    //第四步，将图像放入原始图像的未增加padding的尺寸内。
    ScaleFittingWidthAndHeightIn(orgWidth - ePadding - ePadding, orgHeight - ePadding - ePadding);
    iNewPoint = new MiaoPointClass(ePadding, ePadding);
    this.XYToNewPoint(iNewPoint);
    if (ePadding > 0) {
      this.Width = orgWidth;
      this.Height = orgHeight;
    }
  },
  //这是画框函数
  drawRectangle: function (eRectangle, eFillColor, eStrokeColor, eBorderWidth) {
    var iX, iY, iWidth, iHeight;
    iX = eRectangle.GetX();
    iY = eRectangle.GetY();
    iWidth = eRectangle.GetWidth();
    iHeight = eRectangle.GetHeight();
    var iD = new Array();
    iD.push(new MiaoDitemClass('M', new MiaoPointClass(iX, iY)));
    iD.push(new MiaoDitemClass('L', new MiaoPointClass(iX + iWidth, iY)));
    iD.push(new MiaoDitemClass('L', new MiaoPointClass(iX + iWidth, iY + iHeight)));
    iD.push(new MiaoDitemClass('L', new MiaoPointClass(iX, iY + iHeight)));
    iD.push(new MiaoDitemClass('L', new MiaoPointClass(iX, iY)));
    iD.push(new MiaoDitemClass('Z'));
    this.PathList.push(new MiaoPathClass(eFillColor, eStrokeColor, eBorderWidth, iD));
  },
  //这是画框函数
  drawLine: function (eStartPoint, eEndPoint, eStrokeColor, eBorderWidth) {
    var iD = new Array();
    iD.push(new MiaoDitemClass('M', eStartPoint));
    iD.push(new MiaoDitemClass('L', eEndPoint));
    iD.push(new MiaoDitemClass('Z'));
    this.PathList.push(new MiaoPathClass(this.TransparentColor, eStrokeColor, eBorderWidth, iD));
  },
  //这是画圈函数
  drawCircle: function (eX, eY, eR, eFillColor, eStrokeColor, eBorderWidth) {
    var iD = new Array();
    var CKeyValue = eR * 0.551784;
    iD.push(new MiaoDitemClass('M', new MiaoPointClass(eX, eY + eR)));
    iD.push(new MiaoDitemClass('C', new MiaoPointClass(eX + CKeyValue, eY + eR), new MiaoPointClass(eX + eR, eY + CKeyValue), new MiaoPointClass(eX + eR, eY)));
    iD.push(new MiaoDitemClass('C', new MiaoPointClass(eX + eR, eY - CKeyValue), new MiaoPointClass(eX + CKeyValue, eY - eR), new MiaoPointClass(eX, eY - eR)));
    iD.push(new MiaoDitemClass('C', new MiaoPointClass(eX - CKeyValue, eY - eR), new MiaoPointClass(eX - eR, eY - CKeyValue), new MiaoPointClass(eX - eR, eY)));
    iD.push(new MiaoDitemClass('C', new MiaoPointClass(eX - eR, eY + CKeyValue), new MiaoPointClass(eX - CKeyValue, eY + eR), new MiaoPointClass(eX, eY + eR)));
    iD.push(new MiaoDitemClass('Z'));
    this.PathList.push(new MiaoPathClass(eFillColor, eStrokeColor, eBorderWidth, iD));
  },
  GetBoundsCenterPoint: function () {
    var aBoundsBox = this.GetBounds();
    var iX = aBoundsBox.GetX() + (aBoundsBox.GetWidth() / 2);
    var iY = aBoundsBox.GetY() + (aBoundsBox.GetHeight() / 2);
    var iPoint = new MiaoPointClass(iX, iY);
    return iPoint;
  },
  //获取外框
  GetBounds: function (eByT) {
    eByT = eByT || false;
    var minX = 99999, maxX = 0, minY = 99999, maxY = 0;
    var iResultRect;
    for (var i = 0; i < this.PathList.length; i++) {
      iResultRect = this.PathList[i].GetBounds(eByT);
      if (minX > iResultRect.GetLeft()) {
        minX = iResultRect.GetLeft();
      }
      if (minY > iResultRect.GetTop()) {
        minY = iResultRect.GetTop();
      }
      if (maxX < iResultRect.GetRight()) {
        maxX = iResultRect.GetRight();
      }
      if (maxY < iResultRect.GetBottom()) {
        maxY = iResultRect.GetBottom();
      }
    }
    var aResultRect = new MiaoRectangleClass(minX, minY, maxX - minX, maxY - minY);
    return aResultRect;
  },
  //旋转坐标eAngle为角度的弧度制，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate: function (eAngle, eOrgPoint) {
    eOrgPoint = eOrgPoint || { "X": 0, "Y": 0 };
    if (this.PathList.length > 0) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].Rotate(eAngle, eOrgPoint);
      }
    }
  },
  //对整个Graphical的图形进行XY坐标的位移
  XYToNewPoint: function (aNewPoint) {
    if (this.PathList.length > 0) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].TransformNewPoint(aNewPoint);
      }
    }
  },
  //生成AI的字符串
  toAi3String: function () {
    var Ai3String = '';
    return Ai3String;
  },
  //生成AI文件
  toAi3File: function (eFilename) {
    var Ai3String = '' + this.toAi3String();
    saveAs(new Blob([Ai3String], { type: 'text/plain;charset=utf-8' }), eFilename + '.ai');
  },
  //生成SVG的字符串
  toSvgString: function () {
    var MarkListString = '';
    for (var iMarkItem in this.MarkList) {
      MarkListString += ' miaomark-' + iMarkItem + '=' + this.MarkList[iMarkItem] + '"';
    }
    var SvgString = '';
    SvgString = '<svg version="1.1" id="mg_' + this.GId + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  gid="' + this.GId + '" title="' + this.Title + '" tag="' + this.Tag + '" describe="' + this.Describe + '" x="' + this.X + 'px" y="' + this.Y + 'px" width="' + this.Width + 'px" height="' + this.Height + 'px" ascent="' + this.Ascent + '" descent="' + this.Descent + '" unit-sper-em="' + this.UnitSperEm + '" viewBox="' + this.ViewBox + '" enable-background="new ' + this.ViewBox + '"' + MarkListString + ' xml:space="preserve">\r\n';

    if (this.PathList.length > 0) {
      for (var i = 0; i < this.PathList.length; i++) {
        SvgString += this.GetMiaoPathSvgString(this.PathList[i]);
      }

    }
    SvgString += '</svg>';
    return SvgString;
  },
  //生成MiaoPath的SVG文件的字符串
  GetMiaoPathSvgString: function (eMiaoPath) {
    var resultStr = '';
    var MarkListString = '';
    var iFillColorStr = 'none';
    var iStrokeColorStr = 'none';
    for (var iMarkItem in eMiaoPath.MarkList) {
      MarkListString += ' miaomark-' + iMarkItem + '="' + eMiaoPath.MarkList[iMarkItem] + '"';
    }
    if (!eMiaoPath.IsG) {
      resultStr += '<path' + MarkListString + ' d="';
      if (eMiaoPath.D.length > 0) {
        for (var j = 0; j < eMiaoPath.D.length; j++) {
          resultStr += eMiaoPath.D[j].Commend;
          if (eMiaoPath.D[j].Points.length > 0) {
            for (var k = 0; k < eMiaoPath.D[j].Points.length; k++) {
              if (k == 0) {
                resultStr += eMiaoPath.D[j].Points[k].X + ',' + eMiaoPath.D[j].Points[k].Y;
              }
              else {
                resultStr += ' ' + eMiaoPath.D[j].Points[k].X + ',' + eMiaoPath.D[j].Points[k].Y;
              }
            }
          }
        }
      }

      var iFillColorStr = 'none';
      var iStrokeColorStr = 'none';
      if (eMiaoPath.StrokeColor.ToArgbString() != MiaoCommonColor.TransparentColor.ToArgbString()) {
        iStrokeColorStr = eMiaoPath.StrokeColor.ToHtmlString();

      }
      if (eMiaoPath.FillColor.ToArgbString() != MiaoCommonColor.TransparentColor.ToArgbString()) {
        iFillColorStr = eMiaoPath.FillColor.ToHtmlString();
      }
      var iMiterLimitStr = '';
      iMiterLimitStr = '" stroke-miterlimit="' + eMiaoPath.StrokeMiterLimit + '"';
      resultStr += '" fill="' + iFillColorStr + '" stroke="' + iStrokeColorStr + '" stroke-width="' + eMiaoPath.BorderWidth + '"' + iMiterLimitStr + ' />\r\n';
    }
    else {
      resultStr += '<g>';
      for (var l = 0; l < eMiaoPath.PathList.length; l++) {
        resultStr += this.GetMiaoPathSvgString(eMiaoPath.PathList[l]);
      }
      resultStr += '</g>\r\n';
    }
    return resultStr;
  },
  //生成SVG的文件
  toSvgFile: function (eFilename) {
    var SvgString = '<?xml version="1.0" encoding="utf-8"?>\r\n' + this.toSvgString();
    saveAs(new Blob([SvgString], { type: 'text/plain;charset=utf-8' }), eFilename + '.svg');
  },
  //生成位图的文件
  toBitmap: function () { },
  toBitmap2: function (eWidth, eHeight) { },
  toGraphics: function () { },
  toGraphics2: function (eWidth, eHeight) { },
  //存成位图文件，默认PNG格式
  toBitmapFile: function (eFilepath) { },
  toBitmapFile: function (eFilepath, eImageFormat) { },
  //设置Height:
  SetHeight: function (e) {
    this.Height = e;
    this.ViewBox = '' + this.X + ' ' + this.Y + ' ' + (this.Width + this.X) + ' ' + (this.Height + this.Y);
  },
  //设置Width:
  SetWidth: function (e) {
    this.Width = e;
    this.ViewBox = '' + this.X + ' ' + this.Y + ' ' + (this.Width + this.X) + ' ' + (this.Height + this.Y);
  },
  Set: function () {
    if (!(arguments[0] === undefined)) {
      if (arguments[0] instanceof MiaoGraphicalClass) {
        this.GId = arguments[0].GId;
        this.Width = arguments[0].Width;
        this.Height = arguments[0].Height;
        this.PathList = arguments[0].PathList;
        this.Title = arguments[0].Title;
        this.Tag = arguments[0].Tag;
        this.Describe = arguments[0].Describe;
        this.OrgPoint = arguments[0].OrgPoint;
        this.MarkList = arguments[0].MarkList;
        this.BgColor = arguments[0].BgColor;
        this.TransparentColor = arguments[0].TransparentColor;
        this.Ascent = arguments[0].Ascent;
        this.Descent = arguments[0].Descent;
        this.UnitSperEm = arguments[0].UnitSperEm;
        this.ViewBox = arguments[0].ViewBox;
        this.X = arguments[0].X;
        this.Y = arguments[0].Y;
      }
      if (arguments[0] instanceof String) {
        this.GId = arguments[0];
      }
      if (arguments.length > 1) {
        if (typeof arguments[1] === 'number') {
          this.Width = arguments[1];
        }
      }
      if (arguments.length > 2) {
        if (typeof arguments[2] === 'number') {
          this.Height = arguments[2];
        }
      }
      if (arguments.length > 3) {
        if ((arguments[3] instanceof Array) && (arguments[3][0] instanceof MiaoPathClass)) {
          this.PathList = arguments[3];
        }
      }
      if (arguments.length > 4) {
        if (arguments[4] instanceof String) {
          this.Title = arguments[4];
        }
      }

      if (arguments.length > 5) {
        if (arguments[5] instanceof String) {
          this.Tag = arguments[5];
        }
      }

      if (arguments.length > 6) {
        if (arguments[6] instanceof String) {
          this.Describe = arguments[6];
        }
      }

      if (arguments.length > 7) {
        if (arguments[7] instanceof MiaoPointClass) {
          this.OrgPoint = arguments[7];
        }
      }

      if (arguments.length > 8) {
        if (isJson(arguments[8])) {
          this.MarkList = arguments[8];
        }
      }
      if (arguments.length > 9) {
        if (arguments[9] instanceof MiaoColorClass) {
          this.BgColor = arguments[9];
        }
      }
      if (arguments.length > 10) {
        if (arguments[10] instanceof MiaoColorClass) {
          this.TransparentColor = arguments[10];
        }
      }

      if (arguments.length > 0) {
        if (isJson(arguments[0])) {

          if (arguments[0].GId instanceof String) {
            this.GId = arguments[0].GId;
          }
          if (typeof arguments[0].Width === 'number') {
            this.Width = arguments[0].Width;
          }
          if (typeof arguments[0].Height === 'number') {
            this.Height = arguments[0].Height;
          }
          if ((arguments[0].PathList instanceof Array) && (arguments[0].PathList[0] instanceof MiaoPathClass)) {
            this.PathList = arguments[0].PathList;
          }
          if (arguments[0].Title instanceof String) {
            this.Title = arguments[0].Title;
          }
          if (arguments[0].Tag instanceof String) {
            this.Tag = arguments[0].Tag;
          }
          if (arguments[0].Describe instanceof String) {
            this.Describe = arguments[0].Describe;
          }
          if (arguments[0].OrgPoint instanceof MiaoPointClass) {
            this.OrgPoint = arguments[0].OrgPoint;
          }
          if (isJson(arguments[0].MarkList)) {
            this.MarkList = arguments[0].MarkList;
          }
          if (arguments[0].BgColor instanceof MiaoColorClass) {
            this.BgColor = arguments[0].BgColor;
          }
          if (arguments[0].TransparentColor instanceof MiaoColorClass) {
            this.TransparentColor = arguments[0].TransparentColor;
          }
          if (typeof arguments[0].Ascent === 'number') {
            this.Ascent = arguments[0].Ascent;
          }
          if (typeof arguments[0].Descent === 'number') {
            this.Descent = arguments[0].Descent;
          }
          if (typeof arguments[0].UnitSperEm === 'number') {
            this.UnitSperEm = arguments[0].UnitSperEm;
          }
          if (arguments[0].ViewBox instanceof String) {
            this.ViewBox = arguments[0].ViewBox;
          }
          if (typeof arguments[0].X === 'number') {
            this.X = arguments[0].X;
          }
          if (typeof arguments[0].Y === 'number') {
            this.X = arguments[0].Y;
          }
        }
      }

    }
  },
  //将pathList里面的某个index位置向上调整到顶部
  PathLadaytoTop: function (eIndex) {
    if ((this.PathList.length > 0) && (eIndex < this.PathList.length)) {
      var newPath = this.PathList[eIndex];
      this.PathList.RemoveAt(eIndex);
      this.PathList.push(newPath);
      return true;
    }
    return false;
  },
  //将Path层向上移动一层
  PathLadaytoTopOne: function (eIndex) {
    if ((this.PathList.length > 0) && (eIndex < this.PathList.length)) {
      if (eIndex > 0) {
        var newPath = this.PathList[eIndex];
        this.PathList[eIndex] = this.PathList[eIndex - 1];
        this.PathList[eIndex - 1] = newPath;
        return true;
      }
      else {
        return true;
      }
    }
    return false;
  },
  //将Path层向下移动一层
  PathLadaytoBottomOne: function (eIndex) {
    if ((this.PathList.length > 0) && (eIndex < this.PathList.length)) {
      if (eIndex < this.PathList.length - 1) {
        var newPath = this.PathList[eIndex];
        this.PathList[eIndex] = this.PathList[eIndex + 1];
        this.PathList[eIndex + 1] = newPath;
        return true;
      }
      else {
        return true;
      }
    }
    return false;
  },
  //把另一个Graphical放入当前Graphical，成为当前pathList的一部分
  PutIn: function (eGraphical, eNewPoint) {
    if (this.PathList.length > 0) {
      for (var i = 0; i < this.PathList.length; i++) {
        this.PathList[i].TransformNewPoint(eNewPoint);
        eGraphical.PathList.push(this.PathList[i]);
      }
    }
  },
  //Reverse	反转此 GraphicsPath 的 PathPoints 数组中各点的顺序。
  Reverse: function () {
    this.PathList.reverse();
    for (var j = 0; j < this.PathList.length; j++) {
      this.PathList[j].Reverse();
    }
  },
  //Reverse	反转此 GraphicsPath 的 PathPoints 数组，但是不反转Path的内部点的顺序。
  ReverseWithoutD: function () {
    this.PathList.reverse();
  },
  //ConvertCurveC2Q	将PATH里面的三次贝塞尔曲线转换成二次贝塞尔曲线，注意该操作会产生轻微误差。
  ConvertCurveC2Q:function(){
    var eSCount = 16;
    if (arguments[0] === undefined) {
      eSCount = 16;
    } else {
      if (typeof arguments[0] === 'number') {
        eSCount = Math.floor(arguments[0]);
      }
    }
    var i = 0;
    for (i = 0; i < this.PathList.length; i++) {
      this.PathList[i].ConvertCurveC2Q(eSCount);
    }
  },
  //Flatten	将此路径中的各段曲线转换成相连的线段序列。
  Flatten: function () {
    var eSCount = 3;
    if (arguments[0] === undefined) {
      eSCount = 3;
    } else {
      if (typeof arguments[0] === 'number') {
        eSCount = Math.floor(arguments[0]);
      }
    }
    var i = 0;
    for (i = 0; i < this.PathList.length; i++) {
      this.PathList[i].Flatten(eSCount);
    }
  },
  //生成一个克隆体
  Clone: function () {
    var aNewMiaoPath = new MiaoPathClass(this);
    return aNewMiaoPath;
  },
  //清除所有标记
  ClearMarkers: function () {
    this.MarkList = {};
  },
  SetMarkers: function (eKey, eVal) {
    this.MarkList.eKey = eVal;
  },
  IsMiaoGraphicalClass: function (e) { return e instanceof MiaoGraphicalClass; }
});
