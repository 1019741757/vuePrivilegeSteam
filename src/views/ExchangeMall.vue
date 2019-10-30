<template>
<div class="ExchangeMall">
  <div class="header_B">
    <span @click="IwantTomakeLingshi()">我要赚积分</span>
    <a @click="MyTradingRecordUrl()">我的交易记录</a>
    <span @click="WhatisLingshi()">积分规则介绍</span>
  </div>
  <div class="ExchangeMall_ul Overflow">
    <div class="ExchangeMall_li" v-for="item in ExchangeMallList" @click="ExchangeMallFun(item)">
      <div class="ExchangeMall_wa">{{item.NetFee}}</div>
      <div class="ExchangeMall_img" v-if="item.type == 'Netfee'"> <img src="@/assets/images/OverVIP/icon-10.png" alt></div>
      <div class="ExchangeMall_img" v-else> <img src="@/assets/images/OverVIP/Qcoins.png" alt></div>
      <div class="ExchangeMall_sher"> 需积分：{{item.Lingshi}} </div>
    </div>
  </div>
  <!-- //确认 Q Q号码 -->
  <div v-if="ConfirmQQnumber">
    <div class="dialogBox_config isImmediateBetYes">
      <div class="bg_mouer" @click="ConfirmQQnumber = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBetYes_title">兑换Q币</div>
        <div class="dialogBox_ImmediateBetYes_body">
          <div class="QQnumber">QQ账号：<input type="text" name="QQvalue" v-model="QQvalue" placeholder="请输入接收的QQ账号"></div>
        </div>
        <div class="dialogBox_ImmediateBetYes_footer">
          <a class="a_g totop" @click="ConfirmQQnumberFun()"> 确认 </a>
          <a class="a_w totop" @click="ConfirmQQnumber = false;QQvalue=null">取消</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //确认Q币兑换信息 -->
  <div v-if="ConfirmationInformation">
    <div class="dialogBox_config isImmediateBetYes">
      <div class="bg_mouer" @click="ConfirmQQnumber = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBetYes_title">确认信息</div>
        <div class="dialogBox_ImmediateBetYes_body">
          <div class="ConfirmationInformation">
            <p>接收Q币的账号为：{{QQvalue}}</p>
            <p>兑换的商品为：{{item.NetFee}}</p>
            <p>需消耗积分：{{item.Lingshi}}</p>
          </div>
        </div>
        <div class="dialogBox_ImmediateBetYes_footer">
          <a class="a_g totop" @click="ConfirmationInformationFun()"> 确定兑换 </a>
          <a class="a_w totop" @click="ConfirmationInformation = false;">再想想</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //确认是否兑换 -->
  <div v-if="SubminExchangeMallFunBox">
    <div class="dialogBox_config isImmediateBetYes">
      <div class="bg_mouer" @click="SubminExchangeMallFunBox = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBetYes_title"> </div>
        <div class="dialogBox_ImmediateBetYes_body">
          <br>
          <br>
          <p style="color:#06AAFF">确认兑换吗 ？</p>
          <br>
        </div>
        <div class="dialogBox_ImmediateBetYes_footer">
          <a class="a_g totop" @click="SubminExchangeMallFun()"> 确认 </a>
          <a class="a_w totop" @click="SubminExchangeMallFunBox = false;">取消</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //网费兑换  网吧未开通活动-->
  <div v-if="isDialog">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <img src="@/assets/images/Activity/w1.png" class="img_yw swing animated">
        <p>该网吧暂未开通网费兑换功能，</p>
        <p> 请联系网吧管理员开通！ </p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn center_vv" @click="isDialog=false"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //积分不足 -->
  <div v-if="isImmediateBetNo">
    <div class="dialogBox_config isImmediateBetNo">
      <div class="bg_mouer" @click="isImmediateBetNo = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_isImmediateBetNo_title"> 积分不足 </div>
        <div class="dialogBox_isImmediateBetNo_body">
          <p>当前积分：<span style="color:#06AAFF">{{AvailableIntegral}}</span></p>
          <p>还需积分：<span style="color:#D47C1A">{{HcLingshi}}</span></p>
        </div>
        <div class="dialogBox_isImmediateBetNo_footer">
          <a class="a_g totop" @click="GetImmediateBetNo()">去赚积分</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //兑换成功 -->
  <div v-if="isImmediateBetYes">
    <div class="dialogBox_config isImmediateBetYes">
      <div class="bg_mouer" @click="isImmediateBetYes = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBetYes_title"> 兑换成功 </div>
        <div class="dialogBox_ImmediateBetYes_body">
          <img src="@/assets/images/icon_a.png" alt="">
          <br>
          <br>
          <p style="color:#06AAFF">兑换成功，请注意查收</p>
          <br>
        </div>
        <div class="dialogBox_ImmediateBetYes_footer">
          <a class="a_g totop" @click="GetImmediateBetYes()"> 兑换记录 </a>
          <a class="a_w totop" @click="isImmediateBetYes = false;">取消</a>
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
import Clipboard from "clipboard";
import {
  Message
} from "element-ui";
import {
  get,
  post
} from "@/utils/ajax";

