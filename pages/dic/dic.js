//index.js
var util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
var error_log = false;
Page({
    data: {
      poem: [],//唐诗宋词
      idiom: [],//成语
      two_part: [],//歇后语
      quotes: [],//名人名言
      poem_hideText: true,//隐藏效果所需
      poem_hideClass: 'up',//默认隐藏
      idiom_hideText: true,//隐藏效果所需
      idiom_hideClass: 'up',//默认隐藏
      

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
      url: '../find/find?name=' + this.data.findInput
    })
  },
  //唐诗宋词-隐藏、显示效果切换
  poem_toggleText() {
    let poem_hideText = this.data.poem_hideText,
      poem_hideClass = this.data.poem_hideClass == 'up' ? 'down' : 'up';
    this.setData({
      poem_hideText: !poem_hideText,
      poem_hideClass: poem_hideClass
    })
  },
  //成语-隐藏、显示效果切换
  idiom_toggleText() {
    let idiom_hideText = this.data.idiom_hideText,
      idiom_hideClass = this.data.idiom_hideClass == 'up' ? 'down' : 'up';
    this.setData({
      idiom_hideText: !idiom_hideText,
      idiom_hideClass: idiom_hideClass
    })
  },
  //分享当前页面
  onShareAppMessage: function () {
    return {
      //title: getTitle(menuName),
      title: "dic",
      path: '/pages/dic/dic',
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
      });

    this.loadpoem();
    this.loadidiom();
    this.loadtwo_part(); 
    this.loadquotes(); 
  },

  // 滑动到底部，加载更多
  lower(e){
    console.log(e)
  },
  //滑动到头部
  bindscrolltoupper(e){
    console.log(e)
  },
  //唐诗宋词
  loadpoem(){
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/TangShiSongCi/Random?key=8cf90379938940f19cb49b18522db439',
      data: {

      },
    success(res) {
      let poem = res.data.result; 
      that.setData({
        poem: poem
      });
    },
      fail: function (e) {
        error_log = true;
        that.setData({
          error_log: error_log
        });
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******唐诗宋词--请求完成****** ", e);
      }
    })
  }, 
  //成语
  loadidiom() {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/ChengYu/Random?key=2431b0ba7ab24c8191df893243382dc4',
      data: {

      },
      success(res) {
        let idiom = res.data.result;
        that.setData({
          idiom: idiom
        });
      },
      fail: function (e) {
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******成语--请求完成****** ", e);
      }
    })
  }, 
  //歇后语
  loadtwo_part() {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/XieHouYu/Random?key=387bcf2fd17944af8695d21b1e41a91d',
      data: {

      },
      success(res) {
        let two_part = res.data.result;
        that.setData({
          two_part: two_part
        });
      },
      fail: function (e) {
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******歇后语--请求完成****** ", e);
      }
    })
  },
  //名人名言
  loadquotes() {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/MingRenMingYan/Random?key=71f8e8cf64f3428b8fd8d238598aa3d3',
      data: {

      },
      success(res) {
        let quotes = res.data.result;
        that.setData({
          quotes: quotes
        });
      },
      fail: function (e) {
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******名人名言--请求完成****** ", e);
      }
    })
  }
})
