//尺寸类
const Common = require('./common.js'); //引入公共方法库，这里有些算法要用到
const _ = require('lodash'); //引入lodash，许多数组操作需要用到这个库

class SizeClass {
  //这里是类的构造函数，有三个属性组成
  constructor() {
    // 属性
    this.Width = 0;
    this.Height = 0;
    this.FixedNumber = Common.FixedNumber;
    eval(Common.GetSetFunStr(arguments));
  }
  // Set是设置方法，根据参数的多少有不同的设置方式，如果没有参数则不设置任何属性，都是原来的值。
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      //三个参数：（宽度，高度，精度）
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
      //两个参数，共有四种形式：
      if (arguments.length == 2) {
        //1、（一个数组包括宽度和高度，精度）
        if (_.isArray(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
        }
        //2、（一个点对象包含了宽度和高度，精度）
        //注意，这个并不采用原点的精度，而是新的精度
        if (this.IsClass(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.Width = parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
        //3、（一个json对象包含了宽度和高度，精度）
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
        //4、（宽度，高度）
        //这个使用默认的精度
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
          if (_.isNumber(arguments[1])) {
            this.Height = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }
      //一个参数：
      if (arguments.length == 1) {
        //1、宽度和高度相同
        if (_.isNumber(arguments[0])) {
          this.Width = parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Height = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        //2、数组参数
        if (_.isArray(arguments[0])) {
          //2.1、数组三个部分组成【宽度，高度，精度】
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
          //2.2、数组两个部分组成【宽度，高度】
          //精度是默认值
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
          //2.3、数组只有一个数值【宽度和高度相同】
          //精度是默认值
          if (arguments[0].length == 1) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.Width = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
                this.Height = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
          }
        }

        //3、json参数(json包含FixedNumber，Width，Height属性，如果不包含则使用默认值)
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
        //3、SizeClass对象参数(这本身就是一个点对象，所以直接使用点对象的坐标和精度)
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
    var idP = idWidth + idHeight;
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

  // 精度算法约等于，但是效率慢，慎用
  ApproximatelyEqualAcc(ep, ec) {
    //Math.formatFloat(0.1 + 0.2, 1) === 0.3;
    if (ec === undefined) {
      ec = 1.0;
    }
    let idWidth = Common.accMul(Common.accSub(ep.Width, this.Width), Common.accSub(ep.Width, this.Width));
    let idHeight = Common.accMul(Common.accSub(ep.Height, this.Height), Common.accSub(ep.Height, this.Height));
    let idP = Common.accAdd(idWidth, idHeight);
    let idC = Common.accMul(ec, ec);
    if ((ep.Width == this.Width) && (ep.Height == this.Height)) {
      return true;
    } else if (idP < idC) {
      return true;
    }
    return false;
  }

  //位移，向量，在当前的点的位置上，加上另一个位置。参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      //如果是两个参数，则根据在width加第一个参数，height加第二个参数
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.Width += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Height += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      //如果是一个参数：
      if (arguments.length == 1) {
        //1、如果是一个数字，Width 和 Height 加上相同的数值
        if (_.isNumber(arguments[0])) {
          this.Width += parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Height += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        //2、如果是一个数组则：
        if (_.isArray(arguments[0])) {
          //2.1，数组的第一个加 Width 上，第二个加在 Height 上
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.Width += parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Height += parseFloat(arguments[0][1].toFixed(this.FixedNumber));
              }
            }
          }
        }
        //3、如果是一个json则, Width 加 Width，Hegiht 加 Height
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].Width))) {
            if (_.isNumber(arguments[0].Width)) {
              this.Width += parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Height))) {
            if (_.isNumber(arguments[0].Height)) {
              this.Height += parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
            }
          }
        }
        //4、如果是一个点类则, Width 加 Width，Hegiht 加 Height
        if (this.IsClass(arguments[0])) {
          this.Width += parseFloat(arguments[0].Width.toFixed(this.FixedNumber));
          this.Height += parseFloat(arguments[0].Height.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }

  //ceil() 方法可对宽度高度进行上舍入。
  Ceil() {
    this.Width = Math.ceil(this.Width);
    this.Height = Math.ceil(this.Height);
    return this;
  }

  //Floor方法返回小于等于当前数值的最大整数
  Floor() {
    this.Width = Math.floor(this.Width);
    this.Height = Math.floor(this.Height);
    return this;
  }

  //round() 方法可把一个数字舍入为最接近的整数。
  Round() {
    this.Width = Math.round(this.Width);
    this.Height = Math.round(this.Height);
    return this;
  }

  //Random() 方法长宽随机，0-1之间。
  Random() {
    this.Width = parseFloat(Math.random().toFixed(this.FixedNumber));
    this.Height = parseFloat(Math.random().toFixed(this.FixedNumber));
    return this;
  }

  //Rnd(emin, emax) 方法长宽随机，数值在emin, emax之间。
  Rnd(emin, emax) {
    this.Width = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    this.Height = parseFloat(Common.Rnd(emin, emax).toFixed(this.FixedNumber));
    return this;
  }

  //Rnd(eminw, emaxw, eminh, emaxh) 方法长宽随机，数值在eminw, emaxw, eminh, emaxh之间。
  RndWH(eminw, emaxw, eminh, emaxh) {
    this.Width = parseFloat(Common.Rnd(eminw, emaxw).toFixed(this.FixedNumber));
    this.Height = parseFloat(Common.Rnd(eminh, emaxh).toFixed(this.FixedNumber));
    return this;
  }

  //按照比例缩放
  Scale(eo) {
    this.Width = this.Width * eo;
    this.Height = this.Height * eo;
    return this;
  }
  //按照比例缩放
  ScaleAcc(eo) {
    this.Width = Common.accMul(this.Width, eo);
    this.Height = Common.accMul(this.Height, eo);
    return this;
  }

  //获取周长
  GetPerimeter() {
    return (this.Width + this.Height) * 2;
  }

  //获取周长，精度算法
  GetPerimeterAcc() {
    return Common.accMul(Common.accAdd(this.Width , this.Height) , 2);
  }


  //将Width Height交换
  SwapWidthHeight() {
    var t = this.Width;
    this.Width = this.Height;
    this.Height = t;
    return this;
  }
  
  //膨胀
  Inflate(dwidth, dheight) {
    this.Width += (dwidth * 2);
    this.Height += (dheight * 2);
    return this;
  }
  
  //膨胀
  Inflate(dwidth, dheight) {
    this.Width += (dwidth * 2);
    this.Height += (dheight * 2);
    return this;
  }
  //膨胀
  InflateAcc(dwidth, dheight) {
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