//线类
const Common = require('./common.js');//引入公共方法
const _ = require('lodash');//引入lodash，许多数组操作需要用到这个库
const PointClass = require('./point_class.js');//引入点类，因为一条线有两个点属性组成
const SizeClass = require('./size_class.js');//引入size，将直线占用的size类型返回
const RectangleClass = require('./rectangle_class.js');//引入矩形类，计算一条线段的外包图形返回这个类型
const CircleClass = require('./circle_class.js');//引入圆形类，计算一条线段的圆形外包返回这个类型

class LineClass {
  constructor() {
    // 属性
    this.FixedNumber = Common.FixedNumber;
    this.Point1 = new PointClass(0, 0, this.FixedNumber);
    this.Point2 = new PointClass(0, 0, this.FixedNumber);
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 5) {
        if (_.isNumber(arguments[4])) {
          this.FixedNumber = arguments[4];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Point2.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }

      if (arguments.length == 4) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Point2.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }
      if (arguments.length == 3) {
        if (_.isNumber(arguments[2])) {
          this.FixedNumber = arguments[2];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
        if ((PointClass.IsClass(arguments[0])) && (PointClass.IsClass(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
      }
      if (arguments.length == 2) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)));
        }
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
        if ((PointClass.IsClass(arguments[0])) && (PointClass.IsClass(arguments[1]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 5) {
            if (!(_.isUndefined(arguments[0][4]))) {
              if (_.isNumber(arguments[0][4])) {
                this.FixedNumber = arguments[0][4];
              }
            }
            if ((!(_.isUndefined(arguments[0][0]))) && (!(_.isUndefined(arguments[0][1])))) {
              if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
                this.Point1.Set(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if ((!(_.isUndefined(arguments[0][2]))) && (!(_.isUndefined(arguments[0][3])))) {
              if ((_.isNumber(arguments[0][2])) && (_.isNumber(arguments[0][3]))) {
                this.Point2.Set(arguments[0][2], arguments[0][3], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 4) {
            if ((!(_.isUndefined(arguments[0][0]))) && (!(_.isUndefined(arguments[0][1])))) {
              if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
                this.Point1.Set(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if ((!(_.isUndefined(arguments[0][2]))) && (!(_.isUndefined(arguments[0][3])))) {
              if ((_.isNumber(arguments[0][2])) && (_.isNumber(arguments[0][3]))) {
                this.Point2.Set(arguments[0][2], arguments[0][3], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 3) {
            if (_.isNumber(arguments[0][2])) {
              this.FixedNumber = arguments[0][2];
            }
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Point1.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
            }
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
          }

          if (arguments[0].length == 2) {
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Point1.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)));
            }
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            this.FixedNumber = arguments[0].FixedNumber;
          }
          this.Point1.Set(arguments[0].Point1);
          this.Point2.Set(arguments[0].Point2);
        }
        if (arguments[0] instanceof LineClass) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Point1.Set(arguments[0].Point1);
          this.Point2.Set(arguments[0].Point2);
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new LineClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(el) {
    if (this.Point1.Equal(el.Point1) && this.Point2.Equal(el.Point2)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(el) {
    if (this.Point1.ExactlyEqual(el.Point1) && this.Point2.ExactlyEqual(el.Point2) && (this.FixedNumber == el.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(el, ec) {
    if (this.Point1.ApproximatelyEqual(el.Point1, ec) && this.Point2.ApproximatelyEqual(el.Point2, ec)) {
      return true;
    }
    return false;
  }
  GetLeft() {
    if (this.Point1.X > this.Point2.X) {
      return this.Point2.X;
    }
    return this.Point1.X;
  }
  GetRight() {
    if (this.Point1.X > this.Point2.X) {
      return this.Point1.X;
    }
    return this.Point2.X;
  }
  GetTop() {
    if (this.Point1.Y > this.Point2.Y) {
      return this.Point1.Y;
    }
    return this.Point2.Y;
  }
  GetBottom() {
    if (this.Point1.Y > this.Point2.Y) {
      return this.Point2.Y;
    }
    return this.Point1.Y;
  }
  GetWidth() {
    return this.GetRight() - this.GetLeft();
  }
  GetHeihgt() {
    return this.GetTop() - this.GetBottom();
  }
  GetX() {
    return this.Point1.X;
  }
  GetY() {
    return this.Point1.Y;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof LineClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        this.Point1.Translate(arguments[0], arguments[1]);
        this.Point2.Translate(arguments[0], arguments[1]);
      }
      if (arguments.length == 1) {
        if (PointClass.IsClass(arguments[0])) {
          this.Point1.Translate(arguments[0]);
          this.Point2.Translate(arguments[0]);
        }
        if (_.isArray(arguments[0])) {
          this.Point1.Translate(arguments[0][0], arguments[0][1]);
          this.Point2.Translate(arguments[0][0], arguments[0][1]);
        }
        if (Common.IsJson(arguments[0])) {
          this.Point1.Translate(arguments[0].X, arguments[0].Y);
          this.Point2.Translate(arguments[0].X, arguments[0].Y);
        }
      }
    }
    return this;
  }
  Add() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        this.Point1.Add(arguments[0], arguments[1]);
        this.Point2.Add(arguments[0], arguments[1]);
      }
      if (arguments.length == 1) {
        if (PointClass.IsClass(arguments[0])) {
          this.Point1.Add(arguments[0]);
          this.Point2.Add(arguments[0]);
        }
        if (_.isArray(arguments[0])) {
          this.Point1.Add(arguments[0][0], arguments[0][1]);
          this.Point2.Add(arguments[0][0], arguments[0][1]);
        }
        if (Common.IsJson(arguments[0])) {
          this.Point1.Add(arguments[0].X, arguments[0].Y);
          this.Point2.Add(arguments[0].X, arguments[0].Y);
        }
      }
    }
    return this;
  }
  Ceil() {
    this.Point1.Ceil();
    this.Point2.Ceil();
    return this;
  }
  Floor() {
    this.Point1.Floor();
    this.Point2.Floor();
    return this;
  }
  Round() {
    this.Point1.Round();
    this.Point2.Round();
    return this;
  }
  Random() {
    this.Point1.Random();
    this.Point2.Random();
    return this;
  }
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate(eAngle, eOrgPoint) {
    this.Point1.Rotate(eAngle, eOrgPoint);
    this.Point2.Rotate(eAngle, eOrgPoint);
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Point1.Scale(eo);
    this.Point2.Scale(eo);
    return this;
  }
  //将XY轴交换
  SwapXY() {
    this.Point1.SwapXY();
    this.Point2.SwapXY();
    return this;
  }
  //将XY轴交换
  SwapPoint() {
    var t = new PointClass();
    t.Set(this.Point1);
    this.Point1.Set(this.Point2);
    this.Point2.Set(t);
    return this;
  }
  GetVector() {
    return new PointClass(this.Point2.X - this.Point1.X, this.Point2.Y - this.Point1.Y, this.FixedNumber);
  }
  //获取斜率
  GetSlope() {
    if (this.Point1.X == this.Point2.X) {
      return false;
    }
    return parseFloat(((this.Point2.Y - this.Point1.Y) / (this.Point2.X - this.Point1.X)).toFixed(this.FixedNumber));
  }
  //获取角度
  GetAngle() {
    var idiff_x = this.Point2.X - this.Point1.X;
    var idiff_y = this.Point2.Y - this.Point1.Y;
    //返回角度,不是弧度
    if (idiff_x != 0) {
      return parseFloat((360 * Math.atan(idiff_y / idiff_x) / (2 * Math.PI)).toFixed(this.FixedNumber));
    }
    return parseFloat((360 * Math.atan2(idiff_y, idiff_x) / (2 * Math.PI)).toFixed(this.FixedNumber));
  }
  //获取长度
  GetLength() {
    var idiff_x = this.Point2.X - this.Point1.X;
    var idiff_y = this.Point2.Y - this.Point1.Y;
    var iax = parseFloat((idiff_x * idiff_x).toFixed(this.FixedNumber));
    var iay = parseFloat((idiff_y * idiff_y).toFixed(this.FixedNumber));
    return parseFloat(Math.sqrt(iax + iay).toFixed(this.FixedNumber));
  }
  GetGoldenMeanPoint() {
    return this.GetPointByT(Common.GoldenMean);
  }
  //判断一个点在一条直线的那一侧，同样上面的方法。1是顺时针，-1 是逆时针，0是共线，但是不确定共线得方向。
  GetPointClockDirection(ep) {
    var iCross = this.Point1.GetCross(ep);
    if (iCross > 0) return 1;
    if (iCross < 0) return -1;
    return 0;
  }
  //点到线段的距离
  GetDistanceToPoint(ep) {
    var iVector = this.GetVector();
    var iVector1 = ep.GetVector(this.Point1);
    var iVector2 = ep.GetVector(this.Point2);
    if (iVector.GetDot(iVector1) < 0) {
      return this.Point1.GetDistanceToPoint(ep);
    }
    if (iVector.GetDot(iVector2) > 0) {
      return this.Point2.GetDistanceToPoint(ep);
    }
    return iVector1.GetCross(iVector2) / iVector.GetDistanceToPoint(ep);
  }
  //返回改线段的中点
  GetCenterPoint() {
    var iX = parseFloat(((this.Point1.X + this.Point2.X) / 2).toFixed(this.FixedNumber));
    var iY = parseFloat(((this.Point1.Y + this.Point2.Y) / 2).toFixed(this.FixedNumber));
    return new PointClass(iX, iY, this.FixedNumber);
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    return new RectangleClass(this.GetLeft(), this.GetTop(), this.GetWidth(), this.GetHeihgt());
  }
  //获取包围圆形
  GetCircleBounding() {
    return new CircleClass(this.GetCenterPoint(), parseFloat((this.GetWidth() / 2).toFixed(this.FixedNumber)));
  }
  //获取与另一条直线的交点
  GetIntersectLine(eline) {
    if (this.IsExistIntersectLine(eline)) {
      var denominator = (this.Point2.Y - this.Point1.Y) * (eline.Point2.X - eline.Point1.X) - (this.Point1.X - this.Point2.X) * (eline.Point1.Y - eline.Point2.Y);
      if (denominator != 0) {
        // 线段所在直线的交点坐标 (x , y)      
        var ix = ((this.Point2.X - this.Point1.X) * (eline.Point2.X - eline.Point1.X) * (eline.Point1.Y - this.Point1.Y) +
          (this.Point2.Y - this.Point1.Y) * (eline.Point2.X - eline.Point1.X) * this.Point1.X -
          (eline.Point2.Y - eline.Point1.Y) * (this.Point2.X - this.Point1.X) * eline.Point1.X) / denominator;
        var iy = -((this.Point2.Y - this.Point1.Y) * (eline.Point2.Y - eline.Point1.Y) * (eline.Point1.X - this.Point1.X) +
          (this.Point2.X - this.Point1.X) * (eline.Point2.Y - eline.Point1.Y) * this.Point1.Y -
          (eline.Point2.X - eline.Point1.X) * (this.Point2.Y - this.Point1.Y) * eline.Point1.Y) / denominator;
        ix = ix.toFixed(this.FixedNumber);
        iy = iy.toFixed(this.FixedNumber);
        return new PointClass(ix, iy, this.FixedNumber);
      }
    }
    return null;
  }
  //判断是否存在交点，两条直线段
  IsExistIntersectLine(eline) {
    // 三角形abc 面积的2倍  
    var area_abc = (this.Point1.X - eline.Point1.X) * (this.Point2.Y - eline.Point1.Y) - (this.Point1.Y - eline.Point1.Y) * (this.Point2.X - eline.Point1.X);
    var area_abc = (this.Point1.X - eline.Point1.X) * (this.Point2.Y - eline.Point1.Y) - (this.Point1.Y - eline.Point1.Y) * (this.Point2.X - eline.Point1.X);
    // 三角形abd 面积的2倍  
    var area_abd = (this.Point1.X - eline.Point2.X) * (this.Point2.Y - eline.Point2.Y) - (this.Point1.Y - eline.Point2.Y) * (ep2x - eline.Point2.X);
    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理);  
    if (area_abc * area_abd >= 0) {
      return false;
    }
    // 三角形cda 面积的2倍  
    var area_cda = (eline.Point1.X - this.Point1.X) * (eline.Point2.Y - this.Point1.Y) - (eline.Point1.Y - this.Point1.Y) * (eline.Point2.X - this.Point1.X);
    // 三角形cdb 面积的2倍  
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
    var area_cdb = area_cda + area_abc - area_abd;
    if (area_cda * area_cdb >= 0) {
      return false;
    }
    return true;
  }
  //获取与矩形的交点
  GetIntersectRectangle(erectangle) {
    var ipointarr = [];
    if (this.IsExistIntersectRectangle(erectangle)) {
      var il1 = new LineClass(erectangle.GetLeft(), erectangle.GetTop(), erectangle.GetRight(), erectangle.GetTop());
      var il2 = new LineClass(erectangle.GetRight(), erectangle.GetTop(), erectangle.GetRight(), erectangle.GetBottom());
      var il3 = new LineClass(erectangle.GetLeft(), erectangle.GetBottom(), erectangle.GetRight(), erectangle.GetBottom());
      var il4 = new LineClass(erectangle.GetLeft(), erectangle.GetTop(), erectangle.GetLeft(), erectangle.GetBottom());
      if (this.IsExistIntersectLine(il1)) {
        var iliarr1 = this.GetIntersectLine(il1);
        if (iliarr1.length > 0) {
          for (var i = 0; i < iliarr1.length; i++) {
            ipointarr.push(iliarr1[i]);
          }
        }
      }
      if (this.IsExistIntersectLine(il2)) {
        var iliarr2 = this.GetIntersectLine(il2);
        if (iliarr2.length > 0) {
          for (var i = 0; i < iliarr2.length; i++) {
            ipointarr.push(iliarr2[i]);
          }
        }
      }

      if (this.IsExistIntersectLine(il3)) {
        var iliarr3 = this.GetIntersectLine(il3);
        if (iliarr3.length > 0) {
          for (var i = 0; i < iliarr3.length; i++) {
            ipointarr.push(iliarr3[i]);
          }
        }
      }
      if (this.IsExistIntersectLine(il4)) {
        var iliarr4 = this.GetIntersectLine(il4);
        if (iliarr4.length > 0) {
          for (var i = 0; i < iliarr4.length; i++) {
            ipointarr.push(iliarr4[i]);
          }
        }
      }
    }
    return ipointarr;
  }
  IsExistIntersectRectangle(erectangle) {
    if ((erectangle.ContainsPoint(this.Point1)) || (erectangle.ContainsPoint(this.Point2))) {
      return true;
    } else {
      var il1 = new LineClass(erectangle.GetLeft(), erectangle.GetTop(), erectangle.GetRight(), erectangle.GetBottom());
      var il2 = new LineClass(erectangle.GetLeft(), erectangle.GetBottom(), erectangle.GetRight(), erectangle.GetTop());
      if (eline.IsExistIntersectLine(il1) || eline.IsExistIntersectLine(il2)) {
        return true;
      }
    }
    return false;
  }
  //获取与多边形的交点
  GetIntersectPolygon(epolygon) {
    var iIntersectList = [];
    var iLineList = epolygon.GetLineList();
    for (var i = 0; i < iLineList; i++) {
      if (this.IsExistIntersectLine(iLineList[i])) {
        iIntersectList.push(this.GetIntersectLine(iLineList[i]));
      }
    }
    return iIntersectList;
  }
  IsExistIntersectPolygon(epolygon) {
    //首先获取所有的多边形线段。
    var iLineList = epolygon.GetLineList();
    for (var i = 0; i < iLineList; i++) {
      if (this.IsExistIntersectLine(iLineList[i])) {
        return true;
      }
    }
    return false;
  }
  //获取与另一条二次贝塞尔曲线的交点QuadraticBezierCurve
  GetIntersectQBCurve(eqbcurve) {
    var resultPointArr = new Array();
    resultPointArr = this.IQBCAlgorithm(this, eqbcurve, resultPointArr, Common.BezierCurveAlgorithmCycles, 0, 1.0);
    return resultPointArr;
  }
  IsExistIntersectQBCurve(eqbcurve) {
    var resultPointArr = new Array();
    if (this.IsExistIntersectPolygon(eqbcurve.GetPolygonBounding())) {
      return true;
    } else {
      resultPointArr = this.IQBCAlgorithm(this, eqbcurve, resultPointArr, Common.BezierCurveAlgorithmCycles, 0, 1.0);
      if (resultPointArr.length > 0) {
        return true;
      }
    }
    return false;
  }
  IQBCAlgorithm(eline, eqbcurve, earr, ecycles, et1, et2) {
    var iNewCP1x, iNewCP1y, iNewCP2x, iNewCP2y, iNewCP3x, iNewCP3y;
    var iNewCQ1x, iNewCQ1y, iNewCQ2x, iNewCQ2y, iNewCQ3x, iNewCQ3y;
    var iCurve1, iCurve2;
    var iFengePoint;
    var iCankaoPoint1, iCankaoPoint2;
    var iKongzhiPoint1, iKongzhiPoint2;
    var iBoundingBox;
    iBoundingBox = eqbcurve.GetBoundingBox();
    if (MiaoCommonFun.IsLineIntersectBoundingBox(eLine, iBoundingBox)) {
      iCankaoPoint1 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.2);
      iCankaoPoint2 = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.7);
      iFengePoint = MiaoCommonFun.GetQBezierCurvaturesPointByT(eCurve.X1, eCurve.Y1, eCurve.X2, eCurve.Y2, eCurve.X3, eCurve.Y3, 0.5);
      iKongzhiPoint1 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(eCurve.X1, eCurve.Y1, iFengePoint.X, iFengePoint.Y, iCankaoPoint1.X, iCankaoPoint1.Y, 0.4);
      iKongzhiPoint2 = MiaoCommonFun.GetBezierQCurvaturesControlPoint(iFengePoint.X, iFengePoint.Y, eCurve.X3, eCurve.Y3, iCankaoPoint2.X, iCankaoPoint2.Y, 0.4);
      iNewCP1x = eCurve.X1;
      iNewCP1y = eCurve.Y1;
      iNewCP2x = iKongzhiPoint1.X;
      iNewCP2y = iKongzhiPoint1.Y;
      iNewCP3x = iFengePoint.X;
      iNewCP3y = iFengePoint.Y;
      iCurve1 = {
        'X1': iNewCP1x,
        'Y1': iNewCP1y,
        'X2': iNewCP2x,
        'Y2': iNewCP2y,
        'X3': iNewCP3x,
        'Y3': iNewCP3y
      };
      iNewCQ1x = iFengePoint.X;
      iNewCQ1y = iFengePoint.Y;
      iNewCQ2x = iKongzhiPoint2.X;
      iNewCQ2y = iKongzhiPoint2.Y;
      iNewCQ3x = eCurve.X3;
      iNewCQ3y = eCurve.Y3;
      iCurve2 = {
        'X1': iNewCQ1x,
        'Y1': iNewCQ1y,
        'X2': iNewCQ2x,
        'Y2': iNewCQ2y,
        'X3': iNewCQ3x,
        'Y3': iNewCQ3y
      };
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
          //console.info(Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, Common.FixedNumber));
          ePointArr.push({
            'X': iFengePoint.X,
            'Y': iFengePoint.Y,
            'T': Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, Common.FixedNumber)
          });
        }
      } else {
        eUpL = eUpL - 1;
        if (eUpL > 0) {
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q(eLine, iCurve1, ePointArr, eUpL, eT1, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, Common.FixedNumber));
          ePointArr = MiaoCommonFun.JiaoDianDiguiPanbieL2Q(eLine, iCurve2, ePointArr, eUpL, Math.formatFloat(((eT2 - eT1) * 0.5) + eT1, Common.FixedNumber), eT2);
        }
      }
    }
    return ePointArr;
  }
  //获取与另一条三次贝塞尔曲线的交点ThreeBezierCurve
  GetIntersectTBCurve() {}
  //判断是否和一个线平行
  IsParallel(eline) {}
  //判断两条线段是否共线
  IsCollinear(eline) {}
  //判断某个点是否在这条线上
  ContainsPoint(ep) {
    var s1 = ep.X - this.Point1.X,
      t1 = ep.Y - this.Point1.Y; //Q-P1(s1,t1)  
    var s2 = this.Point1.X - this.Point2.X,
      t2 = this.Point1.Y - this.Point1.Y; //P1-P2(s2,t2)
    if (parseFloat(((s1 * t2) - (t1 * s2)).toFixed(this.FixedNumber)) == 0) {
      return true;
    }
    return false;
  }
  //获取直线上的一个点
  GetPointByT(et) {
    if (_.isUndefined(et)) {
      var et = 0.5;
    }
    var ix = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    var iy = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    var ipoint = new PointClass(ix, iy, this.FixedNumber);
    return ipoint;
  }
}


module.exports = LineClass;