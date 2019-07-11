const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const RectangleClass = require('./rectangle_class.js');
//环形类
class AnnularClass {
  constructor() {
    // 属性心形是一条对称的贝塞尔曲线
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Location = new PointClass();
    this.Radius = 0;
    this.RadiusWidth = 0;
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {

      if (arguments.length == 5) {
        if (_.isNumber(arguments[4])) {
          this.FixedNumber = arguments[4];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if (_.isNumber(arguments[2])) {
          this.Radius = arguments[2];
        }
        if (_.isNumber(arguments[3])) {
          this.RadiusWidth = arguments[3];
        }
      }

      if (arguments.length == 4) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
          if (_.isNumber(arguments[2])) {
            this.Radius = arguments[2];
          }
          if (_.isNumber(arguments[3])) {
            this.RadiusWidth = arguments[3];
          }
        }
        if (_.isArray(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[3])) {
            this.FixedNumber = arguments[3];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = arguments[1];
          }
          if (_.isNumber(arguments[2])) {
            this.RadiusWidth = arguments[2];
          }
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[3])) {
            this.FixedNumber = arguments[3];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = arguments[1];
          }
          if (_.isNumber(arguments[2])) {
            this.RadiusWidth = arguments[2];
          }
        }
        if (PointClass.IsClass(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[3])) {
            this.FixedNumber = arguments[3];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = arguments[1];
          }
          if (_.isNumber(arguments[2])) {
            this.RadiusWidth = arguments[2];
          }
        }
      }
      if (arguments.length == 3) {
        if ((_.isArray(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
          this.Location.Set(arguments[0]);
          this.Radius = arguments[1];
          this.RadiusWidth = arguments[2];
        }
        if ((Common.IsJson(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
          this.Location.Set(arguments[0]);
          this.Radius = arguments[1];
          this.RadiusWidth = arguments[2];
        }
        if ((PointClass.IsClass(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
          this.Location.Set(arguments[0]);
          this.Radius = arguments[1];
          this.RadiusWidth = arguments[2];
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
                this.Location.Set(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if (!_.isUndefined(arguments[0][2])) {
              if (_.isNumber(arguments[0][2])) {
                this.Radius = arguments[2];
              }
            }
            if (!_.isUndefined(arguments[0][3])) {
              if (_.isNumber(arguments[0][3])) {
                this.RadiusWidth = arguments[3];
              }
            }
          }

          if (arguments[0].length == 4) {
            if ((!(_.isUndefined(arguments[0][0]))) && (!(_.isUndefined(arguments[0][1])))) {
              if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
                this.Location.Set(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if (!_.isUndefined(arguments[0][2])) {
              if (_.isNumber(arguments[0][2])) {
                this.Radius = arguments[2];
              }
            }
            if (!_.isUndefined(arguments[0][3])) {
              if (_.isNumber(arguments[0][3])) {
                this.RadiusWidth = arguments[3];
              }
            }
          }

          if (arguments[0].length == 3) {
            if ((_.isArray(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
              this.Location.Set(arguments[0]);
              this.Radius = arguments[0][1];
              this.RadiusWidth = arguments[0][2];
            }
            if ((Common.IsJson(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
              this.Location.Set(arguments[0][0]);
              this.Radius = arguments[0][1];
              this.RadiusWidth = arguments[0][2];
            }
            if ((PointClass.IsClass(arguments[0])) && (_.isNumber(arguments[1])) && (_.isNumber(arguments[2]))) {
              this.Location.Set(arguments[0][0]);
              this.Radius = arguments[0][1];
              this.RadiusWidth = arguments[0][2];
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            this.FixedNumber = arguments[0].FixedNumber;
          }
          if (!(_.isUndefined(arguments[0].Location))) {
            this.Location.Set(arguments[0].Location);
          }
          if (!(_.isUndefined(arguments[0].Radius))) {
            this.Radius = arguments[0].Radius;
          }
          if (!(_.isUndefined(arguments[0].RadiusWidth))) {
            this.RadiusWidth = arguments[0].RadiusWidth;
          }
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Location.Set(arguments[0].Location);
          this.Radius = arguments[0].Radius;
          this.RadiusWidth = arguments[0].RadiusWidth;
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    let aNewClass = new AnnularClass(this);
    return aNewClass;
  }
  GetCentrePoint() {
    return this.Location();
  }
  GetOuterRadius() {
    return parseFloat((this.Radius + (this.RadiusWidth / 2)).toFixed(this.FixedNumber));
  }
  GetInnerRadius() {
    return parseFloat((this.Radius - (this.RadiusWidth / 2)).toFixed(this.FixedNumber));
  }
  //仅仅判断XY
  Equal(eannular) {
    if (((this.Location.Equal(eannular.Location)) && (this.Radius == eannular.Radius) && (this.RadiusWidth == eannular.RadiusWidth))) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(eannular) {
    if (((this.Location.ExactlyEqual(eannular.Location)) && (this.Radius == eannular.Radius) && (this.RadiusWidth == eannular.RadiusWidth) && this.FixedNumber == eannular.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(eannular, ec) {
    if ((this.Location.ApproximatelyEqual(eannular.Location, ec)) && Common.ApproximatelyEqual(this.Radius, eannular.Radius, ec) && Common.ApproximatelyEqual(this.RadiusWidth, eannular.RadiusWidth, ec)) {
      return true;
    }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof AnnularClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        this.Location.Translate(arguments[0], arguments[1]);
      }
      if (arguments.length == 1) {
        if (PointClass.IsClass(arguments[0])) {
          this.Location.Translate(arguments[0]);
        }
        if (_.isArray(arguments[0])) {
          this.Location.Translate(arguments[0][0], arguments[0][1]);
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Translate(arguments[0].X, arguments[0].Y);
        }
      }
    }
    return this;
  }
  Add() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        this.Location.Translate(arguments[0], arguments[1]);
      }
      if (arguments.length == 1) {
        if (PointClass.IsClass(arguments[0])) {
          this.Location.Translate(arguments[0]);
        }
        if (_.isArray(arguments[0])) {
          this.Location.Translate(arguments[0][0], arguments[0][1]);
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Translate(arguments[0].X, arguments[0].Y);
        }
      }
    }
    return this;
  }
  Abs() {
    this.Location.Abs();
    this.Radius = Math.abs(this.Radius);
    this.RadiusWidth = Math.abs(this.RadiusWidth);
    return this;
  }
  Ceil() {
    this.Location.Ceil();
    this.Radius = Math.ceil(this.Radius);
    this.RadiusWidth = Math.ceil(this.RadiusWidth);
    return this;
  }
  Floor() {
    this.Location.Floor();
    this.Radius = Math.floor(this.Radius);
    this.RadiusWidth = Math.floor(this.RadiusWidth);
    return this;
  }
  Round() {
    this.Location.Round();
    this.Radius = Math.round(this.Radius);
    this.RadiusWidth = Math.round(this.RadiusWidth);
    return this;
  }
  Random() {
    this.Location.Random();
    this.Radius = Math.Random();
    this.RadiusWidth = Math.Random();
    return this;
  }
  //按照比例缩放
  Scale(eo, et) {
    et = et | true;
    this.Location.Scale(eo);
    this.Radius = parseFloat((this.Radius * eo).toFixed(this.FixedNumber));
    if (et == true) {
      this.RadiusWidth = parseFloat((this.RadiusWidth * eo).toFixed(this.FixedNumber));
    }
    return this;
  }
  //膨胀，他是以区域的中心点，向左右上下各增长dx,dy的
  Inflate(eo) {
    this.Radius = parseFloat((this.Radius * eo).toFixed(this.FixedNumber));
    return this;
  }
  //获取长度 内圈加外圈的周长
  GetLength() {
    return parseFloat(((Math.PI * this.GetInnerRadius() * 2) + (Math.PI * this.GetOuterRadius() * 2)).toFixed(this.FixedNumber));
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    let ipoint = new PointClass(this.Location);
    let ibw = this.GetOuterRadius();
    ipoint.X -= ibw;
    ipoint.Y -= ibw;
    let isize = new SizeClass(ibw);
    return new RectangleClass(ipoint, isize);
  }
  //获取包围圆形
  GetBoundingCircle() {}
  //获取圆环上的一个点
  GetPointByT(et) {
    // 这个懒得写
  }
  IsEmpty() {
    if ((this.Radius == 0) || (this.RadiusWidth == 0)) {
      return true;
    } else {
      return false;
    }
  }
  SetEmpty() {
    this.Radius = 0;
    this.RadiusWidth = 0;
  }
}


module.exports = AnnularClass;