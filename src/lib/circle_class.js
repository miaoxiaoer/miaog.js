const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const LineClass = require('./line_class.js');
const RectangleClass = require('./rectangle_class.js');
//圆形
class CircleClass {
  constructor() {
    // 属性
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Location = new PointClass();
    this.Radius = 10;
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 4) {
        if (_.isNumber(arguments[3])) {
          this.FixedNumber = arguments[3];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if (_.isNumber(arguments[2])) {
          this.Radius = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
      }

      if (arguments.length == 3) {
        if (_.isArray(arguments[0])) {
          if (_.isNumber(arguments[2])) {
            this.FixedNumber = arguments[2];
          }
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
        if (this.IsClass(arguments[0])) {
          if (_.isNumber(arguments[2])) {
            this.FixedNumber = arguments[2];
          }
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (_.isNumber(arguments[2])) {
            this.FixedNumber = arguments[2];
          }
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
          if (_.isNumber(arguments[2])) {
            this.Radius = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
        }
      }
      if (arguments.length == 2) {
        if (_.isArray(arguments[0])) {
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
        if (this.IsClass(arguments[0])) {
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Set(arguments[0], this.FixedNumber);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {

          if (arguments[0].length == 4) {
            if (_.isNumber(arguments[0][3])) {
              this.FixedNumber = arguments[0][3];
            }
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Location.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
            }
            if (_.isNumber(arguments[0][2])) {
              this.Radius = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
            }
          }

          if (arguments[0].length == 3) {
            if (_.isArray(arguments[0][0])) {
              if (_.isNumber(arguments[0][2])) {
                this.FixedNumber = arguments[0][2];
              }
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
            if (this.IsClass(arguments[0][0])) {
              if (_.isNumber(arguments[0][2])) {
                this.FixedNumber = arguments[0][2];
              }
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
            if (Common.IsJson(arguments[0][0])) {
              if (_.isNumber(arguments[0][2])) {
                this.FixedNumber = arguments[0][2];
              }
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Location.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
              if (_.isNumber(arguments[0][2])) {
                this.Radius = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
            }
          }
          if (arguments[0].length == 2) {
            if (_.isArray(arguments[0][0])) {
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
            if (this.IsClass(arguments[0][0])) {
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
            if (Common.IsJson(arguments[0][0])) {
              this.Location.Set(arguments[0][0], this.FixedNumber);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
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
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Location.Set(arguments[0].Location);
          this.Radius = arguments[0].Radius;
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    let aNewClass = new CircleClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(ecircle) {
    if ((this.Location.Equal(ecircle.Location)) && (this.Radius == ecircle.Radius)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(ecircle) {
    if ((this.Location.ExactlyEqual(ecircle.Location)) && (this.Radius == ecircle.Radius) && (this.FixedNumber == ecircle.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(ecircle, ec) {
    if ((this.Location.ApproximatelyEqual(ecircle.Location, ec)) && (Common.ApproximatelyEqual(this.Radius, ecircle.Radius, ec))) {
      return true;
    }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof CircleClass;
  }
  GetCentrePoint() {
    return this.Location();
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    let iastr = '';
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i++) {
        if (i != 0) {
          iastr += ',';
        }
        iastr += 'arguments[' + i + ']';
      }
      eval('this.Location.Translate(' + iastr + ')');
    }
    return this;
  }
  Abs() {
    this.Location.Abs();
    this.Radius = Math.abs(this.Radius);
    return this;
  }
  Ceil() {
    this.Location.Ceil();
    this.Radius = Math.ceil(this.Radius);
    return this;
  }
  Floor() {
    this.Location.Floor();
    this.Radius = Math.floor(this.Radius);
    return this;
  }
  Round() {
    this.Location.Round();
    this.Radius = Math.round(this.Radius);
    return this;
  }
  Random() {
    this.Location.Random();
    this.Radius = Math.random();
    return this;
  }
  Rnd(emin, emax) {
    this.Location.Rnd(emin, emax);
    this.Radius = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Location.Scale(eo);
    this.Radius = parseFloat((this.Radius * eo).toFixed(this.FixedNumber));
    return this;
  }
  //获取长度
  GetLength() {
    return parseFloat((Math.PI * this.Radius * 2).toFixed(this.FixedNumber));
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {}
  //获取包围圆形
  GetBoundingCircle() {
    return this;
  }
  //获取直线上的一个点
  GetPointByT(et) {
    if (_.isUndefined(et)) {
      let et = 0.5;
    }
    let ix = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    let iy = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    let ipoint = new PointClass(ix, iy, this.FixedNumber);
    return ipoint;
  }
}


module.exports = CircleClass;