//ajax请求
function https(data){
    var method=data.method||'get'
    var newheader=''
    if(data.headers){
        newheader={
            "Authorization": window.api?api.getPrefs({sync: true,key: 'SessionKey'}):$api.getStorage('SessionKey'),
            "Content-Type": 'application/json; charset=utf-8'
        }
      }
    if(openapp){
      var lodata={}
      if(method=="get"){
        lodata={
            values:data.data
        }
      }else if(method=="post"){
        lodata={
            body:data.data
        }
      }
      api.ajax({
          url:data.url,
          method: method,
          data:lodata,
          headers:newheader,
          timeout:data.timeout||30,
          dataType:data.dataType||'json'
      },function(ret, err){
          if (ret) {
            if(data.successBack){
              data.successBack(ret)
            }
          } else {
            if(err.statusCode=='403'){
              console.log(403)
              console.log(data.url)
              //过期更换别名,去除通知
              var ajpush = api.require('ajpush');
              var param = {alias:'guoqi',tags:['tag1','tag2']};
              ajpush.bindAliasAndTags(param,function(ret) {
                      var statusCode = ret.statusCode;
              });
              api.removePrefs({ key:'SessionUserID'})
              api.removePrefs({ key:'SessionName'})
              api.removePrefs({ key:'SessionKey'})
              api.removePrefs({ key:'SessionShopID'})
              api.setPrefs({ key:'loginStatus',value:'loginFail'})//过期清除信息
              api.openWin({
                name: 'login',
                url: api.wgtRootDir+'/login.html',
                bgColor:'#fff'
              })
            }
            if(data.errorBack){
              data.errorBack(err)
            }else{
              if (err.statusCode == '503') {
                promptMsg('当前访问峰值过高，请稍候再试...')
              }else{
                promptMsg(err.msg)
              }
            }
          }
        })
      }else{
        // console.log(method)
        if(method!='get'){
          axios({
            method:method,
            url:data.url,
            data: data.data||'',
            headers:newheader
          }).then(function(response) {
            data.successBack(response.data)
          });
        }else{
          axios({
            method:method,
            url:data.url,
            params: data.data||'',
            headers:newheader
          }).then(function(response) {
            data.successBack(response.data)
            
          });
        }
      }
  }

  //跳转
  function openWin(data,pubilchead){
      if(window.api){
        if(pubilchead){
          data.pageParam.url=data.url
          api.openWin({
            name: data.name,
            url: './public_head.html',
            pageParam: data.pageParam,
            bgColor:data.bgColor||'#fff',
            useWKWebView:data.useWKWebView||false,
            progress:{
              type:'page',
              color:'#F5AC9E'
            }
        });
        }else{
          api.openWin({
            name: data.name,
            url: data.url,
            pageParam: data.pageParam,
            bgColor:data.bgColor||'#fff',
            useWKWebView:data.useWKWebView||false,
            progress:{
              type:'page',
              color:'#F5AC9E'
            }
        });
        }
      }else{
          var canshu=''
          if(data.pageParam){
              if(data.url.indexOf("?")==-1){
                canshu='?zhan=1'
              }
            for(var key in data.pageParam){ 
                var i=''  
                var skey=''
                if(typeof(data.pageParam[key])=='object'){
                  skey=JSON.stringify(data.pageParam[key])
                }else{
                  skey=data.pageParam[key]
                }
                i= '&'+key+'='+skey
                canshu+=i
                } 
          }
          console.log(data.url+canshu)
        window.location.href=data.url+canshu; 
      }
  }

  //关闭win
  function closeWin() {
    if (window.api) {
      api.closeWin();
    } else{
      history.go(-1);
    }
  }
  
 //关闭Frame
  function closeFrame(){
    if (window.api) {
        api.closeFrame();
      } else{
        history.go(-1);
      }
  }

  //提示操作信息框
function promptMsg(text) {
  if(text) {
    var textLength = text.length>8?'65%':'0';
  }else {
    var textLength = text
  }
  $api.remove($api.byId('prompt'));
  clearTimeout(protimer);
  protimer = null;
  $api.append(document.body,'<div id="prompt" style="position:fixed;top:50%;left:50%;z-index:999999999;-webkit-transform:translate(-50%,-50%);translate(-50%,-50%);min-width:'+textLength+';max-width:'+screen.width*0.8+'px;text-align:center;background-color:rgba(0,0,0,.7);word-wrap:break-word;padding:5px 15px;color:#fff;border-radius:5px;font-size:13px;-moz-transition:all .3s linear;-webkit-transition:all .3s linear;-o-transition:all .3s linear;transition:all .3s linear;">'+text+'</div>');
  var protimer = setTimeout(function() {
    var promptHtml = $api.byId('prompt');
    $api.css(promptHtml,'opacity:0');
    $api.remove(promptHtml);
    clearTimeout(protimer);
    protimer = null;
  },2000)
};

function getQueryString(name,types) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    if(types){
      return JSON.parse(unescape(r[2]));
    }else{
      return unescape(r[2]);
    }
  }
  return null;
}

//获取参数
function pageParam(name,types){
  if(window.api){
    var data=api.pageParam
    if(name in data){
      for(var i in data) {
        if(i==name){
          return data[i]
        }
     }
    }else{
      return ''
    }
  }else{
    return getQueryString(name,types)
  }
}
// 验证登录
function checkLoginStatus(){
  var res = false;
  if (window.api) {
    if(api.getPrefs({sync: true,key: 'loginStatus'})!="loginSuccess"){
      openWin({
        name: 'login',
        url: './login.html',
        bgColor: '#fff'
      });
    } else {
      res = true
    }
  } else {
    if($api.getStorage('loginStatus')!="loginSuccess"){
      openWin({
        name: 'login',
        url: './login.html',
        bgColor: '#fff'
      });
    } else {
      res = true
    }
  }
  return res;
}

