//index.js
//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // casArray: ['选择所在区域', '浦东新区', '徐汇区', '黄浦区', '杨浦区', '虹口区', '闵行区', '长宁区', '普陀区', '宝山区', '静安区', '闸北区', '卢湾区', '松江区', '嘉定区', '南汇区', '青浦区', '奉贤区', '崇明县'],
    casIndex: 0,
    mobile: '',
    area: '',
    radioCheckVal: '新房装修',
    viewText: '',
    scrollTop: 0,
    wordindex: 'scroll',
    toView: '',
    multiIndex: [0, 0, 0, 0, 0],
    multiArray: [
      [
        {
          id: 0,
          name: '0室'
        },
        {
          id: 1,
          name: '1室'
        },
        {
          id: 2,
          name: '2室'
        },
        {
          id: 3,
          name: '3室'
        },
        {
          id: 4,
          name: '4室'
        },
      ],
      [
        {
          id: 0,
          name: '0厅'
        },
        {
          id: 1,
          name: '1厅'
        },
        {
          id: 2,
          name: '2厅'
        },
        {
          id: 3,
          name: '3厅'
        },
        {
          id: 4,
          name: '4厅'
        },
      ],
      [
        {
          id: 0,
          name: '0厨'
        },
        {
          id: 1,
          name: '1厨'
        },
        {
          id: 2,
          name: '2厨'
        },
        {
          id: 3,
          name: '3厨'
        },
        {
          id: 4,
          name: '4厨'
        },
      ],
      [
        {
          id: 0,
          name: '0卫'
        },
        {
          id: 1,
          name: '1卫'
        },
        {
          id: 2,
          name: '2卫'
        },
        {
          id: 3,
          name: '3卫'
        },
        {
          id: 4,
          name: '4卫'
        },
      ],
      [
        {
          id: 0,
          name: '0阳台'
        },
        {
          id: 1,
          name: '1阳台'
        },
        {
          id: 2,
          name: '2阳台'
        },
        {
          id: 3,
          name: '3阳台'
        },
        {
          id: 4,
          name: '4阳台'
        },
      ]
    ],

  },

  //下拉绑定事件
  bindCasPickerChange: function (e) {
    var that = this;
    // console.log('选择的是', that.data.casArray[e.detail.value])
    if (e.detail.value != 0 && that.data.area != "") {
      that.setData({ reply: true })
    } else {
      that.setData({ reply: false })
    }
    that.setData({
      casIndex: e.detail.value
    })
  },
  //手机号码输入框事件
  mobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  /** 
   * radio单选
   */
  radioCheckedChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
    // console.log("选择的是：", e.detail.value);
  },
  
  formSubmit: function (e) {
    var that = this;
    var viewText = that.data.multiArray[0][that.data.multiIndex[0]].name + that.data.multiArray[1][that.data.multiIndex[1]].name + that.data.multiArray[2][that.data.multiIndex[2]].name + that.data.multiArray[3][that.data.multiIndex[3]].name + that.data.multiArray[4][that.data.multiIndex[4]].name;
    let myreg = /^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57]|19[89])[0-9]{8}$/;
    // console.log('老杜选的是：' + '\n' + viewText);
    // console.log(e.detail.value.region)
    if (e.detail.value.region == '请选择所在区域') {
      wx.showToast({
        title: '请选择区域！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (e.detail.value.area == '' || e.detail.value.area == 0) {
      wx.showToast({
        title: '请输入面积！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (JSON.stringify(e.detail.value.housetype) == JSON.stringify([0, 0, 0, 0, 0])) {//viewText == '0室0厅0厨0卫0阳台'
      wx.showToast({
        title: '请选择户型！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (e.detail.value.mobile.length == 0) {
      wx.showToast({
        title: '请输入手机号！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(e.detail.value.mobile) || e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else {
      //接口调用
      wx.request({
        method: 'POST',
        url: 'https://api.youjuke.com/wxsmallprogram/wx_baoming', //仅为示例，并非真实的接口地址
        data: {
          mobile: e.detail.value.mobile,        // 手机号
          area: e.detail.value.area,            // 面积
          district_name: e.detail.value.region, // 区域
          city_id: 72,                          // 上海
          utm_page: 'XCX_装修报价',              // 页面来源
          bm_laiyuan: 'xcxzxbj',                // 报名来源
          unionKey: 'xcxzxbj',                  // 按钮来源（插入报名表中 from_unicon和from_child字段）
          find_cookies: 1,
          name: 'NONAME',
          bm_bak: e.detail.value.zxtype,         // 房屋类型存入bm_bak                   
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
          // console.log(res.data)
          // wx.showToast({
          //   title: '提交中...',
          //   icon: 'loading',
          //   duration: 1000,
          //   mask: true
          // })
          // setTimeout(function () {
          //   that.setData({ //重置表单数据
          //     casIndex: 0,
          //     area: '',
          //     mobile: '',
          //     multiIndex: [0, 0, 0, 0, 0],
          //     reply: false,
          //     alert: true
          //   })
          // }, 1000)
          wx.request({
            url: 'https://api.youjuke.com/wxsmallprogram/get_baoming_total',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              // console.log(res)
              that.setData({
                'total': res.data
              })
            }
          })
          // 跳转到结果页
          wx.navigateTo({
            url: "../detail/detail?baoming_id=" + res.data.data.baoming_id + "&area=" + e.detail.value.area + "&house_info=" + encodeURI(viewText) + "&baojia=" + res.data.data.baojia,
          })
        }
      })
      return true;
    }
  },
  /** 
   *监听select下拉列表 
  */
  bindMultiPickerChange: function (e) {
    var that = this;
    // console.log('选择的是：', e.detail.value);
    if (e.detail.value != "" && that.data.casIndex != 0) {
      that.setData({ reply: true })
    } else {
      that.setData({ reply: false })
    }
    that.setData({
      multiIndex: e.detail.value
    })
  },
  /**
   * 下拉框Column的选择
   */
  bindMultiPickerColumnChange: function (e) {
    var that = this;
  },
  /*
    房屋面积输入
  */
  areaInput: function (e) {
    var that = this;
    var areaValue = e.detail.value;
    if (areaValue != "" && areaValue != 0 && that.data.casIndex != 0) { //判断面积不为空时，显示下方区域
      that.setData({ reply: true })
    } else {
      that.setData({ reply: false })
    }
    if (areaValue == 0) {  //根据输入面积大小，动态设置下拉框的值
      that.setData({ multiIndex: [0, 0, 0, 0, 0] });
    } else if (areaValue <= 60) {
      that.setData({ multiIndex: [1, 1, 1, 1, 1] });
    } else if (areaValue > 60 && areaValue <= 90) {
      that.setData({ multiIndex: [2, 1, 1, 1, 1] });
    } else if (areaValue > 90 && areaValue <= 110) {
      that.setData({ multiIndex: [3, 1, 1, 1, 1] });
    } else if (areaValue > 110 && areaValue <= 130) {
      that.setData({ multiIndex: [3, 2, 1, 1, 1] });
    } else if (areaValue > 130 && areaValue <= 150) {
      that.setData({ multiIndex: [3, 2, 1, 2, 1] });
    } else if (areaValue > 150) {
      that.setData({ multiIndex: [4, 2, 1, 2, 1] });
    }
    that.setData({
      area: e.detail.value
    })
  },

  /**
   *  底部立即获取报价滚动效果
   */
  scrollTop: function (e) {
    let wordindex = e.currentTarget.dataset.wordindex;
    if (wordindex == '#') {
      this.setData({
        toView: 'scroll',
      })
    } else {
      this.setData({
        toView: wordindex,
      })
    }
  },

  //滚动监听
  scroll: function (e) {
    var that = this,
      scrollTop = that.data.scrollTop;
    that.setData({
      scrollTop: e.detail.scrollTop
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this
    wx.request({
      url: 'https://api.youjuke.com/wxsmallprogram/get_baoming_total',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          'total': res.data
        })
      }
    }),
      wx.request({
        url: 'https://api.youjuke.com/wxsmallprogram/get_district_id',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          // console.log(res)
          var casArray = [];
          for (var key in res.data) {
            //key是属性,object[key]是值
            casArray.push(res.data[key]);//往数组中放属性
          }
          // console.log(casArray)
          that.setData({
            'casArray': casArray
          })
        }
      })

  },
  //关闭弹出层
  close: function (e) {
    var that = this;
    that.setData({ alert: false })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '优居客5秒查询详细装修报价',
      path: 'pages/index/index',
      success: function (res) {
        //转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'succes',
          duration: 1500,
          mask: true
        })
      },
      fail: function (res) {
        //转发失败
        wx.showToast({
          title: '分享失败',
          icon: 'loading',
          duration: 1500,
          mask: true
        })
      }
    }
  }
})