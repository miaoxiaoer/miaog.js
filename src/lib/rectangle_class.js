//矩形
const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const LineClass = require('./line_class.js');
//juxing 
class RectangleClass {
  constructor() {
    // 属性
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.Location = new PointClass();
    this.Size = new SizeClass();
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
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Size.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }

      if (arguments.length == 4) {
        if ((_.isNumber(arguments[0])) && (_.isNumber(arguments[1]))) {
          this.Location.Set(parseFloat(arguments[0].toFixed(this.FixedNumber)), parseFloat(arguments[1].toFixed(this.FixedNumber)), this.FixedNumber);
        }
        if ((_.isNumber(arguments[2])) && (_.isNumber(arguments[3]))) {
          this.Size.Set(parseFloat(arguments[2].toFixed(this.FixedNumber)), parseFloat(arguments[3].toFixed(this.FixedNumber)), this.FixedNumber);
        }
      }

      if (arguments.length == 3) {
        if (_.isNumber(arguments[2])) {
          this.FixedNumber = arguments[2];
        }
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
        }
        if ((PointClass.IsClass(arguments[0])) && (SizeClass.IsSizeClass(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
        }
      }
      if (arguments.length == 2) {
        if ((_.isArray(arguments[0])) && (_.isArray(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
        }
        if ((Common.IsJson(arguments[0])) && (Common.IsJson(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
        }
        if ((PointClass.IsClass(arguments[0])) && (SizeClass.IsSizeClass(arguments[1]))) {
          this.Location.Set(arguments[0]);
          this.Size.Set(arguments[1]);
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
            if ((!(_.isUndefined(arguments[0][2]))) && (!(_.isUndefined(arguments[0][3])))) {
              if ((_.isNumber(arguments[0][2])) && (_.isNumber(arguments[0][3]))) {
                this.Size.Set(arguments[0][2], arguments[0][3], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 4) {
            if ((!(_.isUndefined(arguments[0][0]))) && (!(_.isUndefined(arguments[0][1])))) {
              if ((_.isNumber(arguments[0][0])) && (_.isNumber(arguments[0][1]))) {
                this.Location.Set(arguments[0][0], arguments[0][1], this.FixedNumber);
              }
            }
            if ((!(_.isUndefined(arguments[0][2]))) && (!(_.isUndefined(arguments[0][3])))) {
              if ((_.isNumber(arguments[0][2])) && (_.isNumber(arguments[0][3]))) {
                this.Size.Set(arguments[0][2], arguments[0][3], this.FixedNumber);
              }
            }
          }

          if (arguments[0].length == 3) {
            if (_.isNumber(arguments[0][2])) {
              this.FixedNumber = arguments[0][2];
            }
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (SizeClass.IsSizeClass(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
          }

          if (arguments[0].length == 2) {
            if ((_.isArray(arguments[0][0])) && (_.isArray(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
            if ((Common.IsJson(arguments[0][0])) && (Common.IsJson(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
            if ((PointClass.IsClass(arguments[0][0])) && (SizeClass.IsSizeClass(arguments[0][1]))) {
              this.Location.Set(arguments[0][0]);
              this.Size.Set(arguments[0][1]);
            }
          }

        }
        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            this.FixedNumber = arguments[0].FixedNumber;
          }
          this.Location.Set(arguments[0].Location);
          this.Size.Set(arguments[0].Size);
        }
        if (this.IsRectangleClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          this.Location.Set(arguments[0].Location);
          this.Size.Set(arguments[0].Size);
        }
      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new RectangleClass(this);
    return aNewClass;
  }
  //仅仅判断XY
  Equal(erectangle) {
    if (this.Location.Equal(erectangle.Location) && this.Size.Equal(erectangle.Size)) {
      return true;
    }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(erectangle) {
    if (this.Location.ExactlyEqual(erectangle.Location) && this.Size.ExactlyEqual(erectangle.Size) && this.FixedNumber == erectangle.FixedNumber) {
      return true;
    }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(erectangle, ec) {
    if (this.Location.ApproximatelyEqual(erectangle.Location, ec) && this.Size.ApproximatelyEqual(erectangle.Size, ec)) {
      return true;
    }
    return false;
  }
  GetLeft() {
    var iPoint1 = new PointClass(this.Location);
    var iPoint2 = new PointClass(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height, this.FixedNumber);
    if (iPoint1.X > iPoint2.X) {
      return iPoint2.X;
    }
    return iPoint1.X;
  }
  GetRight() {
    var iPoint1 = new PointClass(this.Location);
    var iPoint2 = new PointClass(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height, this.FixedNumber);
    if (iPoint1.X > iPoint2.X) {
      return iPoint1.X;
    }
    return iPoint2.X;
  }
  GetTop() {
    var iPoint1 = new PointClass(this.Location);
    var iPoint2 = new PointClass(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height, this.FixedNumber);
    if (iPoint1.Y > iPoint2.Y) {
      return iPoint1.Y;
    }
    return iPoint2.Y;
  }
  GetBottom() {
    var iPoint1 = new PointClass(this.Location);
    var iPoint2 = new PointClass(this.Location.X + this.Size.Width, this.Location.Y + this.Size.Height, this.FixedNumber);
    if (iPoint1.Y > iPoint2.Y) {
      return iPoint2.Y;
    }
    return iPoint1.Y;
  }
  GetLeftTopPoint() {
    return new PointClass(this.GetLeft(), this.GetTop());
  }
  GetLeftBottomPoint() {
    return new PointClass(this.GetLeft(), this.GetBottom());
  }
  GetRightTopPoint() {
    return new PointClass(this.GetRight(), this.GetTop());
  }
  GetRightBottomPoint() {
    return new PointClass(this.GetRight(), this.GetBottom());
  }
  GetPoint1() {
    return new PointClass(this.GetLeft(), this.GetBottom());
  }
  GetPoint2() {
    return new PointClass(this.GetLeft(), this.GetTop());
  }
  GetPoint3() {
    return new PointClass(this.GetRight(), this.GetTop());
  }
  GetPoint4() {
    return new PointClass(this.GetRight(), this.GetBottom());
  }
  GetWidth() {
    return this.Size.Width;
  }
  GetHeight() {
    return this.Size.Height;
  }
  GetX() {
    return this.Location.X;
  }
  GetY() {
    return this.Location.Y;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof RectangleClass;
  }
  //加，参数类型：可以是一个点，也可以是一个尺寸，也可以是一个矩形，如果是点，则位置增加，如果是尺寸，则尺寸增加，如果是矩形，则尺寸和位置都加
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
  }
  Ceil() {
    this.Location.Ceil();
    this.Size.Ceil();
    return this;
  }
  Floor() {
    this.Location.Floor();
    this.Size.Floor();
    return this;
  }
  Round() {
    this.Location.Round();
    this.Size.Round();
    return this;
  }
  Random() {
    this.Location.Random();
    this.Size.Random();
    return this;
  }
  //旋转坐标eAngle为角度(弧度制)，eOrgPoint是旋转的中点，如果不填，eOrgPoint为（0,0）坐标
  //角度为正顺时针旋转，角度为负逆时针旋转，旋转位置，不能旋转矩形，矩形旋转了就不是矩形了
  Rotate(eAngle, eOrgPoint) {
    this.Location.Rotate(eAngle, eOrgPoint);
    return this;
  }
  //按照比例缩放
  Scale(eo) {
    this.Location.Scale(eo);
    this.Size.Scale(eo);
    return this;
  }
  //膨胀，他是以区域的中心点，向左右上下各增长dx,dy的
  Inflate(dx, dy) {
    this.Size.Inflate(dx, dy);
    this.Location.Translate(-dx, -dy);
    return this;
  }
  //获取长度
  GetLength() {
    return this.Size.GetLength();
  }
  //获取长度
  GetCenterPoint() {
    return new PointClass((this.GetLeft() + this.GetRight()) / 2, (this.GetTop() + this.GetBottom()) / 2, this.FixedNumber);
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    return this;
  }
  //获取包围圆形//方不包括圆，所以这里返回的是一个json
  GetBoundingCircleJson() {
    return {
      'Location': this.Location,
      'Radius': Math.sqrt((this.Size.Width * this.Size.Width) + (this.Size.Height * this.Size.Height)) / 2,
      'FixedNumber': this.FixedNumber
    };
  }
  //获取外接圆
  GetCircumcircle() {
    var iPoint0 = this.GetCenterPoint();
    var iR = iPoint0.GetDistanceToPoint(this.Location);
    return new CircleClass(iPoint0, iR, this.FixedNumber);
  }
  //获取与另一条直线的交点
  GetIntersectLine(eline) {
    return eline.GetIntersectRectangle(this);
  }
  IsExistIntersectLine(eline) {
    if (eline.IsExistIntersectRectangle(this)) {
      return true;
    }
    return false;
  }
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
  //判断某个点是否在区域内
  ContainsPoint(ep) {
    if ((ep.X <= this.GetRight()) && (ep.X >= this.GetLeft()) && (ep.Y >= this.GetBottom()) && (ep.Y <= this.GetTop())) {
      return true;
    }
    return false;
  }
  //判断某个矩形是否在另一个矩形内
  ContainsRectangle(erectangle) {
    if ((erectangle.GetRight() <= this.GetRight()) && (erectangle.GetLeft() >= this.GetLeft()) && (erectangle.GetBottom() >= this.GetBottom()) && (erectangle.GetTop() <= this.GetTop())) {
      return true;
    }
    return false;
  }
  //判断某个矩形是否在另一个矩形内
  ContainsLine(eline) {
    if ((eline.GetRight() <= this.GetRight()) && (eline.GetLeft() >= this.GetLeft()) && (eline.GetBottom() >= this.GetBottom()) && (eline.GetTop() <= this.GetTop())) {
      return true;
    }
    return false;
  }
  //取得两个区域的交集，即返回相交部分的区域。如果找不到则返回false;
  GetIntersectRectangle(erectangle) {
    if (this.IsExistIntersectRectangle(erectangle)) {
      // fill in temp with the intersection
      var tempd_left = (this.GetLeft() > erectangle.GetLeft()) ? this.GetLeft() : erectangle.GetLeft();
      var tempd_right = (this.GetRight() < erectangle.GetRight()) ? this.GetRight() : erectangle.GetRight();
      var tempd_width = tempd_right - tempd_left;
      var tempd_top = (this.GetTop() > erectangle.GetTop()) ? this.GetBottom() : erectangle.GetTop();
      var tempd_bottom = (this.GetBottom() < erectangle.GetBottom()) ? this.GetBottom() : erectangle.GetBottom();
      var tempd_height = tempd_top - tempd_bottom;
      return new RectangleClass(tempd_left, tempd_top, tempd_width, tempd_height, this.FixedNumber);
    }
    return null;
  }
  //返回两个区域是否相交。
  IsExistIntersectRectangle(erectangle) {
    if ((this.Y + this.Height < erectangle.Y) || (erectangle.Y + erectangle.H < this.Y) || (this.X + this.Width < erectangle.X) || (erectangle.X + erectangle.Width < this.X)) {
      return false;
    }
    return true;
  }
  //面积width*height=0就是空
  IsEmpty() {
    if (this.Size.IsEmpty()) {
      return true;
    } else {
      return false;
    }
  }
  SetEmpty() {
    this.Size.SetEmpty();
    return this;
  }
  //合并区域是合出一个大矩形···囧···就是返回一个大矩形刚刚好包含了两个矩形。
  Union(erectangle) {

  }
}
module.exports = RectangleClass;