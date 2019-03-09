//点类
const Common = require('./common.js');
// 加载lodash
const _ = require('lodash');

class ColorClass {
  constructor() {
    // 属性
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.A = 0;
    eval(Common.GetSetFunStr(arguments));
  }
  Set() {
    // 属性
    if (!(_.isUndefined(arguments[0]))) {
      if (arguments.length == 4) {
        if (_.isNumber(arguments[0])) {
          this.R = arguments[0];
        }

        if (_.isNumber(arguments[1])) {
          this.G = arguments[1];
        }
        if (_.isNumber(arguments[2])) {
          this.B = arguments[2];
        }
        if (_.isNumber(arguments[3])) {
          this.A = arguments[3];
        }
      }
      if (arguments.length == 3) {
        if (_.isNumber(arguments[0])) {
          this.R = arguments[0];
        }
        if (_.isNumber(arguments[1])) {
          this.G = arguments[1];
        }
        if (_.isNumber(arguments[3])) {
          this.B = arguments[2];
        }
        this.A = 1;
      }

      if (arguments.length == 1) {
        if (_.isArray(arguments[0])) {
          this.R = arguments[0][0];
          this.G = arguments[0][1];
          this.B = arguments[0][2];
          this.A = arguments[0][3];
        }
        if (Common.IsJson(arguments[0])) {
          if (_.isNumber(arguments[0].R)) {
            this.R = arguments[0].R;
          }
          if (_.isNumber(arguments[0].G)) {
            this.G = arguments[0].G;
          }
          if (_.isNumber(arguments[0].B)) {
            this.B = arguments[0].B;
          }
          if (_.isUndefined(arguments[0].A)) {
            this.A = 1;
          } else {
            if (_.isNumber(arguments[0].A)) {
              this.A = arguments[0].A;
            }
          }
        }

        if (this.IsClass(arguments[0])) {
          this.R = arguments[0].R;
          this.G = arguments[0].G;
          this.B = arguments[0].B;
          this.A = arguments[0].A;
        }

      }
    }
  }
  Clone() {
    let aNewClass = new ColorClass(this);
    return aNewClass;
  }
  //比较颜色是否相等
  Equal(ecolor) {
    if ((ecolor.R == this.R) && (ecolor.G == this.G) && (ecolor.B == this.B)) {
      return true;
    }
    return false;
  }
  //完全相等，包括透明度。
  ExactlyEqual(ep) {
    if ((this.Equal(ep)) && (ecolor.A == this.A)) {
      return true;
    }
    return false;
  }
  // 约等于，取近似色，如果两个颜色差别不大，则被认定为同一颜色，ec是可以忽略的范围(这个范围由色彩空间中两点之间的距离决定，默认是8)
  ApproximatelyEqual(ecolor, ec) {
    if (ec === undefined) {
      ec = 8.0;
    }
    let idR = (ecolor.R - this.R) * (ecolor.R - this.R);
    let idG = (ecolor.G - this.G) * (ecolor.G - this.G);
    let idB = (ecolor.B - this.B) * (ecolor.B - this.B);
    let idA = (ecolor.A - this.A) * (ecolor.A - this.A) * 65025;
    let idColor = idR + idG + idB + idA;
    let idC = ec * ec;
    if ((ecolor.R == this.R) && (ecolor.G == this.G) && (ecolor.B == this.B) && (ecolor.A == this.A)) {
      return true;
    } else if (idColor < idC) {
      return true;
    }
    return false;
  }
  IsClass(e) {
    return e instanceof ColorClass;
  }
  //格式化SVG的List表
  FromRGB() {
    if (!_.isUndefined(arguments[0])) {
      this.A = 1;
      if (_.isNumber(arguments[0])) {
        this.R = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        this.G = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        this.B = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        this.A = 1;
        if (_.isNumber(arguments[0].R)) {
          this.R = arguments[0].R;
        }
        if (_.isNumber(arguments[0].G)) {
          this.G = arguments[0].G;
        }
        if (_.isNumber(arguments[0].B)) {
          this.B = arguments[0].B;
        }
      }
    }
    return this.FormatColor(this);
  }
  FromARGB() {
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        this.A = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        this.R = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        this.G = arguments[2];
      }
      if (_.isNumber(arguments[3])) {
        this.B = arguments[3];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].A)) {
          this.A = arguments[0].A;
        }
        if (_.isNumber(arguments[0].R)) {
          this.R = arguments[0].R;
        }
        if (_.isNumber(arguments[0].G)) {
          this.G = arguments[0].G;
        }
        if (_.isNumber(arguments[0].B)) {
          this.B = arguments[0].B;
        }
      }
    }
    return this.FormatColor(this);
  }
  FromRGBA() {
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        this.R = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        this.G = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        this.B = arguments[2];
      }
      if (_.isNumber(arguments[3])) {
        this.A = arguments[3];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].R)) {
          this.R = arguments[0].R;
        }
        if (_.isNumber(arguments[0].G)) {
          this.G = arguments[0].G;
        }
        if (_.isNumber(arguments[0].B)) {
          this.B = arguments[0].B;
        }
        if (_.isNumber(arguments[0].A)) {
          this.A = arguments[0].A;
        }
      }
    }
    return this.FormatColor(this);
  }
  FromHexString(eStr) {
    let sColor = eStr.toLowerCase();
    if (sColor && Common.ColorStrREG.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      this.A = 1;
      this.R = sColorChange[0];
      this.G = sColorChange[1];
      this.B = sColorChange[2];
    }
    return this.FormatColor(this);
  }
  FromArgbHexString(eStr) {
    let sColor = eStr.toLowerCase();
    if (sColor && Common.ColorRgbaStrREG.test(sColor)) {
      if (sColor.length === 5) {
        let sColorNew = '#';
        for (let i = 1; i < 5; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 9; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      this.A = sColorChange[0] / 255;
      this.R = sColorChange[1];
      this.G = sColorChange[2];
      this.B = sColorChange[3];
    }
    return this.FormatColor(this);
  }
  FromRgbaHexString(eStr) {
    let sColor = eStr.toLowerCase();
    if (sColor && Common.ColorRgbaStrREG.test(sColor)) {
      if (sColor.length === 5) {
        let sColorNew = '#';
        for (let i = 1; i < 5; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色值
      let sColorChange = [];
      for (let i = 1; i < 9; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      this.R = sColorChange[0];
      this.G = sColorChange[1];
      this.B = sColorChange[2];
      this.A = sColorChange[3];
    }
    return this.FormatColor(this);
  }
  FromRGBOrRGBAString(eStr) {
    let that = eStr.toLowerCase();
    if (/^(rgb)/.test(that)) {
      let aColor = that.replace(/(?:\(|\)|rgb|rgba)*/g, '').split(',');
      if (aColor.length == 3) {
        this.A = 1;
        this.R = parseInt(aColor[0]);
        this.G = parseInt(aColor[1]);
        this.B = parseInt(aColor[2]);
      }
      if (aColor.length == 4) {
        this.R = parseInt(aColor[0]);
        this.G = parseInt(aColor[1]);
        this.B = parseInt(aColor[2]);
        this.A = parseFloat(aColor[3]);
      }
    }
    return this.FormatColor(this);
  }
  FromCMYK() {
    let ic = 0,
      im = 0,
      iy = 0,
      ik = 0;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        ic = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        im = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iy = arguments[2];
      }
      if (_.isNumber(arguments[3])) {
        ik = arguments[3];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].C)) {
          ic = arguments[0].C;
        }
        if (_.isNumber(arguments[0].M)) {
          im = arguments[0].M;
        }
        if (_.isNumber(arguments[0].Y)) {
          iy = arguments[0].Y;
        }
        if (_.isNumber(arguments[0].K)) {
          ik = arguments[0].K;
        }
      }
      c = ic / 100;
      m = im / 100;
      y = iy / 100;
      k = ik / 100;
      this.A = 1;
      this.R = Math.round((1 - Math.min(1, c * (1 - k) + k)) * 255);
      this.G = Math.round((1 - Math.min(1, m * (1 - k) + k)) * 255);
      this.B = Math.round((1 - Math.min(1, y * (1 - k) + k)) * 255);
    }
    return this.FormatColor(this);
  }
  FromHSV() {
    let ih = 0,
      is = 0,
      iv = 0;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        ih = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iv = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        is = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].H)) {
          ih = arguments[0].H;
        }
        if (_.isNumber(arguments[0].S)) {
          is = arguments[0].S;
        }
        if (_.isNumber(arguments[0].V)) {
          iv = arguments[0].V;
        }
      }

      let h = ih / 360;
      let s = is / 100;
      let v = iv / 100;

      if (s == 0) {
        this.R = v * 255;
        this.G = v * 255;
        this.B = v * 255;
      } else {
        var_h = h * 6;
        var_i = Math.floor(var_h);
        var_1 = v * (1 - s);
        var_2 = v * (1 - s * (var_h - var_i));
        var_3 = v * (1 - s * (1 - (var_h - var_i)));

        if (var_i == 0) {
          var_r = v;
          var_g = var_3;
          var_b = var_1
        } else if (var_i == 1) {
          var_r = var_2;
          var_g = v;
          var_b = var_1
        } else if (var_i == 2) {
          var_r = var_1;
          var_g = v;
          var_b = var_3
        } else if (var_i == 3) {
          var_r = var_1;
          var_g = var_2;
          var_b = v
        } else if (var_i == 4) {
          var_r = var_3;
          var_g = var_1;
          var_b = v
        } else {
          var_r = v;
          var_g = var_1;
          var_b = var_2
        };

        this.R = Math.round(var_r * 255);
        this.G = Math.round(var_g * 255);
        this.B = Math.round(var_b * 255);
      }
      this.A = 1;
    }
    return this.FormatColor(this);
  }
  FromHSL() {
    let iH, iS, iL;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iH = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iS = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iL = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].H)) {
          iH = arguments[0].H;
        }
        if (_.isNumber(arguments[0].S)) {
          iS = arguments[0].S;
        }
        if (_.isNumber(arguments[0].L)) {
          iL = arguments[0].L;
        }
      }
      iH = iH / 360;
      iS = iS / 100;
      iL = iL / 100;
      let t1;
      let t2;
      let t3;
      let tempval;
      if (iS === 0) {
        tempval = iL * 255;
        this.R = tempval;
        this.G = tempval;
        this.B = tempval;
      }
      if (iL < 0.5) {
        t2 = iL * (1 + iS);
      } else {
        t2 = iL + iS - iL * iS;
      }
      t1 = 2 * iL - t2;
      this.A = 1;
      for (let i = 0; i < 3; i++) {
        t3 = iH + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }

        if (6 * t3 < 1) {
          tempval = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          tempval = t2;
        } else if (3 * t3 < 2) {
          tempval = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          tempval = t1;
        }
        if (i == 0) {
          R = Math.round(tempval * 255);
        } else if (i == 1) {
          G = Math.round(tempval * 255);
        } else {
          B = Math.round(tempval * 255);
        }
      }
    }
    return this.FormatColor(this);
  }
  FromHWB() {
    let iH, iW, iB;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iH = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iW = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iB = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].H)) {
          iH = arguments[0].H;
        }
        if (_.isNumber(arguments[0].W)) {
          iW = arguments[0].W;
        }
        if (_.isNumber(arguments[0].B)) {
          iB = arguments[0].B;
        }
      }
      iH = iH / 360;
      iW = iW / 100;
      iB = iB / 100;
      let fRatio = iW + iB;
      let i;
      let v;
      let f;
      let n;
      // wh + bl cant be > 1
      if (fRatio > 1) {
        iW /= fRatio;
        iB /= fRatio;
      }
      i = Math.floor(6 * iH);
      v = 1 - iB;
      f = 6 * iH - i;
      if ((i & 0x01) !== 0) {
        f = 1 - f;
      }

      n = iW + f * (v - iW); // linear interpolation

      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = iW;
          break;
        case 1:
          r = n;
          g = v;
          b = iW;
          break;
        case 2:
          r = iW;
          g = v;
          b = n;
          break;
        case 3:
          r = iW;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = iW;
          b = v;
          break;
        case 5:
          r = v;
          g = iW;
          b = n;
          break;
      }
      this.R = Math.round(r * 255);
      this.G = Math.round(g * 255);
      this.B = Math.round(b * 255);
      this.A = 1;
    }
    return this.FormatColor(this);
  }
  FromXYZ() {
    let iX, iY, iX;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iX = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iY = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iZ = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].X)) {
          iX = arguments[0].X;
        }
        if (_.isNumber(arguments[0].Y)) {
          iY = arguments[0].Y;
        }
        if (_.isNumber(arguments[0].Z)) {
          iZ = arguments[0].Z;
        }
      }
      let x = iX / 100;
      let y = iY / 100;
      let z = iZ / 100;
      let r;
      let g;
      let b;

      r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
      g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
      b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

      // assume sRGB
      r = r > 0.0031308 ?
        ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055) :
        r * 12.92;

      g = g > 0.0031308 ?
        ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055) :
        g * 12.92;

      b = b > 0.0031308 ?
        ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055) :
        b * 12.92;

      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);

      this.R = Math.round(r * 255);
      this.G = Math.round(g * 255);
      this.B = Math.round(b * 255);
      this.A = 1;
    }
    return this.FormatColor(this);
  }
  FromLAB() {
    let iL, iA, iB;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iL = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iA = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iB = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].L)) {
          iL = arguments[0].L;
        }
        if (_.isNumber(arguments[0].A)) {
          iA = arguments[0].A;
        }
        if (_.isNumber(arguments[0].B)) {
          iB = arguments[0].B;
        }
      }
      let l = iL;
      let a = iA;
      let b = iB;
      let x;
      let y;
      let z;

      y = (l + 16) / 116;
      x = a / 500 + y;
      z = y - b / 200;

      let y2 = Math.pow(y, 3);
      let x2 = Math.pow(x, 3);
      let z2 = Math.pow(z, 3);
      y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
      x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
      z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

      x *= 95.047;
      y *= 100;
      z *= 108.883;
      this.FromXYZ(x, y, z);
    }
    return this.FormatColor(this);
  }
  FromLCH() {
    let iL, iC, iH;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iL = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iC = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iH = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].L)) {
          iL = arguments[0].L;
        }
        if (_.isNumber(arguments[0].C)) {
          iC = arguments[0].C;
        }
        if (_.isNumber(arguments[0].H)) {
          iH = arguments[0].H;
        }
      }
      let l = iL;
      let c = iC;
      let h = iH;
      let a;
      let b;
      let hr;

      hr = h / 360 * 2 * Math.PI;
      a = c * Math.cos(hr);
      b = c * Math.sin(hr);

      this.FromLAB(l, a, b);
    }
    return this.FormatColor(this);
  }
  FromANSI16(args) {
    if (!_.isUndefined(args)) {
      if (_.isNumber(args)) {
        color = args % 10;

        // handle greyscale
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }

          color = Math.round(color / 10.5 * 255);

          this.R = color;
          this.G = color;
          this.B = color;
          return this;
        }

        let mult = (~~(args > 50) + 1) * 0.5;
        let r = Math.round(((color & 1) * mult) * 255);
        let g = Math.round((((color >> 1) & 1) * mult) * 255);
        let b = Math.round((((color >> 2) & 1) * mult) * 255);

        this.R = r;
        this.G = g;
        this.B = b;
        this.A = 1;
      }
    }
    return this.FormatColor(this);
  }
  FromANSI256(args) {
    if (!_.isUndefined(args)) {
      if (_.isNumber(args)) {

        // handle greyscale
        if (args >= 232) {
          let c = Math.round((args - 232) * 10 + 8);
          this.R = c;
          this.G = c;
          this.B = c;
          return this;
        }

        args -= 16;

        let rem;
        let r = Math.round(Math.floor(args / 36) / 5 * 255);
        let g = Math.round(Math.floor((rem = args % 36) / 6) / 5 * 255);
        let b = Math.round((rem % 6) / 5 * 255);

        this.R = r;
        this.G = g;
        this.B = b;
        this.A = 1;
      }
    }
    return this.FormatColor(this);
  }
  FromHCG() {
    let iH, iC, iG;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iH = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iC = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iG = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].H)) {
          iH = arguments[0].H;
        }
        if (_.isNumber(arguments[0].C)) {
          iC = arguments[0].C;
        }
        if (_.isNumber(arguments[0].G)) {
          iG = arguments[0].G;
        }
      }

      let h = iH / 360;
      let c = iC / 100;
      let g = iG / 100;

      if (c === 0.0) {
        let iGg = Math.round(g * 255);
        this.R = iGg;
        this.G = iGg;
        this.B = iGg;
        this.A = 1;
        return this;
      }

      let pure = [0, 0, 0];
      let hi = (h % 1) * 6;
      let v = hi % 1;
      let w = 1 - v;
      let mg = 0;

      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }

      mg = (1.0 - c) * g;

      this.R = Math.round((c * pure[0] + mg) * 255);
      this.G = Math.round((c * pure[1] + mg) * 255);
      this.B = Math.round((c * pure[2] + mg) * 255);
      this.A = 1;
    }
    return this.FormatColor(this);
  }
  FromApple() {
    let iR, iG, iB;
    if (!_.isUndefined(arguments[0])) {
      if (_.isNumber(arguments[0])) {
        iR = arguments[0];
      }
      if (_.isNumber(arguments[1])) {
        iG = arguments[1];
      }
      if (_.isNumber(arguments[2])) {
        iB = arguments[2];
      }
      if (Common.IsJson(arguments[0])) {
        if (_.isNumber(arguments[0].R)) {
          iR = arguments[0].R;
        }
        if (_.isNumber(arguments[0].G)) {
          iG = arguments[0].G;
        }
        if (_.isNumber(arguments[0].B)) {
          iB = arguments[0].B;
        }
      }
      this.R = Math.round((iR / 65535) * 255);
      this.G = Math.round((iG / 65535) * 255);
      this.B = Math.round((iB / 65535) * 255);
      this.A = 1;
    }
    return this.FormatColor(this);
  }
  //灰度值是100最亮
  FromGray(e) {
    if (!_.isUndefined(args)) {
      if (_.isNumber(args)) {
        if (e > 100) {
          e = 100;
        }
        if (e < 0) {
          e = 0;
        }
        this.R = Math.round(e / 100 * 255);
        this.G = Math.round(e / 100 * 255);
        this.B = Math.round(e / 100 * 255);
        this.A = 1;
      }
    }
    return this.FormatColor(this);
  }
  HSV() {
    let ih = 0,
      is = 0,
      iv = 0;
    r = this.R / 255;
    g = this.G / 255;
    b = this.B / 255;

    let minVal = Math.min(r, g, b);
    let maxVal = Math.max(r, g, b);
    let delta = maxVal - minVal;

    iv = maxVal;

    if (delta == 0) {
      ih = 0;
      is = 0;
    } else {
      is = delta / maxVal;
      let del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
      let del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
      let del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

      if (r == maxVal) {
        ih = del_B - del_G;
      } else if (g == maxVal) {
        ih = (1 / 3) + del_R - del_B;
      } else if (b == maxVal) {
        ih = (2 / 3) + del_G - del_R;
      }

      if (ih < 0) {
        ih += 1;
      }
      if (ih > 1) {
        ih -= 1;
      }
    }

    ih = Math.round(ih * 360);
    is = Math.round(is * 100);
    iv = Math.round(iv * 100);
    return {
      H: ih,
      S: is,
      V: iv
    };
  }
  HSL() {
    let r = this.R / 255;
    let g = this.G / 255;
    let b = this.B / 255;
    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);
    let delta = max - min;
    let h;
    let s;
    let l;

    if (max === min) {
      h = 0;
    } else if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else if (b === max) {
      h = 4 + (r - g) / delta;
    }

    h = Math.min(h * 60, 360);

    if (h < 0) {
      h += 360;
    }

    l = (min + max) / 2;

    if (max === min) {
      s = 0;
    } else if (l <= 0.5) {
      s = delta / (max + min);
    } else {
      s = delta / (2 - max - min);
    }

    return {
      H: h,
      S: s * 100,
      L: l * 100
    };
  }
  HWB() {
    let r = this.R;
    let g = this.G;
    let b = this.B;
    let h = this.HSL().H;
    let w = 1 / 255 * Math.min(r, Math.min(g, b));

    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

    return {
      H: h,
      W: w * 100,
      B: b * 100
    };
  }
  XYZ() {
    let r = this.R / 255;
    let g = this.G / 255;
    let b = this.B / 255;
    // assume sRGB
    r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
    g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
    b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

    let x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
    let y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
    let z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
    return {
      X: x * 100,
      Y: y * 100,
      Z: z * 100
    };
  }
  LAB() {
    let xyz = this.XYZ();
    let x = xyz.X;
    let y = xyz.Y;
    let z = xyz.Z;
    let l;
    let a;
    let b;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

    l = (116 * y) - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);
    return {
      L: l,
      A: a,
      B: b
    };
  }
  LCH() {
    let lab = this.LAB();
    let l = lab.L;
    let a = lab.A;
    let b = lab.B;
    let hr;
    let h;
    let c;

    hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;

    if (h < 0) {
      h += 360;
    }

    c = Math.sqrt(a * a + b * b);
    return {
      L: l,
      C: c,
      H: h
    };
  }
  ANSI16() {
    let r = this.R;
    let g = this.G;
    let b = this.B;
    let value = 1 in arguments ? arguments[1] : this.HSV().V; // hsv -> ansi16 optimization

    value = Math.round(value / 50);

    if (value === 0) {
      return 30;
    }

    let ansi = 30 +
      ((Math.round(b / 255) << 2) |
        (Math.round(g / 255) << 1) |
        Math.round(r / 255));

    if (value === 2) {
      ansi += 60;
    }

    return ansi;
  }
  ANSI256() {
    let r = this.R;
    let g = this.G;
    let b = this.B;

    // we use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (r === g && g === b) {
      if (r < 8) {
        return 16;
      }

      if (r > 248) {
        return 231;
      }

      return Math.round(((r - 8) / 247) * 24) + 232;
    }

    let ansi = 16 +
      (36 * Math.round(r / 255 * 5)) +
      (6 * Math.round(g / 255 * 5)) +
      Math.round(b / 255 * 5);

    return ansi;
  }
  HCG() {
    let r = this.R / 255;
    let g = this.G / 255;
    let b = this.B / 255;
    let max = Math.max(Math.max(r, g), b);
    let min = Math.min(Math.min(r, g), b);
    let chroma = (max - min);
    let grayscale;
    let hue;

    if (chroma < 1) {
      grayscale = min / (1 - chroma);
    } else {
      grayscale = 0;
    }

    if (chroma <= 0) {
      hue = 0;
    } else
    if (max === r) {
      hue = ((g - b) / chroma) % 6;
    } else
    if (max === g) {
      hue = 2 + (b - r) / chroma;
    } else {
      hue = 4 + (r - g) / chroma + 4;
    }

    hue /= 6;
    hue %= 1;

    return {
      H: hue * 360,
      C: chroma * 100,
      G: grayscale * 100
    };
  }
  Apple() {
    return {
      R: (this.R / 255) * 65535,
      G: (this.B / 255) * 65535,
      B: (this.G / 255) * 65535
    };
  }

  Gray() {
    let iG = (this.R * 0.299) + (this.G * 0.587) + (this.B * 0.114);
    return iG * 100;
  }
  QuickGray() {
    let iG = ((this.R * 38) + (this.G * 75) + (this.B * 15)) >> 7;
    return iG * 100;
  }
  AbsGray() {
    let iG = (this.R + this.G + this.B) / 3;
    return iG / 255 * 100;
  }
  CMYK() {
    let ic = 0,
      im = 0,
      iy = 0,
      ik = 0;
    ik = Math.round((Math.min(1 - (this.R / 255), 1 - (this.G / 255), 1 - (this.B / 255))) * 100);
    ic = Math.round(((1 - (this.R / 255) - ik) / (1 - ik)) * 100);
    im = Math.round(((1 - (this.G / 255) - ik) / (1 - ik)) * 100);
    iy = Math.round(((1 - (this.B / 255) - ik) / (1 - ik)) * 100);
    return {
      C: ic,
      M: im,
      Y: iy,
      K: ik
    };
  }
  ARGB() {
    return {
      A: this.A,
      R: this.R,
      G: this.G,
      B: this.B
    };
  }
  RGB() {
    return {
      R: this.R,
      G: this.G,
      B: this.B
    };
  }
  RGBA() {
    return {
      R: this.R,
      G: this.G,
      B: this.B,
      A: this.A
    };
  }
  ARGBFunString() {
    return 'argb(' + this.A + ',' + this.R + ',' + this.G + ',' + this.B + ')';
  }
  RGBFunString() {
    return 'rgb(' + this.R + ',' + this.G + ',' + this.B + ')';
  }
  RGBAFunString() {
    return 'rgba(' + this.R + ',' + this.G + ',' + this.B + ',' + this.A + ')';
  }
  RGBHtmlString() {
    return '#' + this.R.toString(16).padLeft(2) + this.G.toString(16).padLeft(2) + this.B.toString(16).padLeft(2);
  }
  ARGBHtmlString() {
    return '#' + this.A.toString(16).padLeft(2) + this.R.toString(16).padLeft(2) + this.G.toString(16).padLeft(2) + this.B.toString(16).padLeft(2);
  }
  RGBAHtmlString() {
    return '#' + this.R.toString(16).padLeft(2) + this.G.toString(16).padLeft(2) + this.B.toString(16).padLeft(2) + this.A.toString(16).padLeft(2);
  }
  FormatColor(e) {
    if (e.R > 255) {
      e.R = 255;
    }
    if (e.R < 0) {
      e.R = 0;
    }
    if (e.G > 255) {
      e.G = 255;
    }
    if (e.G < 0) {
      e.G = 0;
    }
    if (e.B > 255) {
      e.B = 255;
    }
    if (e.B < 0) {
      e.B = 0;
    }
    if (e.A > 1) {
      e.A = 1;
    }
    if (e.A < 0) {
      e.A = 0;
    }
    return e;
  }
  Random() {
    this.R = Common.Rnd(0, 255);
    this.G = Common.Rnd(0, 255);
    this.B = Common.Rnd(0, 255);
    this.A = Common.Rnd(0, 255);
    return this.FormatColor(this);
  }
  Overlay(e) {
    //e是叠加的颜色颜色
    if (e.R <= 128) {
      this.R = Math.round((this.R * e.R) / 128);
    } else {
      this.R = Math.round(255 - (255 - this.R) * (255 - e.R) / 128);
    }
    if (e.G <= 128) {
      this.G = Math.round((this.G * e.G) / 128);
    } else {
      this.G = Math.round(255 - (255 - this.G) * (255 - e.G) / 128);
    }
    if (e.B <= 128) {
      this.B = Math.round((this.B * e.B) / 128);
    } else {
      this.B = Math.round(255 - (255 - this.B) * (255 - e.B) / 128);
    }
    return this.FormatColor(this);
  }
  //正片叠加
  Multiply(e) {
    //e是叠加的颜色颜色
    this.R = Math.round((this.R * e.R) / 255);
    this.G = Math.round((this.G * e.G) / 255);
    this.B = Math.round((this.B * e.B) / 255);
    return this.FormatColor(this);
  }
  //溶解
  Dissolve(e) {
    let iCa = e.A;
    this.R = Math.round(this.R + ((e.R - this.R) * iCa));
    this.G = Math.round(this.G + ((e.G - this.G) * iCa));
    this.B = Math.round(this.B + ((e.B - this.B) * iCa));
    return this.FormatColor(this);
  }
  //溶解2，通过透明度判断是否覆盖的概率
  Dissolve2(e) {
    let iCa = e.A;
    let iCa2 = Math.random();
    if (iCa2 > iCa2) {
      this.R = Math.round(this.R + ((e.R - this.R) * iCa));
      this.G = Math.round(this.G + ((e.G - this.G) * iCa));
      this.B = Math.round(this.B + ((e.B - this.B) * iCa));
    }
    return this.FormatColor(this);
  }
  //溶解
  Rnd(e) {
    let iCa = Math.random();
    this.R = Math.round(this.R + ((e.R - this.R) * iCa));
    this.G = Math.round(this.G + ((e.G - this.G) * iCa));
    this.B = Math.round(this.B + ((e.B - this.B) * iCa));
    return this.FormatColor(this);
  }
  //变暗
  Darken(e) {
    //e是叠加的颜色颜色
    this.R = Math.round(Math.min(this.R, e.R));
    this.G = Math.round(Math.min(this.G, e.G));
    this.B = Math.round(Math.min(this.B, e.B));
    return this.FormatColor(this);
  }
  //颜色加深
  ColorBurn(e) {
    this.R = Math.round(this.R - (((255 - this.R) * (255 - e.R)) / e.R));
    this.G = Math.round(this.G - (((255 - this.G) * (255 - e.G)) / e.G));
    this.B = Math.round(this.B - (((255 - this.B) * (255 - e.B)) / e.B));
    return this.FormatColor(this);
  }
  //线性加深
  LinearBurn(e) {
    this.R = this.R + e.R - 255;
    this.G = this.G + e.G - 255;
    this.B = this.B + e.B - 255;
    return this.FormatColor(this);
  }
  //变亮
  Lighten(e) {
    this.R = Math.round(Math.max(this.R, e.R));
    this.G = Math.round(Math.max(this.G, e.G));
    this.B = Math.round(Math.max(this.B, e.B));
    return this.FormatColor(this);
  }
  //滤色
  Screen(e) {
    this.R = Math.round(255 - (((255 - this.R) * (255 - e.R)) / 255));
    this.G = Math.round(255 - (((255 - this.G) * (255 - e.G)) / 255));
    this.B = Math.round(255 - (((255 - this.B) * (255 - e.B)) / 255));
    return this.FormatColor(this);
  }
  //线性减淡
  LinearDodge(e) {
    this.R = this.R + e.R;
    this.G = this.G + e.G;
    this.B = this.B + e.B;
    return this.FormatColor(this);
  }
  //颜色减淡
  ColorDodge(e) {
    this.R = Math.round(this.R + ((this.R * e.R) / (255 - e.R)));
    this.G = Math.round(this.G + ((this.G * e.G) / (255 - e.R)));
    this.B = Math.round(this.B + ((this.B * e.B) / (255 - e.R)));
    return this.FormatColor(this);
  }
  //柔光
  SoftLight(e) {
    if (e.R <= 128) {
      this.R = Math.round(((this.R * e.R) / 128) + ((this.R * this.R / 255 / 255) * (255 - (e.R * 2))));
    } else {
      this.R = Math.round(((this.R * (255 - e.R)) / 128) + (Math.sqrt(this.R / 255) * ((e.R * 2) - 255)));
    }
    if (e.G <= 128) {
      this.G = Math.round(((this.G * e.G) / 128) + ((this.G * this.G / 255 / 255) * (255 - (e.G * 2))));
    } else {
      this.G = Math.round(((this.G * (255 - e.G)) / 128) + (Math.sqrt(this.G / 255) * ((e.G * 2) - 255)));
    }
    if (e.B <= 128) {
      this.B = Math.round(((this.B * e.B) / 128) + ((this.B * this.B / 255 / 255) * (255 - (e.B * 2))));
    } else {
      this.B = Math.round(((this.B * (255 - e.B)) / 128) + (Math.sqrt(this.B / 255) * ((e.B * 2) - 255)));
    }
    return this.FormatColor(this);
  }
  //强光
  HardLight(e) {
    if (e.R <= 128) {
      this.R = Math.round((this.R * e.R) / 128);
    } else {
      this.R = Math.round(255 - (((255 - this.R) * (255 - e.R)) / 128));
    }
    if (e.G <= 128) {
      this.G = Math.round((this.G * e.G) / 128);
    } else {
      this.G = Math.round(255 - (((255 - this.G) * (255 - e.G)) / 128));
    }
    if (e.B <= 128) {
      this.B = Math.round((this.B * e.B) / 128);
    } else {
      this.B = Math.round(255 - (((255 - this.B) * (255 - e.B)) / 128));
    }
    return this.FormatColor(this);
  }
  //亮光
  VividLight(e) {
    if (e.R <= 128) {
      this.R = Math.round(this.R - (((255 - this.R) * (255 - (2 * e.R))) / (2 * e.R)));
    } else {
      this.R = Math.round(this.R - ((this.R * ((2 * e.R) - 255)) / (2 * (255 - e.R))));
    }
    if (e.G <= 128) {
      this.G = Math.round(this.G - (((255 - this.G) * (255 - (2 * e.G))) / (2 * e.G)));
    } else {
      this.G = Math.round(this.G - ((this.G * ((2 * e.G) - 255)) / (2 * (255 - e.G))));
    }
    if (e.B <= 128) {
      this.B = Math.round(this.B - (((255 - this.B) * (255 - (2 * e.B))) / (2 * e.B)));
    } else {
      this.B = Math.round(this.B - ((this.B * ((2 * e.B) - 255)) / (2 * (255 - e.B))));
    }
    return this.FormatColor(this);
  }
  //线性光
  LinearLight(e) {
    this.R = Math.round(this.R + ((2 * e.R) - 255));
    this.G = Math.round(this.G + ((2 * e.G) - 255));
    this.B = Math.round(this.B + ((2 * e.B) - 255));
    return this.FormatColor(this);
  }
  //点光
  PinLight(e) {
    if (e.R <= 128) {
      this.R = Math.round(Math.min(this.R, 2 * e.R));
    } else {
      this.R = Math.round(Math.min(this.R, (2 * e.R) - 255));
    }
    if (e.G <= 128) {
      this.G = Math.round(Math.min(this.G, 2 * e.G));
    } else {
      this.G = Math.round(Math.min(this.G, (2 * e.G) - 255));
    }
    if (e.B <= 128) {
      this.B = Math.round(Math.min(this.B, 2 * e.B));
    } else {
      this.B = Math.round(Math.min(this.B, (2 * e.B) - 255));
    }
    return this.FormatColor(this);
  }
  //差值
  Difference(e) {
    this.R = Math.abs(this.R - e.R);
    this.G = Math.abs(this.G - e.G);
    this.B = Math.abs(this.B - e.B);
    return this.FormatColor(this);
  }
  //排除
  Exclusion(e) {
    this.R = Math.round(this.R + e.R - ((this.R * e.R) / 128));
    this.G = Math.round(this.G + e.G - ((this.G * e.G) / 128));
    this.B = Math.round(this.B + e.B - ((this.B * e.B) / 128));
    return this.FormatColor(this);
  }
  //实色混合
  HardMix(e) {
    this.R = this.R + e.R;
    this.G = this.G + e.G;
    this.B = this.B + e.B;
    return this.FormatColor(this);
  }
  //色相
  Hue(e) {
    //HcScYc =HBSAYA
    let iH = e.HSV.H;
    let iS = this.HSV.S;
    let iV = this.HSV.V;
    let iA = this.A;
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  //饱和度
  Saturation(e) {
    //HcScYc =HASBYA
    let iH = this.HSV.H;
    let iS = e.HSV.S;
    let iV = this.HSV.V;
    let iA = this.A;
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  //颜色
  Color(e) {
    //HcScYc =HBSBYA
    let iH = e.HSV.H;
    let iS = e.HSV.S;
    let iV = this.HSV.V;
    let iA = this.A;
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  //亮度
  Luminosity(e) {
    //HcScYc =HASAYB
    let iH = this.HSV.H;
    let iS = this.HSV.S;
    let iV = e.HSV.V;
    let iA = this.A;
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  //将LAB的AB对调
  LABChangeAB() {
    return this.fromLAB(this.LAB.L, this.LAB.B, this.LAB.A);
  }
  HueAdd(e) {
    let iH = this.HSV().H;
    let iS = this.HSV().S;
    let iV = this.HSV().V;
    iH = iH + e;
    iH = iH % 360;
    if (iH < 0) {
      iH = 360 + iH;
    }
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  SaturationAdd(e) {
    let iH = this.HSV().H;
    let iS = this.HSV().S;
    let iV = this.HSV().V;
    iS = iS + e;
    if (iS > 100) {
      iS = 100;
    }
    if (iSiH < 0) {
      iS = 0;
    }
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  BrightnessAdd(e) {
    let iH = this.HSV().H;
    let iS = this.HSV().S;
    let iV = this.HSV().V;
    iV = iV + e;
    if (iV > 100) {
      iV = 100;
    }
    if (iV < 0) {
      iV = 0;
    }
    this.FromHSV(iH, iS, iV);
    return this.FormatColor(this);
  }
  LightnessAdd(e) {
    let iH = this.HSL().H;
    let iS = this.HSL().S;
    let iL = this.HSL().L;
    iL = iL + e;
    if (iL > 100) {
      iL = 100;
    }
    if (iL < 0) {
      iL = 0;
    }
    this.FromHSL(iH, iS, iL);
    return this.FormatColor(this);
  }
  //RGB轮转
  RGBChangeR2G() {
    return this.fromRGB(this.G, this.B, this.R);
  }
  //RGB轮转
  RGBChangeR2B() {
    return this.fromRGB(this.B, this.R, this.G);
  }
  //RGB轮转
  RGBChangeR2G2() {
    return this.fromRGB(this.B, this.G, this.R);
  }
}
module.exports = ColorClass;