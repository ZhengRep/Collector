// pages/me/me.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        avatarUrl: app.globalData.defaultAvatarUrl,
        nickName: app.globalData.defaultNickName,
        isAdmin: app.globalData.isAdmin,
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad() {
      //check is admin
      if(!app.globalData.hasUserInfo){
          this.setNickNameStorage(this.data.nickName);
          this.setAvatarUrlStorage(this.data.avatarUrl);
      }
      if(!app.globalData.verify){
          this.verifyAdmin();
      }

    },
    verifyAdmin(){
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                env: app.globalData.envId,
            },
            data:{
                type: 'isAdmin',
                openId: app.globalData.openId
            }
        }).then(res=>{
            console.log(res);
            if(res.result.total){
                this.setData({isAdmin: true});
                app.globalData.isAdmin = true;
            }
        }).catch(e=>{
            console.log(e);
          })
          app.globalData.verifyAdmin = true;
    },
    onChooseAvatar(e){
        const {avatarUrl} = e.detail;
        console.log('avatarUrl', this.data.avatarUrl);
        this.setData({
            avatarUrl,
        })
        app.globalData.defaultAvatarUrl = this.data.avatarUrl;
        this.setAvatarUrlStorage(this.data.avatarUrl);
    },
    getNickName(e){
        console.log('nickName', e.detail.value);
        var nickName = e.detail.value;
        if(nickName.length){
            this.setData({
                nickName: e.detail.value
            })
            this.setNickNameStorage(e.detail.value);
        }
    },
    setAvatarUrlStorage(str){
        wx.setStorage({
            key: 'Collector-avatarUrl',
            data: str,
        })
    },
    setNickNameStorage(str){
        wx.setStorage({
            key: 'Collector-nickName',
            data: str,
        })
    },

    loginClick(){
        wx.showLoading({
            title: "正在登录"
        })
        //get openId
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
                env: app.globalData.envId
            },
            data: {
                type: 'getOpenId'
            }
        }).then((res) => {
            console.log(res);
            this.setData({hasUserInfo: true})
            wx.hideLoading();
            app.globalData.openId = res.result.openid;
            app.globalData.hasUserInfo = true;
            this.verifyAdmin();

            //storage userInfo
            wx.setStorage({
                key: 'Collector-openId',
                
                data: res.result.openid,
            })
        }).catch(e=>{
            wx.hideLoading();
            wx.showToast({
              title: '登录失败',
              icon: 'error'
            })
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
    gotoAuditWillsPage(){
        wx.navigateTo({
          url: './auditWills/auditWills',
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
        this.setData({
            hasUserInfo: app.globalData.hasUserInfo,
        })
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