// pages/trends/trends.js
const app = getApp();
Page({

    /**
     * Page initial data
     */
    data: {
        tabs:[{id:0, title: '热门榜'}, {id:1, title: '最新榜'}],
        activeTab: 0, 


    },
    onTabClick(e) {
        console.log("onTabClick");
        const index = e.detail.index
        this.setData({ 
          activeTab: index 
        })
      },
    
      onChange(e) {
        console.log("onChange");
        const index = e.detail.index
        this.setData({ 
          activeTab: index 
        })
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