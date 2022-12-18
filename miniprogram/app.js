const { envList } = require("./envList");

// app.js
App({
    globalData:{
        hasUserInfo: false,
        openId: '',
        defaultNickName: '微信用户',
        defaultAvatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
        envId: "cloud1-4gvdt5akf6c97f23",
    },

    onLaunch: function () {
        if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力');
        } else {
        wx.cloud.init({
            traceUser: true,
            env: "cloud1-4gvdt5akf6c97f23",
        });
        }
        this.getStoragedUserInfo();
    },

    //get userInfo
    getStoragedUserInfo(){
        if(!this.globalData.hasUserInfo){
            wx.getStorage({
                key:'Collector-openId',
                success:(res)=>{
                    this.globalData.openId = res.data,
                    this.globalData.hasUserInfo = true
                }
            })
            wx.getStorage({
                key: 'Collector-avatarUrl',
                success: (res)=>{
                    this.globalData.defaultAvatarUrl = res.data
                }
            })
            wx.getStorage({
                key: 'Collector-nickName',
                success: (res)=>{
                    this.globalData.defaultNickName = res.data,
                    console.log('globalData', this.globalData);
                }n
            })
        }
    }
    
});
