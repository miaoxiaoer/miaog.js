//点类 (ND空间: N维空间中的点)
const Common = require('./common.js');
const _ = require('lodash');

class PointClass {
  constructor() {
    // 属性
    this.Pointset = new Array();//x位置
    this.FixedNumber = Common.FixedNumber;
    eval(Common.GetSetFunStr(arguments));
  }
  // Set是设置方法，根据参数的多少有不同的设置方式，如果没有参数则不设置任何属性，都是原来的值。
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        if (_.isNumber(arguments[1])) {
          this.FixedNumber = arguments[1];
        }
        if (_.isArray(arguments[0])) {

          this.Pointset = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
        }
        if (this.IsClass(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
        if (Common.IsJson(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          if (_.isNumber(arguments[0].X)) {
            this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[0].Y)) {
            this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
          }
        }
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
          if (_.isNumber(arguments[1])) {
            this.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }
      if (arguments.length == 1) {
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 3) {
            if (!(_.isUndefined(arguments[0][2]))) {
              if (_.isNumber(arguments[0][2])) {
                this.FixedNumber = arguments[0][2];
              }
            }
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Y = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Y = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
          if (arguments[0].length == 1) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
                this.Y = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            if (_.isNumber(arguments[0][0])) {
              this.FixedNumber = arguments[0].FixedNumber;
            }
          }
          if (!(_.isUndefined(arguments[0].X))) {
            if (_.isNumber(arguments[0].X)) {
              this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Y))) {
            if (_.isNumber(arguments[0].Y)) {
              this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
            }
          }
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new PointClass(this);
    return aNewClass;
  }
  //仅仅判断XY是否相等
  Equal(ep) {
    if ((ep.X == this.X) && (ep.Y == this.Y)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(ep) {
    if ((ep.X == this.X) && (ep.Y == this.Y) && (ep.FixedNumber == this.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(ep, ec) {
    //Math.formatFloat(0.1 + 0.2, 1) === 0.3;
    if (ec === undefined) {
      ec = 1.0;
    }
    var idX = (ep.X - this.X) * (ep.X - this.X);
    var idY = (ep.Y - this.Y) * (ep.Y - this.Y);
    var idP = (idX + idY);
    var idC = ec * ec;
    if ((ep.X == this.X) && (ep.Y == this.Y)) {
      return true;
    } else if (idP < idC) {
      return true;
    }
    return false;
  }
  //获取X的数值，等价于thix.X
  GetX() {
    return this.X;
  }
  //获取Y的数值，等价于thix.Y
  GetY() {
    return this.Y;
  }
  //判断是否点类
  IsClass(e) {
    return e instanceof PointClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Y += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length == 1) {
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X += parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Y += parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].X))) {
            if (_.isNumber(arguments[0].X)) {
              this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Y))) {
            if (_.isNumber(arguments[0].Y)) {
              this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
            }
          }
        }
        if (this.IsClass(arguments[0])) {
          this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  //向量
  Add() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Y += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length == 1) {
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X += parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Y += parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].X))) {
            if (_.isNumber(arguments[0].X)) {
              this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Y))) {
            if (_.isNumber(arguments[0].Y)) {
              this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
            }
          }
        }
        if (this.IsClass(arguments[0])) {
          this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  Abs() {
    this.X = Math.abs(this.X);
    this.Y = Math.abs(this.Y);
    return this;
  }
  Ceil() {
    this.X = Math.ceil(this.X);
    this.Y = Math.ceil(this.Y);
    return this;
  }
  Floor() {
    this.X = Math.floor(this.X);
    this.Y = Math.floor(this.Y);
    return this;
  }
  Round() {
    this.X = Math.round(this.X);
    this.Y = Math.round(this.Y);
    return this;
  }
  Random() {
    this.X = parseFloat(Math.random().toFixed(this.FixedNumber));
    this.Y = parseFloat(Math.random().toFixed(this.FixedNumber));
    return this;
  }
  Rnd(emin, emax) {
    this.X = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    this.Y = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    return this;
  }
  //获取当前点得向量，如果ep不存在，则返回当前点作为向量
  GetVector(ep) {
    if (ep) {
      return new PointClass(ep.X - this.X, ep.Y - this.Y, this.FixedNumber);
    }
    return this;
  }
  // 获取当前点到另一个点的内积
  GetDot(ep) {
    return parseFloat((this.X * ep.X).toFixed(this.FixedNumber)) + parseFloat((this.Y * ep.Y).toFixed(this.FixedNumber));
  }
  // 获取当前点到另一个点的外积
  // 通过结果的正负判断两矢量之间的顺逆时针关系
  // 若 a x b > 0表示a在b的顺时针方向上
  // 若 a x b < 0表示a在b的逆时针方向上
  // 若 a x b == 0表示a在b共线，但不确定方向是否相同
  GetCross(ep) {
    return parseFloat((this.X * ep.Y).toFixed(this.FixedNumber)) + parseFloat((this.Y * ep.X).toFixed(this.FixedNumber));
  }
  //返回这个点的模
  GetModulo(ep) {
    ep = ep | this;
    return Math.sqrt(this.GetDot(ep));
  }
  //可以根据集合意义求两向量的夹角，如果radian是 true ，则返回弧度
  GetAngle(ep, eradian) {
    eradian = eradian | true;
    var hd = Maht.acos(this.GetDot(ep) / parseFloat((this.GetModulo() * ep.GetModulo()).toFixed(this.FixedNumber)));
    if (eradian) {
      return hd;
    }
    return 180 / Math.PI * hd;
  }
  //返回这个点到另一个点的距离，点积求距离的算法，这里的eq是一个数值，如果eq为 true 则返回一个开方的数值，如果是false，则不开方，主要是为了计算，开方效率差很多
  GetDistanceToPoint(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt((this.X * this.X) + (ep.X * ep.X) - (2 * ep.X * this.X * (Math.cos(this.Y - ep.Y)))).toFixed(this.FixedNumber));
    }
    return parseFloat((this.X * this.X) + (ep.X * ep.X) - (2 * ep.X * this.X * (Math.cos(this.Y - ep.Y))).toFixed(this.FixedNumber));
  }
  //这是求两点的距离，用勾股定理算法a2+b2 =c2
  GetDistanceToPoint2(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt(((this.X - ep.X) * (this.X - ep.X)).toFixed(this.FixedNumber) + ((this.Y - ep.Y) * (this.Y - ep.Y)).toFixed(this.FixedNumber)).toFixed(this.FixedNumber));
    }
    return ((this.X - ep.X) * (this.X - ep.X)).toFixed(this.FixedNumber) + ((this.Y - ep.Y) * (this.Y - ep.Y)).toFixed(this.FixedNumber);
  }
  //点到线段的距离
  GetDistanceToLine(eline) {
    return eline.GetDistanceToPoint(this);
  }
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate(eAngle, eOrgPoint) {
    var iAngle = ((Math.PI / 180) * eAngle);
    var iOrgPoint = eOrgPoint || {
      "X": 0,
      "Y": 0
    };
    var iX = this.X;
    var iY = this.Y;
    //x1 = cos(angle) * x - sin(angle) * y; y1 = cos(angle) * y + sin(angle) * x;
    iX = (Math.cos(iAngle) * (this.X - eOrgPoint.X)) - (Math.sin(iAngle) * (this.Y - eOrgPoint.Y)) + eOrgPoint.X;
    iY = (Math.cos(iAngle) * (this.Y - eOrgPoint.Y)) + (Math.sin(iAngle) * (this.X - eOrgPoint.X)) + eOrgPoint.Y;
    this.X = iX;
    this.Y = iY;
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.X = this.X * eo;
    this.Y = this.Y * eo;
    return this;
  }
  //将XY轴交换
  SwapXY() {
    var t = this.X;
    this.X = this.Y;
    this.Y = t;
    return this;
  }
  //X轴对称
  XSymmetry() {
    this.Y = 0 - this.Y;
    return this;
  }
  //Y轴对称
  YSymmetry() {
    this.X = 0 - this.X;
    return this;
  }
  //原点对称
  OSymmetry() {
    this.X = 0 - this.X;
    this.Y = 0 - this.Y;
    return this;
  }
  //输出Json对象
  ToJson() {
    return {
      'X': this.X,
      'Y': this.Y,
      'FixedNumber': this.FixedNumber
    };
  }
  //输出Size的Json对象
  ToSizeJson() {
    return {
      'Width': this.Width,
      'Height': this.Height,
      'FixedNumber': this.FixedNumber
    };
  }
}


module.exports = PointClass;