<template>
<div class="">
  <div class="header_B">
    <span @click="IwantTomakeLingshi()">我要赚积分</span>
    <a @click="MyTradingRecordUrl()">我的兑换记录</a>
    <span @click="WhatisLingshi()">积分规则介绍</span>
  </div>
  <div class="TextDetails OrderCenter_ul">
    <div class="TextDetails_D">
      <div class="TextDetails_title"> 积分规则介绍 </div>
      <div class="TextDetails_body">
        <p>Q：如何使用积分？</p>
        <p class="A">A：积分可以前往积分商城兑换网费、话费、Q币、各类折扣卷、热门游戏点劵等，还可用于抽奖、游戏竞猜等功能。</p>
        <br/>
        <br/>
        <p>Q：怎么获取积分？</p>
        <p class="A">A：所有用户可以通过参与包括但不限于每日任务、平台活动、玩游戏、参与赛事等各色580游戏特权的活动途径获得积分。</p>
        <br/>
        <br/>
        <p>Q：积分可以赠送到另个账号吗？</p>
        <p class="A">A：如无特殊活动，积分不支持账户之间的转换。</p>
        <br/>
        <br/>
        <p>Q：积分的有效时长是多久？</p>
        <p class="A">A：积分的有效期为永久，如出现重大变更会提前公示告知用户。</p>
        <br/>
        <p style="text-align:right;color: #b07529;">-最终解释权归580网吧特权所有-</p>

      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TextDetails",
  data() {
    return {
      TextDetailsIndex: '1'
    };
  },
  created: function() {
    this.TextDetailsIndex = this.$route.query.TextDetailsIndex || '';
    console.log(this.TextDetailsIndex);
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

  },
};
</script>
