<template>
  <section>
    <div class="top">
      <!-- <p>攸妍商学院</p> -->
      <van-swipe :autoplay="3000" v-if="banner">
        <van-swipe-item v-for="(image, index) in banner" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <!-- 没有数据就显示默认 -->
      <img src="../../img/schoolBack.jpg" alt="" v-else>
    </div>
    <div class="nav">
      <div class="navItem" :class="{active: columnid == item.columnid ? true:false}"
       v-for="(item, i) in columnlist" :key="i" :style="{marginTop:i>1?'10px':''}"  @click="changeArt(item.columnid)">
        <p><!-- <span class="iconfont icon-book"></span> -->{{item.name}}</p>
      </div>
    </div>

    <div class="contten">
      <div class="conttItem" v-for="(item, i) in articlelist" :key="item.articleid" @click="toDetail(item.title,item.articleid)">
        <img v-lazy="item.img" alt="">
        <div class="conright">
          <p>{{item.title}}</p>
          <div class="bb">
            <p>{{item.createtime|getTime}}</p>
            <p>{{item.columnname}}</p>
          </div>
        </div>
      </div>
      <div class="nodatt" v-if="!articlelist">
        <img src="../../img/noorders.png" alt="">
        <p>亲，目前没有相关数据~</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        pageIndex: 1,       // 页数
        hasMore: true,      // 是否有更多
        pageSize: 5,
        columnid: '',       // 当前板块id
        articlelist: '',
        columnlist: '',
        banner: '',
      }
    },
    filters: {
      getTime(value) {
        if (!value) return
        return value.split(' ')[0]
      }
    },
    created() {
      var that = this
      if (window.api) {
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
            that.pageIndex = 1
            that.hasMore = true
            that.getAllMsg()
          },1000)
        })
        api.addEventListener({name: 'scrolltobottom'}, function(ret, err){
          that.pageIndex += 1
          that.getListMsg()
        });
      }
      
    },
    mounted() {
      this.columnid = pageParam('columnid')
      this.getAllMsg()
      console.log(this.columnid)
    },
    methods: {
      getAllMsg() {
        this.bindData()
        this.getListMsg()
      },
      bindData(){
        https({
          url: siteUrl +'Main/Main/GetMaterialJson',
          data: {
            adstype: "shangxueyuan-flash"
          },
          successBack: ret => {
            var data = JSON.parse(ret.Data).AdsList
            if (ret.success) {
              if(data && data != '[]' && data.length > 0){
                this.banner = []
                data.forEach(item => {
                  this.banner.push(item.Source)
                })
              }
              console.log(this.banner)
            } else {
              promptMsg(ret.err)
            }
          }
        })
      },
      getListMsg(type){
        https({
          url: siteUrl +'Main/Main/GetArticleList',
          data: {
            currentPage: this.pageIndex,
            pageSize: this.pageSize,
            columnid: this.columnid
          },
          successBack: ret => {
            console.log(ret)
            if (ret.success && ret.status == 1) {
              // 有type 表示切换文章
              if (ret.Data.articlelist) {
                if (type) {
                  this.articlelist = ret.Data.articlelist
                } else {
                  // 已有数据，则添加
                  if (this.pageIndex > 1) {
                    this.articlelist = this.articlelist.concat(ret.Data.articlelist)
                  } else {
                    this.articlelist = ret.Data.articlelist
                  }
                  
                }
              }
              this.columnlist = ret.Data.columnlist
              console.log(JSON.stringify(ret.Data.articlelist))
            } else {
              promptMsg(ret.err)
            }
            refreshDone()
          }
        })
      },
      changeArt(columnid) {
        this.columnid = columnid
         this.pageIndex = 1
        this.getListMsg(1)
      },
      toDetail(title, aid) {
        openWin({
            name: 'business_school_detail',
            url: './business_school_detail.html',
            pageParam: {
              title: title,
              articleid: aid
            }
        },1)
      }
    }
  }
</script>
<style lang="scss">
  @import "business_school.scss";
</style>