const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    
    time: '06:07',
    date: '2020-06-07',
   
    images: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    StartTimeshow: false,
 
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
 
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.images.length != 0) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            images: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.images.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            images: this.data.images
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },

 //提交活动信息表单到数据库
  SubmitActivity(res){
    console.log(res)
    if (res.detail.value.title.length == 0) {
      wx.showToast({
        title: '名称不能为空!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (res.detail.value.tel.length == 0) {
      wx.showToast({
        title: '电话不能为空!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (res.detail.value.address.length == 0) {
      wx.showToast({
        title: '地点不能为空!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else {

      wx.request({
        //var adds = res.detail.value;
        url: '',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        method: "POST",
        //data: adds,
        data: {},

        success: function (res) {
          console.log(res.data);
          if (res.data.status == 0) {
            wx.showToast({
              title: '提交失败！！！',
              icon: 'loading',
              duration: 2000
            })

          } else {
            wx.showToast({
              title: '提交成功！！！',//这里打印出登录成功
              icon: 'success',
              duration: 1500
            })
          }
        }
      })

    }

    var title = res.detail.value.title
    var tel = res.detail.value.tel
    var address = res.detail.value.address
    var date = res.detail.value.date
    var startTime = res.detail.value.startTime
    var detail = res.detail.value.detail
    var images = this.data.images

    console.log(title,tel,address,date,startTime,detail,images)
  },

})