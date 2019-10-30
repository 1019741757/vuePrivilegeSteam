<template>
<div class="GameActivitiesPUGB">
  <div class="GameActivities">
    <div class="GameActivities_a" @click="GameActivitiesWo"></div>
    <div class="GameActivities_b" @click="GameActivitiesTo"></div>
  </div>
  <!-- Make a div wrapped slider,set height and width  -->
  <div style="width:100%;margin:-15px auto 0;height:600px;position: relative;">
    <a href="javascript:;" class="Left_GameActivitiesPUGB" @click="slidePre" v-if="GameActivitiesPUGBList.length>3"></a>
    <slider ref="Slider" :options="options" class="GameActivitiesPUGB_slider">
      <template slot-scope="coverflow">
        <slideritem v-for="(item,index) in GameActivitiesPUGBList" @slide='slide' @tap='onTap' @init='onInit' :index="index" :key="index">
          <div class="GameActivitiesPUGB_div totop">
            <div class="GameActivitiesPUGB_title"> {{item.Title}} </div>
            <div class="GameActivitiesPUGB_slider">
              <img :src="item.ImgUrl" alt="">
            </div>
            <div class="GameActivitiesPUGB_footer">
              <div class="GameActivitiesPUGB_p">
                可以获得：积分 <span> +{{item.IntegralReward}}</span>
              </div>
              <div class="GameActivitiesPUGB_rew" v-if="item.ConsumerIntegral >= item.Integrallimit">今日--已完成</div>
              <div class="GameActivitiesPUGB_rew" v-else>今日--未完成</div>
            </div>
          </div>
        </slideritem>
      </template>
    </slider>
    <a href="javascript:;" class="Right_GameActivitiesPUGB" @click="slideNext" v-if="GameActivitiesPUGBList.length>3"></a>
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
  name: "GameActivitiesPUGB",
  data() {
    return {
      ConsumerId: '',
      GameActivitiesPUGBList: [],
      //Slider configuration [obj]
      options: {
        effect: 'coverflow',
        currentPage: 1,
        thresholdDistance: 100,
        thresholdTime: 330,
        deviation: 320,
        widthScalingRatio: 0.96,
        heightScalingRatio: 0.96,
        slidesToScroll: 1,
        loop: true,
        pagination: false, // 底部小圆点是否隐藏（true显示，false隐藏）
      }
    }
  },
  components: {
    slider,
    slideritem
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral","PagesLoginIs"])
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
    GameActivitiesPm:function(){
      this.$router.push({
        path: "/OrderCenter/ExchangeMall"
      });
    },
    //获取赚取积分列表
    getIwantTomakeLingshiData: function() {
      var _this = this;
      let paramList = {
        consumerId: this.ConsumerId,
        isShow: '1'
      };
      get("/api/TaskRelevant/GetIntegralTaskList", paramList).then(res => {
        if (res.StatusCode == 200) {
          var ArryList = res.Object;
          var GameActivitiesPUGBList = [];
          for (var i = 0; i < ArryList.length; i++) {
            if (100 < parseInt(ArryList[i].Id) && parseInt(ArryList[i].Id) <= 200) {
              GameActivitiesPUGBList.push(ArryList[i]);
            }
          }
          _this.options.currentPage = 1;
          _this.GameActivitiesPUGBList = GameActivitiesPUGBList;
          console.log(GameActivitiesPUGBList);
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
