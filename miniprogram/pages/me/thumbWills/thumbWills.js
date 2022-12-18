// pages/me/thumbWills/thumbWills.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        thumbWills:[],
        thumbSkip:0,
        pageNum: 10,
        noMoreThumbData: false,

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        if(app.globalData.hasUserInfo){
            this.getDataListOfThumb('正在加载', {openId: app.globalData.openId}, {date: -1}, this.data.thumbSkip)
        }
    },
    getDataListOfThumb(showLoadingTitle, match, sort, skip){
        wx.showLoading({
            title: showLoadingTitle,
            mask: true,
            duration: 7000,
        }) 
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'getDataListThumbed',
                openId: app.globalData.openId,
                match: match,
                sort: sort,
                skip: skip,
                limit: this.data.pageNum,
            }
        }).then((res)=>{
            console.log('getDataListOfThumb', res.result);
            if(res.result.list.length){
                this.setData({[`thumbWills`]: [...this.data.thumbWills, ...res.result.list], thumbSkip: this.data.thumbSkip+this.data.pageNum})
            }else{
                this.setData({noMoreThumbData: true});
                wx.hideLoading();
                wx.showToast({
                    title: '没有更多数据了',
                    icon: 'none'
                })
                return;
            }
            wx.hideLoading();
        }).catch((e)=>{
            console.log(e);
            wx.hideLoading();
            wx.showToast({
              title: '请求错误',
              icon: 'error',
            })
        })
    },
    getNewData(){
        if(this.data.noMoreThumbData){
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
            })
        }else{
            this.getDataListOfThumb('加载更多', {openId: app.globalData.openId}, {date: -1}, this.data.thumbSkip)
        }
    },
    onThumb(e){
        //test add new field
        var index = e.currentTarget.dataset.index;
        console.log('thumb index', index);
        //update wills and create thumbs
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'addThumbNum',
                openId: app.globalData.openId,
                thumbId: this.data.thumbWills[index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`thumbWills[${index}].hasThumb`]: true,
                [`thumbWills[${index}].thumbNum`]: this.data.thumbWills[index].thumbNum + 1,
            })
        }).catch((e)=>{
            console.log(e);
            wx.showToast({
              title: '点赞失败',
              icon: 'none'
            })
        })
    },
    onCancleThumb(e) {
        var index = e.currentTarget.dataset.index;
        //update wills and create thumbs
        console.log('cancle thumb', index);
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'cancleThumb',
                openId: app.globalData.openId,
                thumbId: this.data.thumbWills[index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`thumbWills[${index}].hasThumb`]: false,
                [`thumbWills[${index}].thumbNum`]: this.data.thumbWills[index].thumbNum - 1,
            })
        }).catch((e)=>{
            console.log(e);
            wx.showToast({
              title: '取消点赞失败',
              icon: 'none'
            })
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