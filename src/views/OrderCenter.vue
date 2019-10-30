<template>
<div class="OrderCentert">
  <div class="OrderCentert_header clearfix noselect">
    <div class="OrderCentert_h5" @mousedown.stop="mouse_down()" @mouseup.stop="mouse_move()">{{titleName}}</div>
    <div class="OrderCentert_over">
      <div class="m2" v-if="PagesLoginIs">
        <img :src="HeadImgUrl" alt="" class="m1">
        <span>{{NickName}}</span>&nbsp;
        <a class="a1" @click="MyTradingRecord">
          <img src="@/assets/images/OverVIP/icon-9.png" alt=""> 积分: {{AvailableIntegral}}
        </a>
        &nbsp;
        <a class="a2" @click="TextDetails">
          <i class="icon iconfont icon-yiwen"></i>
          <div class="HomePage_lead HomePage_lead_order">
            <div class="HomePage_arrow"></div>
            <div class="HomePage_sreicv">
              <p>点击查看如何使用积分！</p>
            </div>
          </div>
        </a>

      </div>
      <div class="m2" v-else>
        <img src="@/assets/images/OverVIP/tou.png" alt="" class="m1">
        &nbsp;您好!&nbsp;<span @click="PleaseLogin">请登录</span>
      </div>
    </div>
    <!-- <div class="OrderCentert_IwantTomakeLingshi">
      <span @click="IwantTomakeLingshi()">我要赚积分</span>
    </div> -->
  </div>

  <div class="OrderCentert_body">
    <div class="OrderSeveout fl">
      <div class="OrderSeveout_tabeer noselect">
        <i class="iconfont icon-return" @click="$router.go(-1)"></i> &nbsp;&nbsp;&nbsp;
        <i class="iconfont icon-enter" @click="$router.go(1)"></i> &nbsp;&nbsp;
        <i class="iconfont icon-icon-- iconMou" @click="getrouer()"></i>&nbsp;
      </div>
      <div class="OrderSeveout_over" v-if="PagesLoginIs" @click="getRankingList()">
        <div class="OrderSeveout_myzhan">胜点排名</div>
        <div class="OrderSeveout_myrogg" style="margin: 15px 0;">
          <div class="OrderSeveout_gmedd">
            <span style="font-size:24px;line-height: 41px;" v-if="GamerankingPUGB">{{GamerankingPUGB}}</span>
            <span v-else>暂无排名</span>
          </div>
          <!-- <div class="OrderSeveout_gmerr">
            <span v-if="GamerankingLOL">胜点数：{{GamerankingLOL}}</span>
            <span v-else>胜点数：暂无胜点</span>
          </div> -->
        </div>
        <div class="OrderSeveout_myOutr totop"></div>
      </div>
      <div class="OrderSeveout_over OrderSeveout_meur" @click="PleaseLogin" v-else>
        <img src="@/assets/images/OverVIP/tou1.png" alt="" class="m1">
        <p class="p1">您好！<span>请登录</span></p>
      </div>
      <div class="OrderSeveout_router">
        <router-link to="/OrderCenter/HomepageSelection" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="icon iconfont icon-zhuye"></i> 主页精选&nbsp;
        </router-link>
        <router-link to="/OrderCenter/PrizetakingActivities" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="icon iconfont icon-jiangpin"></i> 领网费&nbsp;&nbsp;&nbsp;&nbsp;
        </router-link>
        <router-link to="/OrderCenter/MyGame" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="icon iconfont icon-weibiaoti2fuzhi12"></i> 我的游戏&nbsp;
        </router-link>
        <router-link to="/OrderCenter/ExchangeMall" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="icon iconfont icon-weibiaoti2fuzhi14"></i> 兑换商城&nbsp;
        </router-link>
        <router-link to="/OrderCenter/GameGuess" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="icon iconfont icon-jingcai"></i> 游戏竞猜&nbsp;
        </router-link>
        <router-link to="/OrderCenter/InternetCafeCompetition" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="iconfont icon-94"></i> 网吧电竞&nbsp;
        </router-link>
        <router-link to="/OrderCenter/Feedback" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <i class="iconfont icon-yijianfankui1"></i> 意见反馈&nbsp;
        </router-link>
      </div>
      <div class="OrderSeveout_LuckDraw">
        <router-link to="/OrderCenter/LuckDraw" tag="div" active-class="OrderSeveout_li_class zoomIn animated" class="OrderSeveout_li">
          <img src="@/assets/images/LuckDraw/13.png" />
        </router-link>
      </div>
    </div>
    <div class="OrderCenter fr">
      <router-view v-if="isRouterOrder"></router-view>
    </div>
  </div>
  <We-Chat-Verification-Box v-if="PleaseLoginIs" :isVisible.sync="PleaseLoginIs" @MobilePhoneBox="PleaseLoginFun"></We-Chat-Verification-Box>
  <We-Chat-Verification-Box v-if="RouterLoginIs" :isVisible.sync="RouterLoginIs" @MobilePhoneBox="RouterLoginFun"></We-Chat-Verification-Box>
  <We-Chat-Verification-Box-My v-if="MyPleaseLoginIs" :isVisible.sync="MyPleaseLoginIs" @MobilePhoneBox="PleaseLoginFun"></We-Chat-Verification-Box-My>
  <!-- //成功登录 手机二维码公众号 -->
  <div v-if="isQRCode">
    <div class="dialogBox_config isQRCode">
      <div class="bg_mouer" @click="QRCodeFun"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="isQRCode_quxiao" @click="QRCodeFun"><img src="@/assets/images/LuckDraw/z4.png" /></div>
        <div class="isQRCode_img">
          <img src="@/assets/images/LuckDraw/code.jpg" />
        </div>
      </div>
    </div>
  </div>
  <!-- //成功登录 签到 -->
  <div v-if="isSuccessfulLogin">
    <div class="dialogBox_config isSuccessfulLogin">
      <div class="bg_mouer" @click="SuccessfulLoginFun"></div>
      <div class="dialogBox-container flipInY animated">
        <div class="isSuccessfulLogin_quxiao" @click="SuccessfulLoginFun"><img src="@/assets/images/OverVIP/success1.png" /></div>
        <div class="isSuccessfulLogin_bodu">
          <p>登录成功获得积分</p>
          <span> + 5 </span>
        </div>
      </div>
    </div>
  </div>
  <!-- //战绩排名 &&&&&&&&&&&成功登录以后  -->
  <div v-if="isAchievementRanking">
    <div class="dialogBox_config dialogBox_AchievementRanking">
      <div class="bg_mouer" @click="isAchievementRanking = false"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="dialogBox_AchievementRanking_quxiao" @click="isAchievementRanking = false"><img src="@/assets/images/GameGuess/GuessRule_quxiao.png" /></div>
        <div class="dialogBox_AchievementRanking_body">
          <div class="dialogBox_AchievementRanking_text" v-if="strDate>=1&&strDate<=10">
            勇士，欢迎你！新月排行榜已经开始！<br />
            丰厚积分等你来拿，精美礼品等你来领，<br />
            秀操作，秀技术，还能额外拿积分<br />
            <p>温馨提醒：租个高端账号，上分更快</p>
          </div>
          <div class="dialogBox_AchievementRanking_text" v-if="strDate>=11&&strDate<=20">
            勇士，你来啦！新月排行榜正在火爆进行中！<br />
            丰厚积分等你来拿，精美礼品等你来领，<br />
            秀操作，秀技术，还能额外拿积分<br />
            <p>温馨提醒：没有账号吃鸡？那就买个号吧!</p>
          </div>
          <div class="dialogBox_AchievementRanking_text" v-if="strDate>=21&&strDate<=31">
            欢迎回来！新月排行榜即将结束！<br />
            赶紧上分冲榜吧！<br />
            <br />
            <p>温馨提醒：离高分上榜，你只差一个高端账号！</p>
          </div>
          <div class="dialogBox_AchievementRanking_btn">
            <div class="btn_a totop" @click="GGAchievementRanking" v-if="strDate>=11&&strDate<=20"></div>
            <div class="btn_b totop" @click="GGAchievementRanking" v-else></div>
            <div class="btn_c totop" @click="isAchievementRanking = false"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- //新手指引 -->
  <div v-if="isNewFingerGuide">
    <div class="dialogBox_config dialogBox_isNewFingerGuide">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container flipInY animated">
        <img src="@/assets/images/youtou.png" alt="" @click="NewFingerGuideClose">
        <span class="totop" @click="NewFingerGuideClose"></span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Clipboard from "clipboard";
