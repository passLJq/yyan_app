<template>
<div ref='app'>
    <div>
        <div class='titletou' :style="statustop?'padding-top:'+statustop+'px':''">
            发现
        </div>
        <div class="toubai"  :style="statustop?'padding-top:'+statustop+'px':''"></div>
        <van-swipe :autoplay="3000" indicator-color="white" v-if="urldata&&urldata.length>0">
            <van-swipe-item v-for="(image, index) in urldata" :key="index">
            <img :src="image.Source" @click="AnalysisAdsUrl(image.LinkContent)"/>
            </van-swipe-item>
        </van-swipe>
    </div>
    <div class="biaomain">
        <div class="biaotou">热门标签</div>
        <div class="biaoqianbox">
            <div class="biaobox biaoactive" :class="{select: listIndex == indx ? true : false}" v-for="(item,indx) in biaoqiandata" :key="item.classid" @click="getlist(item.classid,1,'_'+indx)">
                <i class=" iconfont icon-fire"></i>
                <p>#{{item.name}}#</p>
            </div>
        </div>
    </div>
    <div class="noticebingbox" v-for="(item,index) in biaoqianlist" :key="index">
        <div class="noticetou">
            <div class="noticebox">
                <img src="../../img/login/yanlogo.png" alt="">
                <div class="noticetitle">
                    <p>攸妍</p>
                    <p>{{item.createtime}}</p>
                </div>
            </div>
            <div class="dianzan" @click="dianzan(item.id,item.iszan,index)" :style="item.iszan==1?'color:red':''">
                    <p>点赞<span v-if="item.zanum">({{item.zanum}})</span></p>
                    <i class="iconfont icon-shoucang" :style="item.iszan==1?'color:red':''"></i>
            </div>
        </div>
         <div class="noticemain" @click="OpenWeb(item.id,item.title,'sucai',item.type,item.link)">
            <!-- <p class="foottitle">{{item.title}}</p> -->
            <p>{{item.content}}</p>
            <div class="jiugongge" ref="jiugongge">
                    <div class="imgbox" v-for="(img,idx) in imgdata[index]" :key="img"  :style="imgdata[index].length==1?'width:100%;max-height:300px':'height:'+jiuwidth+'px'" @click.stop="openbigmage(index,idx)">
                        <img v-lazy="img" alt="">
                    </div>
            </div>  
        </div>
        <div class="noticefoot">
            <div class="dowlon" @click="downLoadImgs(index,pid)">
                <i class="iconfont icon-xiazai"></i>
                <p>下载</p>
            </div>
            <div class="fuzhi" @click="openfuzhi(index)">
                <!-- <span>已{{item.sharenum}}人分享</span> -->
                <p>一键复制</p>
            </div>
        </div> 
    </div>  
    <div class="gotop" v-if="gotopshow" @click="gotop">
        <i class="iconfont icon-huidaodingbu"></i>
    </div>   
    <statuserr :scode="statusCode" @reload="errReload"></statuserr>
</div>
</template>

<script>
import {AnalysisAdsUrl} from '../../assets/js/analysisAdsUrl'
import statuserr from '../../components/statuserr/statuserr.vue'