// 获取全局数据
function getname(name) {
  if (!name) {
    return window.api ? api.getPrefs({sync: true,key: 'SessionUserID'}) : $api.getStorage('SessionUserID')
  } else {
    return window.api ? api.getPrefs({sync: true,key: name}) : $api.getStorage(name)
  }
}

//加载Loading
function showLoading() {
  if (window.api) {
    api.showProgress({
      text: '请耐心等待...',
      modal: true
    });
  }
}
//隐藏Loading
function hideLoading() {
  if (window.api) {
    api.hideProgress()
  }
}
//可调节文字的loading
function showjindu(text) {
  if (window.api) {
    api.showProgress({
      text: text,
      modal: true
    });
  }
}

function refresh(callback) {
  if (window.api) {
    //下拉刷新
    api.setCustomRefreshHeaderInfo({
      bgColor: '#f8f8f8',
      images: [
          'widget://image/suaxin1.png',
          'widget://image/suaxin2.png',
          'widget://image/suaxin3.png',
          'widget://image/suaxin4.png',
          'widget://image/suaxin5.png',
          'widget://image/suaxin6.png',
          'widget://image/suaxin7.png'
      ],
      tips: {
          pull: '下拉刷新',
          threshold: '松开立即刷新',
          load: '正在刷新'
      }
    }, function() {
      setTimeout(function () {
        callback && callback()
      }, 700)
    })
  }
}

// 下拉刷新停止
function refreshDone() {
  if (window.api) {
    api.refreshHeaderLoadDone();
  }
}

//确认操作提示框
function comfirmDialogBox(title, callback, addressid){
  if (!window.api) return
  var dialogBox = api.require('dialogBox');
  dialogBox.alert({
      texts: {
          content: title,
          leftBtnTitle: '取消',
          rightBtnTitle: '确认'
      },
      styles: {
          bg: '#fff',
          w: 290,
          content: {
              color: '#000',
              size: 14,
              marginT: 40,
              marginB: 40
          },
          left: {
              marginB: 7,
              marginL: 10,
              w: 130,
              h: 35,
                color: '#fff',
              corner: 2,
              bg: '#888',
              size: 15
          },
          right: {
              marginB: 7,
              marginL: 10,
              w: 130,
              h: 35,
              color: '#fff',
              corner: 2,
              bg: '#ff5543',
              size: 15
          }
      }
  }, function(ret) {
      if (ret.eventType == 'left') {
      }
      else if (ret.eventType == 'right'){
        if(addressid) {
          callback(addressid);
        }else {
          callback();
        }
      }
      var dialogBox = api.require('dialogBox');
      dialogBox.close({
         dialogName: 'alert'
      });
  });

}

//支付
function wechatpay(orderinfo,paycode,paysource,successurl, orderid, cid, types,openimagese){
  //openimagese是开店用的信息
  var payorderinfo = $api.strToJson(orderinfo);
  var wxPay = api.require('wxPay');
  wxPay.payOrder({
      apiKey: payorderinfo.AppId,
      orderId: payorderinfo.PrepayId,
      mchId: payorderinfo.MchId,
      nonceStr: payorderinfo.NonceStr,
      timeStamp: payorderinfo.TimeStamp,
      package:payorderinfo.Package,
      sign: payorderinfo.Sign
  }, function(ret, err) {
    //修改订单状态
    // xlang_ordernow(orderid,cid,ret.status)
      if (ret.status) {
        if(cid && types != "isgroupswechatpay") {
          ShoppingSuccess(paycode,paysource,successurl, orderid, cid);
        }else {
          console.log('512112');
          //第一次买礼包开店成功跳转
          if(openimagese){
            kaidian()
            return
          }
          console.log('1231321');
          if(cid) {
            ShoppingSuccess(paycode,paysource,successurl, orderid, cid, types);
          }else {
            ShoppingSuccess(paycode,paysource,successurl, orderid);
          }
        }
          //支付成功
      } else {
        setname('payQuery', '')
        if (!openapp) return
        pushMsg("订单号: ["+ orderid + "] 订单提交成功,等待付款", orderid)
        api.alert({
            title: '支付结果',
            msg:wxpayReturnCode(err.code),
            buttons: ['确定']
        });
        setTimeout(function(){
          api.closeWin({
            name: 'ordercomfirm'
          });
        },1000)
        setTimeout(function(){
          api.closeWin({
            name: 'packageordercomfirm'
          });
        },1000)
      }
  });
}

function wxpayReturnCode(code){
  api.sendEvent({
      ///支付取消刷新购物车
      name: 'alipay',
  });
  var res = "";
  switch (code) {
    case 0:
      res = "支付成功";
      break;
    case -1:
        res = "未知错误，请联系平台管理员";
        break;
    case -2:
        res = "中途取消支付操作，请到订单列表支付";
        break;
    default: res ="未知错误，请联系平台管理员";
  }
  return res;
}

