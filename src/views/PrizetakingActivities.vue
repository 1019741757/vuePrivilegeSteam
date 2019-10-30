<template>
<div class="">
  <div class="header_B" style="text-align: right;">
    <span @click="MyPrize()">我的奖品</span>
  </div>
  <div class="PrizetakingActivities clearfix">
    <div class="PrizetakingActivities_left fl" @click="activityBioy()">
      <h6>免费体验游戏,送网费活动</h6>
      <img src="@/assets/images/PrizetakingActivities/5.png" alt="">
      <div class="btn"></div>
    </div>
    <div class="PrizetakingActivities_ul fr clearfix">
      <div class="PrizetakingActivities_li" @click="activityGG('1')">
        <img src="@/assets/images/PrizetakingActivities/4.png" alt="">
        <div class="btn"></div>
      </div>
      <div class="PrizetakingActivities_li" @click="activityGG('2')">
        <img src="@/assets/images/PrizetakingActivities/3.png" alt="">

        <div class="btn"></div>
      </div>
      <div class="PrizetakingActivities_li" @click="activityGG('3')">
        <img src="@/assets/images/PrizetakingActivities/1.png" alt="">
        <div class="btn"></div>
      </div>
      <div class="PrizetakingActivities_li" @click="activityGG('4')">
        <img src="@/assets/images/PrizetakingActivities/2.png" alt="">
        <div class="btn"></div>
      </div>
    </div>
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
export default {
  name: "PrizetakingActivities",
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([ "NetBarId"])
  },
  methods: {
    MyPrize: function() {
      this.$router.push({
        path: '/OrderCenter/ExchangeMall/MyTradingRecord'
      })
    },
    activityBioy: function() {
      _hmt.push(['_trackEvent', '领网费页面', '点击量', '免费体验游戏,送网费活动']);
      Extern_Form_ShowNumWindows(1);
      Extern_Form_RunJsInNumWindows(1, 'WPopupthemainPage', false);
    },
    activityGG: function(activityid) {
      switch (activityid) {
        case '1':
          _hmt.push(['_trackEvent', '领网费页面', '点击量', '租号送网费']);
          Extern_Form_open_GG_with_netbarid_and_activityid(this.NetBarId, activityid)
          break;
        case '2':
          _hmt.push(['_trackEvent', '领网费页面', '点击量', '买吃鸡号送网费']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/?NetbarId=' + this.NetBarId + '&ActivityId=' + activityid);
          break;
        case '3':
          _hmt.push(['_trackEvent', '领网费页面', '点击量', '买LOL精粹号送网费']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/?NetbarId=' + this.NetBarId + '&ActivityId=' + activityid);
          break;
        case '4':
          _hmt.push(['_trackEvent', '领网费页面', '点击量', '买王者荣耀号送网费']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/?NetbarId=' + this.NetBarId + '&ActivityId=' + activityid);
          break;
        default:
      }


    },
  }
}
</script>
