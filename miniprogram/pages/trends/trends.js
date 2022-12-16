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
        pageNum: 10, //test value
        noMoreHotData: false,
        noMoreNewData: false,
        refresherTrigger: false,
        firstLoadNewList: true,
    },
    clickTab(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({ 
          activeTab: index 
        })
        if(this.data.firstLoadNewList){
            this.getDataListOfThumb('newList', '正在加载', {'audit': true}, {date: -1}, this.data.newSkip);   
            this.setData({firstLoadNewList: false})
        }
    },
    onChangeSwipper(e){
        this.setData({activeTab: e.detail.current});
        if(this.data.firstLoadNewList){
            this.getDataListOfThumb('newList', '正在加载', {'audit': true}, {date: -1}, this.data.newSkip);   
            this.setData({firstLoadNewList: false})
        }
    },
    
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
         //get hot list and new list
         this.getDataListOfThumb('hotList', '正在加载', {'audit': true}, {thumbNum: -1}, this.data.hotSkip);
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
    getDataListOfThumb(listName, showLoadingTitle, match, sort, skip){
        wx.showLoading({
            title: showLoadingTitle,
            mask: true,
        }) 
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                envId: app.globalData.envId,
            },
            data:{
                type: 'getDataListOfThumb',
                openId: app.globalData.openId,
                match: match,
                sort: sort,
                skip: skip,
                limit: this.data.pageNum,
            }
        }).then((res)=>{
            console.log('getDataListOfThumb', res.result);
            if(listName == 'hotList'){
                if(res.result.list.length){
                    this.setData({[`listTable[0]`]: [...this.data.listTable[0] ,...res.result.list], hotSkip: this.data.hotSkip+this.data.pageNum})
                }else{
                    this.setData({noMoreHotData: true});
                    wx.hideLoading();
                    wx.showToast({
                      title: '没有更多数据了',
                      icon: 'none'
                    })
                    return;
                }
            }
            else if(listName == 'newList'){
                if(res.result.list.length){
                    this.setData({[`listTable[1]`]: [...this.data.listTable[1] ,...res.result.list], newSkip: this.data.newSkip+this.data.pageNum})
                }else{
                    this.setData({noMoreNewData: true});
                    wx.hideLoading();
                    wx.showToast({
                      title: '没有更多数据了',
                      icon: 'none'
                    })
                    return;
                }
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
        if(!this.data.noMoreHotData){
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
            })
        }else{
            if(!this.data.activeTab){
                this.getDataListOfThumb('hotList', '加载更多', {'audit': true}, {thumbNum: -1}, this.data.hotSkip);
            }
        }

        if(!this.data.noMoreNewData){
            wx.showToast({
                title: '没有更多数据了',
                icon: 'none',
            })
        }else{
            if(this.data.activeTab){
                this.getDataListOfThumb('newList', '加载更多', {'audit': true}, {date: -1}, this.data.newSkip);   
            }
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
                thumbId: this.data.listTable[this.data.activeTab][index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`listTable[${this.data.activeTab}][${index}].hasThumb`]: ['id'],
                [`listTable[${this.data.activeTab}][${index}].thumbNum`]: this.data.listTable[this.data.activeTab][index].thumbNum + 1,
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
                thumbId: this.data.listTable[this.data.activeTab][index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`listTable[${this.data.activeTab}][${index}].hasThumb`]: [],
                [`listTable[${this.data.activeTab}][${index}].thumbNum`]: this.data.listTable[this.data.activeTab][index].thumbNum - 1,
            })
        }).catch((e)=>{
            console.log(e);
            wx.showToast({
              title: '取消点赞失败',
              icon: 'none'
            })
        })
        
    },
    onScrollRefresh(){
        if(!this.data.activeTab){
            this.setData({
                [`listTable[0]`]: [],
                hotSkip: 0,
                noMoreHotData: false,
                refresherTrigger: false,
            })
            this.getDataListOfThumb('hotList', '正在刷新', {'audit': true}, {thumbNum: -1}, this.data.hotSkip);
        }else{
            this.setData({
               [`listTable[1]`]: [],
               newSkip: 0,
               noMoreNewData: false,
               refresherTrigger: false,
            })
            this.getDataListOfThumb('newList', '正在刷新', {'audit': true}, {date: -1}, this.data.newSkip);   
        }

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