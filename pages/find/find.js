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
      dic: [],//名人名言
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
      url: 'find?name=' + this.data.findInput
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
      title: "find",
      path: '/pages/find/find',
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
  onLoad: function (params) {
    let name = params.name;
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

    this.findpoem(name);
    this.loadidiom(name);
    this.loadtwo_part(name); 
    this.loadquotes(name); 
    this.loadDic(name);
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
  findpoem(name) {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/TangShiSongCi/Search?key=8cf90379938940f19cb49b18522db439',
      data: {
        keyWord:name
      },
      success(res) {
        let poem = res.data.result;
        console.log(poem);
        that.setData({
          poem: poem
        });
      },
      fail: function (e) {
        that.setData({
          
        });
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******唐诗宋词--请求完成****** ", e);
      }
    })
  }, 
  //唐诗宋词详情
  poemDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../poem/poem?id=' + id
    })
  },
  //成语
  loadidiom(name) {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/ChengYu/Search?key=2431b0ba7ab24c8191df893243382dc4',
      data: {
        keyWord: name
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
  //成语详情
  idiomDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../idiom/idiom?id=' + id
    })
  },
  //歇后语
  loadtwo_part(name) {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/XieHouYu/Search?key=387bcf2fd17944af8695d21b1e41a91d',
      data: {
        keyWord: name
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
  loadquotes(name) {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/MingRenMingYan/LookUp?key=71f8e8cf64f3428b8fd8d238598aa3d3&page=1&rows=30',
      data: {
        keyWord: name
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
  },
  //新华字典
  loadDic(name) {
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/XinHuaZiDian/LookUp?key=6d04dab2649449bd85e272e71e74258f',
      data: {
        content: name
      },
      success(res) {
        let dic = res.data.result;
        that.setData({
          dic: dic
        });
      },
      fail: function (e) {
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******新华字典--请求完成****** ", e);
      }
    })
  }
})
