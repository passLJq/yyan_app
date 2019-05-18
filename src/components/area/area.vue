<template>
  <div id="areaApp" :style="show ? 'top:0' : 'top: 100%'">
  <!-- <div id="areaApp" :style="show ? 'top:0' : 'top: 0'"> -->
    <div class="area" id="area">
      <div class="tittle" id="title">
        <span class="" @click="bindArea('')"><img src="../../image/icon-back.png" alt=""></span>
        <p>选择地区</p>
        <div style="width:10px;height:10px;"></div>
      </div>
      <div class="areBox" id="areBox">
        <!-- <div v-for="(item, index) in areaArr" :id="'area'+index" @touchstart="ontouchs(0, 'area'+index)" @touchmove="onMove" @touchend="ontouchs(1, 'area'+index, item.areaCode)" :key="index"> -->
        <div class="group" v-for="area in areaArr" :key="area.Key" :id="area.Key">
          <p :id="area.Key+'p'">{{area.Key}}</p>
          <div class="item" v-for="(item, index) in area.Data" :id="'area'+index" @click="ontouchs(1, 'area'+index, item.Areacode)" :key="index">
            <p>{{item.Name}}</p>
            <p>+{{item.Areacode}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="px" v-show="showPx">
      <ul>
        <li v-for="item in areaArr" @click="goGroup(item.Key)" >{{item.Key}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import arr from '../../assets/js/area';
import { setTimeout } from 'timers';
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
      areaArr: arr,
      showPx: false,    // 显示排序
    };
  },
  created() {},
  mounted() {
    console.log(this.areaArr)
    var sp = getname('statustop') || 0
    $api.byId('areaApp').style.paddingTop = sp + 'px'
    // $api.byId('area').style.height = client().height + 'px'
    $api.byId('area').style.height = '100%'
    console.log($api.byId('title').offsetHeight)
    $api.byId('areBox').style.maxHeight = $api.byId('area').offsetHeight - $api.byId('title').offsetHeight + 'px'
  },
  computed: {},
  watch: {
    showBox(val) {
      if (val == 1) {
        this.show = true
        setTimeout(() => {
          this.showPx = true
        }, 500)
      } else {
        this.show = false
        this.showPx = false
      }
    }
  },
  methods: {
    // 跳转对应区域
    goGroup(id) {
      var top = $api.byId(id).offsetTop
      var sp = getname('statustop') || 0
      $api.byId('areBox').scrollTop = top - 40 - sp
      promptMsg(id)
    },
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
    },
    onclicks() {

    },
    onMove(e) {
      console.log(e)
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
  // padding: 0 rems(30);
  overflow-y: scroll; 
}
.group {
  width: 100%;
  & > p {
    font-size: rems(36);
    padding: 0 rems(30);
    background-color: #f6f6fa;
    line-height: 40px;
    height: 40px;
  }
}
.areBox .item {
  width: 90%;
  padding: rems(30) rems(70);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #DEDEE1;
  &:active {
    background-color: #d8d8d8;
  }
}
.areBox .item > p {
  font-size: rems(34);
  color: #9B9B9B;
}
.areBox .item > p:nth-child(2) {
  color: #2C5B33
}

.px {
  width: rems(50);
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  ul,li {
    list-style: none;
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      font-size: rems(24);
      padding: rems(10) 0;
      background-color: #fff;
      text-align: center;
    }
    li + li {
      border-top: 1px solid #f6f6fa;
    }
  }
}
</style>
