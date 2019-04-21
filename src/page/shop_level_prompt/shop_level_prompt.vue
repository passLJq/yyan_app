<template>
  <div>
      <div class="zhezao" @click="closefrema"></div>
    <div class="levelbox">
      <div class="levelhead">
          <div class='img'>
        <img :src="data.shoplogo?data.shoplogo:'../../img/man.jpg'" alt>
          </div>
        <p>{{data.shopname}}</p>
        <p><b>身份级别：{{data.shoptitle}}</b></p>
        <p v-html="text"></p>
      </div>
      <div class="leverfoot">
        <div class="zhicheng">
          <p>店铺级别：
            <b>{{data.shoplevel}}</b>
          </p>
          <p v-html="owner"></p>
        </div>
        <div class="leverloading">
          <div class="loadingbox" ref='loadingbox'>
            <div class='numbox' :style="numboxleft?'left:'+numboxleft+'px':''" v-if="data.mylevel!=4&&data.saletotal">
                <span class="triangle_border_down">
                    {{data.saletotal|tofixed}}
                    <span></span>
                </span>
            </div>
            <div class="loadingcolor" :style="loadingwidth?'width:'+loadingwidth+'px':''"></div>
            <div class="li1">
              <div class="linecar"></div>
            </div>
            <div class="li2" :style="loadingbox?'left:'+(loadingbox-4)+'px':''">
              <div class="linecar" :style="data.mylevel>=3?'background: #ffe1d2;':''"></div>
            </div>
            <div class="li3">
              <div class="linecar" :style="data.mylevel>=4?'background: #ffe1d2;':''"></div>
            </div>
          </div>
        </div>
        <div class="levertitle" v-if="data.shoplevellist">
            <div class="le1">
                <p>{{data.shoplevellist[0].condition}}</p>
                <p>{{data.shoplevellist[0].name}}</p>
            </div>
            <div class="le2" :style="loadingbox?'left:'+(loadingbox-12)+'px':''">
                <p>{{data.shoplevellist[1].condition}}</p>
                <p>{{data.shoplevellist[1].name}}</p>
            </div>
             <div class="le3">
                <p>{{data.shoplevellist[2].condition}}</p>
                <p>{{data.shoplevellist[2].name}}</p>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      data: [],
      loadingwidth:0,
      numboxleft:0,
      loadingbox:0,
      text: '',   // 文案  
      owner: ''   // 下面文案  
    };
  },
  filters:{
      tofixed(value){
          var ins=Number(value).toFixed(0)
          return ins
      }
  },
  watch: {},
  computed: {},
  methods: {
    bindata() {
      var that = this;
      https({
        url: siteUrl + "Main/Member/UpgradeInformation",
        data: {
          uid: getname()
        },
        headers: 1,
        successBack: function(ret) {
          if (ret.status == 1 && ret.success) {
              console.log(that.$refs.loadingbox.clientWidth)
              var data=ret.Data
              that.loadingbox=that.$refs.loadingbox.clientWidth/2
              if(data.mylevel==2){
                that.loadingwidth= (that.$refs.loadingbox.clientWidth/2)/Number(data.shoplevellist[1].condition)*(Number(data.saletotal).toFixed(0))
                if(Number(data.saletotal).toFixed(0)>0){
                  that.numboxleft=that.loadingwidth-29
                }
                
              }else if(data.mylevel==3){
                that.loadingwidth= (that.$refs.loadingbox.clientWidth/2)/Number(data.shoplevellist[2].condition)*(Number(data.saletotal).toFixed(0)-Number(data.shoplevellist[1].condition))+(that.$refs.loadingbox.clientWidth/2)
                that.numboxleft=that.loadingwidth-29
                
              }else if(data.mylevel==4){
                  that.loadingwidth=that.$refs.loadingbox.clientWidth
              }
              if (data.money != 0) {
                this.owner = `再销售<b class="font_17">${data.money}</b>元，即可升级为${ShopLevelName}`
              }
              if (data.TitleHighest == 2) {
                if (data.number != 0) {
                  that.text = '再开发<b class="font_17">' + data.number + '</b>名' + data.name + '即可晋升为' + data.ShopTitleName
                }
              } else if (data.TitleHighest == 3) {
                that.text = `差直接销售<b class="font_17">${data.indirectCount}</b>个开店礼包，间接销售<b class="font_17">${data.directCount}</b>个开店礼包，`
                if (data.cultureCount != 0) {
                  that.text += `并且培养<b class="font_17">${data.cultureCount}</b>名直属${data.name}，`
                }
                that.text += ` 即可晋升为${data.ShopTitleName}`
              } else if (data.TitleHighest == 4) {
                that.text = `恭喜您，您的职称已经达到最高级别`
                this.owner = ''
              }
            that.data = ret.Data;
          } else {
            promptMsg(ret.err);
          }
          console.log(ret);
        }
      });
    },
    closefrema(){
        api.closeFrame();
    }
  },
  created() {},
  mounted() {
    this.bindata();
  }
};
</script>
<style lang="scss">
body{
     background: rgba(0, 0, 0, 0); 
}
.zhezao {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100%;
  top:0;
  bottom: 0;
}
.levelbox {
  position: fixed;
  width: 90%;
  left: 5%;
  top: 20%;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  z-index: 99999
}
img {
  display: block;
}
.levelhead {
  background: linear-gradient(
    49deg,
    rgba(255, 234, 224, 1),
    rgba(247, 195, 179, 1)
  );
  text-align: center;
  .img {
    width: rems(132);
    height: rems(132);
    margin: 0 auto;
    padding-top: rems(28);
    border-radius: 50px;
    overflow: hidden;
    img{
        width: 100%;
        border-radius: 50px;
    }
  }
  p:nth-child(2) {
    font-size: rems(32);
    margin-top: rems(30);
    color: #2c5b33;
  }
  p:nth-child(3) {
    font-size: rems(40);
    margin-top: rems(54);
    color: #2c5b33;
  }
  p:nth-child(4) {
    font-size: rems(28);
    margin-top: rems(36);
    padding-bottom: rems(65);
    color: #666464;
  }
}
.zhicheng {
  b {
    font-size: rems(34);
  }
  padding: rems(14) 0;
  text-align: center;
  font-size: rems(28);
  color: #427161;
  line-height: 2;
}
.leverloading {
  padding: rems(90) 0 0 0;
}
.loadingbox {
  height: 4px;
  background: #f5ac9e;
  width: 80%;
  margin: 0 auto;
  position: relative;
  .loadingcolor {
    position: absolute;
    z-index: 999;
    height: 4px;
    width: 0;
    transition: width 0.5s;
    background: #ffe1d2;
  }
}
.linecar {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f5ac9e;
}
.li1 {
  position: absolute;
  left: 0;
  top: -4px;
  z-index: 9999;
  .linecar{
      background: #ffe1d2; 
  }
}
.li2 {
  position: absolute;
  left: 49%;
  top: -4px;
  z-index: 9999;
}
.li3 {
  position: absolute;
  right: 0;
  top: -4px;
  z-index: 9999;
}
.numbox{
    position: absolute;
    bottom: 4px;
    left: -21px;
    transition: left 0.5s
}
.triangle_border_down{
    position:relative;
    font-size: 12px;;
    text-align: center;
    color: #F5AC9E;
    border: 1px solid #F5AC9E;
    border-radius: 30px;
    padding: 0 4px;
    height: 18px;
    line-height: 18px;
    width: 46px;
}
.triangle_border_down span{
    display:block;
    width:0;
    height:0;
    border-width:8px 8px 0;
    border-style:solid;
    border-color:#F5AC9E transparent transparent;/*黄 透明 透明 */
    position:absolute;
    top:18px;
    left:19px;
}
.levertitle{
 width: 80%;
  margin: 0 auto;
  position: relative;  
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: rems(24);
  color: #427161;
  text-align: center;
  height: rems(120);
.le1 {
  position: absolute;
  left: -12px;
  top: 9px;
  z-index: 9999;
  .linecar{
      background: #ffe1d2; 
  }
}
.le2 {
  position: absolute;
  left: 47%;
  top: 9px;
  z-index: 9999;
}
.le3 {
  position: absolute;
  right: -12px;
  top: 9px;
  z-index: 9999;
}
}
</style>