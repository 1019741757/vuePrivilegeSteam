<template>
<div class="">
  <div class="InternetCafeCompetition_menu">
    <div class="InternetCafeCompetition_dl">
      <div :class="[scrollTop>=0&&scrollTop<389 ? 'activeClass' : '','InternetCafeCompetition_dd','clearfix']" @click="ScrollIntoView('InternetCafeCompetition_li_a')">
        <p></p>
        <span>活动奖励</span>
        <a></a>
      </div>
      <div :class="[scrollTop>=389&&scrollTop<900 ? 'activeClass' : '','InternetCafeCompetition_dd','clearfix']" @click="ScrollIntoView('InternetCafeCompetition_li_b')">
        <p></p>
        <span>活动规则</span>
        <a></a>
      </div>
      <div :class="[scrollTop>=900&&scrollTop<1600 ? 'activeClass' : '','InternetCafeCompetition_dd','clearfix']" @click="ScrollIntoView('InternetCafeCompetition_li_d')">
        <p></p>
        <span>获取奖励</span>
        <a></a>
      </div>
      <div :class="[scrollTop>=1600&&scrollTop<1930 ? 'activeClass' : '','InternetCafeCompetition_dd','clearfix']" @click="ScrollIntoView('InternetCafeCompetition_li_e')">
        <p></p>
        <span>活动参与</span>
        <a></a>
      </div>
    </div>
  </div>
  <div class="InternetCafeCompetition_feir fadeInRight animated">
    <span class="baomingf totop" @click="PleaseLogin()" v-if="!PagesLoginIs"></span>
    <span class="baomingf2 totop" @click="RouterzanjiBox()" v-else></span>
    <!-- <span class="baomingf3 totop" @click="RouterLoginIsBox()"></span> -->
  </div>
  <div class="InternetCafeCompetition_uews fadeInRight animated" @click="JoinQQgroup()">
    <span class="baomingf4 totop"></span>
  </div>
  <div class="InternetCafeCompetition Overflow" id="InternetCafeCompetition">
    <!-- <div class="InternetCafeCompetition_div">
        <img src="@/assets/images/OverVIP/Internet.png" alt>
      </div> -->

    <div class="InternetCafeCompetition_ul" id="InternetCafeCompetition_ul">
      <div class="InternetCafeCompetition_li_a">
        <div class="InternetCafeCompetition_term">
          <p>{{GetMatchConfigureList.Title}}</p>
        </div>
      </div>
      <div class="InternetCafeCompetition_li_b">
        <div class="table">
          <table border="1">
            <tr>
              <th>榜单名次</th>
              <th>奖励</th>
            </tr>
            <tr v-for="(item,index) in GetMatchConfigureList.Bonus">
              <td v-if="item.Max != item.Min">第{{item.Min}}-{{item.Max}}名</td>
              <td v-else>第{{item.Min}}名</td>
              <td>{{item.Money}}元现金奖励</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="InternetCafeCompetition_li_c">
        <!-- <span class="totop" @click="getRankingList()"></span> -->
      </div>
      <div class="InternetCafeCompetition_li_d"></div>
      <div class="InternetCafeCompetition_li_e"></div>
      <!-- <div class="InternetCafeCompetition_li_f"></div> -->
      <!-- <div class="InternetCafeCompetition_li_g">
          <span class="totop" @click="PleaseLogin()" v-if="!PagesLoginIs"></span>
          <div v-else> <img src="@/assets/images/InternetCafeCompetition/a10.png" /></div>
        </div>
        <div class="InternetCafeCompetition_li_h"></div> -->
    </div>
    <We-Chat-Verification-Box v-if="PleaseLoginIs" :isVisible.sync="PleaseLoginIs" @MobilePhoneBox="PleaseLoginFun"></We-Chat-Verification-Box>
    <We-Chat-Verification-Box v-if="RouterLoginIs" :isVisible.sync="RouterLoginIs" @MobilePhoneBox="RouterLoginFun"></We-Chat-Verification-Box>
    <!-- //扫描二维码 -->
    <div v-if="isGenerateQRcode">
      <div class="dialogBox_config dialogBox_InternetCafeCompetition">
        <div class="bg_mouer" @click="isGenerateQRcode = false"></div>
        <div class="dialogBox-container flipInX animated">
          <div class="dialogBox_InternetCafeCompetition_quxiao" @click="isGenerateQRcode = false;"><img src="@/assets/images/GameGuess/GuessRule_quxiao.png" /></div>
          <div id="qrcode" ref="qrcode"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import QRCode from 'qrcodejs2'
import {
  get,
  post
} from "@/utils/ajax";
import {
  mapGetters
} from "vuex";
import WeChatVerificationBox from '../components/WeChatVerification.vue' //微信二维码验证
export default {
  name: "InternetCafeCompetition",
  data() {
    return {
      ConsumerId: '',
      PleaseLoginIs: false,
      RouterLoginIs: false,
      isGenerateQRcode: false,
      GetMatchConfigureList: {},
      scrollTop: 0,
    };
  },
  components: {
    WeChatVerificationBox
  },
  computed: {
    ...mapGetters(["NetBarId", "PagesLoginIs"])
  },
  created: function() {
    this.GetMatchConfigureListFun();
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
  },
  mounted() {
    var InternetCafeCompetition = document.getElementById('InternetCafeCompetition');
    var _this = this;
    InternetCafeCompetition.addEventListener('scroll', function() {
      _this.scrollTop = this.scrollTop;
    });
  },
  methods: {
    ScrollIntoView: function(className) {
      document.getElementsByClassName(className)[0].scrollIntoView();
    },
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
    RouterzanjiBox: function() {
      _hmt.push(['_trackEvent', '网吧电竞页面', '点击量', '查看我的战绩']);
      this.$router.push({
        path: '/OrderCenter/TheSumRankingList'
      });
    },
    getRankingList: function() {
      this.$router.push({
        path: '/OrderCenter/RankingList'
      });
    },
    PleaseLogin: function() {
      _hmt.push(['_trackEvent', '网吧电竞页面', '点击量', '我要报名']);
      if (!sessionStorage.getItem("phone")) {
        this.PleaseLoginIs = true;
      } else {

      }
    },
    PleaseLoginFun: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      this.$store.dispatch('GetCompleteTask', UserInformation.ConsumerId).then(() => {}).catch(() => {});
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
    },
    RouterLoginIsBox: function() {
      if (!sessionStorage.getItem("phone")) {
        this.RouterLoginIs = true;
      } else {
        this.isGenerateQRcode = true;
        this.$nextTick(() => {
          this.qrcode()
        })
      }
    },
    RouterLoginFun: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      this.$store.dispatch('GetCompleteTask', UserInformation.ConsumerId).then(() => {}).catch(() => {});
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      this.isGenerateQRcode = true;
      this.$nextTick(() => {
        this.qrcode()
      })
    },
    qrcode() {
      let qrcode = new QRCode('qrcode', {
        width: 150, // 设置宽度，单位像素
        height: 150, // 设置高度，单位像素
        text: 'http://tweixin.580tequan.com/activity/Share?consumerId=' + this.ConsumerId + '&netbarid=' + this.NetBarId // 设置二维码内容或跳转地址
      })
    },
    //添加到qq群
    JoinQQgroup: function() {
      _hmt.push(['_trackEvent', '网吧电竞页面', '点击量', '添加到qq群']);
      Extern_Form_open_ie_url('https://shang.qq.com/wpa/qunwpa?idkey=d4f93ba8c8b014372861b191b288ca55c4f1c85067a679433838e2557ca3e4da');
    }

  },
  watch: {

  }
};
</script>
