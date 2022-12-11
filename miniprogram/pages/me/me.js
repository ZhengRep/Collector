// pages/me/me.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        hasUserInfo:false,
        userInfo:{
            avatarUrl: "",
            nickName: ""
        }
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
      if(app.globalData.hasUserInfo){
          this.setData({
              hasUserInfo: true,
              'userInfo.avatarUrl': app.globalData.avatarUrl,
              'userInfo.nickName': app.globalData.nickName,
          })
      }
    },

    loginClick(){
        wx.getUserProfile({
          desc: '用于完善用户信息',
          success:(res)=>{
              console.log(res);
              this.setData({
                  hasUserInfo: true,
                  ['userInfo.avatarUrl']: res.userInfo.avatarUrl,
                  ['userInfo.nickName']: res.userInfo.nickName,
              })
            app.globalData.avatarUrl = res.userInfo.avatarUrl;
            app.globalData.nickName = res.userInfo.nickName;
            app.globalData.hasUserInfo = true;
            //storage userInfo
            wx.setStorage({
                key: 'userInfo',
                data: this.data.userInfo,
            })
            console.log("Fisrt set globalData:", app.globalData);
        }
        })
    },
    gotoHisWillsPage(){
        wx.navigateTo({
          url: './hisWills/histWills',
        })
    },

    gotoThumbWillsPage(){
        wx.navigateTo({
          url: './thumbWills/thumbWills',
        })
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