import {
  get,
  post
} from "@/utils/ajax";
import {
  mapGetters
} from "vuex";
import WeChatVerificationBox from '../components/WeChatVerification.vue' //微信二维码验证
import WeChatVerificationBoxMy from '../components/WeChatVerificationMy.vue' //微信二维码验证

export default {
  name: "OrderCenter",
  data() {
    return {
      Phone: '',
      titleName: '',
      isRouterOrder: true,
      PleaseLoginIs: false,
      RouterLoginIs: false,
      MyPleaseLoginIs: false,
      RouterLoginUrl: '',
      isAchievementRanking: false,
      strDate: '',
    };
  },
  components: {
    WeChatVerificationBox,
    WeChatVerificationBoxMy
  },
  computed: {
    ...mapGetters(["NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "HeadImgUrl", "NickName", "AvailableIntegral", "isSuccessfulLogin", "PagesLoginIs", "GamerankingPUGB", "GamerankingLOL", "isNewFingerGuide", "isQRCode"])
  },
  created: function() {
    Extern_Form_SetWindowsNum(2);
    var date = new Date();
    this.strDate = date.getDate();
    this.titleName = this.$route.name;
    this.Phone = sessionStorage.getItem("phone");
    var _this = this;
    if (sessionStorage.getItem("phone")) {
      this.$store.dispatch('GetUserInfo').then(() => {
        this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
      }).catch(() => {});
    } else {
      var Phone = this.$route.query.Phone;
      if (Phone) {
        sessionStorage.setItem("phone", Phone);
        this.$store.dispatch('GetUserInfo').then(() => {
          this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
        }).catch(() => {});
      } else {
        var routePath = this.$route.path;
        if (routePath == '/OrderCenter/HomepageSelection' || routePath == '/OrderCenter/InternetCafeCompetition') {
          this.MyPleaseLoginIs = false;
          sessionStorage.setItem("HomepageLosinIs", true);
          if (routePath == '/OrderCenter/HomepageSelection' && sessionStorage.getItem("HomepageLosinIs")) {
            this.PleaseLoginIs = true;
          }
        } else {
          this.MyPleaseLoginIs = true;
        }
      }
    }
    //获取签到
    window.setTimeout(function() {

      var ConsumerId = sessionStorage.getItem("ConsumerId");
      if (ConsumerId) {
        _this.$store.dispatch('GetCompleteTask', ConsumerId).then(() => {}).catch(() => {});
      }
    }, 2000);
  },
  methods: {
    IwantTomakeLingshi: function() {
      this.$router.push({
        path: '/OrderCenter/ExchangeMall/IwantTomakeLingshi'
      })
    },
    //登录有奖 弹框关闭
    SuccessfulLoginFun: function() {
      clearTimeout(window.animate); //清除定时器
      this.$store.commit('SET_ISSUCCESSFUILOGIN', false);
      var _this = this;
      setTimeout(function() {
        _this.$store.commit('SET_ISNEWFINGERGUIDE', true);
      }, 3000);
    },
    NewFingerGuideClose: function() {
      this.$store.commit('SET_ISNEWFINGERGUIDE', false);
      this.$store.commit('SET_ISQRCODE', true);
      var _this = this;
      // setTimeout(function() {
      //   _this.$store.commit('SET_ISQRCODE', false);
      // }, 3000);
    },
    QRCodeFun:function(){
        this.$store.commit('SET_ISQRCODE', false);
    },
    GGAchievementRanking: function() {
      this.isAchievementRanking = false;
      _hmt.push(['_trackEvent', '登录成功', '点击量', '去租高端账号']);
      Extern_Form_open_GG();
    },
    //鼠标拖动
    mouse_down: function() {
      Extern_Form_caption_click("down");
    },
    //鼠标松开
    mouse_move: function() {
      Extern_Form_caption_click("up");
    },
    getrouer: function() {
      const loading = this.$loading({
        lock: true,
        text: '刷新中...',
        spinner: 'el-icon-loading',
        customClass: 'loading_tour',
        background: 'rgba(6, 6, 6, 0.7)'
      });
      var path = this.$route.path;
      this.isRouterOrder = false;
      this.$nextTick(function() {
        this.$router.push({
          path: path
        });
        this.isRouterOrder = true
      })
      if (sessionStorage.getItem("phone")) {
        this.$store.dispatch('GetUserInfo').then(() => {
          this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
        }).catch(() => {});
      }
      setTimeout(() => {
        loading.close();
      }, 300);
    },
    PleaseLogin: function() {
      _hmt.push(['_trackEvent', '个人中心_战绩排名', '点击量', '请登录']);
      this.PleaseLoginIs = true;
    },
    PleaseLoginFun: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      this.$store.dispatch('GetCompleteTask', UserInformation.ConsumerId).then(() => {}).catch(() => {});
    },
    RouterLoginFun: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      this.$store.dispatch('GetCompleteTask', UserInformation.ConsumerId).then(() => {}).catch(() => {});
    },
    getRankingList: function() {
      _hmt.push(['_trackEvent', '个人中心_顶部', '点击量', '我的竞赛排名']);
      this.$router.push({
        path: '/OrderCenter/TheSumRankingList'
      });
    },
    TextDetails: function() {
      _hmt.push(['_trackEvent', '个人中心_顶部', '点击量', '积分规则介绍']);
      this.$router.push({
        path: '/OrderCenter/TextDetails?TextDetailsIndex=1'
      });
    },
    MyTradingRecord: function() {
      _hmt.push(['_trackEvent', '个人中心_顶部', '点击量', '积分值']);
      this.$router.push({
        path: '/OrderCenter/ExchangeMall/IwantTomakeLingshi',
        query: {
          Pakshow: Date.now()
        }
      });
    },
    //获取用户排名
    GettingUserRanking: function() {
      //【我的当前排名】
      this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    $route(to, from) {
      this.titleName = to.name;
      _hmt.push(['_trackEvent', '个人中心_页面访问量', '点击量', to.name]);
      if (sessionStorage.getItem("phone")) {
        this.$store.dispatch('GetUserInfo').then(() => {
          this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
        }).catch(() => {});
      } else {
        var Phone = this.$route.query.Phone;
        if (Phone) {
          sessionStorage.setItem("phone", Phone);
          this.$store.dispatch('GetUserInfo').then(() => {
            this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
          }).catch(() => {});
        } else {
          var routePath = this.$route.path;
          if (routePath == '/OrderCenter/HomepageSelection' || routePath == '/OrderCenter/InternetCafeCompetition') {
            this.MyPleaseLoginIs = false;
          } else {
            this.MyPleaseLoginIs = true;
          }
        }
      }
    },
    PagesLoginIs: function(to, from) {
      if (sessionStorage.getItem("phone")) {
        this.MyPleaseLoginIs = false;
      }
    },

  },
};
</script>