export default {
  components:{
      statuserr
  },
  props:{},
  data(){
    return {
        jiuwidth:'',//图片的高度
        urldata:[],
        swiperOption: {//swiper3
            autoplay: 3000,
            speed: 1000,
            pagination:{
                el: '.swiper-pagination',
                type: 'bullets',
            },
        },
        biaoqiandata:'',//标签
        biaoqianlist:[],//列表
        imgdata:[],
        stops:false,
        currentPage:1,
        statustop:0,
        gotopshow:false,
        listIndex: -1,   // 热门标签
        statusCode: '1',
        clickone:false,
        scrollAjax: false
    }
  },
  watch:{},
  computed:{},
  methods:{
      gotop(){
          document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
    AnalysisAdsUrl(LinkContent){
        console.log(LinkContent)
        var data=JSON.parse(LinkContent)
      AnalysisAdsUrl.clickAds(data.type,data.title,data.ref)
      
    },
      //公告notcie
      getSwiperMsg(){
          var that=this
        https({
          url:siteUrl +'Main/Main/GetMaterialJson',
          data:{
            adstype: "faxian-flash"
          },
          successBack: ret => {
            if (ret.success && ret.status == 1) {
            var data=JSON.parse(ret.Data).AdsList
            that.urldata=data
              console.log(data)
            } else {
              promptMsg(ret.err)
            }
          }
        })          
      },
      //标签
      DataBind(){
        var that=this
        //节流
        if(that.clickone){
            return
        }
        that.clickone=true
        https({
          url:siteUrl +'Main/Main/GetMaterialClassJson',
          successBack: ret => {
              console.log(ret)
               that.clickone=false
              if(ret.status==1&&ret.success){
                  that.biaoqiandata=ret.Data
                  that.getlist(ret.Data[0].classid)
                  that.listIndex = -1
                  that.statusCode = '1'
              }else{             
                  promptMsg(ret.err)
              }
              
          },
           errorBack: err => {
            hideLoading()
            that.clickone=false
            this.statusCode = err.statusCode
            promptMsg(err.Msg)
          }
        })          
      },
      getlist(classid,index, idx){
          showLoading()
          var that=this
          if(index==1){
              that.currentPage=1
              that.stops=false
          }
        //   标签点击添加类名
          if (idx) {
            var indx = Number(idx.substr(1))
            this.listIndex = indx
          }
          if(classid)
         that.classid=classid
        https({
          url:siteUrl +'Main/Main/GetMaterialListJson',
          data:{
            classid:that.classid,
            currentPage: that.currentPage,
            pageSize: 4,
            uid: window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID')
          },
          successBack: ret => {
              console.log(ret)
            hideLoading()
            if(ret.status==1&&ret.success&&ret.Data.length>0){
                if(that.currentPage==1){
                    that.biaoqianlist=[]
                    that.imgdata=[]
                }
                var imgdata=[]
                ret.Data.forEach((item,index) => {
                    var picimg=item.pic.split('|')
                    if(picimg.length>1){
                        imgdata.push(picimg)
                    }else{
                        var a=[]
                        a.push(item.pic)
                        imgdata.push(a)
                    }
                });
                if(that.currentPage==1){
                    that.biaoqianlist=ret.Data
                    that.imgdata=imgdata
                }else{
                    that.biaoqianlist=that.biaoqianlist.concat(ret.Data)
                    that.imgdata=that.imgdata.concat(imgdata)
                }
                that.$nextTick(function () {
                    that.jiuwidth=that.$refs.jiugongge[0].clientWidth*0.32
                })
            }else if(ret.status==1&&ret.success){
               if(that.currentPage==1){
                    that.biaoqianlist=[]
                    that.imgdata=[]
                }
                that.stops=true
            }else{
                promptMsg(ret.err)
            }
            console.log(this.biaoqianlist)
            console.log(this.biaoqiandata)
            this.$forceUpdate()
            this.scrollAjax = false
          },
            errorBack: err => {
              hideLoading()
              this.scrollAjax = false
            }
        })    
                    api.refreshHeaderLoadDone();     
      },
      dianzan(pid,itemIdx,index){
          var that=this
          if(checkLoginStatus()){
          https({
            url:siteUrl +'Main/Main/UpdateZan?uid='+(window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID')),
            method: 'post',
            data:{
                uid: window.api?api.getPrefs({sync: true,key: 'SessionUserID'}):$api.getStorage('SessionUserID'),
                pid: pid,
                type: itemIdx==0?1:-1
            },
            headers:1,
            successBack: ret => {
                if(ret.success&&ret.status==1){
                    var data=that.biaoqianlist[index]
                    data.iszan=(data.iszan==0?'1':'0')
                    data.zanum=data.iszan==1?Number(data.zanum)+1:Number(data.zanum)-1
                    Vue.set(that.biaoqianlist,index,data)
                }else{
                    promptMsg(ret.err)
                }
            }  
          })
          }
      },
      onScroll() {
          var that=this
                //可滚动容器的高度
                let innerHeight = that.$refs.app.clientHeight;
                //屏幕尺寸高度
                let outerHeight = document.documentElement.clientHeight;
                //可滚动容器超出当前窗口显示范围的高度
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop>200){
                    that.gotopshow=true
                }else{
                    that.gotopshow=false
                }
                 refreshDone()
                //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
                if (innerHeight <= (outerHeight + scrollTop)) {
                    //加载更多操作
                    if(!that.stops){
                        if (this.scrollAjax) return
                        this.scrollAjax = true
                        that.currentPage += 1
                        console.log(that.currentPage)
                        that.getlist()
                    }
            }
      },
      //下载
     downLoadImgs(index, pid) {
            api.showProgress({
                title: '正在下载中...',
                text: '请稍等...',
                modal: true
            });
            var imgList=this.imgdata[index]
            imgList.forEach(function(img,index){
                var imgName = img.substr(img.lastIndexOf("/"), img.length)
                api.download({
                    url: img,
                    savePath: "fs://image"+imgName,
                    report: true,
                    cache: true,
                    allowResume: true
                }, function(ret, err) {
                    if (ret.state == 1) {
                    api.saveMediaToAlbum({
                        path: 'fs://image'+imgName
                    }, function(ret, err) {
                        if (ret && ret.status) {
                            if(index==imgList.length-1){
                            var timer = setTimeout(function () {
                                // downLoadCounts(1, pid, itemIdx)
                                api.hideProgress()
                                promptMsg("图片已成功保存到手机相册")
                                clearTimeout(timer)
                                timer = null
                            }, 2000)
                            }
                        } else {
                            if(index==imgList.length-1) {
                            api.hideProgress()
                            promptMsg("图片下载失败")
                            }
                        }
                    })
                    }
                })
            })
     },
     openbigmage(index,idx){
        var imgs=this.imgdata[index]
        console.log(imgs)
        var photoBrowser = api.require('photoBrowser');
        photoBrowser.open({
            images:imgs,
            bgColor: '#000',
            activeIndex:idx
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
        },
         openfuzhi(index){
            var des=this.biaoqianlist[index].content
            var dialogBox = api.require('dialogBox');
            dialogBox.alert({
                texts: {
                    content: '是否复制文字',
                    leftBtnTitle: '取消',
                    rightBtnTitle: '确认'
                },
                styles: {
                    bg: '#fff',
                    w: 300,
                    content: {
                        color: '#000',
                        size: 14
                    },
                    left: {
                        marginB: 7,
                        marginL: 20,
                        w: 130,
                        h: 35,
                        corner: 2,
                        bg: '#F5AC9E',
                        color: '#fff',
                        size: 12
                    },
                    right: {
                        marginB: 7,
                        marginL: 10,
                        w: 130,
                        h: 35,
                        corner: 2,
                        bg: '#F5AC9E',
                        color: '#fff',
                        size: 12
                    }
                }
            }, function(ret) {
                if (ret.eventType == 'left') {
                    var dialogBox = api.require('dialogBox');
                    dialogBox.close({
                        dialogName: 'alert'
                    });
                }else{
                     var clipBoard = api.require('clipBoard');
                        clipBoard.set({
                        value: des
                        }, function(ret, err) {
                            if (ret) {
                                promptMsg("复制成功");
                            } else {
                                promptMsg('复制失败');
                            }
                            var dialogBox = api.require('dialogBox');
                            dialogBox.close({
                            dialogName: 'actionMenu'
                        })
                        dialogBox.close({
                            dialogName: 'alert'
                        });
                        }
                    );
                }
            });
        },
        //打开外链素材
      OpenWeb(id,title,sucai,type,link){
          //type 0是图文 1是单页 2是外链
          if(type==1){
         var url=memberSiteUrl+'Fx/MaterialContent.aspx?shopid=170718164338876176&marterialid='+id
          console.log(url)
            openWin({
                name: 'webframe',
                url: './webframepage.html',
                historyGestureEnabled:true,
                bgColor:"#fff",
                pageParam: {
                    url : url,
                    title:title,
                    sucai:sucai
                }
            });
          }else if(type==2){
           if(link.substr(0,7).toLowerCase() != "http://"&&link.substr(0,8).toLowerCase() != "https://"){
               link='http://'+link
           }
            openWin({
                name: 'webframe',
                url: './webframepage.html',
                historyGestureEnabled:true,
                bgColor:"#fff",
                pageParam: {
                    url : link,
                    title:title,
                    sucai:sucai
                }
            });
          }
        },
        errReload() {
            var that = this
            that.currentPage=1
            that.stops=false
            that.DataBind()
        }
  },
  created(){
      if(window.api){
          var that=this
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
  setTimeout(function(){
      that.currentPage=1
     that.stops=false
      that.DataBind()
  },1000)
});          
      }
  },
  mounted(){
      var that = this
      if(window.api){
          this.statustop=$api.getStorage('statustop')
      }
    //   this.getSwiperMsg()
      this.DataBind()
      window.addEventListener('scroll', this.onScroll);
    // if (window.api) {
    //     api.addEventListener({
    //         name: 'scrolltobottom'
    //     }, function(ret, err){
    //         if(!that.stops){
    //             console.log(that.currentPage++)
    //             that.currentPage += 1
    //             that.getlist()
    //         }
    //     });
    // }
  }
}
</script>
<style lang="scss">
.titletou{
    height: 45px;
    @include item;
    justify-content: center;
    font-size: 17px;
    background: #fff;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color: #2C5B33;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 99999;
}
.toubai{
    height: 45px;
    width: 100%;
}
img{
    display: block;
}
.van-swipe-item{
    img{
        width: 100%;
    }
}
body{
    background: rgb(242,242,242)
}
.biaomain{
        background: #fff;
        padding:  0 rems(30);
        margin-bottom: rems(30);
}
.biaoqianbox{
    @include item;
    flex-wrap: wrap;
    .biaobox{
        @include item;
        background:rgba(230,230,230,1);
        border-radius:19px;
        color: #898989;
        font-size: rems(24);
        padding: rems(6) rems(14);
        margin-right: rems(20);
        margin-bottom: rems(20);
        i{
            color: #F5AC9E
        }
    }
    .biaoactive{
        background:rgba(245,172,158,1);
        color: #fff;
        i{
           color: #fff;  
        }
    }
}
.select {
    background-color: rgba(242,120,121,1) !important;
}
.biaotou{
    color: #727272;
    font-size: rems(24);
    padding: rems(30) 0;
}
.noticebingbox{
        background: #fff;
        margin: 0 rems(30);
        border-radius: 8px;
        padding: rems(30);
        margin-bottom:rems(20);
}
.noticetou{
        @include item;
        justify-content: space-between;
}
.noticebox{
     @include item;
     img{
         width: rems(80);
         height: rems(80);
         border-radius: 50%;
         margin-right: rems(20);
     }
     .noticetitle{
         p:nth-child(1){
             color: #2C5B33;
             font-size: rems(32);
             font-weight: 700;
             margin-bottom: rems(20);
         }
         p:nth-child(2){
             color: #727171;
             font-size: rems(24);
         }
     }
    }
    .dianzan{
     @include item;
    color: #9C9B9B;
    p{
        margin-right: rems(10)
    }
    font-size: rems(28);
        i{
            color: #585858;
        }
     }
    .noticemain{
        .foottitle{
            font-size: rems(34);
            color: #000;
            padding: 0;
            padding-top: rems(10);
        }
        font-size: rems(30);
        color: #727272;
        background: #fff;
        padding-bottom: rems(20);
        p{
            padding: rems(20) 0;
        }
        border-bottom: 1px solid #E6E6E6;
    }
    .jiugongge{
        @include item;
        flex-wrap: wrap;
        background: #fff;
        .imgbox{
            width: 32%;
            @include item;
            margin-right: 1%;
            margin-bottom: rems(10);
            overflow: hidden;
         img{
            width: 100%
        }
        }
    }
    .noticefoot{
        @include item;
        justify-content: space-between; 
        padding-top: rems(26);
        .fuzhi{
        @include item;
            span{
            font-size: rems(24);
            color: #9C9B9B;
            margin-right: rems(20);
            }
            p{
                font-size: rems(30);
                color: #fff;
                background:rgba(245,172,158,1);
                border-radius: 30px;
                padding: rems(6) rems(20)
            }
        }
    }
    .dowlon{
        @include item;
        i{
            color: #707070;
            font-size: rems(34);
            margin-right: rems(10);
        }
       p{
        color: #9C9B9B;
        font-size: rems(28);          
       } 
    }
      .gotop{
    position: fixed;
    right: 3%;
    bottom: 5%;
    background: #fff;
        border-radius: 50%;
    i{
    font-size: rems(60);
    color: #666464;
    display: block;
    }
    z-index: 999999
  }
</style>