//购买成功后操作
//source 来源 buynow-立即购买 shoppingcart-购物车购买 groupbuy-拼团 packagebuy-套餐购买
function ShoppingSuccess(paycode,source,successurl, orderid, cid, types){
  pushMsg("订单号: ["+ orderid + "] 支付成功", orderid)
  switch(source){
    case "buynow":
     //关闭订单确认
     if(cid && types != "isgroupswechatpay") {
       api.openWin({
           name: 'success',
           url: successurl,
           bgColor:'#fff',
           pageParam: {
             cid: cid
           }
       });
     }else {
       if(cid) {
         api.openWin({
             name: 'success',
             url: successurl,
             bgColor:'#fff',
             pageParam: {ogid: cid}
         });
       }else {
         api.openWin({
             name: 'success',
             url: successurl,
             bgColor:'#fff'
         });
       }
     }
     break;
   case "shoppingcart":
     ChangeIndexPage(4);
     //关闭订单确认
     api.openWin({
         name: 'success',
         url: successurl,
         bgColor:'#fff'
     });
     //更新购物车
     api.execScript({
         name: 'shoppingcart',
         frameName:'shoppingcart_body',
         script: 'BindData()'
     });
     break;
   case "groupbuy":
     ChangeIndexPage(4);
     //关闭订单确认
     api.openWin({
         name: 'success',
         url: successurl,
         bgColor:'#fff'
     });
     api.execScript({
         name: 'groupbuy',
         script: 'BindData();'
     });
     break;
   case "packagebuy":
     //关闭订单确认
     api.openWin({
         name: 'pack_success',
         url: successurl,
         bgColor:'#fff',
     });
     setTimeout(function(){
       api.closeWin({
         name: 'packageordercomfirm'
       });
     },1000)
     break;
   case "orderdetailpay":
     api.execScript({
         name: 'orderdetail',
         script: 'BindData();'
     });
     break;
 }
}

function alipayReturnCode(code){
  api.sendEvent({
    name: 'alipay',
  });
  var res = "";
  switch (code) {
    case '9000':
      res = "支付成功";
      break;
    case '8000':
        res = "正在处理中,请稍后确认订单状态";
        break;
    case '4000':
        res = "订单支付失败，请到订单列表支付";
        break;
    case '6001':
        res = "中途取消支付操作，请到订单列表支付";
        break;
    case '6002':
        res = "网络连接出错，请到订单列表支付";
        break;
    default: res ="未知错误，请联系平台管理员";
  }
  return res;
}

//关闭窗口回到主页，index代表回到主页哪个frame
function ReturnToIndex(index){
  api.execScript({
      name: 'root',
      script: 'ReturnToIndexPage('+index+')'
  });
  api.closeToWin({
    name: 'root'
  });
}
function ChangeIndexPage(index){
  api.execScript({
      name: 'root',
      script: 'ReturnToIndexPage('+index+')'
  });

}

// 
function OpenProdctPage(pid,yshopid, e, isUU){
  if(e) {
    if(e.target.innerHTML == "取消收藏") return;
  }
  openWin({
      name: 'product_'+pid,
      url: './productDetail.html',
      historyGestureEnabled:true,
      bgColor:"#fff",
      pageParam: {
          pid : pid,
          yshopid : yshopid,
          isUU: isUU
      },
       useWKWebView:true
  })
}

//头部导航
function headTitle(el,title, isShare, shareCallBack){
  var statustop=$api.getStorage('statustop');
  var hee=45+Number(statustop)+'px'
  var shtml=''
  var newWidth = window.innerWidth - 140
  if(isShare) {
    if(shareCallBack) {
  shtml += '<header class="commoneheadeclass" id="header" style="padding-top:'+statustop+'px">'
  shtml += '  <div class="commoneheaderleft commoneheaditem" onclick="closeWin()">'
  shtml += '     <img src="./image/icon-back.png">'
  shtml += '   </div>'
  shtml += '  <div class="commoneheaderright commoneheaditem" id="share" onclick="'+shareCallBack+'()">'
  shtml += '      <img src="./image/share_black.png">'
  shtml += '  </div>'
  shtml += '  <div class="commoneheadermain commoneheaditem">'
  shtml += '    <p id="title">'+title+'</p>'
  shtml += '  </div>'
  shtml += ' </header>'
    }else{
      shtml += '<header class="commoneheadeclass" id="header" style="padding-top:'+statustop+'px">'
      shtml += '  <div class="commoneheaderleft commoneheaditem" onclick="closeWin()">'
      shtml += '     <img src="./image/icon-back.png">'
      shtml += '   </div>'
      shtml += '  <div class="commoneheaderright commoneheaditem" id="share" onclick="'+shareCallBack+'()" style="display:none">'
      shtml += '      <img src="./image/share_black.png">'
      shtml += '  </div>'
      shtml += '  <div class="commoneheadermain commoneheaditem">'
      shtml += '    <p id="title">'+title+'</p>'
      shtml += '  </div>'
      shtml += ' </header>'
    }
  }else{
    shtml += '<header class="commoneheadeclass" id="header" style="padding-top:'+statustop+'px">'
    shtml += '  <div class="commoneheaderleft commoneheaditem" onclick="closeWin()">'
    shtml += '     <img src="./image/icon-back.png">'
    shtml += '   </div>'
    shtml += '  <div class="commoneheadermain commoneheaditem">'
    shtml += '    <p id="title">'+title+'</p>'
    shtml += '  </div>'
    shtml += ' </header>'  
  }
  // if(isShare) {
  //   if(shareCallBack) {
  //     shtml += '<div class="ym_head" style="padding-top:'+statustop+'px'+';height:'+hee+'px'+';-moz-box-shadow:0px 0px 14px #f5f4f4; -webkit-box-shadow:0px 0px 14px #f5f4f4; box-shadow:0px 0px 14px #f5f4f4; border: 0;"><div class="ym_head_back" style="transform: translateY(-50%);" onclick="backUrl()"><img src="./image/icon-back.png" style="vertical-align: top;display:block;"></div><div class="ym_head_title"><p style="width:'+newWidth+'px;margin: 0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#2C5B33;">'+title+'</p></div><div class="yu_head_share" onclick="'+shareCallBack+'()"><img src="./image/share_black.png" style="vertical-align: top;"></div></div>';
  //   }else {
  //     shtml += '<div class="ym_head" style="padding-top:'+statustop+'px'+';height:'+hee+'px'+';-moz-box-shadow:0px 0px 14px #f5f4f4; -webkit-box-shadow:0px 0px 14px #f5f4f4; box-shadow:0px 0px 14px #f5f4f4; border: 0;"><div class="ym_head_back" style="transform: translateY(-50%);" onclick="backUrl()"><img src="./image/icon-back.png" style="vertical-align: top;display:block;"></div><div class="ym_head_title"><p style="width:'+newWidth+'px;margin: 0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#2C5B33;">'+title+'</p></div><div class="yu_head_share"><img src="./image/share_black.png" style="vertical-align: top;"></div></div>';
  //   }
  // }else {
  //   shtml += '<div class="ym_head" style="padding-top:'+statustop+'px'+';height:'+hee+'px'+';-moz-box-shadow:0px 0px 14px #f5f4f4; -webkit-box-shadow:0px 0px 14px #f5f4f4; box-shadow:0px 0px 14px #f5f4f4; border: 0;"><div class="ym_head_back" style="transform: translateY(-50%);" onclick="backUrl()"><img src="./image/icon-back.png" style="vertical-align: top;display:block;"></div><div class="ym_head_title"><p style="width:'+newWidth+'px;margin: 0 auto;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;color:#2C5B33;">'+title+'</p></div></div>';
  // }
  $api.html(el,shtml);
}

