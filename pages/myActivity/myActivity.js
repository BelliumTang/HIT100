var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    list:[],
    scrollTop: 100
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
  gotoCreate: function(){ wx.navigateTo({ url: '/pages/createActivity/createActivity' }) },
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
      wx.login({
        success: res1 => {
          // 获取到用户的 code 之后：res.code
          console.log("我参加活动的code:" + res1.code);
          that.setData({
            usercode: res1.code
          });
            wx.request({
            url: 'https://api.mgiant.cn:8080/activity/activities',
            data: {
              code: res1.code,
              type: 'join'
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
    },
})