var data = require('../../data/data.js');
console.log(data);
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    list: data.list,
    scrollTop: 100,
    dialogShow: false,
    usercode:[],
    buttons: [{text: '活动报名成功！'}],
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
  detial: function(e) {
    wx.navigateTo({
      url: '/pages/detial/detial?id=' + e.target.dataset.id
    });
  },
  create: function() {
    wx.navigateTo({
      url: ''
    });
  },
  joinActivity: function(e){  
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
  gotoCreate: function(){ wx.navigateTo({ url: '/pages/createActivity/createActivity' }) },
  onload: function(options) {
    console.log('options', options);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                userInfo: res.userInfo,
              })
            //从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code
                  console.log("进入校庆活动获取用户的code:" + res.code);
                  that.setData({
                    usercode: res.code
                  });
                }
              });
            }
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
})