<template>
<div class="">
  <div class="header_B">
    <span @click="IwantTomakeLingshi()">我要赚积分</span>
    <a>我的兑换记录</a>
    <span @click="WhatisLingshi()">积分规则介绍</span>
  </div>
  <div class="MyTradingRecord">
    <div class="MyTradingRecord_H clearfix">
      <div :class="{ 'active': state === 0 }" @click="StateFun(0)">
        全部
      </div>
      <div :class="{ 'active': state === 1 }" @click="StateFun(1)">
        未兑换
      </div>
      <div :class="{ 'active': state === 2 }" @click="StateFun(2)">
        已兑换
      </div>
      <div :class="{ 'active': state === 3 }" @click="StateFun(3)">
        已过期
      </div>
    </div>
    <div class="MyTradingRecord_B Overflow" v-if="GetReceiveLogList.length>0">
      <div class="MyTradingRecord_D totop" v-for="item in GetReceiveLogList">
        <div class="MyTradingRecord_img">
          <img src="@/assets/images/over/wangfei.png" alt=""  v-if="item.PrizeType == 1">
          <img src="@/assets/images/over/QQ.png" alt="" v-if="item.PrizeType == 2">
          <p>{{item.PrizeName}}</p>
        </div>
        <div class="MyTradingRecord_most fl">
          <div class="MyTradingRecord_most_head clearfix">
            <div class="fl" v-if="item.PrizeType == 1">
              <img src="@/assets/images/over/k5.png" alt="">
              兑换码：{{item.CDK}}
            </div>
            <div class="fl" v-if="item.PrizeType == 2">
              <img src="@/assets/images/over/k5.png" alt="">
              QQ号码：{{item.CDK}}
            </div>
            <div class="fr">
              订单状态： <span class="Ra" v-if="item.State == 1">未兑换</span>
              <span class="Ra" v-if="item.State == 2">已兑换</span>
              <span class="Rb" v-if="item.State == 3">已过期</span>
            </div>
          </div>
          <div class="MyTradingRecord_most_body clearfix">
            <div class="fl">
              <p>交易时间：{{item.CreateTime}}</p>
              <!-- <p>兑换码：123456789</p> -->
              <p>所在网吧：{{item.NetbarName}}</p>
              <!-- <p>消耗积分：{{item.NetbarName }}</p> -->
            </div>
            <div class="center">
              兑换时间：{{item.OverTime}}
            </div>
            <div class="fr">
              <a @click="GotosreUrl()"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="null_W" v-else>
      <img src="@/assets/images/null.png" alt="" class="swing animated">
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
  name: "MyTradingRecord",
  data() {
    return {
      phone: '',
      pageSize: 100,
      pageNo: 1,
      total: 0,
      state: 0,
      GetReceiveLogList: [],
    };
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral", "PagesLoginIs"])
  },
  created: function() {
    this.phone = sessionStorage.getItem("phone");
    if (this.phone) {
      this.GetReceiveLogListData();
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
    GotosreUrl: function() {
      this.$router.push({
        path: '/OrderCenter/ExchangeMall'
      })
    },
    StateFun: function(index) {
      this.state = index;
      this.GetReceiveLogListData();
    },
    //获取交易记录列表
    GetReceiveLogListData: function() {
      var phone = sessionStorage.getItem("phone");
      var _this = this;
      let paramList = {
        phone: phone,
        state: this.state,
        startTime: '',
        endTime: '',
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      get("/api/Activity/GetReceiveLogList", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.GetReceiveLogList = res.Items;
          _this.total = res.Total
        }
      }).catch(err => {});
    },

  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.phone = sessionStorage.getItem("phone");
      if (this.phone) {
        this.GetReceiveLogListData();
      }
    },

  },
};
</script>
