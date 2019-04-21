  var page = 1;
  var pageSize = 10;
  var idx = 1;
  var no_text = false;
  var firstMsg = "";
  var isFirst = true;//是否第一次进
  var isScroll = false;
  var first = true;
  // var dataArr = []   // 储存评价数据
  console.log('执行了评价中心的js')
  if (openapp) {
    window.apiready = function () {
      onready()
    }
  } else {
    window.onload = function () {
      onready()
    }
  }  
  var onready = function () {

    if (window.api) {
      api.addEventListener({
        name: 'isAssessSuccess'
      }, function(ret, err) {
        window.location.reload();
      });

      api.addEventListener({
        name: 'viewappear'
      }, function(ret, err) {
        window.location.reload();
      });

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
            first = true;
            isScroll = false;
            page = 1;
            setTimeout(function () {
              getMsg(idx, page)
            }, 500)
        });
      api.addEventListener({name: 'scrolltobottom'}, function(ret, err){

        if(ret){
          isScroll = true;
          page += 1;
          getMsg(idx, page)
        }
      });
    }
    console.log(11111111111)
    getMsg(idx, page)

    
    document.getElementById('nav_div_container').addEventListener('touchend', function(e){
      var tar = e.target;
      if(tar.nodeName == "LI"){
        var lis = $api.domAll('#nav_div_container>li');
        for(var i = 0; i< lis.length;i++){
          $api.removeCls(lis[i], 'checked')
          if(tar == lis[i]){
            idx = tar.id[tar.id.length-1]
            $api.addCls(lis[i], 'checked');
          }
        }
        first = true;
        no_text = false;
        isScroll = false;
        page = 1
        getMsg(tar.id[tar.id.length-1], page)
      }
    })
  }
  function getMsg(idx, page_item) {
    if(first) {
      first = false
      showLoading()
    }
    if(no_text && isScroll){
      if(!$api.byId('no_msg_li')){
        $api.append($api.byId('content_container'), '<li id="no_msg_li" style="color:#D0D0D0;text-align:center;width:100%;padding:10px 0;">-没有更多的评价了-</li>')
      }
      return;
    }
    if(!isScroll){
        $api.html($api.byId('content_container'), '')
    }
    var index = parseInt(idx)
    var urlName = index == 1?"GetShopIsOpenComment": index == 2?"GetNoImgCommentList": index == 3?"GetComment":""
    var url = siteUrl+'Main/Shopping/'+urlName
    https({
      url: url,
      data: {
        uid: getname(),
        currentPage: page_item,
        pageSize: pageSize
      },
      headers: 1,
      successBack: function (ret) {
        console.log(ret)
          if(ret.success){
            if(index == 1){
              $api.html($api.byId('li_1_span'), ret.nocommentcount)
              $api.html($api.byId('li_2_span'), ret.noimgcount)
              $api.html($api.byId('li_3_span'), ret.commentcount)
            }
            var html = "";
            var data = ret.Data
            if(ret.Data.length >0){
              for(var i = 0;i < data.length; i ++){
                // html += `
                //   <li>
                //     <div class="flex list_top">
                //       <div class="list_img">
                //         <img src="${data[i].imagePathSmall}" alt="">
                //       </div>
                //       <div class="list_text">${data[i].productName}</div>
                //     </div>
                //     <div class="list_footer ">
                //   `;
                //   var buttonName = index == 1?"评价晒单": index ==2?"添加晒图": index ==3?"查看评价":""
                //   html += '    <a href="javascript:;" class="list_button" onclick = "toAssess(\''+buttonName+'\',\''+data[i].imagePathSmall+'\',\''+data[i].itemID+'\',\''+data[i].ordertype+'\')">'+buttonName+'</a>';
                // html += '  </div>'
                // html += '</li>'
                var buttonName = index == 1 ? "评价晒单" : index == 2 ? "添加晒图" : index == 3 ? "查看评价" : ""
                html += `
                    <li class="li_item">
                    <div class="tit">
                      <div style="display: flex;align-items: center;">
                        <span class="iconfont icon-dianpu" style="font-size: 14px;margin-left: 6px;color: #215645;"></span>
                        <span style="font-size: 12px;margin-left: 6px;color: #427161;">${data[i].shopName}</span>
                        <span class="iconfont icon-gengduo" style="font-size: 5px;margin-left: 6px;color: #9b9b9b;"></span>
                      </div>
                      <p style="color: #427161;font-size: 12px;margin-right: 15px;"> </p>
                    </div>
                    <div class="con">
                      <img src="${data[i].imagePathSmall}" alt="" style="width: 100px;height: 100px;">
                      <div class="c">
                        <div style="width: 100%;display: flex;justify-content: space-between;">
                          <div class="proname">
                            ${data[i].productName}
                          </div>
                          <p style="color: #EB6100;font-size: 12px;margin-top: 10px;">¥${data[i].FactPay.toFixed(2)}</p>
                        </div>
                        <p style="text-align: right;font-size: 13px;color: #656768;">X ${data[i].buycount}</p>
                        <div style="display: flex;width: 100%;justify-content: flex-end;">
                          <p style="font-size: 12px;color: #656768;">共${data[i].buycount}件商品  合计：</p>
                          <p style="font-size: 12px;color: #EB6100;">¥${data[i].FactPay.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                    <div class="btnbox">
                      <div class="btn" id="btn_${data[i].itemID}" data-name="${index}" data-proname="${data[i].productName}" data-count="${data[i].buycount}" data-img="${data[i].imagePathSmall}" data-ordertype="${data[i].ordertype}" data-itemid="${data[i].itemID}">${buttonName}</div>
                    </div>
                  </li>
                `
              }
              if(data.length < pageSize){
                no_text = true;
              }else{
                no_text = false;
              }
              if(page_item == 1){
                $api.html($api.byId('content_container'), html)
              }else{
                $api.append($api.byId('content_container'), html)
              }
              var btnArr = document.querySelectorAll('.btn')
              console.log(btnArr)
              for(let k=0;k<btnArr.length;k++) {
                var data = btnArr[k]
                data.addEventListener('click', function (e) {
                  var e = event || window.event
                  var dataset = e.target.dataset
                  var btnname = dataset.name == 1 ? "评价晒单" : index == 2 ? "添加晒图" : index == 3 ? "查看评价" : ""
                  toAssess(btnname,dataset.img,dataset.itemid,dataset.ordertype,dataset.proname,dataset.count)
                })
              }
            }else{
                if(!isScroll){
                  var str = ''
                  if (idx == 2) {
                    str = '<li style="text-align:center;width:100%;height:90vh;padding-top:10vh;"><img src="./image/nopingjia2.png" style="width:50%;"></li>'
                  } else {
                    str = '<li style="text-align:center;width:100%;height:90vh;padding-top:10vh;"><img src="./image/nopingjia1.png" style="width:50%;"></li>'
                  }
                  $api.html($api.byId('content_container'), str)
                }else{
                  if(!$api.byId('content_container') && !$api.byId('no_msg_li')){
                    $api.append($api.byId('content_container'), '<li id="no_msg_li" style="color:#D0D0D0;text-align:center;width:100%;padding:10px 0;">-没有更多的评价了-</li>')
                  }
                }

          }
        }else{
          promptMsg("获取数据失败")
          refreshDone()
        }
        hideLoading()
        refreshDone()
    }
  })

  }
  //跳转到写评价页面
   function toAssess(btnName, img, id, ordertype,proname,buycount) {
    if(btnName == "评价晒单"){
      openWin({
          name: 'write_assess',
          url: './write_assess.html',
          pageParam: {
            title: btnName,
            productImg: img,
            id: id,
            ordertype: ordertype,
            proname: proname,
            buycount: buycount
          }
      },1) 
    }else if(btnName == "添加晒图"){
      openWin({
          name: 'write_assess',
          url: './write_assess.html',
          pageParam: {
            title: btnName,
            isAssess: true,
            productImg: img, 
            id: id, 
            ordertype: ordertype,
            proname: proname,
            buycount: buycount
          }
      },1);
    }else if(btnName == "查看评价")
      openWin({
          name: 'look_assess',
          url: './look_assess.html',
          pageParam: { 
            title: btnName,
            id: id,
            proname: proname,
            buycount: buycount
          }
      },1);
   }
