<template>
<div class="">
  <!-- <div class="header_B" style="text-align: right;">
    <span @click="GuessRuleFun()">竞猜规则</span>
  </div> -->
  <div class="MyTradingRecord">
    <div class="MyTradingRecord_H clearfix">
      <div :class="{ 'active': state === 0 }" @click="StateFun(0)">
        全部
      </div>
      <div :class="{ 'active': state === 1 }" @click="StateFun(1)">
        进行中
      </div>
      <div :class="{ 'active': state === 2 }" @click="StateFun(2)">
        竞猜成功
      </div>
      <div :class="{ 'active': state === 3 }" @click="StateFun(3)">
        竞猜失败
      </div>
    </div>
    <div class="MyGuess_picker">
      <el-date-picker class="MyGuess_picker_a" v-model="Datevalue" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="DateChange" clearable></el-date-picker>
    </div>
    <div class="MyGuess_table" v-if="ConsumerBetList.length>0">
      <div class="MyGuess_table_min">
        <table border="1" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th> <span>竞猜开始时间</span> </th>
              <th> <span>竞猜编号</span> </th>
              <th> <span>竞猜模式</span></th>
              <th> <span>押注积分</span></th>
              <th> <span>获得积分</span></th>
              <th> <span>竞猜状态</span></th>
              <th> <span>竞猜结束时间</span></th>
            </tr>
          </thead>
          <tbody v-if="ConsumerBetList.length>0">
            <tr v-for="(item,index) in ConsumerBetList" :key="item.Id">
              <td>{{item.CreatDate}}</td>
              <td>{{item.BetOrderNumber}}</td>
              <td>{{item.BetMode}}</td>
              <td>{{item.StakeIntegral}}</td>
              <td>{{item.RewardIntegral}}</td>
              <td :class="item.State == '竞猜成功'?'active_a':item.State == '进行中'?'active_b':item.State == '竞猜失败'?'active_c':''">{{item.State}}</td>
              <td v-if="item.State == '进行中'">暂未结束</td>
              <td v-else>{{item.EndTime}}</td>
            </tr>
          </tbody>
        </table>
        <br/>
      </div>
      <el-pagination layout="prev, pager, next" :total="total" prev-text="上一页" next-text="下一页" :current-page="pageNo" @current-change="handleCurrentChange" @size-change="sizeCurrentChange" class="IwantTomakeLingshi_page">
      </el-pagination>
    </div>
    <div v-else class="null_W" style="padding-bottom: 110px;">
      <img src="@/assets/images/null.png" alt="" class="swing animated">
    </div>
  </div>
  <!-- //竞猜规则 -->
  <div v-if="isGuessRuleFun">
    <div class="dialogBox_config dialogBox_GuessRuleFun">
      <div class="bg_mouer" @click="isGuessRuleFun = false"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_GuessRuleFun_quxiao" @click="isGuessRuleFun = false"><img src="@/assets/images/GameGuess/GuessRule_quxiao1.png" /></div>
        <div class=" dialogBox_GuessRuleFun_telet">英雄联盟竞猜规则</div>
        <div class="dialogBox_GuessRuleFun_p">
          <p> 1、押注成功后，<span>8小时内</span>，，任何一局达到四杀/五杀/超神，即为竞猜成功。</p>
          <p> 2、该竞猜仅限<span>排位模式、5v5匹配模式、黄金以上段位</span>。</p>
          <p> 3、同一类游戏，多个竞猜可同时参与；同一个竞猜模式同一时间只能存在一个正在进行 的竞猜。</p>
          <p> 4、押注成功后，竞猜开始，请在8小时内完成竞猜，否则系统将该局定义为竞猜失败。</p>
          <p> 5、每个竞猜模式，每日最高可押注<span>2000</span>积分。</p>
          <p> 6、竞猜成功，额外获得押注积分的10%-100%；竞猜失败随机扣除押注积分50%-100%；</p>
          <p> 7、如使用非法软件（外挂等）或恶意影响游戏结果，平台有权禁止用户使用竞猜功能。</p>
          <p> 8、本竞猜为纯属娱乐，请勿沉迷。</p>
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
  name: "MyGuess",
  data() {
    return {
      pageSize: 10,
      pageNo: 1,
      total: 0,
      state: 0,
      startTime: '',
      endTime: '',
      Datevalue: {},
      ConsumerId: '',
      isGuessRuleFun: false,
      ConsumerBetList: [],
    };
  },
  created: function() {
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
    this.ConsumerBetListData();
  },
  methods: {
    //活动时间
    DateChange: function() {
      if (this.Datevalue) {
        var date1 = this.Datevalue[0];
        var date2 = this.Datevalue[1];
        this.startTime = this.$moment(date1).format("YYYY-MM-DD");
        this.endTime = this.$moment(date2).format("YYYY-MM-DD");
        this.ConsumerBetListData();
      } else {
        this.startTime = '';
        this.endTime = '';
        this.ConsumerBetListData();
      }
    },
    //竞猜规则
    GuessRuleFun: function() {
      this.isGuessRuleFun = true;
    },
    StateFun: function(index) {
      this.state = index;
      this.pageNo = 1;
      this.ConsumerBetListData();
    },
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.ConsumerBetListData();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.ConsumerBetListData();
    },
    //获取交易记录列表
    ConsumerBetListData: function() {
      var _this = this;
      let paramList = {
        consumerId: this.ConsumerId,
        state: this.state,
        startTime: this.startTime,
        endTime: this.endTime,
        pageIndex: this.pageNo,
        pageSize: this.pageSize
      };
      get("/api/BetRelevant/ConsumerBetList", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.ConsumerBetList = res.Items;
          _this.total = res.Total
        }
      }).catch(err => {});
    },

  },
};
</script>
