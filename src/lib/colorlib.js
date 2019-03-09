
const ColorClass = require('./color_class.js');
// //MiaoCommonColor公共颜色类
const ColorLib = {
  BgColor: new ColorClass(255, 255, 255, 255),
  TransparentColor: new ColorClass(0, 0, 0, 0),
  AliceBlue: new ColorClass(255, 240, 248, 255),
  LightSalmon: new ColorClass(255, 255, 160, 122),
  AntiqueWhite: new ColorClass(255, 250, 235, 215),
  LightSeaGreen: new ColorClass(255, 32, 178, 170),
  Aqua: new ColorClass(255, 0, 255, 255),
  LightSkyBlue: new ColorClass(255, 135, 206, 250),
  Aquamarine: new ColorClass(255, 127, 255, 212),
  LightSlateGray: new ColorClass(255, 119, 136, 153),
  Azure: new ColorClass(255, 240, 255, 255),
  LightSteelBlue: new ColorClass(255, 176, 196, 222),
  Beige: new ColorClass(255, 245, 245, 220),
  LightYellow: new ColorClass(255, 255, 255, 224),
  Bisque: new ColorClass(255, 255, 228, 196),
  Lime: new ColorClass(255, 0, 255, 0),
  Black: new ColorClass(255, 0, 0, 0),
  LimeGreen: new ColorClass(255, 50, 205, 50),
  BlanchedAlmond: new ColorClass(255, 255, 255, 205),
  Linen: new ColorClass(255, 250, 240, 230),
  Blue: new ColorClass(255, 0, 0, 255),
  Magenta: new ColorClass(255, 255, 0, 255),
  BlueViolet: new ColorClass(255, 128, 0, 0),
  Brown: new ColorClass(255, 165, 42, 42),
  MediumAquamarine: new ColorClass(255, 102, 205, 170),
  BurlyWood: new ColorClass(255, 222, 184, 135),
  MediumBlue: new ColorClass(255, 0, 0, 205),
  CadetBlue: new ColorClass(255, 95, 158, 160),
  MediumOrchid: new ColorClass(255, 186, 85, 211),
  Chartreuse: new ColorClass(255, 127, 255, 0),
  MediumPurple: new ColorClass(255, 147, 112, 219),
  Chocolate: new ColorClass(255, 210, 105, 30),
  MediumSeaGreen: new ColorClass(255, 60, 179, 113),
  Coral: new ColorClass(255, 255, 127, 80),
  MediumSlateBlue: new ColorClass(255, 123, 104, 238),
  CornflowerBlue: new ColorClass(255, 100, 149, 237),
  MediumSpringGreen: new ColorClass(255, 0, 250, 154),
  Cornsilk: new ColorClass(255, 255, 248, 220),
  MediumTurquoise: new ColorClass(255, 72, 209, 204),
  Crimson: new ColorClass(255, 199, 21, 112),
  Cyan: new ColorClass(255, 0, 255, 255),
  MidnightBlue: new ColorClass(255, 25, 25, 112),
  DarkBlue: new ColorClass(255, 0, 0, 139),
  MintCream: new ColorClass(255, 245, 255, 250),
  DarkCyan: new ColorClass(255, 0, 139, 139),
  MistyRose: new ColorClass(255, 255, 228, 225),
  DarkGoldenrod: new ColorClass(255, 184, 134, 11),
  Moccasin: new ColorClass(255, 255, 228, 181),
  DarkGray: new ColorClass(255, 169, 169, 169),
  NavajoWhite: new ColorClass(255, 255, 222, 173),
  DarkGreen: new ColorClass(255, 0, 0, 128),
  DarkKhaki: new ColorClass(255, 189, 183, 107),
  OldLace: new ColorClass(255, 253, 245, 230),
  DarkMagena: new ColorClass(255, 128, 128, 0),
  DarkOliveGreen: new ColorClass(255, 107, 142, 45),
  DarkOrange: new ColorClass(255, 255, 140, 0),
  Orange: new ColorClass(255, 255, 165, 0),
  DarkOrchid: new ColorClass(255, 153, 50, 204),
  OrangeRed: new ColorClass(255, 255, 69, 0),
  DarkRed: new ColorClass(255, 139, 0, 0),
  Orchid: new ColorClass(255, 218, 112, 214),
  DarkSalmon: new ColorClass(255, 233, 150, 122),
  PaleGoldenrod: new ColorClass(255, 238, 232, 170),
  DarkSeaGreen: new ColorClass(255, 143, 188, 143),
  PaleGreen: new ColorClass(255, 152, 251, 152),
  DarkSlateBlue: new ColorClass(255, 72, 61, 139),
  PaleTurquoise: new ColorClass(255, 175, 238, 238),
  DarkSlateGray: new ColorClass(255, 219, 112, 147),
  DarkTurquoise: new ColorClass(255, 0, 206, 209),
  PapayaWhip: new ColorClass(255, 255, 239, 213),
  DarkViolet: new ColorClass(255, 148, 0, 211),
  PeachPuff: new ColorClass(255, 255, 218, 155),
  DeepPink: new ColorClass(255, 205, 133, 63),
  DeepSkyBlue: new ColorClass(255, 0, 191, 255),
  Pink: new ColorClass(255, 255, 192, 203),
  DimGray: new ColorClass(255, 105, 105, 105),
  Plum: new ColorClass(255, 221, 160, 221),
  DodgerBlue: new ColorClass(255, 30, 144, 255),
  PowderBlue: new ColorClass(255, 176, 224, 230),
  Firebrick: new ColorClass(255, 128, 0, 128),
  FloralWhite: new ColorClass(255, 255, 250, 240),
  Red: new ColorClass(255, 255, 0, 0),
  ForestGreen: new ColorClass(255, 34, 139, 34),
  RosyBrown: new ColorClass(255, 188, 143, 143),
  Fuschia: new ColorClass(255, 255, 0, 255),
  RoyalBlue: new ColorClass(255, 65, 105, 225),
  SaddleBrown: new ColorClass(255, 139, 69, 19),
  GhostWhite: new ColorClass(255, 248, 248, 255),
  Salmon: new ColorClass(255, 250, 128, 114),
  Gold: new ColorClass(255, 255, 215, 0),
  SandyBrown: new ColorClass(255, 244, 164, 96),
  Goldenrod: new ColorClass(255, 218, 165, 32),
  SeaGreen: new ColorClass(255, 46, 139, 87),
  Gray: new ColorClass(255, 128, 128, 128),
  Seashell: new ColorClass(255, 255, 245, 238),
  Green: new ColorClass(255, 160, 82, 45),
  GreenYellow: new ColorClass(255, 173, 255, 47),
  Silver: new ColorClass(255, 192, 192, 192),
  Honeydew: new ColorClass(255, 240, 255, 240),
  SkyBlue: new ColorClass(255, 135, 206, 235),
  HotPink: new ColorClass(255, 255, 105, 180),
  SlateBlue: new ColorClass(255, 106, 90, 205),
  IndianRed: new ColorClass(255, 112, 128, 144),
  Indigo: new ColorClass(255, 75, 0, 130),
  Snow: new ColorClass(255, 255, 250, 250),
  Ivory: new ColorClass(255, 255, 240, 240),
  SpringGreen: new ColorClass(255, 0, 255, 127),
  Khaki: new ColorClass(255, 240, 230, 140),
  SteelBlue: new ColorClass(255, 70, 130, 180),
  Lavender: new ColorClass(255, 230, 230, 250),
  Tan: new ColorClass(255, 210, 180, 140),
  LavenderBlush: new ColorClass(255, 255, 240, 245),
  Teal: new ColorClass(255, 0, 128, 128),
  LawnGreen: new ColorClass(255, 124, 252, 0),
  Thistle: new ColorClass(255, 216, 191, 216),
  LemonChiffon: new ColorClass(255, 255, 250, 205),
  Tomato: new ColorClass(255, 253, 99, 71),
  LightBlue: new ColorClass(255, 173, 216, 230),
  Turquoise: new ColorClass(255, 64, 224, 208),
  LightCoral: new ColorClass(255, 240, 128, 128),
  Violet: new ColorClass(255, 238, 130, 238),
  LightCyan: new ColorClass(255, 224, 255, 255),
  Wheat: new ColorClass(255, 245, 222, 179),
  LightGoldenrodYellow: new ColorClass(255, 250, 250, 210),
  White: new ColorClass(255, 255, 255, 255),
  LightGreen: new ColorClass(255, 144, 238, 144),
  WhiteSmoke: new ColorClass(255, 245, 245, 245),
  LightGray: new ColorClass(255, 211, 211, 211),
  Yellow: new ColorClass(255, 255, 255, 0),
  LightPink: new ColorClass(255, 255, 182, 193),
  YellowGreen: new ColorClass(255, 154, 205, 50),
  背景色: new ColorClass(255, 255, 255, 255),
  透明色: new ColorClass(0, 0, 0, 0),
  爱丽丝蓝: new ColorClass(255, 240, 248, 255),
  浅肉色: new ColorClass(255, 255, 160, 122),
  古董白: new ColorClass(255, 250, 235, 215),
  浅海洋绿: new ColorClass(255, 32, 178, 170),
  水绿色: new ColorClass(255, 0, 255, 255),
  亮天蓝色: new ColorClass(255, 135, 206, 250),
  海蓝宝石: new ColorClass(255, 127, 255, 212),
  浅石板灰: new ColorClass(255, 119, 136, 153),
  蔚蓝: new ColorClass(255, 240, 255, 255),
  亮钢蓝: new ColorClass(255, 176, 196, 222),
  米色: new ColorClass(255, 245, 245, 220),
  嫩黄: new ColorClass(255, 255, 255, 224),
  浓汤: new ColorClass(255, 255, 228, 196),
  石灰: new ColorClass(255, 0, 255, 0),
  黑色: new ColorClass(255, 0, 0, 0),
  酸橙绿: new ColorClass(255, 50, 205, 50),
  白杏色: new ColorClass(255, 255, 255, 205),
  亚麻布: new ColorClass(255, 250, 240, 230),
  蓝色: new ColorClass(255, 0, 0, 255),
  品红: new ColorClass(255, 255, 0, 255),
  蓝紫罗兰: new ColorClass(255, 128, 0, 0),
  布朗: new ColorClass(255, 165, 42, 42),
  适中的碧绿色: new ColorClass(255, 102, 205, 170),
  硬木色: new ColorClass(255, 222, 184, 135),
  中蓝色: new ColorClass(255, 0, 0, 205),
  军服蓝: new ColorClass(255, 95, 158, 160),
  适中的兰花紫: new ColorClass(255, 186, 85, 211),
  黄绿色: new ColorClass(255, 127, 255, 0),
  中紫色: new ColorClass(255, 147, 112, 219),
  巧克力: new ColorClass(255, 210, 105, 30),
  中海洋绿: new ColorClass(255, 60, 179, 113),
  珊瑚: new ColorClass(255, 255, 127, 80),
  中板岩蓝: new ColorClass(255, 123, 104, 238),
  矢车菊蓝: new ColorClass(255, 100, 149, 237),
  适中的春天绿色: new ColorClass(255, 0, 250, 154),
  玉米须: new ColorClass(255, 255, 248, 220),
  中绿宝石: new ColorClass(255, 72, 209, 204),
  深红色的: new ColorClass(255, 199, 21, 112),
  青色: new ColorClass(255, 0, 255, 255),
  午夜蓝: new ColorClass(255, 25, 25, 112),
  深蓝色: new ColorClass(255, 0, 0, 139),
  薄荷奶油: new ColorClass(255, 245, 255, 250),
  深青色: new ColorClass(255, 0, 139, 139),
  薄雾玫瑰: new ColorClass(255, 255, 228, 225),
  暗金菊黄: new ColorClass(255, 184, 134, 11),
  鹿皮鞋: new ColorClass(255, 255, 228, 181),
  深灰色: new ColorClass(255, 169, 169, 169),
  土著白: new ColorClass(255, 255, 222, 173),
  深绿色: new ColorClass(255, 0, 0, 128),
  暗卡其色: new ColorClass(255, 189, 183, 107),
  老饰带: new ColorClass(255, 253, 245, 230),
  黑暗马格纳: new ColorClass(255, 128, 128, 0),
  暗橄榄绿: new ColorClass(255, 107, 142, 45),
  深橙色: new ColorClass(255, 255, 140, 0),
  橙色: new ColorClass(255, 255, 165, 0),
  暗兰花紫: new ColorClass(255, 153, 50, 204),
  橙红: new ColorClass(255, 255, 69, 0),
  深红色: new ColorClass(255, 139, 0, 0),
  兰花: new ColorClass(255, 218, 112, 214),
  暗肉色: new ColorClass(255, 233, 150, 122),
  淡菊: new ColorClass(255, 238, 232, 170),
  深海洋绿: new ColorClass(255, 143, 188, 143),
  苍白的绿色: new ColorClass(255, 152, 251, 152),
  暗灰蓝色: new ColorClass(255, 72, 61, 139),
  苍宝石: new ColorClass(255, 175, 238, 238),
  深色石板灰: new ColorClass(255, 219, 112, 147),
  暗绿宝石: new ColorClass(255, 0, 206, 209),
  番木瓜: new ColorClass(255, 255, 239, 213),
  暗紫罗兰: new ColorClass(255, 148, 0, 211),
  桃色: new ColorClass(255, 255, 218, 155),
  深粉红: new ColorClass(255, 205, 133, 63),
  深天藍: new ColorClass(255, 0, 191, 255),
  粉红: new ColorClass(255, 255, 192, 203),
  暗灰色: new ColorClass(255, 105, 105, 105),
  梅子: new ColorClass(255, 221, 160, 221),
  道奇蓝: new ColorClass(255, 30, 144, 255),
  粉蓝色: new ColorClass(255, 176, 224, 230),
  耐火砖: new ColorClass(255, 128, 0, 128),
  花白色: new ColorClass(255, 255, 250, 240),
  红色: new ColorClass(255, 255, 0, 0),
  森林绿: new ColorClass(255, 34, 139, 34),
  褐玫瑰: new ColorClass(255, 188, 143, 143),
  褐色: new ColorClass(255, 255, 0, 255),
  宝蓝: new ColorClass(255, 65, 105, 225),
  马鞍棕色: new ColorClass(255, 139, 69, 19),
  幽灵的白色: new ColorClass(255, 248, 248, 255),
  鲑鱼: new ColorClass(255, 250, 128, 114),
  金色: new ColorClass(255, 255, 215, 0),
  黄褐色: new ColorClass(255, 244, 164, 96),
  一枝黄花: new ColorClass(255, 218, 165, 32),
  海绿色: new ColorClass(255, 46, 139, 87),
  灰色: new ColorClass(255, 128, 128, 128),
  贝壳: new ColorClass(255, 255, 245, 238),
  绿色: new ColorClass(255, 160, 82, 45),
  绿黄: new ColorClass(255, 173, 255, 47),
  银色: new ColorClass(255, 192, 192, 192),
  蜜露: new ColorClass(255, 240, 255, 240),
  天蓝色: new ColorClass(255, 135, 206, 235),
  热粉色: new ColorClass(255, 255, 105, 180),
  石板蓝: new ColorClass(255, 106, 90, 205),
  印度红: new ColorClass(255, 112, 128, 144),
  靛蓝: new ColorClass(255, 75, 0, 130),
  雪色: new ColorClass(255, 255, 250, 250),
  象牙白: new ColorClass(255, 255, 240, 240),
  春天的绿色: new ColorClass(255, 0, 255, 127),
  卡其: new ColorClass(255, 240, 230, 140),
  钢蓝色: new ColorClass(255, 70, 130, 180),
  薰衣草: new ColorClass(255, 230, 230, 250),
  谭色: new ColorClass(255, 210, 180, 140),
  淡紫红: new ColorClass(255, 255, 240, 245),
  水鸭: new ColorClass(255, 0, 128, 128),
  草坪绿: new ColorClass(255, 124, 252, 0),
  蓟色: new ColorClass(255, 216, 191, 216),
  柠檬绸: new ColorClass(255, 255, 250, 205),
  番茄色: new ColorClass(255, 253, 99, 71),
  淡蓝色: new ColorClass(255, 173, 216, 230),
  绿松石: new ColorClass(255, 64, 224, 208),
  淡珊瑚色: new ColorClass(255, 240, 128, 128),
  紫罗兰: new ColorClass(255, 238, 130, 238),
  淡青色: new ColorClass(255, 224, 255, 255),
  小麦色: new ColorClass(255, 245, 222, 179),
  亮金菊黄: new ColorClass(255, 250, 250, 210),
  白色: new ColorClass(255, 255, 255, 255),
  淡绿色: new ColorClass(255, 144, 238, 144),
  烟白色: new ColorClass(255, 245, 245, 245),
  浅灰: new ColorClass(255, 211, 211, 211),
  黄色: new ColorClass(255, 255, 255, 0),
  粉红色: new ColorClass(255, 255, 182, 193),
  浅黄绿: new ColorClass(255, 154, 205, 50)
};

module.exports = ColorLib;