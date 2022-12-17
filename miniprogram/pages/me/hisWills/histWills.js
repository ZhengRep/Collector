// pages/me/hisWills/histWills.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        hisWills:[],
        hisSkip: 0,
        pageNum: 10, //test value
        noMoreHisData: false,
        refresherTrigger: false,
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        this.getDataListOfThumb('正在加载', {openId: app.globalData.openId}, {date: -1}, this.data.hisSkip)
    },
    getDataListOfThumb(showLoadingTitle, match, sort, skip){
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
            if(res.result.list.length){
                this.setData({[`hisWills`]: [...this.data.hisWills, ...res.result.list], hisSkip: this.data.hisSkip+this.data.pageNum})
            }else{
                this.setData({noMoreHisData: true});
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
        if(this.data.noMoreHisData){
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
            })
        }else{
            this.getDataListOfThumb('加载更多', {openId: app.globalData.openId}, {date: -1}, this.data.hisSkip)
        }
    },
    onScrollRefresh(){
        this.setData({
            [`hisWills`]: [],
            hisSkip: 0,
            noMoreHisData: false,
            refresherTrigger: false,
        })
        this.getDataListOfThumb('正在刷新', {openId: app.globalData.openId}, {date: -1}, this.data.hisSkip)

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
                thumbId: this.data.hisWills[index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`hisWills[${index}].hasThumb`]: ['id'],
                [`hisWills[${index}].thumbNum`]: this.data.hisWills[index].thumbNum + 1,
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
                thumbId: this.data.hisWills[index]._id,
            }
        }).then((res)=>{
            console.log(res);
            this.setData({
                [`hisWills[${index}].hasThumb`]: [],
                [`hisWills[${index}].thumbNum`]: this.data.hisWills[index].thumbNum - 1,
            })
        }).catch((e)=>{
            console.log(e);
            wx.showToast({
              title: '取消点赞失败',
              icon: 'none'
            })
        })
        
    },
    deleteWill(e){
        var _this = this;
        wx.showModal({
            content: '是否删除该条意愿',
            success(res){
                if(res.confirm){
                    wx.showLoading();
                    var index = e.currentTarget.dataset.index;
                    console.log('delete', index);
                    wx.cloud.callFunction({
                        name: 'quickstartFunctions',
                        config:{
                            env: app.globalData.envId,
                        },
                        data:{
                            type: 'deleteWill',
                            _id: _this.data.hisWills[index]._id,
                        }
                    }).then(res=>{
                        console.log(res);
                        var temp = _this.data.hisWills.splice(index, 1);//this copy method is inefficient
                        _this.setData({
                            hisWills: _this.data.hisWills,
                        })
                        wx.hideLoading();
                    }).catch(e=>{
                        wx.hideLoading();
                        wx.showToast({
                          title: '删除失败',
                          icon: 'none',
                        })
                        console.log(e);
                    })
                }
            }
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