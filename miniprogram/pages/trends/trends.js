// pages/trends/trends.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        tabs:[{id:0, title: '热门榜'}, {id:1, title: '最新榜'}],
        activeTab: 0, 
        listTable:[
            [], //hotList listTable[0]
            [], //newList listTable[1]
        ],
        hotSkip: 0,
        newSkip: 0,
        pageNum: 10,
    },
    clickTab(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({ 
          activeTab: index 
        })
    },
    onChangeSwipper(e){
        this.setData({activeTab: e.detail.current});
    },
    
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
         //get hot list and new list
         //this.getDataList('hotList', 'wills', {'hot': false}, 'thumbNum', this.data.hotSkip);
         this.getDataList('newList', 'wills', {'audit': true}, 'date', this.data.newSkip);
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

    getDataList(listName, database, where, orderBy, skip){
        wx.showLoading({
            title: '正在加载',
            mask: true,
        }) 
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'getDataList',
                database: database,
                where: where,
                orderBy: orderBy,
                skip: skip,
            }
        }).then((res)=>{
            console.log(res);
            if(listName == 'hostList'){
                this.setData({'listTable[0]': res.result.data, hotSkip: this.data.hotSkip+this.data.pageNum})
            }
            else if(listName == 'newList'){
                this.setData({'listTable[1]': res.result.data, newSkip: this.data.newSkip+this.data.pageNum})
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
    onThumb(e){
        var index = e.currentTarget.dataset.index;
        //update wills and create thumbs
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'updateRecord',
                database: 'wills',
                where: {
                     _id: this.data.listTable[this.data.activeTab][index]._id,
                },
                update: {
                    data:{
                        thumbNum:  this.data.listTable[this.data.activeTab][index].thumbNum+1,
                    }
                }
            }
        }).then((res)=>{
            console.log(res);
            this.setData({['listTable[this.data.activeTab][index].hasThumb']: true})
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