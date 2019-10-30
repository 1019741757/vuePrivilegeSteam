<template>
<div class="GameActivitiesLOL">
  <div class="GameActivities_LOL">
    <div class="GameActivities_a" @click="GameActivitiesWo"></div>
    <div class="GameActivities_b" @click="GameActivitiesTo"></div>
  </div>
  <div class="GameActivitiesLOL_dou">
    <div class="GameActivitiesLOL_ul">
      <div class="GameActivitiesLOL_li" v-for="(item,index) in GameActivitiesLOLList" :key="index">
        <img :src="item.ImgUrl" alt="">
        <div class="GameActivitiesLOL_oute" v-if="item.ConsumerIntegral >= item.Integrallimit">今日 &nbsp;已完成</div>
        <div class="GameActivitiesLOL_oute" v-else>今日 &nbsp; 未完成</div>
      </div>
    </div>
  </div>
  <div class="GameActivitiesPUGB_soertt">
    <p>获取的积分可直接前往 <a @click="GameActivitiesPm"> “兑换商城”</a>、Q币、皮肤等精美礼品 </p>
    <p>游戏仅限大逃杀模式，且游戏结果仅限580登录状态</p>
    <!-- <div class="GameActivitiesPUGB_tori totop"></div> -->
  </div>
</div>
</template>
<script>
import {
  mapGetters
} from "vuex";
import {
  get,
  post
} from "@/utils/ajax";
// import slider components
import {
  slider,
  slideritem
} from 'vue-concise-slider'
export default {
  name: "GameActivitiesLOL",
  data() {
    return {
      ConsumerId: '',
      GameActivitiesLOLList: [],
    }
  },
  components: {
    slider,
    slideritem
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral", "PagesLoginIs"])
  },
  created: function() {
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
    if (this.ConsumerId) {
      this.getIwantTomakeLingshiData();
    }
  },
  methods: {
    slide: function() {

    },
    onTap: function() {

    },
    onInit: function() {

    },
    slideNext() {
      this.$refs.Slider.$emit("slideNext");
    },
    slidePre() {
      this.$refs.Slider.$emit("slidePre");
    },
    GameActivitiesWo: function() {
      this.$router.push({
        path: "/OrderCenter/GameActivitiesPUGB"
      });
    },
    GameActivitiesTo: function() {
      this.$router.push({
        path: "/OrderCenter/GameActivitiesLOL"
      });
    },
    GameActivitiesPm: function() {
      this.$router.push({
        path: "/OrderCenter/ExchangeMall"
      });
    },
    //获取列表
    getIwantTomakeLingshiData: function() {
      var _this = this;
      let paramList = {
        consumerId: this.ConsumerId,
        isShow: '1'
      };
      get("/api/TaskRelevant/GetIntegralTaskList", paramList).then(res => {
        if (res.StatusCode == 200) {
          var ArryList = res.Object;
          var GameActivitiesLOLList = [];
          for (var i = 0; i < ArryList.length; i++) {
            if (200 < parseInt(ArryList[i].Id) && parseInt(ArryList[i].Id) <= 300) {
              GameActivitiesLOLList.push(ArryList[i]);
            }
          }
          console.log(GameActivitiesLOLList);
          _this.GameActivitiesLOLList = GameActivitiesLOLList;

          // console.log(parseInt(_this.GameActivitiesLOLList.length / 2));
        }
      }).catch(err => {});
    },
  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      if (this.ConsumerId) {
        this.getIwantTomakeLingshiData();
      }
    },

  },
}
</script>