//小数后两位变小
function smallpirce(price){
  price=Number(price).toFixed(2)
  var result = price.substring(price.indexOf(".")+1,price.indexOf(".")+3);
  var price=price.substring(0,price.indexOf("."))
  return price+'.'+'<small>'+result+'</small>'
}

//推送通知
function pushMsg(title, content) {
  if (!openapp) return
  var AppKey='';
    if (api.systemType == "ios") {
       AppKey = "1736A1E0-0B5B-BE80-2928-119C321F1202";
    }else{
       AppKey = "1736A1E0-0B5B-BE80-2928-119C321F1202";
    }
    console.log(api.appId)
    var now = Date.now()
    var newAppKey = SHA1(api.appId + "UZ" + AppKey + "UZ" + now) + "." + now;
    api.ajax({
        url : 'https://p.apicloud.com/api/push/message',
        method : "post",
        headers: {
        "X-APICloud-AppId": api.appId,
        "X-APICloud-AppKey": newAppKey,
        "Content-Type": "application/json"
        },
        dataType: "json",
        data: {
            "body": {
                "title": title,
                "content": content,
                "type": 1, //– 消息类型，1:消息 2:通知
                "platform": 0, //0:全部平台，1：ios, 2：android
                "userIds": api.getPrefs({sync: true,key: 'SessionUserID'})
            }
        }
        }, function(ret, err) {
    });
}

//确认操作提示框
function comfirmDialogBox(title, callback, addressid,errback){
  if (!window.api) return
  var dialogBox = api.require('dialogBox');
  dialogBox.alert({
      texts: {
          content: title,
          leftBtnTitle: '取消',
          rightBtnTitle: '确认'
      },
      styles: {
          bg: '#fff',
          w: 290,
          content: {
              color: '#000',
              size: 14,
              marginT: 40,
              marginB: 40
          },
          left: {
              marginB: 7,
              marginL: 10,
              w: 130,
              h: 35,
                color: '#fff',
              corner: 2,
              bg: '#D8D8D8',
              size: 15
          },
          right: {
              marginB: 7,
              marginL: 10,
              w: 130,
              h: 35,
              color: '#fff',
              corner: 2,
              bg: '#F5AC9E',
              size: 15
          }
      }
  }, function(ret) {
      if (ret.eventType == 'left') {
        if(errback){
          errback()
        }
      }
      else if (ret.eventType == 'right'){
        if(addressid) {
          callback(addressid);
        }else {
          callback();
        }
      }
      var dialogBox = api.require('dialogBox');
      dialogBox.close({
         dialogName: 'alert'
      });
  });

}

//返回上一页
function backUrl() {
  // api.historyBack({
  // frameName: 'callback'
  //   }, function(ret, err) {
  //       if (!ret.status) {
  //           api.closeWin();
  //       }
  //   });
  api.closeWin({
    name: api.winName
  })
}

//支付密码
function getPayPassCode() {
  var container = document.getElementById("inputBoxContainer");
  boxInput = {
    maxLength: "",
    realInput: "",
    bogusInput: "",
    bogusInputArr: "",
    callback: "",
    init: function(fun) {
      var that = this;
      this.callback = fun;
      that.realInput = container.children[0];
      that.bogusInput = container.children[1];
      that.bogusInputArr = that.bogusInput.children;
      that.maxLength = that.bogusInputArr[0].getAttribute("maxlength");
      that.realInput.oninput = function() {
        that.setValue();
      }
      that.realInput.onpropertychange = function() {
        that.setValue();
      }
    },
    setValue: function() {
      this.realInput.value = this.realInput.value.replace(/\D/g, "");
      var real_str = this.realInput.value;
      for (var i = 0; i < this.maxLength; i++) {
        var newValue = real_str[i] ? real_str[i] : ""
				this.bogusInputArr[i].id = newValue
				this.bogusInputArr[i].value = newValue;
				this.bogusInputArr[i].value=this.bogusInputArr[i].value.replace(/./g,'*');
      }
      if (real_str.length >= this.maxLength) {
        this.realInput.value = real_str.substring(0, 6);
        this.callback();
      }
    },
    getBoxInputValue: function() {
      var realValue = "";
      for (var i in this.bogusInputArr) {
        if (!this.bogusInputArr[i].id) {
          break;
        }
        realValue += this.bogusInputArr[i].id;
      }
      return realValue.substring(0, 6);
    },
    clearBoxInputValue: function () {
      for (var i in this.bogusInputArr) {
        this.bogusInputArr[i].value = ""
        this.bogusInputArr[i].id = ""
      }
      this.realInput.value = ""
    }
  }
}

