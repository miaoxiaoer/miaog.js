//尺寸类
const Common = require('./common.js');
const _ = require('lodash');

class SizeClass {
  constructor() {
    // 属性
    this.Width = 0;
    this.Height = 0;
    this.FixedNumber = Common.FixedNumber;
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 3) {
        if (_.isNumber(arguments[2])) {
          this.FixedNumber = arguments[2];
        }
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length == 2) {
        if (_.isArray(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
        }
        if (this.IsClass(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
        if (Common.IsJson(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          if (_.isNumber(arguments[0].Width)) {
            this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          }
          if (_.isNumber(arguments[0].Height)) {
            this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
          }
        }
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
          if (_.isNumber(arguments[1])) {
            this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }
      if (arguments.length == 1) {
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].toFixed(this.FixedNumber));
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
                this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Height = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Height = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
          if (arguments[0].length == 1) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
                this.Height = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
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
          if (!(_.isUndefined(arguments[0].Width))) {
            if (_.isNumber(arguments[0].Width)) {
              this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Height))) {
            if (_.isNumber(arguments[0].Height)) {
              this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
            }
          }
        }
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new SizeClass(this);
    return aNewClass;
  }
  //仅仅判断Width 和Height
  Equal(ep) {
    if ((ep.Width == this.Width) && (ep.Height == this.Height)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(ep) {
    if ((ep.Width == this.Width) && (ep.Height == this.Height) && (ep.FixedNumber == this.FixedNumber)) {
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
    var idWidth = (ep.Width - this.Width) * (ep.Width - this.Width);
    var idHeight = (ep.Height - this.Height) * (ep.Height - this.Height);
    var idP = (idWidth + idHeight);
    var idC = ec * ec;
    if ((ep.Width == this.Width) && (ep.Height == this.Height)) {
      return true;
    } else if (idP < idC) {
      return true;
    }
    return false;
  }
  //判断是否点类
  IsClass(e) {
    return e instanceof SizeClass;
  }
  //转换，参数类型：（miaosize）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      if (arguments.length == 1) {
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isArray(arguments[0])) {
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Height = parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].Width))) {
            if (_.isNumber(arguments[0].Width)) {
              this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Height))) {
            if (_.isNumber(arguments[0].Height)) {
              this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
            }
          }
        }
        if (this.IsClass(arguments[0])) {
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  Ceil() {
    this.Width = Math.ceil(this.Width);
    this.Height = Math.ceil(this.Height);
    return this;
  }
  Floor() {
    this.Width = Math.floor(this.Width);
    this.Height = Math.floor(this.Height);
    return this;
  }
  Round() {
    this.Width = Math.round(this.Width);
    this.Height = Math.round(this.Height);
    return this;
  }
  Random() {
    this.Width = parseFloat(Math.random().toFixed(this.FixedNumber));
    this.Height = parseFloat(Math.random().toFixed(this.FixedNumber));
    return this;
  }
  Rnd(emin, emax) {
    this.Width = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    this.Height = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Width = this.Width * eo;
    this.Height = this.Height * eo;
    return this;
  }
  //获取长度
  GetLength() {
    return (this.Width + this.Height) * 2;
  }
  //将Width Height交换
  SwapWidthHeight() {
    var t = this.Width;
    this.Width = this.Height;
    this.Height = t;
    return this;
  }
  //膨胀
  Inflate(dx, dy) {
    this.Width += (dx * 2);
    this.Height += (dy * 2);
    return this;
  }
  //输出JSON对象
  ToJson() {
    return {
      'Width': this.Width,
      'Height': this.Height,
      'FixedNumber': this.FixedNumber
    };
  }
  //输出PointClass的JSON对象，用来数据转换
  ToPointJson() {
    return {
      'X': this.Width,
      'Y': this.Height,
      'FixedNumber': this.FixedNumber
    };
  }
  //输出数组对象
  ToArray() {
    return [this.Width, this.Height, this.FixedNumber];
  }
  IsEmpty() {
    if ((this.Width == 0) || (this.Height == 0)) {
      return true;
    } else {
      return false;
    }
  }
  SetEmpty() {
    this.Width = 0;
    this.Height = 0;
  }
}


module.exports = SizeClass;