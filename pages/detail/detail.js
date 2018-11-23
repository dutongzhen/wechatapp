//logs.js
const app = getApp()
Page({
  data: {
    logs: [],
    baoming_id: '',
    area: '',
    house_info: '',
    baojia: '',
    yjk_baojia: ''
  },
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    var baoming_id = options.baoming_id;
    if(baoming_id == 'undefined'){
      wx.showToast({
            title: '提交过于频繁！',
            icon: 'loading',
            duration: 1000,
            mask: true
      })
      var area = options.area;
      var house_info = decodeURI(options.house_info);
      var baojia = 0;
      var yjk_baojia = 0;
      that.setData({
        baoming_id: baoming_id,
        area: area,
        house_info: house_info,
        baojia: baojia,
        yjk_baojia: yjk_baojia
      })
    }else{
      var area = options.area;
      var house_info = decodeURI(options.house_info);
      var baojia = options.baojia;
      var yjk_baojia = (options.baojia - 3000.00).toFixed(2);
      that.setData({
        // url: "https://m.youjuke.com/tg/lffxjg.html?baoming_id=" + baoming_id + "&area=" + area + "&qa_source=xcxzxbj&public=1&house_info=" + decodeURI(house_info),
        baoming_id: baoming_id,
        area: area,
        house_info: house_info,
        baojia: baojia,
        yjk_baojia: yjk_baojia
      })
    }
  }
})