function OpenWebPage(url,title,data){
  openWin({
      name: 'webframe',
      url: './webframepage.html',
      historyGestureEnabled:true,
      bgColor:"#fff",
      pageParam: {
          url : url,
          title:title,
          data:data||''
      }
  });
}

function amountDialogBox(title,defaultnum,callback){
  var dialogBox = api.require('dialogBox');
dialogBox.amount({
  texts: {
      title: title,
      default: defaultnum,
      leftBtnTitle: '取消',
      rightBtnTitle: '确定'
  },
  styles: {
      bg: '#fff',
      corner: 0.5,
      w: 300,
      h: 180,
      title: {
          marginT: 20,
          size: 14,
          color: '#000'
      },
      input: {
          w: 150,
          h: 44,
          marginT: 15,
          size: 14,
          color: '#000'
      },
      dividingLine: {
          marginT: 10,
          width: 0.5,
          color: '#696969'
      },
      left: {
          marginL: 10,
          w: 135,
          h:45,
          bg: '#999',
          color: '#fff',
          size: 14
      },
      right: {
          marginR: 10,
          w: 135,
          h: 45,
          bg: '#ff4244',
          color: '#fff',
          size: 14
      }
  }
}, function(ret) {
    if (ret.eventType == 'left') {
    }else
    {
      if(ret.amount>9999999){
        promptMsg('数字过大')
        callback(999);
      }else{
        callback(ret.amount);
      }
    }
    var dialogBox = api.require('dialogBox');
    dialogBox.close({
        dialogName: 'amount'
    });
});
}
function openour(columnid,columnname){
  openWin({
      name: 'aboutmain',
      url: './aboutmain.html',
      pageParam: {
          columnid:columnid,
          title:columnname
      }
  },1);
}
//消息红点开始
function toMessagePage() {
  openWin({
      name: 'messagelist',
      url: './messagelist.html',
      pageParam: {
        title: '消息中心'
      }
  },1);
}

//去除空格换行
function iGetInnerText(testStr) {
  var resultStr = testStr.replace(/\ +/g, "");
  resultStr = testStr.replace(/[ ]/g, "");
  resultStr = testStr.replace(/[\r\n]/g, "");
  //resultStr = testStr.replace(/^\"/g, "");
  return resultStr;
}

//上下架
function AddPro(pid,obj,state,types){
  window.event? window.event.cancelBubble = true : e.stopPropagation();
https({
    url: siteUrl +'Main/Member/UpProduct',
    method: 'get',
    data: {
            proid:pid,
            uid:getname(),
            state:state
    },
    headers:1,
    successBack:function(ret){
      if(ret.status==1&&state==0){
        promptMsg('攸店上架成功');
        if(types){
          //商品详情
          $api.html($api.byId('addup'),'已上架')
        }else{
          $api.remove(obj);
        }
      }else if(ret.status==1&&state==1){
        promptMsg('攸店下架成功');
        $api.remove($api.closest(obj, 'li'));
        var i =  parseInt($api.html(document.getElementById('yuserprocount')));
        $api.html(document.getElementById('yuserprocount'),i-1);
        var s= document.querySelectorAll("#yshopprolist li")
        if(!s.length){
          api.execScript({
              name: 'yshop',
              script: 'DataBind(1,true);'
          });
        }
      }
      else {
        promptMsg(ret.err);
      }
    }
});

}

//开店接口
function kaidian(){
  //查询订单轮询
  api.showProgress({
    title: '开通店主中...',
    text: '请耐心等待...',
    modal: true
});
https({
   url:siteUrl +'Main/Member/CheckFxShop',
   data:{
       uid:api.getPrefs({sync: true,key: 'SessionUserID'})
   },
   headers:1,
   successBack:function(ret){
     console.log($api.jsonToStr(ret));
     if(ret.success){
        if(ret.status==1&&ret.fxshopId!=''){
         api.setPrefs({ key:'SessionShopID',value:ret.fxshopId});
          setTimeout(function(){
          ReturnToIndex(2)
          },500)
       }else{
          kaidian()
       }
     }else{
       promptMsg(ret.err)
     }
   }
})
}

