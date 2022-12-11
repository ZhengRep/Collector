// app.js
App({
    globalData:{
        hasUserInfo: false,
        nickName:"",
        avatarUrl:"",
    },

    onLaunch: function () {
        if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
        wx.cloud.init({
            traceUser: true,
        });
        }
        this.getStoragedUserInfo();
    },

    //get userInfo
    getStoragedUserInfo(){
        if(!this.globalData.hasUserInfo){
            wx.getStorage({
                key:'userInfo',
                success:(res)=>{
                    this.globalData.avatarUrl = res.data.avatarUrl,
                    this.globalData.nickName = res.data.nickName,
                    this.globalData.hasUserInfo = true
                    console.log('globalData', this.globalData);
                }
            })
        }
    }
     

    
});
