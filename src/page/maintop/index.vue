<template>
<div>
    <div class="tous" :style="statop?'padding-top:'+statop+'px':'padding-top:'+statop+'px'" >
        <!-- <img src="../../img/main/fenlei.png" alt="" class="tou1" @click="openClassify"> -->
        <img src="../../img/main/yyzz.png" alt="" class="tou1" @click="gogongshang">
        <img src="../../img/main/message.png" alt="" class="tou2" @click="gomen">
        <div class="souhuo" @click="gosearch">
          <p>搜索</p>
          <img src="../../image/secard.png" alt="">
        </div>
        <i v-if="hasMsg" class="mess_point"></i>
    </div>
    <van-tabs v-model="active"  @click="onClick">
        <van-tab v-for="(item,index) in clasdata" :title="item" :key="index"> 
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
        clasdata:'',
        statop:'',
        active:0,
        hasMsg: false
    }
  },
  watch:{},
  computed:{},
  methods:{
    onClick(index, title) {
        console.log(index)
        if(window.api){
            api.execScript({
                name:'root',
                script:`kongzhi(${index});`
            });
        }
    },
    rootcheack(index){
        this.active=index
    },
    gomen(){
        if(checkLoginStatus()){
          toMessagePage()
        }
    },
    gosearch(){
      openWin({
        url:'./search.html',
        name:'search'
      })
    },
    openClassify() {
          openWin({
              url: './classify.html',
              name: 'classify'
          })
      },
      getMsgNum() {
          https({
            url: siteUrl + 'Main/Member/GetMessageCount',
            data: {
            uid: getname()
            },
            headers: 1,
            successBack: (ret) => {
            if (ret.success) {
                if (ret.Data > 0) {
                this.hasMsg = true
                } else {
                this.hasMsg = false
                }
            }
            }
            })
      },
      gogongshang() {
        openWin({
          name:'commerce',
            url:'./commerce.html',
          pageParam:{
            img: 'https://images.yyoungvip.com/IMG/zz/zz2.jpg',
            title:'工商资质'
          }
        }, 1)
      }
  },
  created(){
        var that = this
        if(window.api){
        api.addEventListener({
          name: 'root_refresh_messagenum'
        }, function (ret, err) {
          that.getMsgNum()
        })
        }
  },
  mounted(){
        var that=this
        window.rootcheack=function(index){
                that.rootcheack(index)
        }
        this.statop=$api.getStorage('statustop')
        // 获取消息红点
        if(window.api){
        if(api.getPrefs({sync: true,key: 'loginStatus'}) == "loginSuccess"){
            that.getMsgNum()
        }
        }
     https({
     url:siteUrl + 'Main/Main/GetAllClassJson',
    successBack:function(ret){
          if(ret.status==1 &&ret.success && ret.Data!=null){
            console.log(ret)
            var data=[]
            data.push('首页')
            ret.Data.forEach((item,index) => {
                console.log(item.cla.name)
                data.push(item.cla.name)
            });
            that.clasdata=data

          }else{
            promptMsg(ret.err);
          }
      },
      errorBack:function(err){
        var classdata
        classdata = api.readFile({
            sync: true,
            path: "fs://classid.json"
        });
        if(classdata){
             var data=[]
            data.push('首页')
         $api.strToJson(classdata).forEach((item,index) => {
                console.log(item.cla.name)
                data.push(item.cla.name)
            });
            that.clasdata=data
        }
      }
    })
    
  }
}
</script>
<style lang="scss">
img{display: block}
.van-hairline--top-bottom::after {
    border-width: 0 0;
}
.tous{
    @include item;
    text-align: center;
    height: 45px;
    position: relative;
    img{
     width: 34%;
    }
    position: relative;
    .tou1{
        position: absolute;
        left: 3%;
        width: rems(54);
        height: rems(54);
    }
     .tou2{
        position: absolute;
        right: 3%;
        width: rems(54);
        height: rems(54);
    }
}
.van-tabs__line{
    background-color: #427161;
   height:5px
}
.mess_point {
    width: rems(16);
    height: rems(16);
    position: absolute;
    right: rems(18);
    bottom: rems(60);
    background-color: #F5AC9E;
    border-radius: 50%;
}
.souhuo{
  font-size: rems(28);
  border-radius:30px;
  height: rems(64);
  background-color: rgb(230,230,230);
  width: 62%;
  line-height: rems(64);
  margin: 0 auto;
  color: #999;
  box-shadow:0px 2px 8px 0px rgba(153,153,153,0.2);
    @include item;
    justify-content: space-between;
    padding: 0 rems(30);
  img{
    width: 15px;
    height: 15px;
  }
}
</style>