// 分享功能
function fenxiang(url,title,description,thumb, callBackUrl,types) {
  //types时是跳转小程序的
  if(types){
    var dialogBox = api.require('dialogBox');
    dialogBox.actionMenu ({
        rect:{
            h: 120
        },
        items:[
        {
            text: '小程序',
            icon: api.wgtRootDir+'/image/xiaochengx.png'
        }
        ],
        tapClose:true,
        isCuttingLine: true,
        styles:{
            // bg:api.wgtRootDir+'/image/share_bg_text.png',
            bg: '#fff',
            column: 3,
            itemText: {
                color: '#333',
                size: 14,
                marginT:8
            },
            itemIcon:{
                size:50
            }
        }
    },function(ret){
      switch (ret.index) {
        case 0://跳转微信好友分享
        //跳转夺宝详情页
        if(types==1){
          var wx = api.require('wx');
          wx.launchMiniProgram({
              apiKey: '',
              miniProgramType: 'release',
              userName: 'gh_5d27fcedb427',
              path: 'pages/groupbuy/groupbuy?cloudid='+url,
          }, function(ret, err) {
              if (ret.status) {
                  alert('打开成功');
              } else {
                  alert(err.code);
              }
          });
        //跳转拼团详情页
        }else if(types==2){
          var wx = api.require('wx');
          wx.launchMiniProgram({
              apiKey: '',
              miniProgramType: 'release',
              userName: 'gh_5d27fcedb427',
              path: 'pages/groupbuy/groupbuy?gbid='+url+'&pid='+title,
          }, function(ret, err) {
              if (ret.status) {
                  alert('打开成功');
              } else {
                  alert(err.code);
              }
          });
        }
          return;
      }
    });
  }else{
    var dialogBox = api.require('dialogBox');
    dialogBox.actionMenu ({
        rect:{
            h: 120
        },
        items:[
        {
            text: '微信好友',
            icon: api.wgtRootDir+'/image/share_weixin.png'
        }
        ,
        {
            text: '朋友圈',
            icon:  api.wgtRootDir+'/image/share_pengyouquan.png'
        },
        {
            text: '复制链接',
            icon:  api.wgtRootDir+'/image/share_url.png'
        }
        ],
        tapClose:true,
        isCuttingLine: true,
        styles:{
            // bg:api.wgtRootDir+'/image/share_bg_text.png',
            bg: '#fff',
            column: 3,
            itemText: {
                color: '#333',
                size: 14,
                marginT:8
            },
            itemIcon:{
                size:50
            }
        }
    },function(ret){
      switch (ret.index) {
        case 0://跳转微信好友分享
          someShare(url,'session',title,description,thumb, callBackUrl)
          return;
        case 1://跳转微信朋友圈分享
          someShare(url,'timeline',title,description,thumb, callBackUrl)
          return;
        case 2://跳转复制链接分享
          var clipBoard = api.require('clipBoard');
          clipBoard.set({
          value: url
            }, function(ret, err) {
              if (ret) {
                  alert("复制成功");
              } else {
                  alert('复制失败');
              }
            }
          );
          return;
        case 3://跳转微博分享
          return;
      }
    });
  }
};
function someShare(url,type,title,description,thumb, callBackUrl) {
  api.imageCache({
  url: thumb
  }, function(ret, err) {
      thumb = ret.url;
    var wx = api.require('wx');
    wx.shareWebpage({
      apiKey: '',
      scene: type,
      title: title,
      description: description,
      thumb: thumb,
      contentUrl: url
    }, function(ret, err) {
      if (ret.status) {
          var dialogBox = api.require('dialogBox');
          dialogBox.close({
          dialogName: 'actionMenu'
          });
          if(callBackUrl == "groupbuyorder") {
            if(share_callback_orderid) {
              api.openWin({
                  name: callBackUrl,
                  url: 'widget://html/order/'+ callBackUrl +'.html',
                  pageParam: {
                      orderid: share_callback_orderid
                  }
              });
            }
            groups_cancelOrsuccess_msg("分享成功", "分享3次以上, 拼团成功率高达98%喔~", "widget://image/groups_success_icon.png", "继续分享", "", shareUserGroups, 1)
          }else if(callBackUrl.indexOf("noticeShareCallBack") != -1) {
            var newType = callBackUrl.split("-")[1]
            var newId = callBackUrl.split("-")[2]
            var newItemIdx= callBackUrl.split("-")[3]
            notice_share_CallBack(newType, newId, newItemIdx)
          }else {
            alert('分享成功');
          }
      } else {
          var dialogBox = api.require('dialogBox');
          dialogBox.close({
          dialogName: 'actionMenu'
          });
          if(callBackUrl == "groupbuyorder") {
            groups_cancelOrsuccess_msg("", "你还没有邀请好友拼单, 不邀请好友拼单会失败喔~", "", "去邀请好友", "暂时放弃", shareUserGroups, 1)
          }else {
            alert('分享失败');
          }
      }
    });
  });
}

//获取
function getStorage() {
  var contents = $api.getStorage('inputHisroty')
  return contents || []
}

//缓存最近搜索数据
function setStorage(msg) {
  var storage = []
  if(!$api.getStorage('inputHisroty')) {
    $api.setStorage('inputHisroty', storage);
  }
  storage = $api.getStorage('inputHisroty')
  storage.push({"time": Date.now(), "msg": msg})

  $api.setStorage('inputHisroty', storage);
}

