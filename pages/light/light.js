import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';
//import mychart from './china.json';

const app = getApp();

var data = [
  {name:"北京",value:177},
  {name:"天津",value:42},
  {name:"河北",value:102},
  {name:"山西",value:81},
  {name:"内蒙古",value:47},
  {name:"辽宁",value:67},
  {name:"吉林",value:82},
  {name:"黑龙江",value:166},
  {name:"上海",value:24},
  {name:"江苏",value:92},
  {name:"浙江",value:114},
  {name:"安徽",value:109},
  {name:"福建",value:116},
  {name:"江西",value:91},
  {name:"山东",value:126},
  {name:"河南",value:96},
  {name:"湖北",value:116},
  {name:"湖南",value:123},
  {name:"重庆",value:91},
  {name:"四川",value:125},
  {name:"贵州",value:62},
  {name:"云南",value:83},
  {name:"西藏",value:9},
  {name:"陕西",value:80},
  {name:"甘肃",value:56},
  {name:"青海",value:10},
  {name:"宁夏",value:18},
  {name:"新疆",value:67},
  {name:"广东",value:125},
  {name:"广西",value:59},
  {name:"海南",value:14},
  {name:"台湾",value:15},
  {name:"香港",value:3},
  {name:"澳门",value:4},
  ];
  
  var geoCoordMap = {
    '台湾': [121.5135,25.0308],
    '黑龙江': [127.9688, 45.368],
    '内蒙古': [110.3467, 41.4899],
    "吉林": [125.8154, 44.2584],
    '北京': [116.4551, 40.2539],
    "辽宁": [123.1238, 42.1216],
    "河北": [114.4995, 38.1006],
    "天津": [117.4219, 39.4189],
    "山西": [112.3352, 37.9413],
    "陕西": [109.1162, 34.2004],
    "甘肃": [103.5901, 36.3043],
    "宁夏": [106.3586, 38.1775],
    "青海": [101.4038, 36.8207],
    "新疆": [87.9236, 43.5883],
    "西藏": [91.11, 29.97],
    "四川": [103.9526, 30.7617],
    "重庆": [108.384366, 30.439702],
    "山东": [117.1582, 36.8701],
    "河南": [113.4668, 34.6234],
    "江苏": [118.8062, 31.9208],
    "安徽": [117.29, 32.0581],
    "湖北": [114.3896, 30.6628],
    "浙江": [119.5313, 29.8773],
    "福建": [119.4543, 25.9222],
    "江西": [116.0046, 28.6633],
    "湖南": [113.0823, 28.2568],
    "贵州": [106.6992, 26.7682],
    "云南": [102.9199, 25.4663],
    "广东": [113.12244, 23.009505],
    "广西": [108.479, 23.1152],
    "海南": [110.3893, 19.8516],
    '上海': [121.4648, 31.2891],
};
var max = 480,
    min = 9; // todo 
var maxSize4Pin = 100,
    minSize4Pin = 20;

var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
const getPixelRatio = () => {
  let pixelRatio = 0
  wx.getSystemInfo({
    success: function (res) {
      pixelRatio = res.pixelRatio
    },
    fail: function () {
      pixelRatio = 0
    }
  })
  return pixelRatio
}
// console.log(pixelRatio)
var dpr = getPixelRatio()
/**地图**/
function initChartMap(canvas, width, height) {
  let myMap = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(myMap);
  echarts.registerMap('china', geoJson);  // 绘制中国地图

  const option = {
    backgroundColor: 'transparent',
    title: {
      subtext: '工大应援，点亮中国',
      left: 'center',
  },
    tooltip: {
      trigger: 'item',
      backgroundColor: "#FFF",
      padding: [
        10,  // 上
        15, // 右
        8,  // 下
        15, // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
      textStyle: {
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff',
        fontSize: 12,
      },
    
      formatter: function (params) {
        if(typeof(params.value)[2] == "undefined"){
          return params.name + ' : ' + params.value;
        }else{
          return params.name + ' : ' + params.value[2];
        }
      }
    },
    geo: [
      {
        // 地理坐标系组件
        map: "china",
        roam: false, // 可以缩放和平移
        aspectScale: 0.8, // 比例
        layoutCenter: ["50%", "38%"], // position位置
        layoutSize: 370, // 地图大小，保证了不超过 370x370 的区域
        label: {
          // 图形上的文本标签
          normal: {
            show: true,
            textStyle: {
              color: "#E8E8E8",
              fontSize: '8'
            }
          },
          emphasis: { // 高亮时样式
            color: "#333",
            show: false
          }
        },
        itemStyle: {
          // 图形上的地图区域
          normal: {
            borderColor: "#FFD700",
            areaColor: "#87CEFF"
            //#000000 #87CEFF
          }
        }
      }
    ],
   
    series: [
      {
        name: '散点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data),
        symbolSize: function(val) {
            return val[2] / 15;
        },
        label: {
            normal: {
                formatter: '{b}',
                position: 'left',
                show: false,
                textStyle: {
                  color: "rgba(0, 0, 0, 0.9)",
                  fontSize: '8'
                }
            },
            emphasis: {
                show: true,
                textStyle: {
                  color: "rgba(0, 0, 0, 0.9)",
                  fontSize: '8'
                }
            }
        },
        itemStyle: {
            normal: {
                color: '#FFD700'
            }
        }
    },
    
      {
        type: 'map',
        mapType: 'china',
        geoIndex: 0,
        roam: false, // 鼠标是否可以缩放
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          normal: {
              color: '#05C3F9',
              fontSize: '8'
          },
        },
        data:data
      
    },
   
    {
      name: '气泡点',
      type: 'scatter',
      coordinateSystem: 'geo',
      symbol: 'pin', //气泡
      symbolSize: function(val) {
          var a = (maxSize4Pin - minSize4Pin) / (max - min);
          var b = minSize4Pin - a * min;
          b = maxSize4Pin - a * max;
          return (a * val[2] + b)/2;
      },
      label: {
          normal: {
              show: false,
              textStyle: {
                  color: '#fff',
                  fontSize: 8,
              }
          },
          formatter: '{@[6]}',
      },
     
      itemStyle: {
          normal: {
              color: '#F62157', //标志颜色
              fontSize: 8,
          }
      },
      //zlevel: 6,
      data: convertData(data.sort(function(a, b) {
        return b.value - a.value;
    })),
  },
  {
      name: 'Top 5',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: convertData(data.sort(function(a, b) {
          return b.value - a.value;
      }).slice(0, 5)),
      symbolSize: function(val) {
          return val[2] / 10;
      },
      showEffectOn: 'render',
      rippleEffect: {
          brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
          normal: {
              formatter: '{b}',
              position: 'right',
              show: true
          }
      },
      endcode:{
        label:2
      },
      itemStyle: {
          normal: {
              color: 'yellow',
              shadowBlur: 10,
              shadowColor: 'yellow'
          }
      },
     // zlevel: 1
  }],
 
  };
  
  myMap.setOption(option);
  return myMap
}


Page({
  onShareAppMessage: function (res) {
    return {
      title: '我为哈工大百年校庆应援！祝福工大生日快乐！',
      path: '/pages/light/light',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ecMap: {
      onInit: initChartMap
    },
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    region: ['广东省', '深圳市', '南山区'],
    multiIndex: [0, 0, 0],
    customItem: '全部'
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        switch (data.multiIndex[0]) {
          case 0:
            break;
          case 1:
            break;
        }
        data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onReady() {
  }
});
