<template>
<div v-show="dataover" id="app2" :style="cardata.length==0&&vipcardata.length==0?'':'margin-bottom:50px'">
    <div class="catoubu" :style="statustop?'height:'+sheight+'px;padding-top:'+statustop+'px':''">
      购物车
    </div>
   <div class="toubai"  :style="statustop?'height:'+sheight+'px':''"></div>
    <!-- //普通购物区 -->
    <section v-if="cardata.length>0" style="background:#fff">
      <div class="blockone">
        <div class="select" :style="zongcarselect[0]?'':'border:1px solid #D8D8D8'" @click="allcardata(0,0)">
          <img src="../../img/shoppingcar-select.png" alt="" v-show="zongcarselect[0]">
        </div>
        <p>普通购物</p>
      </div>
      <div class="prolist" v-for="(item,index) in cardata" :key="index">
        <!-- 店铺名字 -->
        <div class="shopnamebox">
          <div class="items">
          <div class="select" :style="ptshopSelect[index]?'':'border:1px solid #D8D8D8'" @click="ShopAllSelect(index,0)">
            <img src="../../img/shoppingcar-select.png" alt="" v-show="ptshopSelect[index]">
          </div>
          <div class="s_namebox">
            <img src="../../img/round_shop.png" alt="">
            <p>{{item[0].shopname}}</p>
          </div>
          </div>
          <p class="useimg" v-if="item[0].iscoupon" @click="gocouopn(item[0].shopid)">优惠劵</p>
        </div>
        <!-- 店铺商品 -->
        <div v-for="(list,idx) in item" :key="list.shopid" style="position: relative;">
          <div class="pro-main" :style="putongselctin[index][idx].delelshow?'transform:translateX(-80px)':''">
          <div class="select" :style="putongselctin[index][idx].onselect|onselect" @click="changselect(index,idx,putongselctin[index][idx].onselect,0)">
            <img src="../../img/shoppingcar-select.png" alt="" v-show="putongselctin[index][idx].onselect==1">
          </div>
          <div style="position:relative">
            <img class="pro_img" :src="list.pic" alt="" @click="gopro(list.proid)">
            <img src="../../img/shouwan.png" alt="" class='shouwan' v-if="list.stocks==0">
          </div>
          <div class="pro-xiangqing" @touchstart="touchstartF" @touchend="touchmoveF($event,index,idx,0)">
              <div class="pro-title" @click="gopro(list.proid)">
                <p><span class="allquer" v-if="list.iscross">全球购</span><span class="xianshi" v-if="list.isrushbuy">限时抢购</span>{{list.productname}}</p>
              </div>
            <div class="pro-sku"> {{list.skutext}}</div>
            <div class="pro-jiage">
              <p class="p12">&yen;{{list.price|toFixed}}</p>
              <div class="numbox">
                <i class="iconfont icon-subtract_icon" :style="list.minbuy|minbuyshow(putongselctin[index][idx].qty)" @click="changenum(false,list.minbuy,putongselctin[index][idx].qty,list.id,index,idx,0)"></i>
                <span class="num" @click="ChangeCount(list.minbuy,list.maxbuy,putongselctin[index][idx].qty,list.id,index,idx,0)">{{putongselctin[index][idx].qty}}</span>
                <i class="iconfont icon-plus_icon" @click="changenum(true,list.maxbuy,putongselctin[index][idx].qty,list.id,index,idx,0)"></i>
              </div>
            </div>
          </div>
          <!-- 删除按钮 -->
        </div>
        <div class="pro-delel" @click="delpro(list.id)" :style="putongselctin[index][idx].delelshow?'z-index:0':''">删除</div>
      </div>
    </div>
  </section>
    <!-- //高佣专区 -->
    <section v-if="vipcardata.length>0">
      <div class="blockone">
        <div class="select" :style="zongcarselect[1]?'':'border:1px solid #D8D8D8'" @click="allcardata(1,1)">
          <img src="../../img/shoppingcar-select.png" alt="" v-show="zongcarselect[1]">
        </div>
        <p>高佣专区</p>
      </div>
      <div class="prolist" v-for="(item,index) in vipcardata" :key="index">
        <!-- 店铺名字 -->
        <div class="shopnamebox">
          <div class="items">
          <div class="select" :style="vipshopSelect[index]?'':'border:1px solid #D8D8D8'" @click="ShopAllSelect(index,1)">
            <img src="../../img/shoppingcar-select.png" alt="" v-show="vipshopSelect[index]">
          </div>
          <div class="s_namebox">
            <img src="../../img/round_shop.png" alt="">
            <p>{{item[0].shopname}}</p>
          </div>
          </div>
          <p class="useimg" v-if="item[0].iscoupon" @click="gocouopn(item[0].shopid)">优惠劵</p>
        </div>
        <!-- 店铺商品 -->
        <div v-for="(list,idx) in item" :key="list.shopid" style="position: relative;">
          <div class="pro-main" :style="vipselctin[index][idx].delelshow?'transform:translateX(-80px)':''">
          <div class="select" :style="vipselctin[index][idx].onselect|onselect" @click="changselect(index,idx,vipselctin[index][idx].onselect,1)">
            <img src="../../img/shoppingcar-select.png" alt="" v-show="vipselctin[index][idx].onselect==1">
          </div>
          <div style="position:relative">
            <img class="pro_img" :src="list.pic" alt="" @click="gopro(list.proid)">
            <img src="../../img/shouwan.png" alt="" class='shouwan' v-if="list.stocks==0">
          </div>
          <div class="pro-xiangqing" @touchstart="touchstartF" @touchend="touchmoveF($event,index,idx,1)">
              <div class="pro-title" @click="gopro(list.proid)">
                <p><span class="allquer" v-if="list.iscross">全球购</span><span class="xianshi" v-if="list.isrushbuy">限时抢购</span>{{list.productname}}</p>
              </div>
            <div class="pro-sku"> {{list.skutext}}</div>
            <div class="pro-jiage">
              <p class="p12">&yen;{{list.price|toFixed}}</p>
              <div class="numbox">
                <i class="iconfont icon-subtract_icon" :style="list.minbuy|minbuyshow(vipselctin[index][idx].qty)" @click="changenum(false,list.minbuy,vipselctin[index][idx].qty,list.id,index,idx,1)"></i>
                <span class="num" @click="ChangeCount(list.minbuy,list.maxbuy,vipselctin[index][idx].qty,list.id,index,idx,1)">{{vipselctin[index][idx].qty}}</span>
                <i class="iconfont icon-plus_icon" @click="changenum(true,list.maxbuy,vipselctin[index][idx].qty,list.id,index,idx,1)"></i>
              </div>
            </div>
          </div>
          <!-- 删除按钮 -->
        </div>
        <div class="pro-delel" @click="delpro(list.id)" :style="vipselctin[index][idx].delelshow?'z-index:0':''">删除</div>
      </div>
    </div>
  </section>
  <section v-if="cardata.length==0&&vipcardata.length==0">
  <div class='nodedata'>
      <img src="../../image/noaddress.png">
      <div class='wenzi'>
        <p>客官，您的购物车空空如也</p>
        <p class="fontSize12">好东西，手慢无</p>
        <div class="tag_big" onclick="ReturnToIndex(0);">去逛逛</div>
      </div>
  </div>
  </section>
  <section v-if="cardata.length>0||vipcardata.length>0">
    <!-- //按钮 -->
    <div class="btnbox">
      <p class="setprioc">总计：<em style="color:#F5AC9E">&yen;</em><span>{{allPrice|toFixed}}</span></p>
      <div class="qujie" @click="gobuy">去结算</div>
    </div>
  </section>
      <coupon v-show="showCoupon" :bindData="showCoupon" way="shoppingcar" @closeCou="showCoupon=!showCoupon" :cid="cid"></coupon>
      <statuserr @reload="BindData" :scode="statusCode"></statuserr>
  </div>
