var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    list: [],
    scrollTop: 100,
    dialogShow: false,
    usercode:[],
    buttons: [{text: '删除活动成功！'}]
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

  tapDialogButton(e) {
    this.setData({
          dialogShow: false,
          //lightshow:false
       })
    //console.log(e)
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
          console.log("查看我创建的活动时的code:" + res1.code);
          that.setData({
            usercode: res1.code
          });
            wx.request({
            url: 'https://api.mgiant.cn:8080/activity/activities',
            data: {
              code: res1.code,
              type: 'my'
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
  deleteActivity: function(e) {
    var that = this;
    console.log(e)
      wx.login({
        success: res1 => {
          // 获取到用户的 code 之后：res.code
          console.log("删除活动时的code:" + res1.code);
          that.setData({
            usercode: res1.code,
          });
            wx.request({
            url: 'https://api.mgiant.cn:8080/activity/delete',
            data: {
              code: res1.code,
              activity_id: e.currentTarget.dataset.id
            }, 
            method:"get",//请求方式post/get

            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
                  wx.login({
                    success: res1 => {
                      // 获取到用户的 code 之后：res.code
                      console.log("查看我创建的活动2时的code:" + res1.code);
                      that.setData({
                        usercode: res1.code
                      });
                        wx.request({
                        url: 'https://api.mgiant.cn:8080/activity/activities',
                        data: {
                          code: res1.code,
                          type: 'my'
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
              console.log(res);
            } 
          })
        }
      });
      that.setData({
        dialogShow: true,
        })
    }
})