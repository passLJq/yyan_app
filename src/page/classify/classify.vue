<template>
  <section>
    <header class="head" id="head" >
      <span class="back iconfont icon-fanhui" @click="closewin"></span>
      <div class="searchbar" @click="OpenSearch">
        <p>洁面</p>
        <p class="iconfont icon-fangdajing"></p>
      </div>
    </header>
    <div class="classMain" id="main">
      <div class="leftBar" id="">
        <div class="leftItem" v-for="(item, index) in classData" :key="item.classid"
        :class="{select: currentClass == index ? true : false}" @click="changeContent(index)">{{item.cla.name}}</div>
      </div>
      <div class="rightBar" id="">
        <div class="titt">
          <div class="line"></div>
          <p>{{cla.name}}</p>
          <div class="line"></div>
        </div>
        <div class="contentt">
          <div class="conItem" :class="{mt_35: index > 2 ? true : false}" v-for="(item, index) in node" :key="item.classid" @click="OpenProductList(item.classid)">
            <img v-show="item.image != ''" :src="item.image" alt=""> 
            <img v-show="!item.image" src="../../img/bkg_cover.jpg" alt="">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        classData: '',        // 分类数据
        cla:'',               // 当前类名数据
        currentClass: 0,      // 当前左侧类名索引
        node: [],             // 当前右侧显示的分类内容数据
      }
    },
    created() {
      this.bindData()
    },
    mounted() {
      var h = document.documentElement.clientHeight || document.body.clientHeight
      $api.byId('main').style.height = h - $api.byId('head').offsetHeight + 'px'
      $api.byId('head').style.paddingTop = getname('statustop') + 'px'
    },
    methods: {
      bindData() {
        this.getClass()
      },
      getClass() {
        https({
          url: siteUrl +'Main/Main/GetAllClassJson',
          successBack: ret => {
            console.log(ret)
            if (ret) {
              if (ret.success && ret.status == 1) {
                this.classData = ret.Data
                this.cla = ret.Data[0].cla
                // this.node = ret.Data[0].node
                ret.Data[0].node.map(item => {
                  this.node.push(item.cla)
                })
                console.log(this.node)
              } else {
                promptMsg(ret.err)
              }
            } else {
              promptMsg(err.msg)
            }
          }
        })
      },
      changeContent(index) {
        this.currentClass = index
        this.node = []
        this.classData[index].node.map(item => {
          this.node.push(item.cla)
        })
        this.cla = this.classData[index].cla
        this.$forceUpdate()
        console.log(this.node)
      },
      OpenProductList(classid) {
        console.log(classid)
        // return
        openWin({
          name: 'productlist',
          url: './productlist_top.html',
          pageParam: {
              clsid : classid,
          }
        })
      },
      OpenSearch() {
        openWin({
          name: 'nativesearch',
          url: 'search.html',
          bounces: false,
          bgColor:'#fff',
          rect: {
              x: 0,
              y: 0,
              w: 'auto',
              h: 'auto'
          }
        })
      },
      closewin() {
       api.closeWin();
      }
    }
  }
</script>
<style lang="scss">
  @import "classify.scss";
</style>