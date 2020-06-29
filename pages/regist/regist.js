// pages/regist/regist.js
// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    usercode:[],
   
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    loginlist:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: ''
    })
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
              app.globalData.userInfo = res.userInfo
              that.setData({
                userInfo: res.userInfo,
              })
              // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              // 根据自己的需求有其他操作再补充
              // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res => {
                  // 获取到用户的 code 之后：res.code

                  console.log("用户的code:" + res.code);
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

  bindGetUserInfo: function(e) {
    var that = this;
    // wx.login({
    //   success: res => {
    //     // 获取到用户的 code 之后：res.code
    //     console.log("111用户的code:" + res.code);
    //     that.setData({
    //       usercode: res.code
    //     });
    //   }
    // })
    
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //console.log(e.detail.userInfo.nickName);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        userInfo: e.detail.userInfo
      });
      wx.login({
        success: res => {
          // 获取到用户的 code 之后：res.code
          console.log("（用户点击授权后）用户的code:" + res.code);
          that.setData({
            usercode: res.code
          });
          wx.request({
            url: 'https://api.mgiant.cn:8080/user/login',
            data:{
              code:res.code,
              avataUrl:e.detail.userInfo.avatarUrl,
              nickName:e.detail.userInfo.nickName,
            },
            method:"get",//请求方式post/get
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              //将获取到的json数据，存在名字叫list的这个数组中
              that.setData({
                loginlist: res.data,
                //res代表success函数的事件对，data是固定的，list是数组
              })
              console.log(res);
            }
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  AddUerInfo: function(){
    //console.log('用户信息完善');
    wx.navigateTo({
      url: '/pages/user/user'
    });
  },

  GoToMyAct: function(){
    //console.log('用户信息完善');
    wx.navigateTo({
      url: '/pages/myActivity/myActivity'
    });
  },

  GoToMyCreate: function(){
    //console.log('用户信息完善');
    wx.navigateTo({
      url: '/pages/mycreate/mycreate'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
  }
})