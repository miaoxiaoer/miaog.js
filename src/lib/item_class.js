const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const LineClass = require('./line_class.js');
const RectangleClass = require('./rectangle_class.js');
const CircleClass = require('./circle_class.js');
//组件单元
class ItemClass {
  constructor() {
    // 属性
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Location = new PointClass(0, 0, this.FixedNumber);
    this.Radius = 0;
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
          this.Point2.Set(parseFloat(arguments[4].toFixed(this.FixedNumber)), parseFloat(arguments[5].toFixed(this.FixedNumber)), this.FixedNumber);
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
          this.Point2.Set(arguments[2]);
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
          this.Point2.Set(arguments[2]);
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
              this.Point2.Set(arguments[0][2]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1])) && (Common.IsJson(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point2.Set(arguments[0][2]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1])) && (PointClass.IsClass(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point2.Set(arguments[0][2]);
            }
          }

          if (arguments[0].length == 3) {
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1])) && (_.isArray(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point2.Set(arguments[0][2]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1])) && (Common.IsJson(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point2.Set(arguments[0][2]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (PointClass.IsClass(arguments[0][1])) && (PointClass.IsClass(arguments[0][2]))) {
              this.Point1.Set(arguments[0][0]);
              this.Point2.Set(arguments[0][1]);
              this.Point2.Set(arguments[0][2]);
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
        if (arguments[0] instanceof QuadraticBezierCurveClass) {
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
    var aNewClass = new QuadraticBezierCurveClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(el) {
    if (((this.Point1.Equal(el.Point1)) && (this.Point2.Equal(el.Point2)) && (this.Point3.Equal(el.Point3))) || ((this.Point1.Equal(el.Point3)) && (this.Point2.Equal(el.Point2)) && (this.Point3.Equal(el.Point1)))) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(el) {
    if (((this.Point1.ExactlyEqual(el.Point1)) && (this.Point2.ExactlyEqual(el.Point2)) && this.FixedNumber == el.FixedNumber) || ((this.Point1.ExactlyEqual(el.Point2)) && (this.Point2.ExactlyEqual(el.Point1)) && this.FixedNumber == el.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(el, ec) {
    if (((this.Point1.ApproximatelyEqual(el.Point1, ec)) && (this.Point2.ApproximatelyEqual(el.Point2, ec))) || ((this.Point1.ApproximatelyEqual(el.Point2, ec)) && (this.Point2.ApproximatelyEqual(el.Point1, ec)))) {
      return true;
    }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof LineClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 5) {
        this.Point1.Add(arguments[0], arguments[1], arguments[4]);
        this.Point2.Add(arguments[2], arguments[3], arguments[4]);
      }
      if (arguments.length == 4) {
        this.Point1.Add(arguments[0], arguments[1], this.FixedNumber);
        this.Point2.Add(arguments[2], arguments[3], this.FixedNumber);
      }
      if (arguments.length == 3) {
        this.Point1.Add(arguments[0], arguments[2]);
        this.Point2.Add(arguments[1], arguments[2]);
      }
      if (arguments.length == 2) {
        this.Point1.Add(arguments[0]);
        this.Point2.Add(arguments[1]);
      }
      if (arguments.length == 1) {
        if (arguments[0] instanceof LineClass) {
          this.Point1.Add(arguments[0].Point1);
          this.Point2.Add(arguments[0].Point2);
        }
        if (arguments[0] instanceof PointClass) {
          this.Point1.Add(arguments[0]);
          this.Point2.Add(arguments[0]);
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
  SwapPoint() {
    var t = new PointClass();
    t.Set(this.Point1);
    this.Point2.Set(this.Point1);
    this.Point1.Set(t);
    return this;
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
  //获取包围矩形，默认是Rectangle
  GetBounding() {}
  //获取包围圆形
  GetBoundingCircle() {}
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
  IsEmpty() {
    if (this.Radius == 0) {
      return true;
    } else {
      return false;
    }
  }
  SetEmpty() {
    this.Radius = 0;
  }
}


module.exports = HexagonClass;