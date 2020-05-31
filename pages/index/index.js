//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
   
  },
  toBuy:function(){
  wx.navigateToMiniProgram({
        appId: 'wxd9a5d36c6f14d58d',
        path: '',
        extraData: {
          foo: 'bar'
        },
        envVersion: 'release',
        success(res) {
          // 打开成功
        },
        fail(res){
          // 打开失败
        },
        complete(res){
          // 调用结束  不管成功还是失败都执行
        }
        /**
         * appId：跳转到的小程序app-id
         * path：打开的页面路径，如果为空则打开首页，path 中 ? 后面的部分会成为 query，在小程序的 App.onLaunch、App.onShow 和 Page.onLoad的回调函数中获取query数据
         * extraData：需要传递给目标小程序的数据，目标小程序可在 App.onLaunch、App.onShow 中获取到这份数据
         * envVersion：要打开的小程序版本，有效值: develop（开发版），trial（体验版），release（正式版），仅在当前小程序为开发版或体验版时此参数有效，如果当前小程序是正式版，则打开的小程序必定是正式版
         */ 
      })
      wx.navigateBackMiniProgram({
        extraData: {
        foo: 'bar'
      },
      success(res) {
        // 返回成功
      }
      })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
 
})
