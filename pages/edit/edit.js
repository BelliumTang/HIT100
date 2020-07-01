// pages/edit/edit.js
const app = getApp();
var util = require('../../utils/util.js');
Page({
    /*** 页面的初始数据*/
    data: {
        textareaTxt:null,
        imgAdrr:null,
        imgURL:[],
        location:null,
        time:''
    },
    cancel(){
        wx.navigateBack({
            delta:1
        })
    },
    getInputValue(e){
        this.setData({
            textareaTxt: e.detail.value,
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
                    location: res.name,
                    chooseAddress: res.name
                })
             }
        })
    },

    postData(){
        let self=this
        var time=util.formatTime(new Date());
        self.setData({
            time: time,
        })
        wx.navigateBack({
            delta:1
        })
        const db=wx.cloud.database();
        db.collection('blessingNews').add({
            //data字段表示需新增的JSON数据
            data:{
                avatarUrl: app.globalData.userInfo.avatarUrl,
                nickName: app.globalData.userInfo.nickName,
                textareaTxt:this.data.textareaTxt,
                location: this.data.location,
                imgURL:this.data.imgURL,
                time:this.data.time,
            },
        })
    }

})