//index.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
/*var pageNum = 20;//起始页个数
var pageSize = 20;//下拉刷新增加的个数
var total = 0;//数据总数
var isload = true;//是否显示加载更多
var jiazai = true;//加载时机
var comp = false;//加载完成
var urls = [];
*/

Page({
    data: {
      daily: []

  },
  //获取搜索框中的内容
  findInput: function (e) {
    this.setData({
      findInput: e.detail.value
    })
  },
  //find
  findClick: function (e) {
    console.log("输入框内容：" + this.data.findInput);
    const image = ''
    wx.navigateTo({
      url: 'find/find?name=' + this.data.findInput + '&image=' + image
    })
  },
  //分享当前页面
  onShareAppMessage: function () {
    return {
      //title: getTitle(menuName),
      title: "正在热映",
      path: '/pages/film/film',
      success: function (res) {
        // 分享成功
        wx.showToast({
          title: '分享成功',
            icon: 'success',
              duration: 1000
        })
      },
      fail: function (res) {
        // 分享失败
      }
    }
  },
  onLoad: function () {
      console.log('onLoad')
      const that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function(userInfo){
          //更新数据
          that.setData({
              userInfo:userInfo
          })
      });

      wx.getSystemInfo({
          success(res){
              that.setData({
                  scrollHeight: res.windowHeight
              })
              console.log(res.windowHeight)
          }
      })

    this.loadFilms();
  },

  // 滑动到底部，加载更多
  lower(e){
    console.log(e)
  },
  //滑动到头部
  bindscrolltoupper(e){
    console.log(e)
  },
  //加载数据
loadFilms(){
  var DATE = util.formatTime(new Date());
  console.log("DATE---" + DATE);
  var data_str1 = DATE.split(" ");
  var data_str = data_str1[0].split("/");
  var year = '';
  var month = '';
  var day = '';
  for(var i=0;i<data_str.length;i++){
    console.log("DATE---" + data_str[i]);
    year = data_str[0];
    month = data_str[1];
    day = data_str[2];
  }
  this.setData({
    date: DATE,
  });
  const that = this;
  wx.request({
    url: 'https://api.avatardata.cn/HistoryToday/LookUp?key=a8f8ad8a787c4abca058a1a306423158&type=2&page=1&rows=50',
    data: {
      yue:month,
      ri:day
    },
    success(res) {
      let daily = res.data.result; 
      that.setData({
        daily: daily
      });
    },
    fail: function (e) {
      console.log("******error******: ", e);
    },
    complete: function (e) {
      console.log("******请求完成****** ", e);
      //this.setData({
        //last_update: result.last_update
      //});
    }
  })
},
  /*bindDetail(e){
      const id = e.currentTarget.dataset.id;
    if (id != "") {
      wx.navigateTo({
        url: 'detail/detail?id=' + id
      })
    }
  },
  // -------- 点击图片放大 保存 -------
  previewImage: function (e) {
    var that = this
    //console.log(e);
    const small = e.currentTarget.dataset.small; 
    var urls = []
    //urls.push(e.currentTarget.dataset.medium);
    urls.push(e.currentTarget.dataset.large); 
    wx.previewImage({
      current: small,
      urls: urls
      // urls必须是数组 不然会报错  
    })
  }*/
})
