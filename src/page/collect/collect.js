var type = 1;
var page = 1;
var pageSize =10;
var noMore =false;
var first = true;

if (openapp) {
  window.apiready = function () {
    getMsg(page)
    //下拉刷新
    if (window.api) {
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
            $api.html($api.byId('msg_container'), "")
            page = 1;
            first = true;
            setTimeout(function () {
              getMsg(page);
            }, 500)
  
        });
        api.addEventListener({name: 'scrolltobottom'}, function(ret, err){
          if(noMore){
            if(!$api.byId('no_more')){
              $api.append($api.byId('msg_container'), '<div id="no_more" style="color:#A2A2A2;text-align:center;padding:10px 0;">-没有更多数据了-</div>')
            }
            return;
          }
            first = false
            page += 1;
            getMsg(page)
        });
    }
  }
} else {
  window.onload = function () {
    getMsg(page)
  }
}

function getMsg(page_item) {
  console.log(11111)
  if(first) {
    showLoading()
  }
  https({
    url: siteUrl +'Main/Member/GetMyCollection',
    method: 'get',
    data:{
      uid: getname(),
      currentPage: page_item,
      pageSize: pageSize,
      type: type
    },
    headers:1,
    successBack: function (ret) {
      if(ret) {
        if(ret.success) {
          var data = ret.Data
          if(data.length < pageSize){
            noMore = true;
          }else{
            noMore = false;
          }
          var html = "";
          if(ret.Data.length > 0) {
            for(var i = 0; i < data.length; i++ ) {
              if(type == 1) {
                html += '<li class="list_container clear">'
                // html += '   <div class="pro_block animated proItem" id="animate_container"  onclick="OpenProdctPage(\''+data[i].proid+'\', 0, event)" ontouchstart="return touchstartF(event,this);"  ontouchmove="return touchmoveF(event,this);">'
                html += '   <div class="pro_block animated proItem" id="animate_container"'
                html += `
                    <a href="javascript:;" class="block_left">
                      <div class="pro_img">
                        <img src="${data[i].proimg}" alt="">
                      </div>
                      <div class="pro_text flex flex_v flex_justify_around">
                        <p class="pro_name">${data[i].proname}</p>
                        <p class="pro_price">￥${data[i].proprice}</p>
                      </div>
                    </a>
                    <div class="right_ico">${type == 3? ">": ""}</div>
                  </div>
                  `
                  //<p class="pro_collect">收藏人数：${data[i].colCount}</p>
              }
                html += '<div class="slideleft bg-red delItem">'
                html +=`
                  <span class="bg-red f-white  dels">删除</span>
                </div>
              </li>
              `
            }

            if(page_item == 1){
              $api.html($api.byId('msg_container'), html)
            }else{
              $api.append($api.byId('msg_container'), html)
            }
            var arr = document.querySelectorAll('.proItem')
            for (let i=0;i<arr.length;i++) {
              arr[i].onclick = function () {
                OpenProdctPage(data[i].proid, 0, event)
              }
              arr[i].addEventListener('touchstart', function () {
                touchstartF(event,arr[i])
              })
              arr[i].addEventListener('touchmove', function () {
                touchmoveF(event,arr[i])
              })
            }
            var delArr = document.querySelectorAll('.delItem')
            console.log(delArr)
            for (let k=0;k<delArr.length;k++) {
              delArr[k].onclick = function () {
                DleRess(data[k].colid)
              }
            }
          }else {
            var html = "";
            html +='<div class="noRec hide" id="noRec" style="display: block;">';
            html +='  <div class="square">';
            html +='      <img src="./image/nocollect.png" alt="没有收藏记录" style="width:100%;">';
            html +='   </div>';
            html +='  <div class="ic_text">您的收藏夹还空空如也~</div>';
            html +='</div> ';
            $api.html($api.byId('msg_container'), html)
          }
        }else {
          var html = "";
          html +='<div class="noRec hide" id="noRec" style="display: block;">';
          html +='  <div class="square">';
          html +='      <img src="./image/nocollect.png" alt="没有收藏记录" style="width:100%;">';
          html +='   </div>';
          html +='  <div class="ic_text">您的收藏夹还空空如也~</div>';
          html +='</div> ';
          $api.html($api.byId('msg_container'), html)
        }
      }else {
        promptMsg(err.msg)
      }
      refreshDone()
      hideLoading()
    }
  })
}
function DleRess(colid) {
  console.log(colid)
  comfirmDialogBox("您确定要删除吗?", deleteList, colid)
}
function changeList(idx, obj) {
  type = idx
  var lis = document.querySelectorAll(".lis")
  for(var i = 0; i < lis.length; i++) {
    $api.removeCls(lis[i], 'actived');
  }
  $api.addCls(obj, "actived")
  $api.html($api.byId('msg_container'), "")
  page = 1
  first = true;
  getMsg(page)
}
//侧滑按钮的添加
function touchstartF(event) {
      x = event.changedTouches[0].pageX;
      y = event.changedTouches[0].pageY;
      swipeX = true;
      swipeY = true;
  };
function touchmoveF(event, e) {
      X = event.changedTouches[0].pageX;
      Y = event.changedTouches[0].pageY;
      // 左右滑动
      if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {
          // 阻止事件冒泡
          event.stopPropagation();
          if (X - x > 10) {
              event.preventDefault();
              e.style.WebkitTransform = "translateX(" + 0 + "px)";
              e.style.transition = "-webkit-transform 100ms ease-in-out";
          }
          if (x - X > 10) {
              event.preventDefault();
              e.style.WebkitTransform = "translateX(" + -60 + "px)";
              e.style.transition = "-webkit-transform 100ms ease-in-out";
          }
          swipeY = false;
      }
      // 上下滑动
      if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
          swipeX = false;
      }
  };
  function deleteList(colid) {
    showLoading()
    https({
      url: siteUrl +'Main/Member/UpdateCollection?uid='+ getname(),
      method: 'post',
      data: {
        colid: colid
      },
      headers: 1,
      successBack: function (ret) {
        if(ret) {
          if(ret.success && ret.status == 1) {
            page = 1;
            first = true;
              getMsg(page);
          }else {
            promptMsg(ret.err)
          }
        }else {
          promptMsg(err.msg)
        }
        hideLoading()
      }
    })
  }
  function OpenCompanyShop(companyid, e){
    if(e.target.innerHTML == "删除") return;
      openWin({
          name: 'companyshop',
          url: './companyshop.html',
          pageParam: {
            companyid:companyid
          },
          bgColor:"#fff"
      });
  }
