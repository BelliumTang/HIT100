// pages/firendsCirle/firendsCircle.js
var util = require('../../utils/util.js');
const app = getApp()  //获取小程序实例
function getAllData(self){
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('blessingNews').orderBy('time','desc').get({
        success:function(res){
            self.setData({
                deliverData: res.data
            })
        }
    })
}
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        deliverData: {},
    },
    // 点击头部相册图标,打开发朋友圈编辑页面
    showEditPage() {
        wx.navigateTo({
            url: '../edit/edit'
        })
    },

    //点击朋友圈图片,弹出框预览大图
    showImg(e){
        let outidx = e.currentTarget.dataset.outidx;
        let imgidx = e.target.dataset.imgidx;
        let imgURL = this.data.deliverData[outidx].imgURL;
        wx.previewImage({
            current: imgURL[imgidx], // 当前显示图片的http链接
            urls: imgURL // 需要预览的图片http链接列表
        })
    },
    /*
    getTime(e){
        let self =this;
        let time = util.getDateDiff(this.deliverData.time);
        self.setData({
            time: time,
        })
    },*/

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        getAllData(this);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () { //下拉刷新数据
        // getAllData();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})