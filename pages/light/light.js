import * as echarts from '../../ec-canvas/echarts';
import geoJson from './mapData.js';
//import mychart from './china.json';

const app = getApp();

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
  '香港':[114.204522,22.263085],
  '澳门':[113.58206,22.14282],
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

var option = {
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
  visualMap: {
    show: true,
    min: 0,
    max: 100,
    left: 'left',
    top: 'bottom',
    text: ['high'], // 文本，默认为数值文本
    calculable: true,
    seriesIndex: [1],
    inRange: { 
        color: ['#63B8FF', '#FFD700','#EE0000'] //渐变颜色

    }
},
  series: [
    {
      name: '散点',
      type: 'scatter',
      coordinateSystem: 'geo',
     // data: convertData(data),
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
          show: false
        }
      },
      itemStyle: {
        normal: {
            color: '#05C3F9',
            fontSize: '8'
        },
      },
     // data:citydata
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
   // data: convertData(citydata.sort(function(a, b) {return b.value - a.value;})),
},

{
    name: 'Top 5',
    type: 'effectScatter',
    coordinateSystem: 'geo',
    //data: convertData(citydata.sort(function(a, b) {return b.value - a.value; }).slice(0, 5)),
    symbolSize: function(val) {
        return val[2]/8;
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
            show: false
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

const db = wx.cloud.database()
const _ = db.command
var myMap = null;
Page({
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    }) 
    return {
      title: '我为哈工大百年校庆应援！祝福工大生日快乐！',
      path: '/pages/light/light',
      imageUrl: 'https://6869-hit100-g6bma-1302265912.tcb.qcloud.la/2020.png?sign=b90eef1d7eabe42c1e5a362110b6a77c&t=1590806475',    
      success: function () { },
      fail: function () { }
    }
  },

  data: {
    ecMap: {
     // onInit: initChartMap
     lazyLoad: true //初始化加载
    },
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    region: ['广东省', '深圳市', '南山区'],
    multiIndex: [0, 0, 0],
    customItem: '全部',
    dialogShow: false,
    //lightshow:true,
    buttons: [{text: '规格严格,功夫到家!  :)'}],
  },

  tapDialogButton(e) {
      this.setData({
          dialogShow: false,
      })
      if(e.detail){
        console.log(e.detail)
        wx.showShareMenu({
          withShareTicket: true
        }) 
        return {
          title: '我为哈工大百年校庆应援！祝福工大生日快乐！',
          path: '/pages/light/light',
          imageUrl: '/images/100.png',    
          success: function () { },
          fail: function () { }
        }
      }
     //console.log(e.detail)
  },

  lightHIT:function (){
    var cityAll = ['广东省','湖南省','黑龙江省','山东省','吉林省','辽宁省','内蒙古自治区','天津市','陕西省','山西省','宁夏回族自治区','新疆维吾尔自治区','西藏自治区','青海省','河北省','河南省','安徽省','浙江省','江苏省','上海市','重庆市','江西省','贵州省','海南省','台湾省','云南省','香港特别行政区','澳门特别行政区']
    var cityEasy = ['广东','湖南','黑龙江','山东','吉林','辽宁','内蒙古','天津','陕西','山西','宁夏','新疆','西藏','青海','河北','河南','安徽','浙江','江苏','上海','重庆','江西','贵州','海南','台湾','云南','香港','澳门']

    var num = cityAll.indexOf(this.data.region[0])
    console.log(cityEasy[num])
    db.collection("city")
    .where({
      name:_.eq(cityEasy[num])
    })
    .update({
        data:{
        value:_.inc(1)
      }
    })
    .then(res=> {
          // res.data 包含该记录的数据
          this.getData();
          console.log(res)
        })

      this.setData({
        dialogShow: true,
        //lightshow:false
    })
    
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
 
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart-dom-map');
    this.getData(); //获取数据
    // db.collection("city")
    // .add({
    //     data:{
    //     name:'南海诸岛'
    //   }
    // })
  },

  onReady() {
  },
  
  getData:function()
  {
    wx.cloud.callFunction({
      name:"getCity"
    })
    .then(res=>{
      //console.log(res.result.data)
      const citydata=[];
      for(var i=0;i<res.result.data.length;i++){
        citydata.push(res.result.data[i])
     }
     //console.log(citydata)
     for(var i=0;i<citydata.length;i++){
        delete citydata[i]._id;
        delete citydata[i]._openid;
     }
      console.log(citydata)
  
     // option.yAxis[0].data = note;
      option.series[0].data =  convertData(citydata);
      option.series[1].data = citydata;
      option.series[2].data = convertData(citydata.sort(function(a, b) {return b.value - a.value;}));
      option.series[3].data = convertData(citydata.sort(function(a, b) {return b.value - a.value;}).slice(0, 5));
      if(!myMap){
        this.init_ChartMap();
      }else{
        myMap.clear();
        this.init_ChartMap();
      }
    })
  },


  init_ChartMap: function() {
    this.echartsComponnet.init((canvas, width, height)=>{
    myMap = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr
        });   
      myMap.showLoading(); // 首次显示加载动画
      canvas.setChart(myMap);
      echarts.registerMap('china', geoJson);  // 绘制中国地图

      myMap.setOption(option);
      myMap.hideLoading(); // 隐藏加载动画
      return myMap;
    });
  }
  
});
