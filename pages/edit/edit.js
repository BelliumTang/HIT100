// pages/edit/edit.js
const app = getApp();
Page({
    /*** 页面的初始数据*/
    data: {
        textareaTxt:null,
        imgAdrr:null,
        imgURL:[],
        location:null
    },
    cancel(){
        wx.navigateBack({
            delta:1
        })
    },
    getInputValue(e){
        this.setData({
            textareaTxt: e.detail.value    
        })
    },
    chooseImage(){
        let self = this;
        wx.chooseImage({
            count: 9,
            sizeType: 'compressed',
            sourceType: ['album', 'camera'],
            success(res) {
                 self.setData({
                     imgAdrr:res.tempFilePaths
                 })
                 for(let i=0; i<res.tempFilePaths.length; i++){
                    var timeStamp=new Date().getTime();
                     wx.cloud.uploadFile({
                         cloudPath: timeStamp+self.data.imgAdrr[i].match(/\.[^.]+?$/)[0],
                         filePath: res.tempFilePaths[i],
                         success:function(res){
                             self.data.imgURL.push(res.fileID)
                         },
                         /*
                         fail: function(res) {
                            wx.showToast({
                              icon: 'none',
                              title: '上传失败',
                            })
                          },*/
                     })
                 }
            }
        });
    },

    chooseLocation(){
        let self = this
        wx.chooseLocation({
            success(res) {
                self.setData({
                    location: res.name
                })

             }
        })
    },
    postData(){
        let self=this
        wx.navigateBack({
            delta:1
        })
        const db=wx.cloud.database()
        /*
        const timeStamp=Date.parse(new Date());
        for(let i=0; i<this.data.imgAdrr; i++){
            wx.cloud.uploadFile({
                cloudPath: timeStamp+this.data.imgAdrr[i].match(/\.[^.]+?$/)[0],
                filePath: this.data.imgAdrr[i],
                success:function(res){
                        self.setData({
                            imgURL: self.data.imgURL.push(res.fileID)
                        })
                },
                fail: function(res) {
                    wx.showToast({
                      icon: 'none',
                      title: '上传失败',
                    })
                  },
            })
        }*/
        db.collection('blessingNews').add({
            //data字段表示需新增的JSON数据
            data:{
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName,
                textareaTxt:this.data.textareaTxt,
                location: this.data.location,
                imgURL:this.data.imgURL
            },
        })
    }
})