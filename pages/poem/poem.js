
//获取应用实例
const app = getApp()
Page({
    data: {
      poem: "",//唐诗宋词详情
      

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
    let id = params.id;
    const that = this;
    wx.request({
      url: 'https://api.avatardata.cn/TangShiSongCi/LookUp?key=8cf90379938940f19cb49b18522db439',
      data: {
        id: id
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
  }
})
