// pages/func/autony/autony.js
const app = getApp();
import utils, { formatTime } from '../../../utils/utils'
Page({

    /**
     * Page initial data
     */
    data: {
        record:{
            openId: '',
            stuId: '',
            name: '',
            willDes: "",
            date: '',
            audit: 2,
            anony: false,
            type: 1,
            hot: false,
            thumbNum: 0
        }
    },
    getNameValue(e){
        this.setData({'record.name': e.detail.value});
    },
    getStuIdValue(e){
        this.setData({'record.stuId': e.detail.value});
    },
    getWillDesValue(e){
        this.setData({'record.willDes': e.detail.value});
    },
    submit(){
        if(this.data.record.willDes == '' || this.data.record.name == ''){
            wx.showToast({
              title: '请补充信息',
              icon: 'none'
            })
            return;
        }
        if(this.data.record.stuId.length != 10){
            wx.showToast({
              title: '学号错误',
              icon: 'none'
            })
            return;
        }
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
            wx.navigateBack({
                delta: 0,
            })
            wx.showToast({
              title: '已发布',
              icon: 'success',
            })
        }).catch((e)=>{
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