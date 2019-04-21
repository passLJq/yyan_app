<template>
  <div id="areaApp" :style="show ? 'top:0' : 'top: 100%'">
    <div class="area">
      <div class="tittle">
        <span class="" @click="bindArea('')"><img src="../../image/icon-back.png" alt=""></span>
        <p>选择地区</p>
        <div style="width:10px;height:10px;"></div>
      </div>
      <div class="areBox">
        <div v-for="(item, index) in areaArr" :id="'area'+index" @touchstart="ontouchs(0, 'area'+index)" @touchend="ontouchs(1, 'area'+index, item.areaCode)" :key="index">
          <p>{{item.area}}</p>
          <p>+ {{item.areaCode}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBox: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      area: "",
      show: false,
      areaArr: [
        {"area": "中国", "areaCode": "86" },
        {"area": "香港", "areaCode": "852" },
        {"area": "澳门", "areaCode": "853" },
        {"area": "台湾", "areaCode": "886" },
        // {"area": "印度(测试)", "areaCode": "91"},
      ]
    };
  },
  created() {},
  mounted() {
    var sp = getname('statustop') || 0
    $api.byId('areaApp').style.paddingTop = sp + 'px'
    
  },
  computed: {},
  watch: {
    showBox(val) {
      if (val == 1) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  methods: {
    bindArea(val) {
      this.$emit("bindArea", {
        area: ''
      });
    },
    ontouchs(type, event, val) {
      var ele = $api.byId(event)
      if (type == 1) {
        ele.style.backgroundColor = '#fff'
        this.$emit("bindArea", {
          area: val
        });
      } else {
        ele.style.backgroundColor = '#f6f6fa'
      }
    }
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#areaApp {
  position: fixed;
  top: 100%;
  left: 0;
  transition: all .5s ease-in-out;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.area {
  width: 100%;
}
.area .tittle {
  width: 100%;
  font-size: rems(36);
  color: #2C5B33;
  justify-content: space-between;
  // padding: rems(20) 3%;
  height: 45px;
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.area .tittle > span {
  font-size: rems(48);
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
}
.area .tittle > span > img {
  width: 20px;
  height: 20px;
}
.area .tittle > p {
  font-size: rems(38);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.area > p {
  font-size: rems(38);
}
.area .areBox {
  width: 100%;
  padding: 0 rems(30);
}
.areBox > div {
  width: 100%;
  padding: rems(30) rems(40);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #DEDEE1;
}
.areBox > div > p {
  font-size: rems(34);
  color: #9B9B9B;
}
.areBox > div > p:nth-child(2) {
  color: #2C5B33
}
</style>