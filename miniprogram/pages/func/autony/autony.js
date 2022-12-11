// pages/func/autony/autony.js
const app = getApp();
import utils, { formatTime } from '../../../utils/utils'
Page({

    /**
     * Page initial data
     */
    data: {
        record:{
            appId: app.globalData.appId,
            stuId: '',
            name: '',
            willDec: "",
            date: '',
            audit: true,
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
    getWillDecValue(e){
        this.setData({'record.willDec': e.detail.value});
    },
    submit(){
        //get time
        var timeStamp = new Date();
        var time = formatTime(timeStamp);
        console.log(time);

    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {

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