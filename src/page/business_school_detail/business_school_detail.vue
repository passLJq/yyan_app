<template>
  <section>
    <div class="main">
      <p class="title">{{article.title}}</p>
      <div class="author">
        <img src="../../img/login/yanlogo.png" alt="">
        <div>
          <p>{{article.anthor}}</p>
          <p>{{article.createtime}}</p>
        </div>
      </div>
      <img class="mainimg" v-lazy="article.mainimg" alt="" @click="bigimg(article.mainimg)">
      <div class="content" id="content">
        
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        article: '',
      }
    },
    filters: {
      
    },
    created() {
      this.getContent()
    },
    mounted() {

    },
    methods: {
      bigimg(src,index){
        if(index>=0){
          console.log(src)
          console.log(index)
        showBigImages(src,index)
        }else{
        var p=[]
        p.push(src)
        showBigImages(p,0)
        }
      },
      getContent() {
        var that=this
        https({
          url: siteUrl +'Main/Main/GetArticleDetail',
          data: {
            articleid: pageParam('articleid')
          },
          successBack: ret => {
            if (ret.success && ret.status == 1) {
              that.article = ret.Data
              $api.byId('content').innerHTML = ret.Data.content
              if(ret.Data.content){
              var listimg=$api.domAll($api.byId('content'), 'img')
              var imgdata=[]
              for(var i=0;i<listimg.length;i++){
                  imgdata.push(listimg[i].src)
                  $api.attr(listimg[i],'data-index',i)
                  $api.addEvt(listimg[i], 'click', function(e){
                    var index=e.target.dataset.index
                    that.bigimg(imgdata,index)
                  });
              }
              }
            } else {
              promptMsg(ret.err)
            }
          }
        })
      }
    }
  }
</script>
<style lang="scss">
  @import "business_school_detail.scss";
</style>