//预加载推荐商品
function CommendDataBind(page, noBounce) {
  var fxshopid = getname('SessionShopID')
    $api.toggleCls($api.byId('goods_loading'),'hide');
    https({
      url: siteUrl +'Main/Main/GetProductListJson',
      // method: 'get',
      data:{
        currpage:page,
        pageSize:pageSize,
        sort:'specialoffer',
        fxshopid: fxshopid
      },
      successBack: function(ret, err) {
      if(ret){
        if(ret.success){
            var SpecialOfferHtml = "";
            if(ret.status==1 && ret.Data!=null){
              data = ret.Data;
              if(data.length>0){
                SpecialOfferHtml += '<div class="productClass">'
                SpecialOfferHtml += '<div class="swiper-wrapper">';
                SpecialOfferHtml += '       <div class="swiper-slide product_main" style="width: 100%;">';
                SpecialOfferHtml += '         <ul>';
                  data.forEach(function(item,index){
                    var pro = item

                        SpecialOfferHtml += '              <li>';
                        SpecialOfferHtml += '                <a href="javascript:;"  onclick="OpenProdctPage(\''+pro.pid+'\')">';
                        SpecialOfferHtml += '                <div class="product_main_img"><img src="' + pro.pic + '" alt=""/></div>';
                        SpecialOfferHtml += '                <div class="xinping_foot">'
                        SpecialOfferHtml += '                   <p class="xinping_title">' + pro.name + '</p>'
                        var Price = parseFloat(pro.salePrice);
                        Price = Price.toFixed(2).toString().slice(Price.toFixed(2).toString().indexOf('.', 1));
                        if (Price.length == 1) {
                            Price = ".0" + Price;
                        }
                        SpecialOfferHtml += '                <p class="xinping_pic_left"><small>&yen;</small>' + pro.salePrice.toString().split('.')[0] + '<small>' + Price + '</small>';
                        var Prices = parseFloat(pro.commPrice);
                        Prices = Prices.toFixed(2).toString().slice(Prices.toFixed(2).toString().indexOf('.', 1));
                        if (Prices.length == 1) {
                            Prices = ".0" + Prices;
                        }
                        if(fxshopid) {
                          SpecialOfferHtml += '                       <span class="xinping_pic_right">赚<small>&yen;</small>' + pro.commPrice.toString().split('.')[0] + '<small>' + Prices + '</small></span>';
                        }
                        SpecialOfferHtml += '                    </p>'
                        SpecialOfferHtml += '                 </a>';
                        if(fxshopid) {
                          SpecialOfferHtml += '                    <p class="bottom_other">';
                          var newIntegral = pro.jifen
                          var newSales = pro.chenjiaoNum
                          if(window.screen.width < 330) {
                            var numLen = 2
                          }else {
                            var numLen = 3
                          }
                          if (pro.jifen.toString().length > numLen) {
                              newIntegral = "9".repeat(numLen)+"+"
                          }
                          if (pro.chenjiaoNum.toString().length > numLen) {
                              newSales = "9".repeat(numLen)+"+"
                          }
                          // SpecialOfferHtml += '                        <span>' + newIntegral + '积分</span>'
                          SpecialOfferHtml += '                        <span>' + newSales + '人卖过</span>';
                          if (pro.isup == 0) {
                              SpecialOfferHtml += '                        <span class="xinping_pic_right" id="pro_' + pro.pid + '"  style="float: right; margin-top: -2px;" onclick="AddPro(\'' + pro.pid + '\',this,0)"><img src="./image/goods_adds.png" style="width: 20px; height: 20px;" /></span>'
                          }
                          SpecialOfferHtml += '                    </p>'
                        }

                        SpecialOfferHtml += '                   </div>';
                        SpecialOfferHtml += '              </li>';
                        if (((index + 1) % 4) == 0 && index != (data.length - 1)) {
                            SpecialOfferHtml += '</ul></div><div class="swiper-slide product_main"><ul>'
                        }
                    });
                    SpecialOfferHtml += '          </ul>';
                    SpecialOfferHtml += '      </div>';
                    SpecialOfferHtml += '</div>';
                    SpecialOfferHtml += '<div class="swiper-pagination" style="bottom: 25px;"></div>'
                    SpecialOfferHtml += '</div>'
                    $api.append($api.dom('.proListWrap'), SpecialOfferHtml);
                    var swiper2 = new Swiper('.productClass', {
                        pagination: '.swiper-pagination',
                        paginationType: 'bullets',
                        slidesPerView: 1,
                        paginationClickable: true,
                        spaceBetween: 0,
                        onTouchStart: function(swiper) {
                          if(noBounce != 1) {
                            api.setFrameAttr({
                                name: api.frameName,
                                bounces: false
                            });
                          }
                        },
                        onTouchEnd: function(swiper) {
                          if(noBounce != 1) {
                            api.setFrameAttr({
                                name: api.frameName,
                                bounces: true
                            });
                          }
                        }
                    });
              }
            }
        }
        else {
            promptMsg(ret.err);
        }
      }
      else{
          promptMsg(err.msg);
      }
    }
  });
}

//预览大图
function showBigImages(img,index){
  window.event? window.event.cancelBubble = true : e.stopPropagation()
  var photoBrowser = api.require('photoBrowser');
  photoBrowser.open({
      images:img,
      bgColor: '#000',
      activeIndex:index
  }, function(ret, err) {
      if (ret) {
         if(ret.eventType=='click'){
           var photoBrowser = api.require('photoBrowser');
           photoBrowser.close();
         }
      } else {
         promptMsg(ret.err)
      }
  });
}

function OpenProductListPage(act,skey,clsid,sale,pack,companyid,bid){
  openWin({
      name: 'productlist',
      url: './productlist_top.html',
      historyGestureEnabled:true,
      bgColor:"#fff",
      pageParam: {
          act : act,
          skey : skey,
          clsid : clsid,
          sale :  sale,
          pack :  pack,
          companyid : companyid,
          bid:bid
      }
  });
}

