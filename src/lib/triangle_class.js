//六边形类
const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const LineClass = require('./line_class.js');
const RectangleClass = require('./rectangle_class.js');
const CircleClass = require('./circle_class.js');
//三角形
class TriangleClass {
  constructor() {
    // 属性
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Point1 = new PointClass();
    this.Point2 = new PointClass();
    this.Point3 = new PointClass();
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {

      if (arguments.length == 7) {
        if (_.isNumber(arguments[6])) {
          this.FixedNumber = arguments[6];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Point2.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[4])) && (_.isNumber(arguments[5]))) {
          this.Point3.Set(parseFloat(arguments[4].toFixed(this.FixedNumber)), parseFloat(arguments[5].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }

      if (arguments.length == 6) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Point2.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[4])) && (_.isNumber(arguments[5]))) {
          this.Point3.Set(parseFloat(arguments[4].toFixed(this.FixedNumber)), parseFloat(arguments[5].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }
      if (arguments.length == 4) {
        if (_.isNumber(arguments[3])) {
          this.FixedNumber = arguments[3];
        }
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1])) && (_.isArray(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1])) && (Common.IsJson(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
        if ((PointClass.IsClass(arguments[0])) && (PointClass.IsClass(arguments[1])) && (PointClass.IsClass(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
      }
      if (arguments.length == 3) {
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1])) && (_.isArray(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1])) && (Common.IsJson(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
        if ((PointClass.IsClass(arguments[0])) && (PointClass.IsClass(arguments[1])) && (PointClass.IsClass(arguments[2]))) {
          this.Point1.Set(arguments[0]);
          this.Point2.Set(arguments[1]);
          this.Point3.Set(arguments[2]);
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 7) {
            if (!(_.isUndefined(arguments[0][6]))) {
              if (_.isNumber(arguments[0][6])) {
                this.FixedNumber = arguments[0][6];
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
            if ((!(_.isUndefined(arguments[0][4]))) && (!(_.isUndefined(arguments[0][5])))) {
              if ((_.isNumber(arguments[0][4])) && (_.isNumber(arguments[0][5]))) {
                this.Point3.Set(arguments[0][4], arguments[0][5], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 6) {
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
            if ((!(_.isUndefined(arguments[0][4]))) && (!(_.isUndefined(arguments[0][5])))) {
              if ((_.isNumber(arguments[0][4])) && (_.isNumber(arguments[0][5]))) {
                this.Point3.Set(arguments[0][4], arguments[0][5], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 4) {
            if (_.isNumber(arguments[0][3])) {
              this.FixedNumber = arguments[0][3];
            }
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1])) && (_.isArray(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1])) && (Common.IsJson(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1])) && (PointClass.IsClass(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
          }

          if (arguments[0].length == 3) {
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1])) && (_.isArray(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1])) && (Common.IsJson(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1])) && (PointClass.IsClass(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point3.Set(arguments[0][2]);
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            this.FixedNumber = arguments[0].FixedNumber;
          }
          this.Point1.Set(arguments[0].Point1);
          this.Point2.Set(arguments[0].Point2);
          this.Point3.Set(arguments[0].Point3);
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Point1.Set(arguments[0].Point1);
          this.Point2.Set(arguments[0].Point2);
          this.Point3.Set(arguments[0].Point3);
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new TriangleClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(el) {
    if ((this.Point1.Equal(el.Point1)) && (this.Point2.Equal(el.Point2)) && (this.Point3.Equal(el.Point3))) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(el) {
    if ((his.Point1.ExactlyEqual(el.Point1)) && (this.Point2.ExactlyEqual(el.Point2)) && (this.Point3.ExactlyEqual(el.Point3)) && this.FixedNumber == el.FixedNumber) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(el, ec) {
    if (this.Point1.ApproximatelyEqual(el.Point1, ec) && this.Point2.ApproximatelyEqual(el.Point2, ec) && this.Point3.ApproximatelyEqual(el.Point3, ec)) {
      return true;
    }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof TriangleClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 6) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Point1.Translate(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Point2.Translate(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[4])) && (_.isNumber(arguments[5]))) {
          this.Point3.Translate(parseFloat(arguments[4].toFixed(this.FixedNumber)), parseFloat(arguments[5].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }
      if (arguments.length == 3) {
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1])) && (_.isArray(arguments[2]))) {
          this.Point1.Translate(arguments[0]);
          this.Point2.Translate(arguments[1]);
          this.Point3.Translate(arguments[2]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1])) && (Common.IsJson(arguments[2]))) {
          this.Point1.Translate(arguments[0]);
          this.Point2.Translate(arguments[1]);
          this.Point3.Translate(arguments[2]);
        }
        if ((PointClass.IsClass(arguments[0])) && (PointClass.IsClass(arguments[1])) && (PointClass.IsClass(arguments[2]))) {
          this.Point1.Translate(arguments[0]);
          this.Point2.Translate(arguments[1]);
          this.Point3.Translate(arguments[2]);
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 6) {
            if ((!(_.isUndefined(arguments[0][0]))) && (!(_.isUndefined(arguments[0][1])))) {
              if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
                this.Point1.Translate(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if ((!(_.isUndefined(arguments[0][2]))) && (!(_.isUndefined(arguments[0][3])))) {
              if ((_.isNumber(arguments[0][2])) && (_.isNumber(arguments[0][3]))) {
                this.Point2.Translate(arguments[0][2], arguments[0][3], this.FixedNumber);
              }
            }
            if ((!(_.isUndefined(arguments[0][4]))) && (!(_.isUndefined(arguments[0][5])))) {
              if ((_.isNumber(arguments[0][4])) && (_.isNumber(arguments[0][5]))) {
                this.Point3.Translate(arguments[0][4], arguments[0][5], this.FixedNumber);
              }
            }
          }
          if (arguments[0].length == 3) {
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1])) && (_.isArray(arguments[0][2]))) {
              this.Point1.Translate(arguments[0][0]);
              this.Point2.Translate(arguments[0][1]);
              this.Point3.Translate(arguments[0][2]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1])) && (Common.IsJson(arguments[0][2]))) {
              this.Point1.Translate(arguments[0][0]);
              this.Point2.Translate(arguments[0][1]);
              this.Point3.Translate(arguments[0][2]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1])) && (PointClass.IsClass(arguments[0][2]))) {
              this.Point1.Translate(arguments[0][0]);
              this.Point2.Translate(arguments[0][1]);
              this.Point3.Translate(arguments[0][2]);
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          this.Point1.Translate(arguments[0].Point1);
          this.Point2.Translate(arguments[0].Point2);
          this.Point3.Translate(arguments[0].Point3);
        }
        if (this.IsClass(arguments[0])) {
          this.Point1.Translate(arguments[0].Point1);
          this.Point2.Translate(arguments[0].Point2);
          this.Point3.Translate(arguments[0].Point3);
        }
      }
    }
  }
  Ceil() {
    this.Point1.Ceil();
    this.Point2.Ceil();
    this.Point3.Ceil();
    return this;
  }
  Floor() {
    this.Point1.Floor();
    this.Point2.Floor();
    this.Point3.Floor();
    return this;
  }
  Round() {
    this.Point1.Round();
    this.Point2.Round();
    this.Point3.Round();
    return this;
  }
  Random() {
    this.Point1.Random();
    this.Point2.Random();
    this.Point3.Random();
    return this;
  }
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate(eAngle, eOrgPoint) {
    this.Point1.Rotate(eAngle, eOrgPoint);
    this.Point2.Rotate(eAngle, eOrgPoint);
    this.Point3.Rotate(eAngle, eOrgPoint);
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Point1.Scale(eo);
    this.Point2.Scale(eo);
    this.Point3.Scale(eo);
    return this;
  }
  //将三个点顺序交换 > 1-3-2
  SwapPoint() {
    var t = new PointClass();
    t.Set(this.Point3);
    this.Point3.Set(this.Point2);
    this.Point2.Set(t);
    return this;
  }
  //将三个点顺序交换 > 2-3-1
  SwapPoint1() {
    var t = new PointClass();
    t.Set(this.Point1);
    this.Point1.Set(this.Point2);
    this.Point2.Set(this.Point3);
    this.Point3.Set(t);
    return this;
  }
  //将三个点顺序交换 > 3-1-2
  SwapPoint2() {
    var t = new PointClass();
    t.Set(this.Point1);
    this.Point1.Set(this.Point3);
    this.Point3.Set(this.Point2);
    this.Point2.Set(t);
    return this;
  }
  GetLine(e) {
    var iLine1 = new LineClass(this.Point1, this.point2, this.FixedNumber);
    var iLine2 = new LineClass(this.Point2, this.point3, this.FixedNumber);
    var iLine3 = new LineClass(this.Point3, this.point1, this.FixedNumber);
    if (_.isNumber(e)) {
      if (e == 0) {
        return iLine1;
      }
      if (e == 1) {
        return iLine2;
      }
      if (e == 2) {
        return iLine3;
      }
    }
    var iLineList = [];
    iLineList.push(iLine1);
    iLineList.push(iLine2);
    iLineList.push(iLine3);
    return iLineList;
  }
  //获取斜率
  GetSlope(e) {
    var iLineList = this.GetLine();
    if (_.isNumber(e)) {
      if (e == 0) {
        return iLineList[0].GetSlope();
      }
      if (e == 1) {
        return iLineList[1].GetSlope();
      }
      if (e == 2) {
        return iLineList[2].GetSlope();
      }
    }
    var iSlopeArr = [];
    iSlopeArr.push(iLineList[0].GetSlope());
    iSlopeArr.push(iLineList[1].GetSlope());
    iSlopeArr.push(iLineList[2].GetSlope());
    return iSlopeArr;
  }
  //获取角度
  GetAngle(e) {
    var iLineList = this.GetLine();
    if (_.isNumber(e)) {
      if (e == 0) {
        return iLineList[0].GetAngle();
      }
      if (e == 1) {
        return iLineList[1].GetAngle();
      }
      if (e == 2) {
        return iLineList[2].GetAngle();
      }
    }
    var iSlopeArr = [];
    iSlopeArr.push(iLineList[0].GetAngle());
    iSlopeArr.push(iLineList[1].GetAngle());
    iSlopeArr.push(iLineList[2].GetAngle());
    return iSlopeArr;
  }
  //获取长度
  GetLength() {
    var iLineList = this.GetLine();
    return iLineList[0].length + iLineList[1].length + iLineList[2].length;
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    var ileft, iright, ibottom, itop;
    var iPointList = [this.Point1, this.Point2, this.Point3]
    _.each(iPointList, function (ele, index) {
      if (index == 0) {
        ileft = ele.X;
        iright = ele.X;
        ibottom = ele.Y;
        itop = ele.Y;
      }
      if (ele.X < ileft) {
        ileft = ele.X;
      }
      if (ele.X > iright) {
        iright = ele.X;
      }
      if (ele.Y > itop) {
        itop = ele.X;
      }
      if (ele.Y < ibottom) {
        ibottom = ele.X;
      }
    });
    if ((_.isUndefined(ileft)) || (_.isUndefined(iright)) || (_.isUndefined(itop)) || (_.isUndefined(ibottom))) {
      return null;
    }
    var ix = ileft;
    var iy = ibottom;
    var iwidth = iright - ileft;
    var iheight = itop - ibottom;
    return new RectangleClass(ix, iy, iwidth, iheight, this.FixedNumber);
  }
  //获取包围圆形，注意这里不是外接圆
  GetBoundingCircle() {
    var iP1 = 0,
      iP2 = 1,
      iT1 = 0,
      iT2 = 0;
    iT2 = this.Point1.GetDistanceToPoint(this.Point2);
    if (iT1 < iT2) {
      iT1 = iT2;
      iP1 = 1;
      iP2 = 2;
    }
    iT2 = this.Point2.GetDistanceToPoint(this.Point3);
    if (iT1 < iT2) {
      iT1 = iT2;
      iP1 = 2;
      iP2 = 3;
    }
    iT2 = this.Point3.GetDistanceToPoint(this.Point1);
    if (iT1 < iT2) {
      iT1 = iT2;
      iP1 = 3;
      iP2 = 1;
    }
    var iLine = new LineClass(iP1, iP2, this.FixedNumber);
    return new CircleClass(iLine.GetCenterPoint(), iLine.length / 2, this.FixedNumber);
  }
  GetCenterPoint() {
    var iLine1 = new LineClass(this.Point1, this.Point2, this.FixedNumber);
    var iLine2 = new LineClass(this.Point2, this.Point3, this.FixedNumber);
    var iPoint1 = iLine1.GetCenterPoint();
    var iPoint2 = iLine2.GetCenterPoint();
    var iLine3 = new LineClass(iPoint1, this.Point3, this.FixedNumber);
    var iLine4 = new LineClass(iPoint1, this.Point1, this.FixedNumber);
    return iLine3.GetIntersectLine(iLine4);
  }
  //获取外接圆
  GetCircumcircle() {
    var iPoint0 = this.GetCenterPoint();
    var iR = iPoint0.GetDistanceToPoint(this.Point1);
    return new CircleClass(iPoint0, iR, this.FixedNumber);
  }
  //获取内切圆
  GetIncircle() {
    var iPoint0 = this.GetCenterPoint();
    var iR = iPoint0.GetDistanceToPoint(this.iPoint1);
    return new CircleClass(iPoint0, iR, this.FixedNumber);
  }
  //获取与另一条直线的交点
  GetIntersectLine() {}
  //获取与另一条二次贝塞尔曲线的交点QuadraticBezierCurve
  GetIntersectQBezierCurve() {}
  //获取与另一条三次贝塞尔曲线的交点ThreeBezierCurve
  GetIntersectTBezierCurve() {}
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


module.exports = TriangleClass;