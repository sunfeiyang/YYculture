
//获取应用实例
const app = getApp()
Page({
    data: {
      idiom: "",//成语详情
      

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
      url: 'https://api.avatardata.cn/ChengYu/LookUp?key=2431b0ba7ab24c8191df893243382dc4',
      data: {
        id: id
      },
      success(res) {
        let idiom = res.data.result;
        console.log(idiom);
        that.setData({
          idiom: idiom
        });
      },
      fail: function (e) {
        that.setData({

        });
        console.log("******error******: ", e);
      },
      complete: function (e) {
        console.log("******成语字典--请求完成****** ", e);
      }
    })
  }
})
