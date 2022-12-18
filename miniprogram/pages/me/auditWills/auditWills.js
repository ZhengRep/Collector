// pages/me/auditWills/auditWills.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        auditWills: [],
        auditSkip: 0,
        pageNum: 10,
        noMoreAuditData: false,
        refresherTrigger: false,
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        this.getDataList('正在加载', 'wills', {'audit': 1}, 'date', this.data.auditSkip);
    },
    getDataList(showLoadingTitle, database, where, orderBy, skip){
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
                type: 'getDataList',
                openId: app.globalData.openId,
                database: database,
                where: where,
                orderBy: orderBy,
                skip: skip,
                limit: this.data.pageNum,
            }
        }).then((res)=>{
            console.log('getDataList', res.result);
            if(res.result.data.length){
                this.setData({[`auditWills`]: [...this.data.auditWills, ...res.result.data], auditSkip: this.data.auditSkip+this.data.pageNum})
            }else{
                this.setData({noMoreAuditData: true});
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
        if(this.data.noMoreAuditData){
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
            })
        }else{
             this.getDataList('加载更多', 'wills', {'audit': 1}, 'date', this.data.auditSkip);
        }
    },
    onScrollRefresh(){
        this.setData({
            [`auditWills`]: [],
            auditSkip: 0,
            noMoreAuditData: false,
            refresherTrigger: false,
        })
        this.getDataList('正在刷新', 'wills', {'audit': 1}, 'date', this.data.auditSkip);

    },
    auditWillsRecord(index, where, update){
        wx.showLoading({
            title: '更新中',
            mask: true,
            duration: 7000,
        });
        wx.cloud.callFunction({
            name: 'quickstartFunctions',
            config:{
                env: app.globalData.envId,
            },
            data:{
                type: 'updateRecord',
                database: 'wills',
                where: where,
                update: update,
            }
        }).then(res=>{
            console.log(res);
            this.data.auditWills.splice(index, 1);
            this.setData({auditWills: this.data.auditWills,})
            wx.hideLoading();
        }).catch(e=>{
            console.log(e);
            wx.hideLoading();
            wx.showToast({
              title: '出现错误',
              icon: 'error'
            })
        })
    },
    auditReject(e){
        var index = e.currentTarget.dataset.index;
        this.auditWillsRecord(index, {'_id': this.data.auditWills[index]._id}, {data:{'audit': 0}});
    },
    auditPass(e){
        var index = e.currentTarget.dataset.index;
        this.auditWillsRecord(index, {'_id': this.data.auditWills[index]._id}, {data:{'audit': 2}});
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