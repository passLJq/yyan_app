<template>
  <div class="err" v-if="statusCode!='403' && statusCode!='1'">
    <img class="img" src="../../img/statuserr.png" alt="">
    <p v-if="statusCode==503">当前访问峰值过高，请稍候再试...</p>
    <p v-else>网络出现了错误，请稍候再试...</p>
    <span class="chongshi"  @click="reload">点击重试</span>
  </div>
</template>

<script>
export default {
  components:{},
  props:{
    showErr: {
      type: String,
      required: false
    },
    // statusCode
    scode: {
      type: String,
      required: false
    },
  },
  data(){
    return {
      statusCode: '1'
    }
  },
  watch:{
    scode(val) {
      if (val >= 0) {
        this.statusCode = val
      }
    }
  },
  computed:{
    
  },
  created(){
    
    
  },
  mounted(){
    
  },
  methods: {
    reload() {
      this.$emit('reload')
    }
  },
}
</script>
<style lang="scss" scoped>
 @import "statuserr.scss";
</style>