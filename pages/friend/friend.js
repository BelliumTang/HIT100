var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    list: [],
    scrollTop: 100,
    dialogShow: false,
    usercode:[],
    buttons: [{text: '解除验证成功！'}]
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
    wx.login({
      success: res1 => {
        // 获取到用户的 code 之后：res.code
        console.log("删除校友时code:" + res1.code);
        that.setData({
          usercode: res1.code
        });
        wx.request({
          url: 'https://api.mgiant.cn:8080/verify/revoke',
          data:{
            code: res1.code,
            object_openid: e.currentTarget.dataset.openid, 
            verify_id:e.currentTarget.dataset.verify_id
          },
          method:"get",//请求方式post/get
          headers: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
              wx.login({
                success: res2 => {
                  // 获取到用户的 code 之后：res.code
                  console.log("删除校友再次查看校友列表时code:" + res2.code);
                  that.setData({
                    usercode: res2.code
                  });
                  wx.request({
                    url: 'https://api.mgiant.cn:8080/verify/friend',
                    data: {
                      code: res2.code,
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
                console.log(res);
              } 
            })
          }
       })
    }
  })

    that.setData({
    dialogShow: true,
    })
    console.log(e.currentTarget.dataset.openid,e.currentTarget.dataset.verify_id)
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
          console.log("查看验证过的校友code:" + res1.code);
          that.setData({
            usercode: res1.code
          });
            wx.request({
            url: 'https://api.mgiant.cn:8080/verify/friend',
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