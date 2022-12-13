// component/tabs/tabs.js
Component({
    properties: {
        tabs: { type: Array, value: [] },
        activeClass: { type: String, value: '' },
        // tabClass: { type: String, value: '' },
        // tabUnderlineColor: { type: String, value: '#07c160' },
        // tabActiveTextColor: { type: String, value: '#000000' },
        // tabInactiveTextColor: { type: String, value: '#000000' },
        // // tabBackgroundColor: { type: String, value: '#ffffff' },
        // activeTab: { type: Number, value: 0 },
    },
    data: {
        currentView: 0,
    },
    observers: {
        activeTab: function activeTab(_activeTab) {
            var len = this.data.tabs.length;
            if (len === 0) return;
            var currentView = _activeTab - 1;
            if (currentView < 0) currentView = 0;
            if (currentView > len - 1) currentView = len - 1;
            this.setData({ currentView: currentView });
        }
    },
    lifetimes: {
        created: function created() {}
    },
    methods: {
        handleTabClick: function handleTabClick(e) {
            var index = e.currentTarget.dataset.index;
            this.setData({ activeTab: index });
            this.triggerEvent('tabclick', { index: index });
        },
        handleSwiperChange: function handleSwiperChange(e) {
            var index = e.detail.current;
            this.setData({ activeTab: index });
            this.triggerEvent('change', { index: index });
        }
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        console.log(this.data.currentView);
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