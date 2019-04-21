<template>
<div>
    <div class="toimg">
    <img src="https://images.yyoungvip.com/IMG/chu3.jpg"/>
    </div>

    <div class="aliibox">
    <div class="pitem box" v-for="(item,index) in listdata" :key="index" @click="gopid(item.pid)">
        <img :src='item.src' class="proimg"/>
        <div style="width:100%">
        <div class="protitle">{{item.title}}</div>
        <div class="pitem jiage">
            <div><span class="doms">¥</span>{{item.salePrice}}</div>
            <div class="wxbtn">立即分享</div>
        </div>
        </div>
    </div>
    </div>
</div>
</template>

<script>
export default {
  components:{},
  props:{},
  data(){
    return {
     listdata:[],
    showshare: [false, true], //分享控制
    haibao:'',
    clcikindex:''//选择弹出的序号
    }
  },
  watch:{},
  computed:{},
  methods:{
    gopid(pid){
      openWin({
        name:'productDetail',
        url:'./productDetail.html',
        pageParam:{
          pid:pid
        }
      })
    }
  },
  created(){},
  mounted(){
          var that = this
    https({
      url: siteUrl + 'marketing/redpackage/GetActivitiesSharePro',
      successBack: (ret) => {
        if (ret.success && ret.status == 1&&ret.Data) {
          var data=JSON.parse(ret.Data)
            that.listdata= data
        } else {
          promptMsg(ret.err)
        }
      }
    })
  }
}
</script>
<style lang="scss">
body{
  background: #f5f5f5
}
.pitem{display: flex;align-items: center;}
.box{background-color: #fff;padding: rems(30) rems(28);width: 85%;margin: 0 auto;border-radius: 8px;margin-bottom: rems(20)}
.proimg{width: rems(192);height: rems(192);flex-shrink: 0;margin-right: rems(20)}
.protitle{  color: #333;
  font-size: rems(28);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: rems(76);}
  .jiage{justify-content: space-between;margin-top: rems(52);}
  .jiage div:nth-child(1){color: #333333;font-size: rems(40);}
  .jiage div:nth-child(2){font-size: rems(28);padding: rems(10) rems(40);color: #fff;margin: 0}
  .doms{font-size: rems(24)}
  .aliibox{margin-top: rems(30);}

  .toimg img{width: 100%;}
  .wxbtn{background:rgba(245,172,158,1);
  border-radius: 30px;
}
</style>