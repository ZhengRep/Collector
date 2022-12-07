// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }
    if(!this.globalData.hasUserInfo){
        wx.getStorage({
            key:'userInfo',
            success(res){
                console.log(res.data);
                this.globalData.nickName = res.data.nickName;
                this.globalData.avatarUrl = res.data.avatarUrl;
                this.globalData.hasUserInfo = true;
            }
        })
    }
    },

    globalData:{
        hasUserInfo: false,
        nickName:"",
        avatarUrl:"",
    },
});
