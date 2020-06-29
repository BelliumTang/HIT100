const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    education: null,
    SchoolLocation: null,
    
    picker: ['本科', '硕士', '博士'],
    Schoolpicker: ['本部', '威海校区', '深圳校区'],

    time: '06:07',
    date: '2020-06-07',
    EnrollmentTime:'2017-09-01',
    GraduationTime:'2021-07-01',
   
    images: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    StartTimeshow: false,
    usercode:[],
    usercode1:[],
 
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      education: e.detail.value
    })
  },
  SchoolChange(e) {
    console.log(e);
    this.setData({
      SchoolLocation: e.detail.value
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
  ETChange(e) {
    this.setData({
      EnrollmentTime: e.detail.value
    })
  },
  GTChange(e) {
    this.setData({
      GraduationTime: e.detail.value
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
  //gotoUser: function(){ wx.navigateTo({ url: '/pages/user/user' }) },
 //提交活动信息表单到数据库
  SubmitActivity(res){
    console.log(res)
    if (res.detail.value.name.length == 0) {
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

    } else if (res.detail.value.faculty.length == 0) {
      wx.showToast({
        title: '学院不能为空!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else if (this.data.education == null) {
      wx.showToast({
        title: '学历不能为空!',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if (this.data.SchoolLocation == null) {
      wx.showToast({
        title: '校区不能为空!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if (res.detail.value.EnrollmentTime > res.detail.value.GraduationTime) {
      wx.showToast({
        title: '请检查入学时间!',
        icon: 'loading',
        duration: 2000
      })

      setTimeout(function () {
        wx.hideToast()
      }, 2000)

    } else {
      //console.log(this.data.usercode)
      wx.request({
        //var adds = res.detail.value;
        url: 'https://api.mgiant.cn:8080/user/binding', 
        data: {
          code: this.data.usercode,
          name : res.detail.value.name,
          phone : res.detail.value.tel
        }, 
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res);
          if (res.data.status != 200) {
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

      wx.login({
        success: res1 => {
          // 获取到用户的 code 之后：res.code
          console.log("（完善信息第二次提交的）用户的code:" + res1.code);
          this.setData({
            usercode1: res1.code
          });
           wx.request({
            url: 'https://api.mgiant.cn:8080/verify/record',
            data:JSON.stringify({
              openid:res1.code,
             // StudentID : res.detail.value.StudentID,
              verify_department : res.detail.value.faculty,
              verify_classno : res.detail.value.classname,
              verify_instructor : res.detail.value.tutor,
              verify_scholar : this.data.picker[this.data.education],
              verify_campus :  this.data.Schoolpicker[this.data.SchoolLocation],
              verify_startyear : res.detail.value.EnrollmentTime,
              verify_endyear : res.detail.value.GraduationTime,
            }),
            method:"post",//请求方式post/get
            headers: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res);
            }
          })
        }
      })
     
    }

    var name = res.detail.value.name
    var tel = res.detail.value.tel
    var StudentID = res.detail.value.StudentID
    var faculty = res.detail.value.faculty
    var classname = res.detail.value.classname
    var tutor = res.detail.value.tutor
    var education = this.data.picker[this.data.education]
    var SchoolLocation =  this.data.Schoolpicker[this.data.SchoolLocation]
    var EnrollmentTime = res.detail.value.EnrollmentTime
    var GraduationTime = res.detail.value.GraduationTime
    var code =  this.data.usercode
  
    console.log(code,name,tel,StudentID,faculty,classname,education,SchoolLocation,EnrollmentTime,GraduationTime,tutor)
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

                  console.log("用户完善信息的code:" + res.code);
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