// pages/homePage/homePage.js
// 总接口
let ApiUrl = "http://wx.leadingdo.com/demo";
// 新闻类接口
let typeUrl = "/news/type.aspx";
// 新闻列表接口
let newsUrl = "/news/list.aspx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tArray: [],
    loading: true,
    ishidden: true,
    curpage: 0,
    listpage: 0,
    detaildata: [],
    category: "all",
    viewHeight: 500
  },
  onReady: function() {
    this.animation = wx.createAnimation({
      duration: 2000,
      timingFunction: "ease",
    })
    // 读取屏幕高度
    var res = wx.getSystemInfoSync();
    var width = res.screenHeight - 40 - 50;
    // 设置scroll-view高度
    this.setData({
      viewHeight: width
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this
    wx.showNavigationBarLoading();
    wx.request({
      url: ApiUrl + typeUrl,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var dataArr = [];
        dataArr = res.data.data.data;
        _this.setData({
          tArray: dataArr
        })
      },
      fail: function() {},
      complete: function() {
        wx.hideNavigationBarLoading()
      }
    })
    this.setData({
      listpage: 0
    });
    this.readList("all")
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  typeClick(e) {
    var idx = e.currentTarger.dataset.idx;
    var _this = this;
    _this.setData({
      curpage: e.target.id,
      listpage: 0,
      category: idx
    })
    this.readList()
  },
  // 加载更多
  addMoreData(e) {
    var _this = this;
    var pageTemp = this.data.listpage + 1;
    _this.setData({
      listpage: pageTemp
    })
    this.readList();
  },
  // 获取新闻列表
  readList() {
    this.setData({
      loading: false
    })
    var _this = this;
    wx.request({
      url: ApiUrl + newsUrl,
      method: "POST",
      data: {
        category: this.data.category,
        page: this.data.curpage
      },
      header: {
        // 以表单形式提交
        'content-type': 'application/c-www-form-urlencoded'
      },
      success: function(res) {
        if (_this.data.listpage == 0) {
          _this.setData({
            detaildata: [],
          })
        }
        // 解析数据
        var arr = res.data.data;
        var dataArr = [];
        for (var index of arr) {
          dataArr.push(JSON.parse(index.content))
        }
        _this.setData({
          detaildata: dataArr,
        })
      },
      fail: function(res) {},
      complete: function(res) {
        _this.setData({
          loading: true
        })
      }
    })
  }
})