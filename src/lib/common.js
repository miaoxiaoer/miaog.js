const DOMParser = require('xmldom').DOMParser;

const fs = require('fs'); //文件模块
const buffer = require('buffer'); //文件模块
const path = require('path'); //路径模块

const _ = require('lodash');
//图形库 
//星形，心形，环形，锯齿，正多边形（六边形），圆角算法，螺旋线画法，弧线
/*
x^2+y^2=r^2;
z=T*·[arctan(y/x)/2*pi];
其中r为螺旋半径，T为螺距
外半径，内半径，螺旋一圈的螺距（或者说螺旋多少圈）
*/
module.exports = {
  FixedNumber: 7, //默认的精度为7位小数
  CCKey: 'XsN4Pu2e1JTq85La7VF6k3oic0yBZRmH',
  DatetimeFormat: 'yyyy-MM-dd H:mm:ss',
  DateFormat: 'yyyy-MM-dd',
  CommonCounterVar: 50,
  MiaoGraphicalErrorStr: '',
  CharList: ['X', 'Y', 'Z', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
  Char60List: ['X', 'Y', 'Z', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'χ', 'Ψ', 'Ω', 'α', 'β', 'γ', 'δ', 'Δ', 'ε', 'ζ', 'η', 'ι', 'κ', 'Θ', 'Λ', 'μ', 'Ξ', 'ο', 'π', 'ρ', 'Σ', 'τ', 'υ', 'Φ', 'ε', 'ʬ', 'ʭ', 'Ж', 'Ѫ', 'Б', 'Д', 'И', 'Ч', 'Ƕ', 'Ƿ', 'ʘ'],
  ColorStrREG: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
  ColorRgbaStrREG: /^#([0-9a-fA-f]{4}|[0-9a-fA-f]{8})$/,
  GoldenMean: (Math.sqrt(5) - 1) / 2,
  BezierCurveAlgorithmCycles: 16,
  CoordinateSystem: '逻辑', //这里有两个值，一种是逻辑坐标，一个是设备坐标，逻辑坐标是按照数学中的xy轴坐标系，x自左而右增加，y轴自下而上增加。而设备坐标的y轴是自下而上减少
  RandomNumM: 10000,
  //精度加法，因为js加减会产生精度的误差，用这个算法，可以解决精度问题。
  accAdd: function (arg1, arg2) {
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
  },
  //精度加法，因为js加减会产生精度的误差，用这个算法，可以解决精度问题。
  accSub: function (arg1, arg2) {
    return this.accAdd(arg1, -arg2);
  },
  //精度乘法，因为js加减会产生精度的误差，用这个算法，可以解决精度问题。
  accMul: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  //精度除法，因为js加减会产生精度的误差，用这个算法，可以解决精度问题。
  accDiv: function (arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {}
    with(Math) {
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * pow(10, t2 - t1);
    }
  },
  //生成一个唯一ID
  GetGuid: function () {
    let guid = '';
    for (let i = 1; i <= 32; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    return guid;
  },
  //每一个类在初始化的时候会使用到这个函数，用set将arguments(参数数组分拆后传递给相应的set设置初始值)
  GetSetFunStr: function (argus) {
    if (!_.isUndefined(argus)) {
      if (argus.length > 0) {
        let ievalstr = '';
        for (let i = 0; i < argus.length; i++) {
          if (i != 0) {
            ievalstr = ievalstr + ',';
          }
          ievalstr = ievalstr + 'arguments[' + i + ']';
        }
        return 'this.Set(' + ievalstr + ')';
      }
    }
    return 'this.Set()';
  },
  GetNewClassFunStr: function (ecn, argus) {
    if (argus.length > 0) {
      let ievalstr = '';
      for (let i = 0; i < argus.length; i++) {
        if (i != 0) {
          ievalstr = ievalstr + ',';
        }
        ievalstr = ievalstr + 'arguments[' + i + ']';
      }
      return 'new ' + ecn + '(' + ievalstr + ')';
    }
    return 'new ' + ecn + '()';
  },
  //生成一个随机整数
  GetRandomInt: function (n) {
    return parseInt(Math.floor(Math.random() * n));
  },
  GetSvgRoot: function (eXmlString) {
    let doc = new DOMParser().parseFromString('<xml>' + eXmlString + '</xml>', 'text/xml');
    let xmlDocRoot = doc.documentElement;

    let xmlDocRootChildNodeList = xmlDocRoot.childNodes;
    let isvgrootnode;
    _.each(xmlDocRootChildNodeList, function (element, index, list) {
      if (element.nodeName == 'svg') {
        isvgrootnode = element;
      }
    });
    return isvgrootnode;
  },
  SvgElement: function (svgText) {
    let parser = new DOMParser(),
      xmlText = '<svg xmlns=\'http://www.w3.org/2000/svg\'>' +
      svgText + '</svg>',
      docElem = parser.parseFromString(xmlText, 'text/xml').documentElement;

    let node = docElem.firstChild;
    document.importNode(node, true);
    return node
  },
  IsSvg: function (buf) {
    let htmlCommentRegex = /<!--([\s\S]*?)-->/g;
    return !this.IsBinary(buf) && /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype svg[^>]*\s*(?:<![^>]*>)*[^>]*>\s*)?<svg[^>]*>[^]*<\/svg>\s*$/i.test(buf.toString().replace(htmlCommentRegex, ''));
  },
  IsBinary: function (buf) {
    let isBuf = Buffer.isBuffer(buf);
    for (let i = 0; i < 24; i++) {
      let charCode = isBuf ? buf[i] : buf.charCodeAt(i);
      if (charCode === 65533 || charCode <= 8) {
        return true;
      }
    }
    return false;
  },
  IsJson: function (e) {
    let isjson = typeof (e) == 'object' && Object.prototype.toString.call(e).toLowerCase() == '[object object]' && !e.length;
    return isjson;
  },
  RandomString: function (eletters, elen) { //随机生成字符串
    elen = elen || 32;
    let imaxPos = eletters.length;
    let icode = '';
    for (let i = 0; i < elen; i++) {
      icode += eletters.charAt(Math.floor(Math.random() * imaxPos));
    }
    return icode;
  },
  GetRandomDate: function (a, b) { // 要求a 是Date类型, b 是一个时间戳数字，注意单位是毫秒 -1800000也就是半小时前
    let idate = new Date(parseInt(Date.parse(a) + Math.floor(Math.random() * b)));
    return idate;
  },
  IsContainChinese: function (estr) { //判断是否包含中文
    if (escape(estr).indexOf('%u') >= 0) {
      return true;
    }
    return false;
  },
  IsContainNumber: function (estr) { //判断是否包含数字
    let resp = /[0-9]/;
    return resp.test(estr); //true, 
  },
  IsEmail: function (estr) {
    let iresultb = /^([a-za-z0-9]+[_|-|.]?)*[a-za-z0-9]+@([a-za-z0-9]+[_|-|.]?)*[a-za-z0-9]+.[a-za-z]{2,3}$/;
    return iresultb.test(estr);
  },
  GetNowFormatDate: function (edate) {
    let date = new Date();
    if (typeof (edate) != 'undefined') {
      date = edate;
    }
    let seperator1 = '-';
    let seperator2 = ':';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = '0' + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate;
    }

    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
  },
  GetRandomDate: function (a, b) { // 要求a 是Date类型, b 是一个时间戳数字，注意单位是毫秒 -1800000也就是半小时前
    let idate = new Date(parseInt(Date.parse(a) + Math.floor(Math.random() * b)));
    return idate;
  },
  Rnd: function (emin, emax) {
    if (_.isUndefined(emin)) {
      emin = 0;
    }
    if (_.isUndefined(emax)) {
      emax = this.RandomNumM;
    }
    return emin + Math.floor(Math.random() * (emax - emin + 1));
  },
  GetRndFromArr: function (earr) {
    let irestr = '';
    irestr = earr[Math.floor(earr.length * Math.random())];
    return irestr;
  },
  Percent2Point: function (percent) {
    let str = percent.replace('%', '');
    str = str / 100;
    return str;
  },
  ArrayInsertAt: function (arr, index, value) {
    let part1 = arr.slice(0, index);
    let part2 = arr.slice(index);
    part1.push(value);
    return (part1.concat(part2));
  },
  ArrayRemoveAt: function (arr, index) {
    let part1 = arr.slice(0, index);
    let part2 = arr.slice(index);
    part1.pop();
    return (part1.concat(part2));
  },
  ApproximatelyEqual: function (ea, eb, ec) {
    // ea 约等于 eb ，ec是可以忽略的范围
    //Math.formatFloat(0.1 + 0.2, 1) === 0.3;
    if (ec === undefined) {
      ec = 1.0;
    }
    if (ea == eb) {
      return true;
    } else if (ea > eb) {
      if ((ea - ec) < eb) {
        return true;
      }
    } else if (ea < eb) {
      if ((ea + ec) > eb) {
        return true;
      }
    }
    return false;
  },
  FormatFloat: function (f, digit) { //格式化小数，将小数保留有效位数f是数字，digit是保留的位数
    let m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
  },
  StringTrim: function (s) //去除空格
  {
    return s.replace(/(^\s*)|(\s*$)/g, '');
  },
  /**
   * 删除左边的空格
   */
  StringLTrim: function (s) {
    return s.replace(/(^\s*)/g, '');
  },
  /**
   * 删除右边的空格
   */
  StringRTrim: function (s) {
    return s.replace(/(\s*$)/g, '');
  },
  //是否是包含字符
  StringIsContains: function (s, substr) {
    return s.indexOf(substr) >= 0;
  },
  StringIsShortDate: function (edate) { //判断是否短日期格式
    let r = edate.replace(/(^\s*)|(\s*$)/g, '').match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) {
      return false;
    }
    let d = new Date(r[1], r[3] - 1, r[4]);
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
  },
  IsLongDate: function (edate) {
    let reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    let r = edate.match(reg);
    if (r == null) return false;
    r[2] = r[2] - 1;
    let d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
    if (d.getFullYear() != r[1]) return false;
    if (d.getMonth() != r[2]) return false;
    if (d.getDate() != r[3]) return false;
    if (d.getHours() != r[4]) return false;
    if (d.getMinutes() != r[5]) return false;
    if (d.getSeconds() != r[6]) return false;
    return true;
  },
  //是否是正确的日期 
  StringIsDate: function (edate) {
    return this.isLongDate(edate) || this.isShortDate(edate);
  },
  //是否是手机 
  StringIsMobile: function (estr) {
    return /^0{0,1}13[0-9]{9}$/.test(estr);
  },
  //是否是邮编(中国) 
  StringIsZipCode: function (estr) {
    return /^[\\d]{6}$/.test(estr);
  },
  //是否是有汉字 
  StringExistChinese: function (estr) {
    //[\u4E00-\u9FA5]为汉字，[\uFE30-\uFFA0]为全角符号 
    return /^[\x00-\xff]*$/.test(estr);
  },
  //是否是英文和数字 
  StringExistEnglishOrNumber: function (estr) {
    //[\u4E00-\u9FA5]为汉字，[\uFE30-\uFFA0]为全角符号 
    return /^[a-zA-Z0-9]*$/.test(estr);
  },
  //是否是合法的文件名/目录名 
  FileNameIsRight: function (efname) {
    return !/[\\\/\*\?\|:\"<>]/g.test(efname);
  },
  //是否是有效链接 
  StringIsUrl: function (eurl) {
    return /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/i.test(eurl);
  },
  /** 
   * 左补齐字符串 
   *  
   * @param nSize 
   *            要补齐的长度 
   * @param ch 
   *            要补齐的字符 
   * @return 
   */
  StringPadLeft: function (estr, nSize, ch) {
    let len = 0;
    let s = estr ? estr : '';
    ch = ch ? ch : '0'; // 默认补0  

    len = s.length;
    while (len < nSize) {
      s = ch + s;
      len++;
    }
    return s;
  },
  /** 
   * 右补齐字符串 
   *  
   * @param nSize 
   *            要补齐的长度 
   * @param ch 
   *            要补齐的字符 
   * @return 
   */
  StringPadRight: function (estr, nSize, ch) {
    let len = 0;
    let s = estr ? estr : '';
    ch = ch ? ch : '0'; // 默认补0  

    len = s.length;
    while (len < nSize) {
      s = s + ch;
      len++;
    }
    return s;
  },
  /** 
   * 左移小数点位置（用于数学计算，相当于除以Math.pow(10,scale)） 
   *  
   * @param scale 
   *            要移位的刻度 
   * @return 
   */
  StringMovePointLeft: function (estr, scale) {
    let s, s1, s2, ch, ps, sign;
    ch = '.';
    sign = '';
    s = estr ? estr : '';

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : '';
    s2 = ps[1] ? ps[1] : '';
    if (s1.slice(0, 1) == '-') {
      s1 = s1.slice(1);
      sign = '-';
    }
    if (s1.length <= scale) {
      ch = '0.';
      s1 = s1.padLeft(scale);
    }
    return sign + s1.slice(0, -scale) + ch + s1.slice(-scale) + s2;
  },
  /** 
   * 右移小数点位置（用于数学计算，相当于乘以Math.pow(10,scale)） 
   *  
   * @param scale 
   *            要移位的刻度 
   * @return 
   */
  StringMovePointRight: function (estr, scale) {
    let s, s1, s2, ch, ps;
    ch = '.';
    s = this ? this : '';

    if (scale <= 0) return s;
    ps = s.split('.');
    s1 = ps[0] ? ps[0] : '';
    s2 = ps[1] ? ps[1] : '';
    if (s2.length <= scale) {
      ch = '';
      s2 = s2.padRight(scale);
    }
    return s1 + s2.slice(0, scale) + ch + s2.slice(scale, s2.length);
  },
  /** 
   * 移动小数点位置（用于数学计算，相当于（乘以/除以）Math.pow(10,scale)） 
   *  
   * @param scale 
   *            要移位的刻度（正数表示向右移；负数表示向左移动；0返回原值） 
   * @return 
   */
  StringMovePoint: function (estr, scale) {
    if (scale >= 0)
      return this.movePointRight(estr, scale);
    else
      return this.movePointLeft(estr, -scale);
  },
  //素数判断
  IsProbablePrime: function (n) {
    let b = true;
    if (n == 0) {
      return false;
    }
    if (n < 0) {
      n = 0 - n;
    }
    if (n == 1) {
      return false;
    }
    if (n == 2) {
      b = true;
    } else {
      let sqr = Math.sqrt(n);
      for (let i = sqr; i > 2; i--) {
        if (n % i == 0) {
          b = false;
        }
      }
    }
    return b;
  },
  ObjectClone: function (eObject) {
    let o = {};
    for (let i in eObject) {
      o[i] = eObject[i];
    }
    return o;
  },
  ArrayClone: function (eArray) {
    let arr = [];
    for (let i = 0; i < eArray.length; i++) {
      if (typeof eArray[i] !== 'object') {
        arr.push(eArray[i]);
      } else {
        arr.push(this.ObjectClone(eArray[i]));
      }
    }
    return arr;
  },
  //求和，将所有的参数相加，得到最后的结果
  Sum: function () {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      if (typeof (arguments[i]) === 'number') {
        total = total + arguments[i];
      }
    }
    return total;
  },
  //求积，将所有的参数相乘，得到最后的结果
  Product: function () {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
      if (typeof (arguments[i]) === 'number') {
        total = total * arguments[i];
      }
    }
    return total;
  },
  /**二项分布算法，N次独立重复试验中发生K次的概率是
   * Calculate the Rotate coefficient (n choose k)
   *
   * @param {Number} available choices
   * @param {Number} number chosen
   * @return {Number} number of possible choices
   */
  Binomial: function (n, k) {
    let arr = [];

    function _binomial(n, k) {
      if (typeof (n) !== 'number' && typeof (k) !== 'number') {
        throw new Error('输入必须是数字。');
      }
      if (n >= 0 && k === 0) return 1;
      if (n === 0 && k > 0) return 0;
      if (arr[n] && arr[n][k] > 0) return arr[n][k];
      if (!arr[n]) arr[n] = [];

      arr[n][k] = _binomial(n - 1, k - 1) + _binomial(n - 1, k);
      return arr[n][k];
    }
    return _binomial(n, k);
  },
  /**阶乘
   * Factorial for some integer.
   *
   * @param {Number} integer.
   * @return {Number} result.
   */
  Factorial: function (num) {
    if (typeof (num) !== 'number') throw new Error('输入必须是数字。');
    if (num < 0) throw new Error('输入不能为负。');
    let i = 2,
      o = 1;

    while (i <= num) {
      o *= i++;
    }

    return o;
  },
  /**降阶乘
   * Calculate the falling factorial of a number
   *
   * {@see http://mathworld.wolfram.com/FallingFactorial.html}
   *
   * @param {Number} Base
   * @param {Number} Steps to fall
   * @returns {Number} Result
   */
  FallingFactorial: function (n, k) {
    let i = (n - k + 1),
      r = 1;
    if (n < 0) {
      throw new Error('n 不能是负数。');
    }
    if (k > n) {
      throw new Error('k 不能比 n 大。');
    }
    while (i <= n) {
      r *= i++;
    }
    return r;
  },
  /**计算a和b的最大公约数
   * Calculate the greastest common divisor amongst two integers.
   *
   * @param {Number} number A.
   * @param {Number} number B.
   * @return {Number} greatest common divisor for integers A, B.
   */
  GCD: function (a, b) {
    let c;
    a = +a;
    b = +b;
    // Same as isNaN() but faster
    if (a !== a || b !== b) {
      return NaN;
    }
    //Same as !isFinite() but faster
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
      return Infinity;
    }
    // Checks if a or b are decimals
    if ((a % 1 !== 0) || (b % 1 !== 0)) {
      throw new Error('只能在整数上操作');
    }
    while (b) {
      c = a % b;
      a = b;
      b = c;
    }
    return (0 < a) ? a : -a;
  },
  /**计算a和b的最小公倍数
   * Calculate the least common multiple amongst two integers.
   *
   * @param {Number} number A.
   * @param {Number} number B.
   * @return {Number} least common multiple for integers A, B.
   */
  LCM: function (num1, num2) {
    return Math.abs(num1 * num2) / this.GCD(num1, num2);
  },
  /**从数组中随机抽取样本，allowDuplicates是是否允许重复
   * Retrieve a specified quantity of elements from an array, at random.
   *
   * @param {Array} set of values to select from.
   * @param {Number} quantity of elements to retrieve.
   * @param {Boolean} allow the same number to be returned twice.
   * @return {Array} random elements.
   */
  RandomAQA: function (arr, quant, allowDuplicates) {
    if (arr.length === 0) {
      throw new Error('空数组');
    } else if (quant > arr.length && !allowDuplicates) {
      throw new Error('请求的数量超过数组的大小');
    }

    if (allowDuplicates === true) {
      let result = [],
        i;
      for (i = 0; i < quant; i++) {
        result[i] = arr[Math.floor(Math.random() * arr.length)];
      }
      return result;
    } else {
      return this.Shuffle(arr).slice(0, quant);
    }
  },
  /**随机打乱数组顺序
   * Shuffle an array, in place.
   *
   * @param {Array} array to be shuffled.
   * @return {Array} shuffled array.
   */
  Shuffle: function (array) {
    array.sort(function (a, b) {
      return 0.5 - Math.random()
    });
    return array;
  },
  /**创建一个数字的范围数组
   * Create a range of numbers.
   *
   * @param {Number} The start of the range.起始点
   * @param {Number} The end of the range.终点
   * @return {Array} An array containing numbers within the range.步长
   */
  CreatRange: function (start, stop, step) {
    let array, i = 0,
      len;
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }

    step = step || 1;

    if (stop < start) {
      step = 0 - Math.abs(step);
    }

    len = Math.max(Math.ceil((stop - start) / step) + 1, 0);

    array = new Array(len);

    while (i < len) {
      array[i++] = start;
      start += step;
    }
    return array;
  },
  /**判断是否是整数
   * Determine if the number is an integer.
   *
   * @param {Number} the number
   * @return {Boolean} true for int, false for not int.
   */
  IsInt: function (n) {
    return n % 1 === 0;
  },
  //返回的是a//b（除法取整）以及a对b的余数
  DivMod: function (a, b) {
    if (b <= 0) throw new Error('B不能为零。未定义');
    if (!IsInt(a) || !IsInt(b)) throw new Error('A或B不是整数。');
    return [Math.floor(a / b), a % b];
  },

  /**
   * Calculate:
   * if b >= 1: a^b mod m.
   * if b = -1: modInverse(a, m).
   * if b < 1: finds a modular rth root of a such that b = 1/r.
   *
   * @param {Number} Number a.
   * @param {Number} Number b.
   * @param {Number} Modulo m.
   * @return {Number} see the above documentation for return values.
   */
  PowerMod: function (a, b, m) {
    if (typeof (a) !== 'number' || typeof (b) !== 'number' || typeof (m) !== 'number') throw new Error('Inputs must be numbers.');
    // If b < -1 should be a small number, this method should work for now.
    if (b < -1) return Math.pow(a, b) % m;
    if (b === 0) return 1 % m;
    if (b >= 1) {
      let result = 1;
      while (b > 0) {
        if ((b % 2) === 1) {
          result = (result * a) % m;
        }

        a = (a * a) % m;
        b = b >> 1;
      }
      return result;
    }

    if (b === -1) return basic.modInverse(a, m);
    if (b < 1) {
      return basic.powerMod(a, Math.pow(b, -1), m);
    }
  },
  /**计算a和b的最大公约数，扩展欧几里得算法
   * Calculate the extended Euclid Algorithm or extended GCD.
   *
   * @param {Number} int a.
   * @param {Number} int b.
   * @return {Array} [a, x, y] a is the GCD. x and y are the values such that ax + by = gcd(a, b) .
   */
  EGCD: function (a, b) {
    a = +a;
    b = +b;
    // Same as isNaN() but faster
    if (a !== a || b !== b) {
      return [NaN, NaN, NaN];
    }
    //Same as !isFinite() but faster
    if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity) {
      return [Infinity, Infinity, Infinity];
    }
    // Checks if a or b are decimals
    if ((a % 1 !== 0) || (b % 1 !== 0)) {
      throw new Error('只能在整数上操作');
    }
    let signX = (a < 0) ? -1 : 1,
      signY = (b < 0) ? -1 : 1,
      x = 0,
      y = 1,
      oldX = 1,
      oldY = 0,
      q, r, m, n;
    a = Math.abs(a);
    b = Math.abs(b);

    while (a !== 0) {
      q = Math.floor(b / a);
      r = b % a;
      m = x - oldX * q;
      n = y - oldY * q;
      b = a;
      a = r;
      x = oldX;
      y = oldY;
      oldX = m;
      oldY = n;
    }
    return [b, signX * x, signY * y];
  },
  /**计算一个数的模逆
   * Calculate the modular inverse of a number.
   *
   * @param {Number} Number a.
   * @param {Number} Modulo m.
   * @return {Number} if true, return number, else throw error.
   */
  ModInverse: function (a, m) {
    let r = this.EGCD(a, m);
    if (r[0] !== 1) throw new Error('无模逆存在');
    return r[1] % m;
  },
  /**约等于，在给定的精度范围内判断两个数是否相等
   * Determine is two numbers are equal within a given margin of precision.
   *
   * @param {Number} first number.
   * @param {Number} second number.
   * @param {Number} epsilon.
   */
  NumbersEqual: function (first, second, epsilon) {
    if (typeof (first) !== 'number' || typeof (second) !== 'number' || typeof (epsilon) !== 'number') throw new Error('First and Second must be numbers.');
    return (first - second) < epsilon && (first - second) > -epsilon;
  },
  //素数判断
  IsPrime: function (n) {
    if (isNaN(n) || !isFinite(n) || n % 1) {
      return false;
    }
    if (n < 0) {
      n = 0 - n;
    }
    if (n == 0) {
      return false;
    }
    if (n == 1) {
      return false;
    }
    if (n % 2 === 0) {
      return (n === 2);
    }
    if (n % 3 === 0) {
      return (n === 3);
    }
    for (let i = 5, m = Math.sqrt(n); i <= m; i += 6) {
      if ((n % i === 0) || (n % (i + 2) === 0)) {
        return false;
      }
    }
    return true;
  },
  /**
   * Calculate the permutation (n choose k)
   *
   * @param {Number} available choices
   * @param {Number} number chosen
   * @return {Number} number of ordered variations
   */
  Permutation: function (n, k) {
    if (n <= 0) {
      throw new Error('n不能小于或等于0。');
    }
    if (n < k) {
      throw new Error('K不能大于K。');
    }
    let binomial = this.Binomial(n, k);
    let permutation = binomial * this.Factorial(k);
    return permutation;
  },
  /**
   * Determine if a number is a perfect power.
   * Please note that this method does not find the minimal value of k where
   * m^k = n
   * http://en.wikipedia.org/wiki/Perfect_power
   *
   * @param {Number} value in question
   * @return {Array|Boolean} [m, k] if it is a perfect power, false otherwise
   */
  getPerfectPower: function (n) {
    let test = this.getPrimePower(n);
    if (test && test[1] > 1) return test;
    return false;
  },
  //素数幂判断
  /**
   * Determine if a number is a prime power and return the prime and the power.
   * http://en.wikipedia.org/wiki/Prime_power
   *
   * @param {Number} value in question
   * @return {Array|Boolean}  if it is a prime power, return [prime, power].
   */
  getPrimePower: function (n) {
    if (n < 2) return false;
    if (prime.millerRabin(n)) return [n, 1];
    if (n % 2 === 0) return [2, n.toString(2).length - 1];

    let factors = prime.factorization(n);

    if (!factors) return false;

    let len = factors.length;

    for (let i = 0; i < len; i++) {
      let t = 0,
        p = 0;

      while (t <= n) {
        t = Math.pow(factors[i], p);
        if (t / n === 1) return [factors[i], p];
        p++;
      }
    }
    return false;
  },
  IsSquare: function (arr) {
    if (!_.isArray(arr)) {
      return false;
    } else if (arr[0][0] === undefined) {
      return false;
    }
    let rows = arr.length;
    for (let i = 0; i < rows; i++) {
      if (arr[i].length !== rows) return false;
    }
    return true;
  },
  /**
   * Add two matrices together.  Matrices must be of same dimension.
   *
   * @param {Array} matrix A.
   * @param {Array} matrix B.
   * @return {Array} summed matrix.
   */
  MatrixAddition: function (arrA, arrB) {
    if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
      throw new Error('矩阵失配');
    }
    let result = new Array(arrA.length),
      i;
    if (!arrA[0].length) {
      // The arrays are vectors.
      for (i = 0; i < arrA.length; i++) {
        result[i] = arrA[i] + arrB[i];
      }
    } else {
      for (i = 0; i < arrA.length; i++) {
        result[i] = new Array(arrA[i].length);
        for (let j = 0; j < arrA[i].length; j++) {
          result[i][j] = arrA[i][j] + arrB[i][j];
        }
      }
    }
    return result;
  },
  /**
   * Subtract one matrix from another (A - B).  Matrices must be of same dimension.
   *
   * @param {Array} matrix A.
   * @param {Array} matrix B.
   * @return {Array} subtracted matrix.
   */
  MatrixSubtraction: function (arrA, arrB) {
    if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
      throw new Error('矩阵失配');
    }
    let result = new Array(arrA.length),
      i;
    if (!arrA[0].length) {
      // The arrays are vectors.
      for (i = 0; i < arrA.length; i++) {
        result[i] = arrA[i] - arrB[i];
      }
    } else {
      for (i = 0; i < arrA.length; i++) {
        result[i] = new Array(arrA[i].length);

        for (let j = 0; j < arrA[i].length; j++) {
          result[i][j] = arrA[i][j] - arrB[i][j];
        }
      }
    }
    return result;
  },
  MatrixScalar: function (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = val * arr[i][j];
      }
    }
    return arr;
  }

};