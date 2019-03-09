const Common = require('./common.js');
const _ = require('lodash');
const PointClass = require('./point_class.js');
const SizeClass = require('./size_class.js');
const LineClass = require('./line_class.js');
const RectangleClass = require('./rectangle_class.js');
const CircleClass = require('./circle_class.js');
const TriangleClass = require('./triangle_class.js');

//多边形，如果最后一个点 和第一个点是同一个点，则这是一个闭包。
class PolygonClass {
  constructor() {
    this.FixedNumber = MiaoCommonVar.FixedNumber;
    this.PointList = [];
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 2) {
        if (_.isNumber(arguments[1])) {
          this.FixedNumber = arguments[1];
        }
        if (_.isArray(arguments[0])) {
          if (arguments[0].length > 0) {
            this.FillPointList(arguments[0]);
          }
        }
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          if (arguments[0].length > 0) {
            this.FillPointList(arguments[0]);
          }
        }

        if (Common.IsJson(arguments[0])) {
          if (!(_.isUndefined(arguments[0].FixedNumber))) {
            this.FixedNumber = arguments[0].FixedNumber;
          }
          if (arguments[0].PointList.length > 0) {
            this.FillPointList(arguments[0].PointList);
          }
        }

        if (this.IsClass(arguments[0])) {
          this.FixedNumber = arguments[0].FixedNumber;
          if (arguments[0].PointList.length > 0) {
            this.FillPointList(arguments[0].PointList);
          }
        }

      }
    }
  }
  //生成一个克隆体
  Clone() {
    var aNewClass = new PolygonClass(this);
    return aNewClass;
  }
  //将一个数组填充到PointList中去，注意返回的是这个对象，而非PointList
  FillPointList(earr) {
    _.each(earr, function (ele, index) {
      if (PointClass.IsClass(ele)) {
        this.PointList.push(ele.Clone());
      }
    });
    return this;
  }
  //判断PointList是否包含点
  PointListContains(epoint) {
    for (var i = 0; i < this.PointList.length; i++) {
      if (this.PointList[i].Equal(epoint)) {
        return true;
      }
    }
    return false;
  }
  //判断图形内是否包含点
  Contains(e) {
    if (PointClass.IsClass(e)) {
      return this.ContainsPoint(e);
    }
    if (LineClass.IsClass(e)) {
      return this.ContainsLine(e);
    }
    if (RectangleClass.IsClass(e)) {
      return this.ContainsRectangle(e);
    }
    if (TriangleClass.IsClass(e)) {
      return this.ContainsTriangle(e);
    }
    if (this.IsClass(e)) {
      return this.ContainsPolygon(e);
    }
    return null;
  }
  //仅仅判断XY
  Equal(epolygon) {
    if (this.PointList.length != epolygon.PointList.length) {
      return false;
    }
    // if(((this.Point1.Equal(el.Point1)) && (this.Point2.Equal(el.Point2)) && (this.Point3.Equal(el.Point3))) || ((this.Point1.Equal(el.Point3)) && (this.Point2.Equal(el.Point2)) && (this.Point3.Equal(el.Point1))) ){
    //   return true;
    // }
    return false;
  }
  //完全相等，包括精度。
  ExactlyEqual(epolygon) {
    if (this.PointList.length != epolygon.PointList.length) {
      return false;
    }
    // if(((this.Point1.ExactlyEqual(el.Point1)) && (this.Point2.ExactlyEqual(el.Point2)) && this.FixedNumber == el.FixedNumber) || ((this.Point1.ExactlyEqual(el.Point2)) && (this.Point2.ExactlyEqual(el.Point1)) && this.FixedNumber == el.FixedNumber) ){
    //   return true;
    // }
    return false;
  }
  // 约等于，是可以忽略的范围(这个范围由两点之间的距离决定，默认是1)
  ApproximatelyEqual(epolygon, ec) {
    if (this.PointList.length != epolygon.PointList.length) {
      return false;
    }
    // if(((this.Point1.ApproximatelyEqual(el.Point1, ec)) && (this.Point2.ApproximatelyEqual(el.Point2, ec))) || ((this.Point1.ApproximatelyEqual(el.Point2, ec)) && (this.Point2.ApproximatelyEqual(el.Point1, ec))) ){
    //   return true;
    // }
    return false;
  }
  //判断是否线类
  IsClass(e) {
    return e instanceof PolygonClass;
  }
  GetLeft() {
    var ibox = this.GetBounding();
    var iPoint1 = new PointClass(ibox.Location);
    var iPoint2 = new PointClass(ibox.Location.X + ibox.Size.Width, ibox.Location.Y + ibox.Size.Height, this.FixedNumber);
    if (iPoint1.X > iPoint2.X) {
      return iPoint2.X;
    }
    return iPoint1.X;
  }
  GetRight() {
    var ibox = this.GetBounding();
    var iPoint1 = new PointClass(ibox.Location);
    var iPoint2 = new PointClass(ibox.Location.X + ibox.Size.Width, ibox.Location.Y + ibox.Size.Height, this.FixedNumber);
    if (iPoint1.X > iPoint2.X) {
      return iPoint1.X;
    }
    return iPoint2.X;
  }
  GetTop() {
    var ibox = this.GetBounding();
    var iPoint1 = new PointClass(ibox.Location);
    var iPoint2 = new PointClass(ibox.Location.X + ibox.Size.Width, ibox.Location.Y + ibox.Size.Height, this.FixedNumber);
    if (iPoint1.Y > iPoint2.Y) {
      return iPoint1.Y;
    }
    return iPoint2.Y;
  }
  GetBottom() {
    var ibox = this.GetBounding();
    var iPoint1 = new PointClass(ibox.Location);
    var iPoint2 = new PointClass(ibox.Location.X + ibox.Size.Width, ibox.Location.Y + ibox.Size.Height, this.FixedNumber);
    if (iPoint1.Y > iPoint2.Y) {
      return iPoint2.Y;
    }
    return iPoint1.Y;
  }
  GetWidth() {
    var ibox = this.GetBounding();
    return ibox.Size.Width;
  }
  GetHeight() {
    var ibox = this.GetBounding();
    return ibox.Size.Height;
  }
  GetSideCount() {
    return this.GetEdgeCount();
  }
  GetEdgeCount() {
    if (this.PointList.length == 2) {
      if (this.PointList[0].Equal(this.PointList[this.PointList.length - 1])) {
        return 0;
      } else {
        return 1;
      }
    }
    if (this.PointList.length >= 2) {
      if (this.PointList[0].Equal(this.PointList[this.PointList.length - 1])) {
        return this.PointList.length - 1;
      } else {
        return this.PointList.length;
      }
    }
    return 0;
  }
  //内角和
  GetSumOfInnerAngle() {
    var ienge = this.GetEdgeCount();
    if (ienge < 2) {
      return 0;
    }
    return (ienge - 2) * 180;
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
  //获取长度
  GetLength() {
    var iLength = 0;
    for (var i = 0, l = this.PointList.length, j = l - 1; i < l; j = i, i++) {
      iLength += this.PointList[j].GetDistanceToPoint(this.PointList[i]);
    }
    return iLength;
  }
  GetLineList() {
    var iLineList = [];
    for (var i = 0, l = this.PointList.length, j = l - 1; i < l; j = i, i++) {
      iLineList.push(new LineClass(this.PointList[j], this.PointList[i], this.FixedNumber));
    }
    return iLineList;
  }
  GetCentrePoint() {
    return this.GetBounding().GetCentrePoint();
  }
  //获取包围矩形，默认是Rectangle
  GetBounding() {
    var ileft, iright, ibottom, itop;
    _.each(this.PointList, function (ele, index) {
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
  //获取包围圆形
  GetBoundingCircle() {
    if (this.PointList.length == 2) {
      var iLine = new LineClass(this.PointList[0], this.PointList[1], this.FixedNumber);
      return new CircleClass(iLine.GetCentrePoint(), iLine.length / 2, this.FixedNumber);
    }
    if (this.PointList.length == 3) {
      var iTriangle = new TriangleClass(this.PointList[0], this.PointList[1], this.PointList[2], this.FixedNumber);
      return iTriangle.GetBoundingCircle();
    }
    if (this.PointList.length > 3) {
      var iP1 = 0,
        iP2 = 1,
        iT1 = 0,
        iT2 = 0;
      _.each(this.PointList, function (ele, index) {
        _.each(this.PointList, function (ele2, index2) {
          iT2 = ele.GetDistanceToPoint(ele2);
          if (iT1 < iT2) {
            iT1 = iT2;
            iP1 = index;
            iP2 = index2;
          }
        });
      });
      var iLine = new LineClass(iP1, iP2, this.FixedNumber);
      return new CircleClass(iLine.GetCentrePoint(), iLine.length / 2, this.FixedNumber);
    }
    return null;
  }
  //获取凸包，多边形
  GetConvexHull() {}
  //判断某个点是否在区域内
  ContainsPoint(ep) {
    if ((ep.X <= this.GetRight()) && (ep.X >= this.GetLeft()) && (ep.Y >= this.GetBottom()) && (ep.Y <= this.GetTop())) {
      return true;
    }
    var iFlag = false;
    var px = ep.X,
      py = ep.Y,
      for (var i = 0, l = this.PointList.length, j = l - 1; i < l; j = i, i++) {
        var sx = this.PointList[i].x,
          sy = this.PointList[i].y,
          tx = this.PointList[j].x,
          ty = this.PointList[j].y;

        // 点与多边形顶点重合
        if ((sx === px && sy === py) || (tx === px && ty === py)) {
          return true;
        }


        // 判断线段两端点是否在射线两侧
        if ((sy < py && ty >= py) || (sy >= py && ty < py)) {
          // 线段上与射线 Y 坐标相同的点的 X 坐标
          var x = sx + (py - sy) * (tx - sx) / (ty - sy);

          // 点在多边形的边上
          if (x === px) {
            return true;
          }

          // 射线穿过多边形的边界
          if (x > px) {
            iFlag = !iFlag;
          }
        }
      }
    // 射线穿过多边形边界的次数为奇数时点在多边形内
    return iFlag ? true : false;
  }
  //判断某个线是否在当前多边形内
  ContainsLine(eline) {
    if (this.ContainsPoint(eline.Point1()) && this.ContainsPoint(eline.Point2())) {
      return true;
    }

    return false;
  }
  ContainsTriangle(etriangle) {
    if ((etriangle.GetRight() <= this.GetRight()) && (etriangle.GetLeft() >= this.GetLeft()) && (etriangle.GetBottom() >= this.GetBottom()) && (etriangle.GetTop() <= this.GetTop())) {
      return true;
    }
    if (this.ContainsPoint(etriangle.Point1()) && this.ContainsPoint(etriangle.Point2()) && this.ContainsPoint(etriangle.Point3())) {
      return true;
    }
    return false;
  }
  //判断某个矩形是否在当前多边形内
  ContainsRectangle(erectangle) {
    if ((erectangle.GetRight() <= this.GetRight()) && (erectangle.GetLeft() >= this.GetLeft()) && (erectangle.GetBottom() >= this.GetBottom()) && (erectangle.GetTop() <= this.GetTop())) {
      return true;
    }
    if (this.ContainsPoint(erectangle.GetPoint1()) && this.ContainsPoint(erectangle.GetPoint2()) && this.ContainsPoint(erectangle.GetPoint3()) && this.ContainsPoint(erectangle.GetPoint4())) {
      return true;
    }
    return false;
  }
  //判断某个矩形是否在当前多边形内
  ContainsPolygon(epolygon) {
    if ((epolygon.GetRight() <= this.GetRight()) && (epolygon.GetLeft() >= this.GetLeft()) && (epolygon.GetBottom() >= this.GetBottom()) && (epolygon.GetTop() <= this.GetTop())) {
      return true;
    }
    for (var i = 0; i < this.PointList.length; i++) {
      if (!this.ContainsPoint(this.PointList[i])) {
        return false;
      }
    }
    return true;
  }
  //膨胀，他是以区域的中心点，向左右上下各增长dx,dy的
  Inflate(dx, dy) {
    this.Size.Inflate(dx, dy);
    this.Location.Translate(-dx, -dy);
    return this;
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
  //合并两个多边形。
  Union(epolygon) {

  }
  //获取直线上的一个点
  GetPointByT(et) {
    // if(_.isUndefined(et)){
    //   var et = 0.5;
    // }
    // var ix = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    // var iy = ((this.Point2.Y - this.Point1.Y) * et) + this.Point1.Y;
    // var ipoint = new PointClass(ix, iy, this.FixedNumber);
    // return ipoint;
  }
}

module.exports = PolygonClass;