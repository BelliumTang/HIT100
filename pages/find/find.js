var data = require('../../data/data.js');
console.log(data);
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    list: [],
    scrollTop: 100,
    dialogShow: false,
    usercode:[],
    buttons: [{text: '帮校友验证成功！'}]
  },
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  
  create: function() {
    wx.navigateTo({
      url: ''
    });
  },
  verify: function(e){  
    var that = this;
    wx.request({
      url: 'https://api.mgiant.cn:8080/user/login',
      data:{
    
      },
      method:"get",//请求方式post/get
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        //将获取到的json数据，存在名字叫list的这个数组中
        that.setData({
          // loginlist: res.data,
          //res代表success函数的事件对，data是固定的，list是数组
        
        })
        console.log(res);
      } 
    })

    that.setData({
    dialogShow: true,
    })
    console.log(e.currentTarget.dataset.id)
  },

  tapDialogButton(e) {
    this.setData({
          dialogShow: false,
          //lightshow:false
       })
    //console.log(e)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
      wx.login({
        success: res1 => {
          // 获取到用户的 code 之后：res.code
          console.log("寻找校友的code:" + res1.code);
          that.setData({
            usercode: res1.code
          });
            wx.request({
            url: 'https://api.mgiant.cn:8080/verify/alumni',
            data: {
              code: res1.code,
            }, 
            method:"get",//请求方式post/get

            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              //将获取到的json数据，存在名字叫list的这个数组中
              that.setData({
                list: res.data,
              })
              console.log(res);
            } 
          })
        }
      });
    }
     
})