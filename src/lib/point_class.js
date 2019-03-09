//点类
const Common = require('./common.js');
const _ = require('lodash');

class PointClass {
  //构造函数
  constructor() {
    // 属性
    this.X = 0; //x位置
    this.Y = 0; //y位置
    this.FixedNumber = Common.FixedNumber;
    eval(Common.GetSetFunStr(arguments));
  }
  // 约等于，是可以忽略的范围(ec参数是一个范围数值，这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(ep, ec) {
    //Math.formatFloat(0.1 + 0.2, 1) === 0.3;
    if (ec === undefined) {
      ec = 1.0;
    }
    let idX = (ep.X - this.X) * (ep.X - this.X);
    let idY = (ep.Y - this.Y) * (ep.Y - this.Y);
    let idP = (idX + idY);
    let idC = ec * ec;
    if ((ep.X == this.X) && (ep.Y == this.Y)) {
      return true;
    } else if (idP < idC) {
      return true;
    }
    return false;
  }

  // 精度算法约等于，但是效率慢，慎用
  ApproximatelyEqualAcc(ep, ec) {
    //Math.formatFloat(0.1 + 0.2, 1) === 0.3;
    if (ec === undefined) {
      ec = 1.0;
    }
    let idX = (ep.X - this.X) * (ep.X - this.X);
    let idY = (ep.Y - this.Y) * (ep.Y - this.Y);
    let idP = (idX + idY);
    let idC = ec * ec;
    if ((ep.X == this.X) && (ep.Y == this.Y)) {
      return true;
    } else if (idP < idC) {
      return true;
    }
    return false;
  }

  //点坐标取绝对值
  Abs() {
    this.X = Math.abs(this.X);
    this.Y = Math.abs(this.Y);
    return this;
  }

  //ceil() 方法可对坐标进行上舍入。
  Ceil() {
    this.X = Math.ceil(this.X);
    this.Y = Math.ceil(this.Y);
    return this;
  }
  //生成一个克隆体
  Clone() {
    let aNewClass = new PointClass(this);
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
  //位移，向量，在当前的点的位置上，加上另一个位置。参数类型：（miaosize）（miaopoint）（ew,eh）
  Translate() {
    if (!(_.isUndefined(arguments[0]))) {
      //如果是两个参数，则根据在x坐标加第一个参数，y坐标加第二个参数
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Y += parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      //如果是一个参数：
      if (arguments.length == 1) {
        //1、如果是一个数字，x坐标和y坐标加上相同的数值
        if (_.isNumber(arguments[0])) {
          this.X += parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        //2、如果是一个数组则：
        if (_.isArray(arguments[0])) {
          //2.1，数组的第一个加x坐标上，第二个加在y坐标上
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
        //3、如果是一个json则,x加x，y加y
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
        //4、如果是一个点类则,x加x，y加y
        if (this.IsClass(arguments[0])) {
          this.X += parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y += parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  //转化同Translate,但是使用了精度算法，避免小数点误差产生，但是这种方式计算比较慢，不推荐。
  TranslateAcc() {
    if (!(_.isUndefined(arguments[0]))) {
      //如果是两个参数，则根据在x坐标加第一个参数，y坐标加第二个参数
      if (arguments.length == 2) {
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat((Common.accAdd(this.X, arguments[0])).toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Y = parseFloat((Common.accAdd(this.Y, arguments[1])).toFixed(this.FixedNumber));
        }
      }
      //如果是一个参数：
      if (arguments.length == 1) {
        //1、如果是一个数字，x坐标和y坐标加上相同的数值
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat((Common.accAdd(this.X, arguments[0])).toFixed(this.FixedNumber));
          this.Y = parseFloat((Common.accAdd(this.Y, arguments[0])).toFixed(this.FixedNumber));
        }
        //2、如果是一个数组则：
        if (_.isArray(arguments[0])) {
          //2.1，数组的第一个加x坐标上，第二个加在y坐标上
          if (arguments[0].length == 2) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X = parseFloat((Common.accAdd(this.X, arguments[0][0])).toFixed(this.FixedNumber));
              }
            }
            if (!(_.isUndefined(arguments[0][1]))) {
              if (_.isNumber(arguments[0][1])) {
                this.Y = parseFloat((Common.accAdd(this.Y, arguments[0][1])).toFixed(this.FixedNumber));
              }
            }
          }
        }
        //3、如果是一个json则,x加x，y加y
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].X))) {
            if (_.isNumber(arguments[0].X)) {
              this.X = parseFloat((Common.accAdd(this.X, arguments[0].X)).toFixed(this.FixedNumber));
            }
          }
          if (!(_.isUndefined(arguments[0].Y))) {
            if (_.isNumber(arguments[0].Y)) {
              this.Y = parseFloat((Common.accAdd(this.Y, arguments[0].Y)).toFixed(this.FixedNumber));
            }
          }
        }
        //4、如果是一个点类则,x加x，y加y
        if (this.IsClass(arguments[0])) {
          this.X = parseFloat((Common.accAdd(this.X, arguments[0].X)).toFixed(this.FixedNumber));
          this.Y = parseFloat((Common.accAdd(this.Y, arguments[0].Y)).toFixed(this.FixedNumber));
        }
      }
    }
    return this;
  }
  Floor() {
    this.X = Math.floor(this.X);
    this.Y = Math.floor(this.Y);
    return this;
  }
  //可以根据集合意义求两向量的夹角，如果 eradian 是 true ，则返回弧度
  GetAngle(ep, eradian) {
    eradian = eradian | true;
    let hd = Maht.acos(this.GetDot(ep) / parseFloat((this.GetModulo() * ep.GetModulo()).toFixed(this.FixedNumber)));
    if (eradian) {
      return hd;
    }
    return 180 / Math.PI * hd;
  }
  //同上精度算法
  GetAngleAcc(ep, eradian) {
    eradian = eradian | true;
    let hd = Maht.acos(common.accDiv(this.GetDot(ep), parseFloat((Math.pow(ep.GetModulo(), 2)).toFixed(this.FixedNumber))));
    if (eradian) {
      return hd;
    }
    return 180 / Math.PI * hd;
  }
  // 获取当前点到另一个点的外积
  // 通过结果的正负判断两矢量之间的顺逆时针关系
  // 若 a x b > 0表示a在b的顺时针方向上
  // 若 a x b < 0表示a在b的逆时针方向上
  // 若 a x b == 0表示a在b共线，但不确定方向是否相同
  GetCross(ep) {
    return parseFloat((this.X * ep.Y).toFixed(this.FixedNumber)) + parseFloat((this.Y * ep.X).toFixed(this.FixedNumber));
  }
  //同上，精度算法，减少误差，但是效率低下
  GetCrossAcc(ep) {
    return parseFloat(common.accAdd((common.accMul(this.X, ep.Y)).toFixed(this.FixedNumber)), parseFloat((common.accMul(this.Y, ep.X)).toFixed(this.FixedNumber)));
  }
  // 获取当前点到另一个点的内积
  GetDot(ep) {
    return parseFloat((this.X * ep.X).toFixed(this.FixedNumber)) + parseFloat((this.Y * ep.Y).toFixed(this.FixedNumber));
  }
  // 同上，精度算法，减少误差，但是效率低下
  GetDotAcc(ep) {
    return parseFloat(common.accAdd((common.accMul(this.X, ep.X)).toFixed(this.FixedNumber)), parseFloat((common.accMul(this.Y, ep.Y)).toFixed(this.FixedNumber)));
  }
  //获取当前点得向量，如果ep不存在，则返回当前点作为向量
  GetVector(ep) {
    if (ep) {
      return new PointClass(ep.X - this.X, ep.Y - this.Y, this.FixedNumber);
    }
    return this;
  }
  //获取当前点得向量，如果ep不存在，则返回当前点作为向量
  GetVectorAcc(ep) {
    if (ep) {
      return new PointClass(common.accSub(ep.X, this.X), common.accSub(ep.Y, this.Y), this.FixedNumber);
    }
    return this;
  }
  //返回这个点的模
  GetModulo(ep) {
    ep = ep | this;
    return Math.sqrt(this.GetDot(ep));
  }
  //返回这个点到另一个点的距离，点积求距离的算法，这里的eq是一个数值，如果eq为 true 则返回一个开方的数值，如果是false，则不开方，主要是为了计算，开方效率差很多
  GetDistanceToPoint(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt((this.X * this.X) + (ep.X * ep.X) - (2 * ep.X * this.X * (Math.cos(this.Y - ep.Y)))).toFixed(this.FixedNumber));
    }
    return parseFloat((this.X * this.X) + (ep.X * ep.X) - (2 * ep.X * this.X * (Math.cos(this.Y - ep.Y))).toFixed(this.FixedNumber));
  }
  //同上精度算法，这个算法更精准但是效率低下
  GetDistanceToPointAcc(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt(common.accSub(common.accAdd(common.accMul(this.X, this.X), common.accMul(ep.X, ep.X)), common.accMul(common.accMul(2, ep.X), common.accMul(this.X, (Math.cos(common.accSub(this.Y, ep.Y))))))).toFixed(this.FixedNumber));
    }
    return parseFloat(common.accSub(common.accAdd(common.accMul(this.X, this.X), common.accMul(ep.X, ep.X)), common.accMul(common.accMul(2, ep.X), common.accMul(this.X, (Math.cos(common.accSub(this.Y, ep.Y)))))).toFixed(this.FixedNumber));
  }
  //这是求两点的距离，用勾股定理算法a2+b2 =c2
  GetDistanceToPoint2(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt(((this.X - ep.X) * (this.X - ep.X)).toFixed(this.FixedNumber) + ((this.Y - ep.Y) * (this.Y - ep.Y)).toFixed(this.FixedNumber)).toFixed(this.FixedNumber));
    }
    return ((this.X - ep.X) * (this.X - ep.X)).toFixed(this.FixedNumber) + ((this.Y - ep.Y) * (this.Y - ep.Y)).toFixed(this.FixedNumber);
  }
  //同上，精度算法，这个算法效率更低下，但是误差小
  GetDistanceToPoint2Acc(ep, eq) {
    eq = eq | true;
    if (eq) {
      return parseFloat(Math.sqrt(common.accAdd((common.accMul(common.accSub(this.X, ep.X), common.accSub(this.X, ep.X))).toFixed(this.FixedNumber), (common.accMul(common.accSub(this.Y, ep.Y), common.accSub(this.Y, ep.Y))).toFixed(this.FixedNumber))).toFixed(this.FixedNumber));
    }
    return common.accAdd((common.accMul(common.accSub(this.X, ep.X), common.accSub(this.X, ep.X))).toFixed(this.FixedNumber), (common.accMul(common.accSub(this.Y, ep.Y), common.accSub(this.Y, ep.Y))).toFixed(this.FixedNumber));
  }
  //点到线段的距离
  GetDistanceToLine(eline) {
    return eline.GetDistanceToPoint(this);
  }
  //点到线段的距离
  GetDistanceToLineAcc(eline) {
    return eline.GetDistanceToPointAcc(this);
  }

  //原点对称
  OSymmetry() {
    this.X = -this.X;
    this.Y = -this.Y;
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
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转
  Rotate(eAngle, eOrgPoint) {
    let iAngle = ((Math.PI / 180) * eAngle);
    let iOrgPoint = eOrgPoint || {
      "X": 0,
      "Y": 0
    };
    let iX = this.X;
    let iY = this.Y;
    //x1 = cos(angle) * x - sin(angle) * y; y1 = cos(angle) * y + sin(angle) * x;
    iX = (Math.cos(iAngle) * (this.X - eOrgPoint.X)) - (Math.sin(iAngle) * (this.Y - eOrgPoint.Y)) + eOrgPoint.X;
    iY = (Math.cos(iAngle) * (this.Y - eOrgPoint.Y)) + (Math.sin(iAngle) * (this.X - eOrgPoint.X)) + eOrgPoint.Y;
    this.X = iX;
    this.Y = iY;
    return this;
  }
  RotateAcc(eAngle, eOrgPoint) {
    let iAngle = ((Math.PI / 180) * eAngle);
    let iOrgPoint = eOrgPoint || {
      "X": 0,
      "Y": 0
    };
    let iX = this.X;
    let iY = this.Y;
    //x1 = cos(angle) * x - sin(angle) * y; y1 = cos(angle) * y + sin(angle) * x;
    iX = (Math.cos(iAngle) * (this.X - eOrgPoint.X)) - (Math.sin(iAngle) * (this.Y - eOrgPoint.Y)) + eOrgPoint.X;
    iY = (Math.cos(iAngle) * (this.Y - eOrgPoint.Y)) + (Math.sin(iAngle) * (this.X - eOrgPoint.X)) + eOrgPoint.Y;
    this.X = iX;
    this.Y = iY;
    return this;
  }

  Round() {
    this.X = Math.round(this.X);
    this.Y = Math.round(this.Y);
    return this;
  }
  // Set是设置方法，根据参数的多少有不同的设置方式，如果没有参数则不设置任何属性，都是原来的值。
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      //三个参数：（x坐标，y坐标，精度）
      if (arguments.length == 3) {
        if (_.isNumber(arguments[2])) {
          this.FixedNumber = arguments[2];
        }
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        if (_.isNumber(arguments[1])) {
          this.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
        }
      }
      //两个参数，共有四种形式：
      if (arguments.length == 2) {
        //1、（一个数组包括x坐标和y坐标，精度）
        if (_.isArray(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
        }
        //2、（一个点对象包含了x和y坐标，精度）
        //注意，这个并不采用原点的精度，而是新的精度
        if (this.IsClass(arguments[0])) {
          if (_.isNumber(arguments[1])) {
            this.FixedNumber = arguments[1];
          }
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
        //3、（一个json对象包含了x坐标和y坐标，精度）
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
        //3、（X坐标，Y坐标）
        //这个使用默认的精度
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
          if (_.isNumber(arguments[1])) {
            this.Y = parseFloat(arguments[1].toFixed(this.FixedNumber));
          }
        }
      }
      //一个参数：
      if (arguments.length == 1) {
        //1、x坐标和y坐标相同
        if (_.isNumber(arguments[0])) {
          this.X = parseFloat(arguments[0].toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].toFixed(this.FixedNumber));
        }
        //2、数组参数
        if (_.isArray(arguments[0])) {
          //2.1、数组三个部分组成【x坐标，y坐标，精度】
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
          //2.2、数组两个部分组成【x坐标，y坐标】
          //精度是默认值
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
          //2.3、数组只有一个数值【x坐标y坐标相同】
          //精度是默认值
          if (arguments[0].length == 1) {
            if (!(_.isUndefined(arguments[0][0]))) {
              if (_.isNumber(arguments[0][0])) {
                this.X = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
                this.Y = parseFloat(arguments[0][0].toFixed(this.FixedNumber));
              }
            }
          }
        }
        //3、json参数(json包含FixedNumber，x，y属性，如果不包含则使用默认值)
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
        //3、PointClass对象参数(这本身就是一个点对象，所以直接使用点对象的坐标和精度)
        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.X = parseFloat(arguments[0].X.toFixed(this.FixedNumber));
          this.Y = parseFloat(arguments[0].Y.toFixed(this.FixedNumber));
        }
      }
    }
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
    let t = this.X;
    this.X = this.Y;
    this.Y = t;
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
  //Y轴对称
  YSymmetry() {
    this.X = -this.X;
    return this;
  }
  //X轴对称
  XSymmetry() {
    this.Y = -this.Y;
    return this;
  }
}


module.exports = PointClass;