export default {
  name: "ExchangeMall",
  data() {
    return {
      isDialog: false,
      isImmediateBetNo: false,
      isImmediateBetYes: false,
      SubminExchangeMallFunBox: false,
      ConfirmQQnumber: false,
      ConfirmationInformation: false,
      QQvalue: "",
      item: '',
      HcLingshi: 0,
      ExchangeMallList: [{
        ActivityId: 12,
        type: "Qcoins",
        NetFee: 'Q币10枚',
        Lingshi: 1000
      }, {
        ActivityId: 13,
        type: "Qcoins",
        NetFee: 'Q币15枚',
        Lingshi: 1500
      }, {
        ActivityId: 14,
        type: "Qcoins",
        NetFee: 'Q币25枚',
        Lingshi: 2500
      }, {
        ActivityId: 5,
        type: "Netfee",
        NetFee: '网费5元',
        Lingshi: 250
      }, {
        ActivityId: 6,
        type: "Netfee",
        NetFee: '网费10元',
        Lingshi: 500
      }, {
        ActivityId: 7,
        type: "Netfee",
        NetFee: '网费20元',
        Lingshi: 1000
      }, {
        ActivityId: 8,
        type: "Netfee",
        NetFee: '网费50元',
        Lingshi: 2500
      }, {
        ActivityId: 10,
        type: "Netfee",
        NetFee: '网费100元',
        Lingshi: 5000
      }, {
        ActivityId: 11,
        type: "Netfee",
        NetFee: '网费200元',
        Lingshi: 10000
      }]
    };
  },
  computed: {
    ...mapGetters(["NetBarId", "NetBarVIP", "NetBarActivity", "AvailableIntegral"])
  },
  created: function() {

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
    ExchangeMallFun: function(item) {
      console.log(item);
      _hmt.push(['_trackEvent', '兑换商城', '点击量', '立即兑换']);
      if (this.NetBarActivity || item.type == 'Qcoins') {
        if (item.Lingshi <= this.AvailableIntegral) {
          this.item = item;
          if (item.type == "Netfee") {
            this.SubminExchangeMallFunBox = true;
          } else {
            this.ConfirmQQnumber = true;
          }

        } else {
          this.HcLingshi = item.Lingshi - this.AvailableIntegral;
          this.isImmediateBetNo = true;
        }
      } else {
        this.isDialog = true;
      }
    },
    SubminExchangeMallFun: function() {
      let paramList = {
        Phone: sessionStorage.getItem("phone"),
        NetbarId: this.NetBarId,
        ActivityId: this.item.ActivityId
      };
      var _this = this;
      post("/api/Activity/ExchangeMall", paramList).then(res => {
        _this.$store.dispatch('GetUserInfo').then(() => {
          _this.SubminExchangeMallFunBox = false;
          _this.isImmediateBetYes = true;
        }).catch(() => {})
      }).catch(err => {});
    },
    //去赚积分
    GetImmediateBetNo: function() {
      this.$router.push({
        path: "/OrderCenter/ExchangeMall/IwantTomakeLingshi"
      });
    },
    //兑换记录
    GetImmediateBetYes: function() {
      this.$router.push({
        path: "/OrderCenter/ExchangeMall/MyTradingRecord"
      });
    },
    //确认qq号码
    ConfirmQQnumberFun: function() {
      if (!this.QQvalue) {
        Message({
          message: "请输入QQ号码",
          type: "warning"
        });
      } else {
        this.ConfirmQQnumber = false;
        this.ConfirmationInformation = true;
      }
    },
    //确认信息
    ConfirmationInformationFun: function() {
      let paramList = {
        Phone: sessionStorage.getItem("phone"),
        NetbarId: this.NetBarId,
        ActivityId: this.item.ActivityId,
        QQ: this.QQvalue
      };
      var _this = this;
      post("/api/Activity/ExchangeMall", paramList).then(res => {
        _this.$store.dispatch('GetUserInfo').then(() => {}).catch(() => {})
        _this.ConfirmationInformation = false;
        _this.ConfirmQQnumber = false;
        Message({
          message: "兑换成功",
          type: "success"
        });
      }).catch(err => {});
    },
  },
};
</script>
