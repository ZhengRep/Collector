// pages/func/func.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

    },
    //匿名发起
    gotoAnonyPostWill(){
        if(app.globalData.hasUserInfo){
            wx.navigateTo({
              url: './anony/anony',
            })  
        }
        else{
            wx.showToast({
              title: '请先登录',
              icon: 'none'
            })
        }
    },
    //实名发起
    gotoAutonyPostWill(){
        if(app.globalData.hasUserInfo){
            wx.navigateTo({
              url: './autony/autony',
            })  
        }
        else{
            wx.showToast({
              title: '请先登录',
              icon: 'none'
            })
        }
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {

    }
})