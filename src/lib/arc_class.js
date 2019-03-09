//六边形类
const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const RectangleClass = require('./rectangle_class.js');
//弧线
class ArcClass {
  constructor() {
    // 属性心形是一条对称的贝塞尔曲线
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Location = new PointClass();
    this.Radius = 3;
    this.StartAngle = 0; //弧度制
    this.EndAngle = 1.5 * Math.PI; //弧度制
    this.CounterClockWise = false;
    //指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {

      if (arguments.length == 7) {
        if (_.isNumber(arguments[6])) {
          this.FixedNumber = arguments[6];
        }
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if (_.isNumber(arguments[2])) {
          this.Radius = parseFloat(arguments[2].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[3])) {
          this.StartAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[4])) {
          this.EndAngle = parseFloat(arguments[4].toFixed(this.FixedNumber));
        }
        if (_.isBoolean(arguments[5])) {
          this.CounterClockWise = arguments[5];
        }
      }

      if (arguments.length == 6) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
          if (_.isNumber(arguments[2])) {
            this.Radius = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.StartAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[4])) {
            this.EndAngle = parseFloat(arguments[4].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[5])) {
            this.CounterClockWise = arguments[5];
          }
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[5])) {
            this.FixedNumber = arguments[5];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
        if (this.IsClass(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[5])) {
            this.FixedNumber = arguments[5];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
        if (_.isArray(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[5])) {
            this.FixedNumber = arguments[5];
          }
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
      }
      if (arguments.length == 5) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
          if (_.isNumber(arguments[2])) {
            this.Radius = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.StartAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[4])) {
            this.EndAngle = parseFloat(arguments[4].toFixed(this.FixedNumber));
          }
        }
        if (Common.IsJson(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
        if (this.IsClass(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
        if (_.isArray(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
          if (_.isBoolean(arguments[4])) {
            this.CounterClockWise = arguments[4];
          }
        }
      }

      if (arguments.length == 4) {
        if (Common.IsJson(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
        }
        if (this.IsClass(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
        }
        if (_.isArray(arguments[0])) {
          this.Location.Set(arguments[0]);
          if (_.isNumber(arguments[1])) {
            this.Radius = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[2])) {
            this.StartAngle = parseFloat(arguments[2].toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[3])) {
            this.EndAngle = parseFloat(arguments[3].toFixed(this.FixedNumber));
          }
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {

          if (arguments[0].length == 7) {
            if (_.isNumber(arguments[0][6])) {
              this.FixedNumber = arguments[0][6];
            }
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Location.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
            }
            if (_.isNumber(arguments[0][2])) {
              this.Radius = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
            }
            if (_.isNumber(arguments[0][3])) {
              this.StartAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
            }
            if (_.isNumber(arguments[0][4])) {
              this.EndAngle = parseFloat(arguments[0][4].toFixed(this.FixedNumber));
            }
            if (_.isBoolean(arguments[0][5])) {
              this.CounterClockWise = arguments[0][5];
            }
          }

          if (arguments[0].length == 6) {
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Location.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
              if (_.isNumber(arguments[0][2])) {
                this.Radius = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.StartAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][4])) {
                this.EndAngle = parseFloat(arguments[0][4].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][5])) {
                this.CounterClockWise = arguments[0][5];
              }
            }
            if (Common.IsJson(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][5])) {
                this.FixedNumber = arguments[0][5];
              }
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
            if (this.IsClass(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][5])) {
                this.FixedNumber = arguments[0][5];
              }
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
            if (_.isArray(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][5])) {
                this.FixedNumber = arguments[0][5];
              }
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
          }
          if (arguments[0].length == 5) {
            if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
              this.Location.Set(parseFloat(arguments[0][0].toFixed(this.FixedNumber)), parseFloat(arguments[0][1].toFixed(this.FixedNumber)), this.FixedNumber);
              if (_.isNumber(arguments[0][2])) {
                this.Radius = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.StartAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][4])) {
                this.EndAngle = parseFloat(arguments[0][4].toFixed(this.FixedNumber));
              }
            }
            if (Common.IsJson(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
            if (this.IsClass(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
            if (_.isArray(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
              if (_.isBoolean(arguments[0][4])) {
                this.CounterClockWise = arguments[0][4];
              }
            }
          }

          if (arguments[0].length == 4) {
            if (Common.IsJson(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
            }
            if (this.IsClass(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
              }
            }
            if (_.isArray(arguments[0][0])) {
              this.Location.Set(arguments[0][0]);
              if (_.isNumber(arguments[0][1])) {
                this.Radius = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][2])) {
                this.StartAngle = parseFloat(arguments[0][2].toFixed(this.FixedNumber));
              }
              if (_.isNumber(arguments[0][3])) {
                this.EndAngle = parseFloat(arguments[0][3].toFixed(this.FixedNumber));
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
          if (!(_.isUndefined(arguments[0].StartAngle))) {
            this.StartAngle = arguments[0].StartAngle;
          }
          if (!(_.isUndefined(arguments[0].EndAngle))) {
            this.EndAngle = arguments[0].EndAngle;
          }
          if (!(_.isUndefined(arguments[0].CounterClockWise))) {
            this.CounterClockWise = arguments[0].CounterClockWise;
          }
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Location.Set(arguments[0].Location);
          this.Radius = arguments[0].Radius;
          this.StartAngle = arguments[0].StartAngle;
          this.EndAngle = arguments[0].EndAngle;
          this.CounterClockWise = arguments[0].CounterClockWise;
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new ArcClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(earc) {
    if ((this.Location.Equal(earc.Location)) && (this.Radius == earc.Radius) && (this.StartAngle == earc.StartAngle) && (this.EndAngle == earc.EndAngle) && (this.CounterClockWise == earc.CounterClockWise)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(earc) {
    if ((this.Location.ExactlyEqual(earc.Location)) && (this.Radius == earc.Radius) && (this.StartAngle == earc.StartAngle) && (this.EndAngle == earc.EndAngle) && (this.CounterClockWise == earc.CounterClockWise) && (this.FixedNumber == earc.FixedNumber)) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(earc, ec) {
    if ((this.Location.ApproximatelyEqual(earc.Location, ec)) && (Common.ApproximatelyEqual(this.Radius, earc.Radius, ec)) && (Common.ApproximatelyEqual(this.StartAngle, earc.StartAngle, ec)) && (Common.ApproximatelyEqual(this.EndAngle, earc.EndAngle, ec)) && (this.CounterClockWise == earc.CounterClockWise)) {
      return true;
    }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof ArcClass;
  }
  //加，参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    var iastr = '';
    if (arguments.length > 0) {
      for (var i = 0; i < arguments.length; i++) {
        if (i != 0) {
          iastr += ',';
        }
        iastr += 'arguments[' + i + ']';
      }
      eval('this.Location.Translate(' + iastr + ')');
    }
    return this;
    //比较懒，这里以后再写
  }
  Abs() {
    this.Location.Abs();
    this.Radius = Math.abs(this.Radius);
    this.StartAngle = Math.abs(this.StartAngle);
    this.EndAngle = Math.abs(this.EndAngle);
    return this;
  }
  Ceil() {
    this.Location.Ceil();
    this.Radius = Math.ceil(this.Radius);
    this.StartAngle = Math.ceil(this.StartAngle);
    this.EndAngle = Math.ceil(this.EndAngle);
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
    this.StartAngle = Math.round(this.StartAngle);
    this.EndAngle = Math.round(this.EndAngle);
    return this;
  }
  Random() {
    this.Location.Random();
    return this;
  }
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate(eAngle, eOrgPoint) {
    this.StartAngle += eAngle;
    this.EndAngle += eAngle;
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Location.Scale(eo);
    this.Radius = parseFloat((this.Radius * eo).toFixed(this.FixedNumber));
    return this;
  }
  //将XY轴交换
  SwapAngle() {
    var t = 0;
    t = this.StartAngle;
    this.EndAngle = this.StartAngle;
    this.StartAngle = t;
    return this;
  }
  //获取长度
  GetLength() {
    var iangledx = 0;
    var ionelength = Math.PI * this.Radius * 2;
    if (this.CounterClockWise == false) {
      return (this.EndAngle - this.StartAngle) * this.Radius;
    }
    return (this.StartAngle - this.EndAngle) * this.Radius;
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    //这个挺麻烦没写。
  }
  //获取包围圆形
  GetBoundingCircle() {
    //这个挺麻烦没写。
  }
  //获取直线上的一个点
  GetPointByT(et) {
    //这个挺麻烦没写。
  }
}


module.exports = ArcClass;