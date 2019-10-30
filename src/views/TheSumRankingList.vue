<template>
<div class="TheSumRankingList">
  <div class="TheSumRankingList_mue" @click="anniuRouting()">
    <div class="TheSumRankingList_operr totop">
      <img src="@/assets/images/over/anniu2.png" alt="">
    </div>
    <div class="TheSumRankingList_term">
      <p>{{GetMatchConfigureList.Title}}</p>
    </div>
  </div>
  <div class="TheSumRankingList_div">
    <div class="RankingList_ress">
      <div class="ress_a tl">
        我的胜点排名：<span v-if="Gameranking  > 0">第{{Gameranking}}名</span> <span v-else>未上榜</span>
      </div>
      <div class="ress_b">胜点排行榜</div>
      <div class="ress_e tr" @click="JumpRouting()">
        <span></span>
      </div>
    </div>
    <div class="RankingList_tabel RankingList_uess RankingList_Overflow">
      <table cellspacing="0">
        <thead>
          <tr>
            <th style="width:22%;text-align: left;"> <span>玩家手机号</span> </th>
            <th> <span>总胜点数</span> </th>
            <th style="width:17%;text-align: right;"> <span>排名</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in GetTotalIntegralRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
            <td>{{item.Phone | capitalize}}</td>
            <td>{{item.TotalIntegral}}</td>
            <td>
              <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
              <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
              <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
              第{{item.Ranking}}名</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="RankingList_text" style="color:#4E3A27"><a>*</a>
      1、本届电竞比赛以战绩总排行的最终胜点数排名为准；
      2、总胜点数为英雄联盟的战绩胜点加绝地求生的战绩胜点的总和；
      3、胜点仅作用于排行榜排名统计；
      4、战绩数据仅限580登录状态有效；
      5、该总榜只统计活动时间内的胜点数，胜点获取规则请前往“网吧电竞”查看。
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
  name: "TheSumRankingList",
  data() {
    return {
      ConsumerId: '',
      GameDate: this.getNowFormatDate(),
      Gameranking: '',
      GetTotalIntegralRankList: [],
      GetMatchConfigureList: {},
    };
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral", "PagesLoginIs"])
  },
  created: function() {
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
    this.GetMatchConfigureListFun();
    if (this.ConsumerId) {
      this.GetMyTotalIntegralRankFun();
      this.GetTotalIntegralRankFun();
    }
  },
  methods: {
    //获取比赛配置
    GetMatchConfigureListFun: function() {
      let paramList = {
        cid: 0
      };
      var _this = this;
      get("/api/BetRelevant/GetMatchConfigureList", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.GetMatchConfigureList = res.Object;
            var StartDate = res.Object.StartDate;
            var EndDate = res.Object.EndDate;
            _this.GetMatchConfigureList.StartDate = this.$moment(new Date(StartDate)).format('YYYY年MM月DD日');
            _this.GetMatchConfigureList.EndDate = this.$moment(new Date(EndDate)).format('YYYY年MM月DD日');
          }
        }).catch(err => {});
    },
    //总胜点榜-我的排名
    GetMyTotalIntegralRankFun: function() {
      let paramList = {
        consumerId: this.ConsumerId,
        startTime: '2019-07-25',
        endTime: '',
      };
      var _this = this;
      get("/api/BetRelevant/GetMyTotalIntegralRank", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.Gameranking = res.Object;
          }
        }).catch(err => {});
    },
    //总胜点榜
    GetTotalIntegralRankFun: function(gameType) {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      let paramList = {
        consumerId: this.ConsumerId,
        startTime: '2019-07-25',
        endTime: '',
        pageSize: 200,
        pageIndex: 1
      };
      var _this = this;
      get("/api/BetRelevant/GetTotalIntegralRank", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.GetTotalIntegralRankList = res.Items;
          }
        }).catch(err => {});
    },
    JumpRouting: function() {
      _hmt.push(['_trackEvent', '战绩总排行页面', '点击量', '查看战绩胜点详情']);
      this.$router.push({
        path: '/OrderCenter/RankingList'
      })
    },
    anniuRouting: function() {
      _hmt.push(['_trackEvent', '战绩总排行页面', '点击量', '玩游戏领赏金']);
      this.$router.push({
        path: '/OrderCenter/InternetCafeCompetition'
      })
    }
  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      if (this.ConsumerId) {
        this.GetMyTotalIntegralRankFun();
        this.GetTotalIntegralRankFun();
      }
    },
  }
};
</script>
