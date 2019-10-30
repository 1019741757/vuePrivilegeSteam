<template>
<div class="">
  <div class="header_B">
    <span @click="IwantTomakeLingshi()">我要赚积分</span>
    <a @click="MyTradingRecordUrl()">我的兑换记录</a>
    <span @click="WhatisLingshi()">积分规则介绍</span>
  </div>
  <div class="IwantTomakeLingshi">

    <div class="IwantTomakeLingshi_H clearfix">
      <div :class="{ 'active': isShowLingshi === true }" @click="isShowLingshi = true">
        赚取积分
      </div>
      <div :class="{ 'active': isShowLingshi === false }" @click="isShowLingshi = false">
        积分明细
      </div>
    </div>
    <div class="IwantTomakeLingshi_B Overflow">

      <div class="IwantTomakeLingshi_lishi" v-if="isShowLingshi">
        <div class="IwantTomakeLingshi_Img"> <img src="@/assets/images/OverVIP/icon-3.png" alt=""></div>
        <div class="IwantTomakeLingshi_tabel">
          <div class="IwantTomakeLingshi_tr" v-for="item in GetIntegralTaskList" :key="item.Id">
            <div class="IwantTomakeLingshi_td IwantTomakeLingshi_td1">
              <img :src="item.ImgUrl" alt="">
            </div>
            <div class="IwantTomakeLingshi_td IwantTomakeLingshi_td2">
              <h5>{{item.Title}}</h5>
              <p>{{item.Content}}</p>
            </div>
            <div class="IwantTomakeLingshi_td IwantTomakeLingshi_td3">
              <a @click="GoImmediately(item.Id)" v-if="item.Id != 1&&item.Id != 7&&item.Id != 8&&item.Id != 9&&item.Id != 11">立即前往</a>
            </div>
          </div>
        </div>
      </div>

      <div class="IwantTomakeLingshi_mingxi" v-if="!isShowLingshi">
        <div class="" v-if="GetTaskRecordList.length>0">
          <table cellspacing="0">
            <tbody>
              <tr v-for="(item,index) in GetTaskRecordList" :key="item.Id">
                <td><img src="@/assets/images/OverVIP/icon-8.png" alt=""> {{item.Title}}</td>
                <td>积分： <img src="@/assets/images/OverVIP/icon-9.png" alt=""> <span>{{item.IntegralReward}}</span></td>
                <td>{{item.CreateTime}}</td>
              </tr>
            </tbody>
          </table>
          <el-pagination layout="prev, pager, next" :total="total" prev-text="上一页" next-text="下一页" :current-page="pageNo" @current-change="handleCurrentChange" @size-change="sizeCurrentChange" class="IwantTomakeLingshi_page">
          </el-pagination>
        </div>
        <div class="null_W" v-else>
          <img src="@/assets/images/null.png" alt="" class="swing animated">
        </div>
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
  name: "IwantTomakeLingshi",
  data() {
    return {
      ConsumerId: '',
      pageSize: 10,
      pageNo: 1,
      total: 0,
      isShowLingshi: true,
      GetIntegralTaskList: [],
      GetTaskRecordList: [],
    };
  },
  computed: {
    ...mapGetters(["SteamList", "NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "MobilePhoneHoverIs", "PagesLoginIs"])
  },
  created: function() {
    var Pakshow = this.$route.query.Pakshow;
    if (Pakshow) {
      this.isShowLingshi = false;
    }
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
    if (this.ConsumerId) {
      this.getIwantTomakeLingshiData();
      this.GetTaskRecordListData();
    }
  },
  methods: {
    WhatisLingshi: function() {
      this.$router.push({
        path: '/OrderCenter/TextDetails',
        query: {
          TextDetailsIndex: '1'
        }
      })
    },
    IwantTomakeLingshi: function() {
      this.$router.push({
        path: '/OrderCenter/ExchangeMall/IwantTomakeLingshi'
      })
    },
    MyTradingRecordUrl: function() {
      this.$router.push({
        path: '/OrderCenter/ExchangeMall/MyTradingRecord'
      })
    },
    //获取赚取积分列表
    getIwantTomakeLingshiData: function() {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      var _this = this;
      let paramList = {
        consumerId: ConsumerId,
        isShow: '0'
      };
      get("/api/TaskRelevant/GetIntegralTaskList", paramList).then(res => {
        if (res.StatusCode == 200) {
          console.log(res.Object);
          _this.GetIntegralTaskList = res.Object;
        }
      }).catch(err => {});
    },
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.GetTaskRecordListData();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.GetTaskRecordListData();
    },
    //获取积分列表
    GetTaskRecordListData: function() {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      var _this = this;
      let paramList = {
        consumerId: ConsumerId,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      get("/api/TaskRelevant/GetTaskRecordList", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.GetTaskRecordList = res.Items;
          _this.total = res.Total
          console.log(_this.GetTaskRecordList);
        }
      }).catch(err => {});
    },
    //立即前往
    GoImmediately: function(Id) {
      if (Id == 1) {

      }
      if (Id == 2) {
        Extern_Form_ShowNumWindows(1);
        Extern_Form_RunJsInNumWindows(1, 'WPopupthemainPage', false);
      }
      if (Id == 3) {
        this.$router.push({
          path: '/OrderCenter/Feedback'
        })
      }
      if (Id == 6) {
        this.$router.push({
          path: '/OrderCenter/GameGuess'
        })
      }
      if (Id == 9) {
        this.$router.push({
          path: '/OrderCenter/GameGuess'
        })
      }
    }
  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      if (this.ConsumerId) {
        this.getIwantTomakeLingshiData();
        this.GetTaskRecordListData();
      }
    },

  },
};
</script>
