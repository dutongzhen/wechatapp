//获取应用实例
//import util from '../../utils/util.js';
var util = require('../../utils/util.js');
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code: null,
    casIndex: 0,
    mobile: '',
    area: '',
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
    //console.log('选择的是', that.data.casArray[e.detail.value].id)
    that.setData({
      casIndex: e.detail.value
    })
  },

  /**
   * 表单提交
   */
  getPhoneNumber: function (e) {
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击取消或授权信息回调
      wx.showModal({
        title: '提示',
        showCancel: true,
        content: '取消授权您将会失去一份详细报价清单哦~',
        confirmText:'重新授权',
        success: function (res) {}
      })
    } else {
      //lodingLOG显示
      wx.showLoading({
        title: '正在获取报价...',
        duration: 1500
      })
      that.yjkBm(e.detail.iv, e.detail.encryptedData)
    }
  },
  
  /** 
   *请求获取加密手机号并报名 
  */
  yjkBm: function (mIv, mEncryptedData) {
    var that = this;
    let viewText = that.data.multiArray[0][that.data.multiIndex[0]].name + that.data.multiArray[1][that.data.multiIndex[1]].name + that.data.multiArray[2][that.data.multiIndex[2]].name + that.data.multiArray[3][that.data.multiIndex[3]].name + that.data.multiArray[4][that.data.multiIndex[4]].name; //户型选择
    let region = that.data.casArray[that.data.casIndex].id; //区域选择
    //console.log('老杜选的是：' + '\n' + viewText);
    //console.log('老杜选的是：' + '\n' + region);
    //console.log('老杜选的是：' + '\n' + that.data.area);
    if (region == '0') {
      wx.showToast({
        title: '请选择区域！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (that.data.area == '' || that.data.area == 0) {
      wx.showToast({
        title: '请输入面积！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else if (JSON.stringify(that.data.multiArray) == JSON.stringify([0, 0, 0, 0, 0])) {//viewText == '0室0厅0厨0卫0阳台'
      wx.showToast({
        title: '请选择户型！',
        icon: 'loading',
        duration: 1500
      })
      return false;
    } else { 
        //发起网络请求  
        // console.log("code:" + that.data.code);
        // console.log("code:" + mIv);
        // console.log("code:" + mEncryptedData);return false;
        
        util.sendRequest('https://api.youjuke.com/wxsmallprogram/wechat_xcxbmCommit', // 接口地址
          {
            'js_code': that.data.code,            // 用于获取openid（用户唯一标识）和sessionkey（会话密钥）
            'iv': mIv,                            // 加密算法的初始向量（如果用户没有同意授权则为undefined）
            'encryptedData': mEncryptedData,      // 用户信息的加密数据
            'area': that.data.area,                 // 面积
            'district_id': region,                  // 区域
            'utm_page': 'XCX_装修报价2',             // 页面来源
            'unionKey': 'XCXZXBJ_XCXZXBJ',          // 按钮来源（插入报名表中 from_unicon和from_child字段）
            'find_cookies': 1,
            'name': '小程序NONAME'                   // 姓名
          },
          'POST',
          { 'content-type': 'application/x-www-form-urlencoded' }
        ).then(function (data) {
            
            // console.log(data);return false;
            util.sendRequest('https://api.youjuke.com/wxsmallprogram/get_baoming_total', {}, 'GET', {'content-type': 'application/json'})
            .then(function (res) {
                //res就是我们请求接口返回的数据
                that.setData({
                  'total': res.data
                });
            }, function (error) {
                wx.showToast({
                  title: '请求超时',
                  duration: 1500
                })
            });
            // 跳转到结果页
            wx.navigateTo({
              url: "../detail/detail?baoming_id=" + data.data.data.baoming_id + "&area=" + that.data.area + "&house_info=" + encodeURI(viewText) + "&baojia=" + data.data.data.baojia,
            })

        }, function (error) {
          wx.showToast({
            title: '请求超时',
            duration: 1500
          })
        });
        return true;
    }
  },

  /** 
   *监听select下拉列表 
  */
  bindMultiPickerChange: function (e) {
    var that = this;
    // console.log('选择的是：', e.detail.value);
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
    let areaValue = e.detail.value;
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
  onLoad: function (options){
    var that = this;
    // 登录 code 五分钟会过期，同时每次使用login session_key 就会过期。
    wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if(res.code){
            //发起网络请求  
            //console.log("code:" + res.code)
            that.setData({ code: res.code })
          } else {
            console.log('获取用户登录状态失败！' + res.errMsg)
          }
        }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that        = this;
    let total_url   = 'https://api.youjuke.com/wxsmallprogram/get_baoming_total',
        region_url  = 'https://api.youjuke.com/Wxsmallprogram/get_district_data',
        header = {'content-type': 'application/json'};
    //报名用户请求    
    util.sendRequest(total_url, {}, 'GET', header)
      .then(function (res) {
        //res就是我们请求接口返回的数据
        that.setData({
          'total': res.data
        });        
      }, function (error) {
        wx.showToast({
          title: '请求超时',
          duration: 1500
        })
        //console.log(error);
    });
    //区域选择请求
    util.sendRequest(region_url, {}, 'GET', header)
      .then(function (res) {
        //console.log(res.data);
        let casArray = res.data; 
        casArray.unshift({id: "0", name:"请选择所在区域"})
        that.setData({
          'casArray': casArray
        });
      }, function (error) {
        wx.showToast({
          title: '请求超时',
          duration: 1500
        })
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '优居客5秒查询详细装修报价',
      path: 'pages/bj_new/bj_new',
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