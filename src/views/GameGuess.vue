<template>
<div class="GameGuess">
  <div class="header_B" style="text-align: right;">
    <!-- <span @click="GuessRuleFun()">竞猜规则</span> -->
    <a @click="MyGuessFun()">查看我的竞猜</a>
  </div>
  <div class="GameGuess_H clearfix">
    <div :class="{ 'active': stateValue === 0 }" @click="GetCameBetListFun(0)">
      全部
    </div>
    <div :class="{ 'active': stateValue === 1 }" @click="GetCameBetListFun(1)">
      LOL竞猜
    </div>
    <div :class="{ 'active': stateValue === 2 }" @click="GetCameBetListFun(2)">
      吃鸡竞猜
    </div>
    <div :class="{ 'active': stateValue === 3 }" @click="GetCameBetListFun(3)">
      云顶之奕
    </div>
  </div>
  <div class="GameGuess_G" @click="GetExchangeMall()">
    <div class="totop"><img src="@/assets/images/GameGuess/g2.png" alt=""></div>
  </div>
  <!-- Make a div wrapped slider,set height and width  -->
  <div v-if="sliderIs">
    <div style="width:950px;margin:25px auto 0;height:600px;position: relative;" v-if="sliderGetCameBetList.length > 0">
      <a href="javascript:;" class="Left_GameGuess" @click="slidePre"></a>
      <slider ref="Slider" :options="options" @slide='slide' @tap='onTap' @init='onInit' class="GameGuess_slider_pass">
        <template slot-scope="coverflow">
          <slideritem v-for="(item,index) in sliderGetCameBetList" :pageLength="sliderGetCameBetList.length" :index="index" :key="index" style="width: 33.33333333%">
            <div class="GameGuess_div" @click="sliderClick(index)">
              <div class="GameGuess_slider">
                <div class="GameGuess_foose" v-if="!item.IsNotOrder">
                  <img src="@/assets/images/GameGuess/g8.png" alt="">
                </div>
                <div class="GameGuess_title">
                  {{item.MinTitle}}：{{item.MaxTitle}}
                </div>
                <img :src="item.ImgUrl" alt="">
                <div class="GameGuess_text">
                  该竞猜剩余可压积分：{{item.BetUesIntegral}}
                </div>
              </div>
              <div class="GameGuess_footer">
                <div class="GameGuess_a1" @click="GuessRuleFun(item.GameType)">竞猜规则</div>
                <div class="GameGuess_a2" @click="ImmediateBet(item.BetId,item.MinStake,item.BetUesIntegral)">立即押注</div>
              </div>
            </div>
          </slideritem>
        </template>
      </slider>
      <a href="javascript:;" class="Right_GameGuess" @click="slideNext"></a>
    </div>
    <div class="null_W" style="padding-top: 150px;" v-else>
      <img src="@/assets/images/null.png" alt="" class="swing animated">
    </div>
  </div>
  <!-- //我的竞猜 -->
  <div v-if="isImmediateBet">
    <div class="dialogBox_config dialogBox_ImmediateBet">
      <div class="bg_mouer" @click="isImmediateBet = false;StakeIntegral=1"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBet_quxiao" @click="isImmediateBet = false;StakeIntegral=1"><img src="@/assets/images/GameGuess/GuessRule_quxiao.png" /></div>
        <div class="dialogBox_ImmediateBet_body">
          <div class="dialogBox_ImmediateBet_a v">
            <label> 本次押注： </label>
            <el-input-number size="medium" :min="MinStake" :max="MaxBetUesIntegral" v-model="StakeIntegral"></el-input-number>
          </div>
          <div class="dialogBox_ImmediateBet_b v">
            <label>竞猜成功：</label>额外随机获得押注积分{{Math.floor(GetGameBetRatioList.MinRewardIntegral*0.01*StakeIntegral)}} - {{Math.floor(GetGameBetRatioList.MaxRewardIntegral*0.01*StakeIntegral)}}
          </div>
          <div class="dialogBox_ImmediateBet_c v">
            <label>竞猜失败：</label>随机扣除押注积分{{Math.floor(GetGameBetRatioList.MinDeductionIntegral*0.01*StakeIntegral)}} - {{Math.floor(GetGameBetRatioList.MaxDeductionIntegral*0.01*StakeIntegral)}}
          </div>
          <div class="dialogBox_ImmediateBet_btn">
            <div class="btn_a totop" @click="isImmediateBet = false;StakeIntegral=1"></div>
            <div class="btn_b totop" @click="BetOrderCreateFun"></div>
          </div>
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
          <p>还需积分：<span style="color:#D47C1A">{{StakeIntegral-AvailableIntegral}}</span></p>
        </div>
        <div class="dialogBox_isImmediateBetNo_footer">
          <a class="a_g totop" @click="GetImmediateBetNo()">去赚积分</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //押注成功 -->
  <div v-if="isImmediateBetYes">
    <div class="dialogBox_config isImmediateBetYes">
      <div class="bg_mouer" @click="isImmediateBetYes = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_ImmediateBetYes_title"> 押注成功 </div>
        <div class="dialogBox_ImmediateBetYes_body">
          <img src="@/assets/images/icon_a.png" alt="">
          <p style="color:#06AAFF">快去开始游戏吧！</p>
          <p style="color:#6B758E"> 温馨提醒：租个高端账号成功率更高哦！</p>
        </div>
        <div class="dialogBox_ImmediateBetYes_footer">
          <a class="a_g totop" @click="GetImmediateBetYes()">租个高端账号</a>
          <a class="a_w totop" @click="isImmediateBetYes = false;">取消</a>
        </div>
      </div>
    </div>
  </div>
  <!-- //竞猜规则 -->
  <div v-if="isGuessRuleFun">
    <div class="dialogBox_config dialogBox_GuessRuleFun">
      <div class="bg_mouer" @click="isGuessRuleFun = false"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_GuessRuleFun_quxiao" @click="isGuessRuleFun = false"><img src="@/assets/images/GameGuess/GuessRule_quxiao1.png" /></div>
        <div class=" dialogBox_GuessRuleFun_telet">{{GameType}}竞猜规则</div>
        <div class="dialogBox_GuessRuleFun_p" v-if="GameType=='英雄联盟'">
          <p> 1、押注成功后，<span>8小时内</span>，任何一局达到<span>四杀/五杀/超神</span>，即为竞猜成功。</p>
          <p> 2、该竞猜仅限<span>排位模式、5v5匹配模式</span>。</p>
          <p> 3、同一类游戏，多个竞猜可同时参与；同一个竞猜模式同一时间只能存在一个正在进行的竞猜。</p>
          <p> 4、押注成功后，竞猜开始，请在<span>8</span>小时内完成竞猜，否则系统将该局定义为竞猜失败。</p>
          <p> 5、每个竞猜模式，每日最高可押注<span>1000</span>积分。</p>
          <p> 6、竞猜成功，额外获得押注积分的10%-100%；竞猜失败随机扣除押注积分50%-100%；</p>
          <p> 7、如使用非法软件（外挂等）或恶意影响游戏结果，平台有权禁止用户使用竞猜功能。</p>
          <p> 8、本竞猜为纯属娱乐，请勿沉迷。</p>
        </div>
        <div class="dialogBox_GuessRuleFun_p" v-if="GameType=='绝地求生'">
          <p> 1、押注成功后，<span>8小时内</span>达到<span>吃鸡/10击杀/进入前10</span>，即为竞猜成功。</p>
          <p> 2、该竞猜仅限<span>大逃杀模式</span></p>
          <p> 3、同一类游戏，多个竞猜可同时参与；同一个竞猜模式同一时间只能存在一个正在进行的竞猜。</p>
          <p> 4、押注成功后，竞猜开始，请在<span>8</span>小时内完成竞猜，否则系统将该局定义为竞猜失败。</p>
          <p> 5、如为组队模式，则需要所有队员游戏结束后，结算该局结果。</p>
          <p> 6、每个竞猜模式，每日最高可押注<span>1000</span>积分。</p>
          <p> 6、竞猜成功，额外获得押注积分的10%-100%；竞猜失败随机扣除押注积分50%-100%；</p>
          <p> 7、如使用非法软件（外挂等）或恶意影响游戏结果，平台有权禁止用户使用竞猜功能。</p>
          <p> 8、本竞猜为纯属娱乐，请勿沉迷。</p>
        </div>
        <div class="dialogBox_GuessRuleFun_p" v-if="GameType=='云顶之奕'">
          <p> 1、押注成功后，<span>8小时内</span>达到<span>吃鸡/10击杀/进入前10</span>，即为竞猜成功。</p>
          <p> 2、该竞猜仅限<span>大逃杀模式</span></p>
          <p> 3、同一类游戏，多个竞猜可同时参与；同一个竞猜模式同一时间只能存在一个正在进行的竞猜。</p>
          <p> 4、押注成功后，竞猜开始，请在<span>8</span>小时内完成竞猜，否则系统将该局定义为竞猜失败。</p>
          <p> 5、如为组队模式，则需要所有队员游戏结束后，结算该局结果。</p>
          <p> 6、每个竞猜模式，每日最高可押注<span>1000</span>积分。</p>
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
// import slider components
import {
  slider,
  slideritem
} from 'vue-concise-slider'
export default {
  name: "GameGuess",
  data() {
    return {
      ConsumerId: '',
      GetCameBetList: [],
      GetGameBetRatioList: {}, //竞猜比例
      sliderGetCameBetList: [],
      stateValue: 0,
      sliderIs: true,
      GameType: '',
      isGuessRuleFun: false,
      isImmediateBet: false,
      isImmediateBetYes: false, //竞猜成功
      isImmediateBetNo: false, //积分不足
      BetId: '', //竞猜id
      MinStake: '', //竞猜最小值
      MaxBetUesIntegral: '', //竞猜最大值
      StakeIntegral: 1,
      //Slider configuration [obj]
      options: {
        effect: 'coverflow',
        currentPage: 0,
        thresholdDistance: 100,
        thresholdTime: 330,
        deviation: 330,
        widthScalingRatio: 0.6,
        heightScalingRatio: 0.6,
        slidesToScroll: 1,
        itemAnimation: true,
        centeredSlides: true,
        renderPagination: (h, index) => {
          return h('a', {
            class: 'swiper_Game'
          }, [index])
        },
        loop: true
      }
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
      this.GetCameBetListFun(0);
      this.GetGameBetRatioFun();
    }
  },
  methods: {
    slideNext() {
      this.$refs.Slider.$emit("slideNext");
    },
    slidePre() {
      this.$refs.Slider.$emit("slidePre");
    },
    slide: function() {

    },
    onTap: function() {

    },
    onInit: function() {

    },
    GetExchangeMall: function() {
      _hmt.push(['_trackEvent', '游戏竞猜页面', '点击量', '竞猜页面主图']);
      this.$router.push({
        path: "/OrderCenter/ExchangeMall"
      });
    },
    //我的竞猜
    MyGuessFun: function() {
      this.$router.push({
        path: "/OrderCenter/GameGuess/MyGuess"
      });
    },
    //竞猜规则
    GuessRuleFun: function(GameType) {
      _hmt.push(['_trackEvent', '游戏竞猜页面', '点击量', '竞猜规则按钮']);
      this.GameType = GameType;
      this.isGuessRuleFun = true;
    },
    //点击
    sliderClick: function(index) {
      this.$refs.Slider.$emit('slideTo', index)
    },
    //切换
    HoverStateFun: function() {

    },
    GetCameBetListFun: function(gameType) {
      this.sliderIs = false;
      this.stateValue = gameType;
      var _this = this;
      let paramList = {
        consumerId: this.ConsumerId,
        gameType: this.stateValue
      };
      get("/api/BetRelevant/GetCameBetList", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.options.currentPage = parseInt(res.Object.length / 2);
          _this.sliderGetCameBetList = res.Object;
          _this.sliderIs = true;
        }
      }).catch(err => {});
    },
    //获取竞猜列表_____不刷新
    _GetCameBetListFun: function() {
      var _this = this;
      let paramList = {
        consumerId: this.ConsumerId,
        gameType: this.stateValue
      };
      get("/api/BetRelevant/GetCameBetList", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.sliderGetCameBetList = res.Object;
        }
      }).catch(err => {});
    },
    //获取竞猜比例
    GetGameBetRatioFun: function(index) {
      var _this = this;
      let paramList = {};
      get("/api/BetRelevant/GetGameBetRatio", paramList).then(res => {
        if (res.StatusCode == 200) {
          _this.GetGameBetRatioList = res.Object;
        }
      }).catch(err => {});
    },
    //立即押注
    ImmediateBet: function(BetId, MinStake, MaxBetUesIntegral) {
        _hmt.push(['_trackEvent', '游戏竞猜页面', '点击量', '立即押注按钮']);
      this.isImmediateBet = true;
      this.BetId = BetId;
      this.MinStake = MinStake;
      this.MaxBetUesIntegral = MaxBetUesIntegral
    },
    //确定押注
    BetOrderCreateFun: function() {
        _hmt.push(['_trackEvent', '游戏竞猜页面', '点击量', '确定押注']);
      if (this.AvailableIntegral >= this.StakeIntegral) {
        var _this = this;
        let paramList = {
          BetId: this.BetId,
          ConsumerId: this.ConsumerId,
          StakeIntegral: this.StakeIntegral,
          NetbarId: this.NetBarId
        };
        post("/api/BetRelevant/BetOrderCreate", paramList).then(res => {
          if (res.StatusCode == 200) {
            _this._GetCameBetListFun();
            this.$store.dispatch('GetUserInfo').then(() => {
              _this.isImmediateBet = false;
              _this.isImmediateBetYes = true;
            }).catch(() => {})
          }
        }).catch(err => {});
      } else {
        this.isImmediateBet = false;
        this.isImmediateBetNo = true;
      }
    },
    //去赚积分
    GetImmediateBetNo: function() {
      this.$router.push({
        path: "/OrderCenter/ExchangeMall/IwantTomakeLingshi"
      });
    },
    //押注成功
    GetImmediateBetYes: function() {
      this.isImmediateBetYes = false;
      Extern_Form_ShowNumWindows(1);
      Extern_Form_RunJsInNumWindows(1, 'WPopupthemainPage', false);
    }
  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      if (this.ConsumerId) {
        this.GetCameBetListFun(0);
        this.GetGameBetRatioFun();
      }
    },

  },
}
</script>
