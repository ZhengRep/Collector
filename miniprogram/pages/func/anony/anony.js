// pages/func/anony/anony.js
const app = getApp();
import utils, { formatTime } from '../../../utils/utils'
Page({

    data: {
        record:{
            openId: '',
            stuId: '',
            name: '',
            willDes: "",
            date: '',
            audit: 1,
            anony: true,
            type: 0,
            hot: false,
            thumbNum: 0
        }
    },
    getWillDesValue(e){
        this.setData({'record.willDes': e.detail.value});
    },
    submit(){
        if(this.data.record.willDes == ''){
            wx.showToast({
              title: '请输入意愿',
              icon: 'none'
            })
            return;
        }
        wx.showLoading({
          title: '正在提交',
          mask: true,
          duration: 7000,
        })
        //get time
        var time = new Date();
        var date = formatTime(time);
        this.setData({'record.date': date});

        console.log('record', this.data.record);
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config: {
                envId: app.globalData.envId,
            },
            data: {
                type: 'addRecord',
                database: 'wills',
                record: this.data.record,
            }
        }).then((res)=>{
            console.log(res);
            wx.hideLoading({
                success: (res)=>{
                    wx.navigateBack({
                        delta: 0,
                    }).then(res=>{
                        wx.showToast({
                          title: '请等待审核',
                          icon: 'success',
                        })
                    })
                }
            });
        }).catch((e)=>{
            wx.hideLoading();
            wx.showToast({
              title: '出现错误',
              icon: 'error',
            })
            console.log(e);
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        this.setData({'record.openId': app.globalData.openId})
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