//弹框
function alerts(title,content,btn,callBack){
  if(window.api){
  var dialogBox = api.require('dialogBox');
    dialogBox.alert({
        texts: {
            title:title,
            content: content || '',
            leftBtnTitle: '取消',
            rightBtnTitle: btn
        },
        styles: {
            bg: '#fff',
            w: 280,
            corner: 8,
            title:{                //（可选项）JSON对象；弹窗标题栏样式配置，不传则不显示标题区域
                marginT: 20,       //（可选项）数字类型；标题栏与对话框顶端间距；默认：20
                titleSize: 14,     //（可选项）数字类型；标题字体大小；默认：14
                titleColor: '#000' //（可选项）字符串类型；标题字体颜色，支持#、rgb、rgba；默认：#fff
            },
            content: {
                marginT: 15,
                color: '#d5cdba',
                size: 14
            },
            left: {
                w: 140,
                h: 35,
                marginL: 0,
                corner: 8,
                color: '#000',
                bg: '#fff',
                size: 14
            },
            right: {
              w: 140,
              h: 35,
              marginL: 0,
              corner: 8,
              color: '#fa2b3f',
              bg: '#fff',
              size: 14
            },
            horizontalLine:{
          color:'rgba(232,232,232,0.8)', //（可选项）字符串类型；左右按钮上边横线的颜色，支持rgb、rgba、#；默认：'rgba(245,245,245,0)'
          height:1               //（可选项）数字类型；左右边按钮横线的高度；默认：0
        },
          verticalLine:{
              color:'rgba(232,232,232,0.8)', //（可选项）字符串类型；左右按钮中间竖线的颜色，支持rgb、rgba、#；默认：'rgba(245,245,245,0)'
            width:1                //（可选项）数字类型；左右边按钮竖线的高度；默认：0
          }
        }
    }, function(ret) {
        if (ret.eventType == 'left') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'alert'
            });
        }
        if (ret.eventType == 'right') {
            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 'alert'
            });
            callBack()
        }
    });
  }else{
    alert(content)
    callBack()
  }
}
//实名认证
function checkuser(callBack,whoin){
  https({
    url: siteUrl +'Main/MemberPay/CheckUserVerified',
    data:{
      uid:getname()
    },
    headers:1,
    successBack:function(ret){
      console.log($api.jsonToStr(ret))
      if(ret.success&&ret.status==1){
        if(ret.Data.isVerified){
          callBack(ret)
        }else{
          alerts('','请先实名认证','确定',function(){
            openWin({
              name:'add_bank',
              url:'./addbank_card.html',
              pageParam:{
                title:'实名认证',
                status:0,
                whoin:whoin //whoin=pay是支付是来实名认证，下一步就去设置密码
              }
            },1)
          })
          return
        }
      }
    }
  })
}

//拼团支付查状态
function ping_ordernow(orderid,ogid,code) {
  https({
    url:siteUrl +'Main/Shopping/OrderPayStatus',
    data:{
      orderid:orderid,
      uid:getname(),
      ogid:ogid,
      code:code
    },
    headers:1,
    successBack:function(ret){
        console.log($api.jsonToStr(ret))
    }
  })
}

//新浪支付查订单
function xlang_ordernow(orderid,ogid,issuccess) {
  https({
    url:siteUrl +'Main/ShoppingSinaPay/OrderPayStatus',
    data:{
      orderid:orderid,
      uid:getname(),
      ogid:ogid,
      issuccess:issuccess
    },
    headers:1,
    successBack:function(ret){
        console.log($api.jsonToStr(ret))
    }
  })
}


/**
 * 下单重构支付完成后主动查询一次
 * @param 订单id orderId 
 * @param 支付方式id payid 
 * @param 支付方式 payCode 
 * @param 回调函数 callback 
 */
function payFinish(orderId, payid, payCode) {
  console.log('payFinish')
  if (openapp) {
    api.ajax({
      url: siteUrl + 'Main/Shopping/PayFinishedQuery',
      method: 'POST',
      data: {
        body: {
          orderId:orderId,
          paymentId: payid,
          payCode: payCode,
          memberId: getname(),
          devicetype: 1,
          devicemac: '',
          formId: ''
        }
      }
    }, function (ret, err) {
      console.log('From PayFinishedQuery')
      // console.log(JSON.stringify(ret))
      // callback && callback(ret, err)
    })
  }
}

function goPayFinish() {
  var obj = getname('payQuery')
  if (obj && obj != '' && obj != null) {
    obj = JSON.parse(obj)
    payFinish(obj.orderids, obj.payid, obj.paycode)
    // 跑了就可以清掉本地缓存了
    setTimeout(function () {
      setname('payQuery', '')
    }, 500)
  }
}

// 校验港澳台大陆手机号
function checkPhoneNum(tel, areaCode) {
  var msg = {
    bool: false,     // 校验是否通过
    err: ''         // 校验信息
  }
  var t = tel ? tel.toString() : ''
  if (t == '' || t == null) {
    msg.err = "请输入手机号码"
  } else if (areaCode == 86 && !/^[1]+[3,4,5,6,7,8,9]+\d{9}$/.test(t)) {
    msg.err = "手机号码格式错误"
  } else if (areaCode == 886 && !/^[0]\d{9}$|^[9]\d{8}$/.test(t)) {
    msg.err = "手机号码格式错误"
  } else if ((areaCode == 852 || areaCode == 853) && !/^([6]|[9])\d{7}$/.test(t)) {
    msg.err = "手机号码格式错误"
  } else {
    msg.bool = true
    msg.err = ''
  }
  return msg
}

// 获取当前屏幕宽高
function client() {
  if (document.documentElement) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }
  }
}


// 储存全局数据
function setname(name, value) {
  if (name) {
    if (window.api) {
      api.setPrefs({
        key: name,
        value: value
      })
    } else {
      $api.setStorage(name, value)
    }
  }
}