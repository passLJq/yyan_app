<template>
<div>
  <img class="imgback" src="../../img/frinedsharp.png" alt="">
  <div class="btn" @click="goshare">立即邀请 赚现金红包</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userData: ''
    }
  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    goshare() {
      if (checkLoginStatus()) {
        https({
          url: siteUrl +'Main/Member/GetMemberJson',
          data: {
            uid: getname()
          },
          headers:1,
          successBack: ret => {
            if (ret.success && ret.status == 1) {
              var data = ret.Data
              if (!data.name) data.name = '攸妍商城'
              if (!data.pic) data.pic = './image/man.jpg'
              this.userData = data
              this.drawhaibao()
            } else {
              promptMsg(ret.err)
            }
          }
        })
      }
    },
    drawhaibao() {
      api.openFrame({
        name: 'marketing_shaerdiv',
        url: './marketing_shaerdiv.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
          way: 'friendsharp'
        },
        bounces: false,
        bgColor: 'rgba(0,0,0,0)'
      });
    }
  }
}
</script>
<style lang="scss">
body{
  background: #FFEAE1
}
.imgback {
  width: 100%;
  display: block;
  position: fixed;
  top:0;
  left:0;
  z-index: -9999;
}
.btn {
  max-width: rems(382);
  font-size: rems(30);
  color:#fff;
  padding: rems(15) rems(50);
  background-color: #EB6100;
  border-radius:rems(36);
  margin: rems(730) auto 0;
  z-index: 99;
  text-align: center;
}
#shareImg_container{position: fixed;top:6%;left: 10%;z-index: 9999}
#shareImg_container img{width:90%;}

</style>