</template>

<script>
import coupon from '../../components/coupon_pop/coupon_pop.vue'
import statuserr from '../../components/statuserr/statuserr.vue'
export default {
  components:{
    coupon,
    statuserr
  },
  props:{},
  data(){
    return {
      dataover:false,//数据加载完成
      cardata:[],
      putongselctin:'',//侧滑开关和选项和需要提交的东西
      ptshopSelect:'',//同一个店家的全选选择框
      allPrice:'0.00',///总价格
      zongcarselect:[false,false],//不同区的全选选择框
      Comfirmdata:[],//普通购买提交用的
      //vip
      vipcardata:[],
      vipselctin:'',//侧滑开关和选项和需要提交的东西
      vipshopSelect:'',//同一个店家的全选选择框
      vipComfirmdata:[],//普通购买提交用的
      statustop:0,
      showCoupon: false,   // 优惠券弹窗
      cid:'',
      // showErr: false,
      statusCode: '1'
    }
  },
    filters:{
    toFixed:function(value){
      var a=Number(value).toFixed(2)
      return a
    },
    //选择框的显示
    onselect:function(value){
      if(value!=1){
        if(value==0){
          return 'border:1px solid #D8D8D8'
        }else{
          return 'background:#D8D8D8;opacity:0.6'
        }
      }
    },
    //最少购买
    minbuyshow:function(value,qty){
      if(value!=0){
        //则设置了最小购买量
        if(qty==value)
        return 'color:#999999'
      }else{
        if(qty==1){
          return 'color:#999999'
        }
      }
    }
  },
  watch:{},
  computed:{},
  methods:{
    BindData(){
      var that=this
      if(window.api){
        api.showProgress({
            text: '请耐心等待...',
            modal: true
        });        
      }
      //数据初始化
      that.dataover=false,
      that.cardata=[],
      that.putongselctin='',//侧滑开关和选项和需要提交的东西
      that.ptshopSelect='',//同一个店家的全选选择框
      that.allPrice='0.00',///总价格
      that.zongcarselect=[false,false],//不同区的全选选择框
      that.Comfirmdata=[],//普通购买提交用的
      //vip
      that.vipcardata=[],
      that.vipselctin='',//侧滑开关和选项和需要提交的东西
      that.vipshopSelect='',//同一个店家的全选选择框
      that.vipComfirmdata=[],//普通购买提交用的
      //普通购物区
      https({
          url: siteUrl +'Main/Shopping/GetCartJson?uid='+getname(),
          data:{
            uid:getname()
          },
          method:'post',
          headers:1,
          successBack: function(ret) {
            console.log($api.jsonToStr(ret));
            var selctin=[]
            var ptshopSelect=[]
            if(ret.success&&ret.status==1&&ret.Data!=null){
              ret.Data.json.forEach(function(item,index){
                ptshopSelect.push(false)
                selctin.push([])
                item.forEach(function(list,li){
                  var onselect=0
                  //0-正常 1-失效 2-活动过期
                  if(list.rushbuystatus==1||list.rushbuystatus==2){
                    onselect=4//限时抢购失效商品
                  }else if (list.rushbuystatus==0&&list.prorushbuy&&list.isrushbuy) {
                    console.log(list.prorushbuy.begintimeticks<list.nowtimetick);
                    if(list.prorushbuy.begintimeticks>list.nowtimetick){
                        onselect=3//限时抢购活动尚未开始
                    }
                  }
                    selctin[index].push({
                      delelshow:false,//删除按钮是否展示
                      onselect:onselect,//是否勾选了
                      price:list.price,
                      qty:list.qty,
                      id:list.id//提交用id
                    })
                })
              })
              console.log($api.jsonToStr(selctin))
              that.putongselctin=selctin
              that.ptshopSelect=ptshopSelect
              that.cardata=ret.Data.json
            }else if(ret.status==1){

            }else{
              promptMsg(ret.err)
            }
            // that.showErr = false
            that.statusCode = '1'
            console.log(that.statusCode)
          },
          errorBack: err => {
            // this.showErr = true
           api.hideProgress();
            that.statusCode = err.statusCode
            that.dataover = true
            promptMsg(err.msg)
          }
        })
        Vue.nextTick(function () {
          that.vipBindData()
        })
    },
    vipBindData(){
      var that=this
      //高佣购物区
      https({
          url: siteUrl +'Main/Shopping/GetCartJson?uid='+getname(),
          data:{
            uid:getname(),
            isuserpre:true
          },
          method:'post',
          headers:1,
          successBack: function(ret) {
            // console.log($api.jsonToStr(ret));
            var selctin=[]
            var vipshopSelect=[]
            if(ret.success&&ret.status==1&&ret.Data!=null){
              ret.Data.json.forEach(function(item,index){
                vipshopSelect.push(false)
                selctin.push([])
                item.forEach(function(list,li){
                  var onselect=0
                  //0-正常 1-失效 2-活动过期
                  if(list.rushbuystatus==1||list.rushbuystatus==2){
                    onselect=4//限时抢购失效商品
                  }else if (list.rushbuystatus==0&&list.prorushbuy&&list.isrushbuy) {
                    if(list.prorushbuy.begintimeticks<list.nowtimetick){
                        onselect=3//限时抢购活动尚未开始
                    }
                  }
                    selctin[index].push({
                      delelshow:false,//删除按钮是否展示
                      onselect:onselect,//是否勾选了
                      price:list.price,
                      qty:list.qty,
                      id:list.id//提交用id
                    })
                })
              })
              // console.log($api.jsonToStr(selctin))
              that.vipselctin=selctin
              that.vipshopSelect=vipshopSelect
              that.vipcardata=ret.Data.json
            }else if(ret.status==1){

            }else{
              promptMsg(ret.err)
            }
              that.dataover=true
            setTimeout(function(){
              api.hideProgress();
              api.refreshHeaderLoadDone();
            },1000)
          },
            errorBack: err => {
           api.hideProgress();
            promptMsg(err.msg)
          }
        })
    },
    //改变商品数量和限制购物
    changenum(types,buynum,qty,itemid,index,idx,where){
      var that=this
      var nums
      //限购校检
      if(types){
        nums=Number(qty)+1
        if(buynum!=0){
          if(qty>=buynum){
            promptMsg('最大购买数量为'+buynum)
            return
          }
        }
      }else {
        if(qty==1){
          if(buynum==0){
            promptMsg('最小购买数量为1件')
            return
          }else{
            promptMsg('最小购买数量为'+buynum)
            nums=buynum
          }
          return
        }else{
          nums=Number(qty)-1
          if(buynum!=0){
            if(qty<=buynum){
              promptMsg('最小购买数量为'+buynum)
              return
            }
          }
        }
      }
      console.log(itemid)
      console.log(nums);
      //改变数量
      https({
        url: siteUrl +'Main/Shopping/ModifyCartItem',
        data:{
          itemid:itemid,
          qty:nums,
          optype:'moa',
          uid:getname()
        },
        headers:1,
        successBack: function(ret) {
          console.log($api.jsonToStr(ret))
            if(ret.status==1){
              //刷新角标
              if(window.api){
                api.execScript({
                  name: 'root',
                  script: 'ShoppingCartCount();'
              });                
              }
              var _abe=where?that.vipselctin:that.putongselctin
              if(where==0){
                that.putongselctin[index][idx].qty=nums
                that.putongselctin=_abe
              }else{
                that.vipselctin[index][idx].qty=nums
                that.vipselctin=_abe
              }
              that.countprice(where)
            }else{
              promptMsg(ret.err)
            }
        }
      })
    },
    //选择选择框
    changselect(index,idx,status,where){
      var that=this
      var overs=where?that.vipselctin:that.putongselctin
      //不能同时选择两个区
      if(that.Comfirmdata.length>0){
        if(where==1){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }else if(that.vipComfirmdata.length>0){
        if(where==0){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }
      if(status==3){
        promptMsg('活动尚未开始')
        return
      }else if(status==4){
        promptMsg('活动已失效')
        return
      }
      if(status==0){
        overs[index][idx].onselect=1
        //检查同个商家下是不是全部选择商品了
        if(where==0){
          that.putongselctin=overs
        }else {
          that.vipselctin=overs
        }
        that.checkallSelect(index,idx,where)
      }else if(status==1){
        overs[index][idx].onselect=0
        if(where==0){
          that.putongselctin=overs
          //取消全选选择框的显示
          Vue.set(that.ptshopSelect, index, false)
        }else {
          that.vipselctin=overs
          //取消全选选择框的显示
          Vue.set(that.vipshopSelect, index, false)
        }
      }
      that.countprice(where)
    },
    //同商家下的全选
    ShopAllSelect(index,where){
      var that=this
      //不能同时选择两个区
      if(that.Comfirmdata.length>0){
        if(where==1){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }else if(that.vipComfirmdata.length>0){
        if(where==0){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }
      var _set=where?that.vipselctin:that.putongselctin//那个区的选择总数
      var select=where?that.vipshopSelect:that.ptshopSelect//哪个区的商家选择框
      if(select[index]){
        _set[index].forEach(function(item,ids){
          if(item.onselect!=3&&item.onselect!=4){
              _set[index][ids].onselect=0
          }
        })
      }else {
        _set[index].forEach(function(item,ids){
          if(item.onselect!=3&&item.onselect!=4){
              _set[index][ids].onselect=1
          }
        })
      }
      Vue.set( select, index, !select[index])
      if(where==0){
        that.putongselctin=_set
      }else{
        that.vipselctin=_set
      }
      that.countprice(where)
    },
    //计算总价
    countprice(where){
      //where 0代表普通购物 1是vip
        var that=this
        var allPrice=0
        var tijiaodata=[]
        var lea=[]//比较长度，看看有效的商品是不是都全选了
        var data=where?that.vipselctin:that.putongselctin
        data.forEach(function(item,index){
          item.forEach(function(list,idx){
            if(list.onselect!=3&&list.onselect!=4){
              lea.push(1)
            }
            if(list.onselect==1){
              allPrice=Number(allPrice)+Number(list.qty*list.price)
              tijiaodata.push(list.id)
            }
          })
        })
        //判断商品是不是全选
          if((tijiaodata.length==lea.length)&&lea.length>0){
              Vue.set(that.zongcarselect, where, true)
          }else{
            Vue.set(that.zongcarselect, where, false)
          }
          //提交用的数据
        if(where==0){
          that.Comfirmdata=tijiaodata
        }else{
          that.vipComfirmdata=tijiaodata
        }
        that.allPrice=allPrice
    },
    //遍历同个商家下的商品是否全部选择
    checkallSelect(index,ids,where){
      var that=this
      var a=true;
      var data=where?this.vipselctin[index]:this.putongselctin[index]
        data.forEach(function(item,idx){
            if(item.onselect==0){
              a=false
            }
      })
      if(a){
        if(where==0){
          Vue.set(that.ptshopSelect, index, true)
        }else{
          Vue.set(that.vipshopSelect, index, true)
        }
      }
    },
    //全选
    allcardata(tyes,where){
      var that=this
      //不能同时选择两个区
      if(that.Comfirmdata.length>0){
        if(where==1){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }else if(that.vipComfirmdata.length>0){
        if(where==0){
          promptMsg('不能同时选择两个区的商品')
          return
        }
      }
      var _setdata=where?that.vipselctin:that.putongselctin
      _setdata.forEach(function(item,index){
        item.forEach(function(list,idx){
          //判断是选中状态还是没选中
          if(that.zongcarselect[tyes]){
            if(list.onselect!=3&&list.onselect!=4){
              _setdata[index][idx].onselect=0
            }
          }else{
            if(list.onselect!=3&&list.onselect!=4){
              _setdata[index][idx].onselect=1
            }
          }
        })
      })
      //店铺的全选择按钮选上
      var le=[]
      var shopdata=where?that.vipshopSelect:that.ptshopSelect
      for (var i = 0; i <   shopdata.length; i++) {
        if(that.zongcarselect[tyes]){
          le.push(false)
        }else{
          le.push(true)
        }
      }
      if(where==0){
        that.ptshopSelect=le
        that.putongselctin=_setdata
      }else{
        that.vipshopSelect=le
        that.vipselctin=_setdata
      }
      that.countprice(where)
    },
    //跳转商家店铺
    OpenCompanyShops(shopid){
      api.openWin({
          name: 'companyshop',
          url: './company/companyshop.html',
          pageParam: {
            companyid:shopid
          },
          bgColor:"#fff"
      });
    },
    gopro(id){
      OpenProdctPage(id)
    },
    //弹出框改变数量
    ChangeCount(minbuy,maxbuy,qty,itemid,index,idx,where){
      var that=this
      amountDialogBox('修改购买数量',qty,function(num){
        if(num>999||num==0){
           promptMsg("输入数量有误");
           return
        }
        if(num>maxbuy&&maxbuy!=0){
          promptMsg("购买数量不能大于"+maxbuy);
          return
        }else if (num<minbuy&&minbuy!=0) {
          promptMsg("购买数量不能小于"+minbuy);
          return
        }else{
          //改变数量
          https({
            url: siteUrl +'Main/Shopping/ModifyCartItem',
            data:{
              itemid:itemid,
              qty:num,
              optype:'moa',
              uid:getname()
            },
            headers:1,
            successBack: function(ret) {
                if(ret.status==1){
                  api.execScript({
                      name: 'root',
                      script: 'ShoppingCartCount();'
                  });
                  var _abe=where?that.vipselctin:that.putongselctin
                  if(where==0){
                    that.putongselctin[index][idx].qty=num
                    that.putongselctin=_abe
                  }else{
                    that.vipselctin[index][idx].qty=num
                    that.vipselctin=_abe
                  }
                  that.countprice(where)
                }else{
                  promptMsg(ret.err)
                }
            }
          })
        }
      });
    },
    delpro(itemid){
      var that=this
      comfirmDialogBox('确认删除购物车',function(){
        https({
          url: siteUrl +'Main/Shopping/ModifyCartItem',
          data:{
            itemid:itemid,
            qty:0,
            optype:'delete',
            uid:getname()
          },
          headers:1,
          successBack: function(ret) {
              that.BindData()
              api.execScript({
                  name: 'root',
                  script: 'ShoppingCartCount();'
              });
          }
        })
      })
    },
    //去支付
    gobuy(){
      var that=this
      if(that.vipComfirmdata.length==0&&that.Comfirmdata.length==0){
        promptMsg('请选择商品')
        return
      }
      var data
      if(that.vipComfirmdata.length>0){
        data=that.vipComfirmdata
      }else if(that.Comfirmdata.length>0){
        data=that.Comfirmdata
      }else{
        promptMsg('数据出错，有BUG')
        return
      }
      openWin({
        name: 'ordercomfirm',
        url: './ordercomfirm.html',
        pageParam: {
            way : 'shoppingcart',
            ids : data.join(',')
        }
      });
    },
    //侧滑按钮
     touchstartF(event) {
    	    this.x = event.changedTouches[0].pageX;
    	    this.y = event.changedTouches[0].pageY;
    	    this.swipeX = true;
            this.swipeY = true;
            if(window.api){
          api.setFrameAttr({
              name: api.frameName,
              bounces: false
            });
            }
    	},
     touchmoveF(event, index,idx,where) {
         if(window.api){
       api.setFrameAttr({
           name: api.frameName,
           bounces: true
         });
         }
            var that=this
            console.log(event)
    	    this.X = event.changedTouches[0].pageX;
    	    this.Y = event.changedTouches[0].pageY;
    	    // 左右滑动
    	    if (that.swipeX && Math.abs(that.X - that.x) - Math.abs(that.Y - that.y) > 0) {
    	        // 阻止事件冒泡
    	        event.stopPropagation();
    	        if (that.X - that.x > 10) {
                var a=where?that.vipselctin:that.putongselctin
                a[index][idx].delelshow=false
                if(where==0){
                  that.putongselctin=a
                }else{
                  that.vipselctin=a
                }
    	        }
    	        if (that.x - that.X > 10) {
                var a=where?that.vipselctin:that.putongselctin
                a[index][idx].delelshow=true
                if(where==0){
                  that.putongselctin=a
                }else{
                  that.vipselctin=a
                }
    	        }
    	        this.swipeY = false;
    	    }
    	    // 上下滑动
    	    if (this.swipeY && Math.abs(this.X - this.x) - Math.abs(this.Y - this.y) < 0) {
    	        this.swipeX = false;
    	    }
    	},
      gocouopn(cid){
          this.cid=cid
          this.showCoupon=true
      },
  },
  created(){
  },
  mounted(){
            var that=this
      if(window.api){
             //沉浸式处理
             that.statustop=$api.getStorage('statustop')
             that.sheight=45+Number($api.getStorage('statustop'))
             console.log(that.statustop)
             //监听支付 刷新页面
             api.addEventListener({
                name: 'payorderCart'
            }, function(ret, err) {
                   that.BindData()
            });
   //下拉刷新
       api.setCustomRefreshHeaderInfo({
   bgColor: '#fff',
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
         window.onscroll=function(){
           var top=document.body.scrollTop;
           if(top>0){
           api.refreshHeaderLoadDone();
           }
         }
         that.BindData()
         });
      }
          that.BindData()
  }
}
</script>
<style lang="scss">
    @import './shoppingcar.scss'
</style>