<template>
<div :class="NetBarVIP?'GameListVIP':'GameList'">
  <div class="GameList_header clearfix">
    <div class="header clearfix" @mousedown.stop="mouse_down()" @mouseup.stop="mouse_move()">
      <div class="header_logo fl  noselect">
        <div class="felr">
          <img src="@/assets/images/OverVIP/activity.png" alt="" style="padding-top: 8px;">
        </div>
        <div class="roue">
          <div class="header_h5">{{NetBarName}}</div>
          <p v-if="NetBarVIP">STEAM特权—钻石版</p>
          <p v-else>STEAM特权—黄金版</p>
        </div>
      </div>
    </div>
    <div class="header_page noselect" @click.stop="getrouer()">首页</div>
    <a class="GameList_headUrl noselect" style="left:380px;" @click.stop="Oneyuansecondrent('游戏租号')">游戏租号</a>
    <a class="GameList_headUrl noselect" style="left:500px;" @click.stop="nureOpener('代练通')">代练通</a>
    <a class="GameList_headUrl noselect" style="left:620px;" @click.stop="OneyuansecondrentUrl('游戏商城','http://www.taohaobang.com/?from=580')">游戏商城</a>
    <!-- <a class="GameList_headUrl noselect" style="left:750px;" @click.stop="OneyuansecondrentUrl('美女热舞','https://www.9xiu.com/activity/activity_pcunion?jxiusr=t_90')">美女热舞</a> -->
    <a class="GameList_headUrl noselect" style="left:750px;" @click.stop="OneyuansecondrentUrl('吃鸡特价88元','http://580.steam.taohaobang.com/?from=580')">吃鸡号半价</a>
    <!-- <div class="header_List noselect" v-if="!NetBarVIP">
      <div class="header_li" id="khd037">
        <a @click.stop="Oneyuansecondrent('游戏租号')">游戏租号</a>
      </div>
      <div class="header_li" id="khd036">
        <a @click.stop="nureOpener('代练通')">代练通</a>
      </div>
      <div class="header_li" id="khd039">
        <a @click.stop="OneyuansecondrentUrl('游戏商城','http://www.taohaobang.com/?from=580')">游戏商城</a>
      </div>
      <div class="header_li" id="khd038">
        <a @click.stop="OneyuansecondrentUrl('美女热舞','http://www.9xiu.com/activity/activity_pcunion?jxiusr=t_181')">美女热舞</a>
      </div>
      <div class="header_li" id="khd039">
        <a @click.stop="OneyuansecondrentUrl('吃鸡特价88元','http://580.steam.taohaobang.com/?from=580')">吃鸡号半价</a>
      </div>
    </div> -->
    <div class="header_oner noselect" @click.stop="FreePlay()">
      <div v-if="PagesLoginIs">
        <a> <img :src="HeadImgUrl" alt=""> </a>
        <span> {{ NickName }} </span>
        </div> <div v-else>
          <a><img src="../assets/images/OverVIP/tou.png" alt=""> </a>
          <span>个人中心</span>
      </div>
    </div>
  </div>

  <div class="GameList_body">
    <div class="GameList_list">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </div>
  <!-- 提示网吧开通特权 -->
  <div v-if="teroiud_show">
    <div class="kiko-confirm">
      <div class="bg"></div>
      <div class="teroiud_show">
        <div class="teroiud_title">温馨提示</div>
        <div class="teroiud_body">该网吧暂未开通送网费活动，请联系网管开通。</div>
        <div class="teroiud_footer" @mouseover="confirmHover = false" @mouseout="confirmHover = true">
          <img @click="teroiud_show=false" v-if="confirmHover" src="./../assets/images/icon-confirm.png" alt="" />
          <img @click="teroiud_show=false" v-else src="./../assets/images/icon-confirm-hover.png" alt="" />
        </div>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import {
  get,
  post
} from "@/utils/ajax";
import {
  mapGetters
} from "vuex";
import {
  Message
} from "element-ui";
import WeChatVerificationBox from './WeChatVerification.vue' //微信二维码验证
export default {
  name: "GameList",
  data() {
    return {
      MobilePhoneIs: false,
      teroiud_show: false, //提示网吧开通特权
      isRouterAlive: true,

    };
  },
  computed: {
    ...mapGetters(["NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "PagesLoginIs", "HeadImgUrl", "NickName"])
  },
  components: {
    WeChatVerificationBox
  },
  created() {
    if (sessionStorage.getItem("phone")) {
      this.$store.dispatch('GetUserInfo').then(() => {
        this.$store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
      }).catch(() => {});
    }
    //判断是否登录
    // var onerNamePhone = sessionStorage.getItem("phone");
    // if (!onerNamePhone) {
    //   this.$store.commit('SET_ONERNSME', '个人中心');
    // } else {
    //   this.$store.commit('SET_ONERNSME', onerNamePhone);
    // }
  },
  methods: {
    getrouer: function() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.$router.push({
          path: "/GameList/HomePageList"
        });
        this.isRouterAlive = true
      })
      this.$store.commit('SET_ISNETBARACTIVITY', true);
    },
    //领奖中心
    getPushUrl_a: function() {
      _hmt.push(['_trackEvent', '底部广告', '点击量', '领奖中心']);
      this.teroiud_show = true;
    },
    //美女热舞
    getPushUrl_b: function() {
      _hmt.push(['_trackEvent', '底部广告', '点击量', '吃鸡特价88元']);
      this.ruoueUrl('http://580.steam.taohaobang.com?form=580');
    },
    //一元租号
    getPushUrl_c: function() {
      _hmt.push(['_trackEvent', '底部广告', '点击量', '一元租号']);
      Extern_Form_open_GG();
    },
    //折扣商城
    getPushUrl_d: function() {
      _hmt.push(['_trackEvent', '底部广告', '点击量', '折扣商城']);
      this.ruoueUrl('http://580.steam.taohaobang.com?form=580');
    },
    ruoueUrl: function(url) {
      Extern_Form_open_ie_url(url);
    },
    //手机号码验证
    boxPlay: function(id) {
      this.ISbox = true;
    },
    //登录按钮
    FreePlay: function() {
      // 免费玩点击
      _hmt.push(["_trackEvent", "顶部头像", "点击", "个人中心"]);
      var UserInformationlist = sessionStorage.getItem("UserInformationlist");
      var onerNamePhone = sessionStorage.getItem("phone");
      //判断是否登录
      if (!onerNamePhone) {
        window.open(this.GloUrl + 'OrderCenter/HomepageSelection');
      } else {
        window.open(this.GloUrl + 'OrderCenter/HomepageSelection?Phone=' + onerNamePhone);
      }
    },
    //steam充值打开链接
    nureOpener: function(name) {
      _hmt.push(['_trackEvent', '顶部导航', '点击量', name]);
      Extern_Form_open_ie_url('http://www.dailiantong.com?L=580');
    },
    //退出按钮
    CloseBox: function() {
      this.mpmask = true;
    },
    //执意退出
    Insistonquit: function() {
      // this.mpmask = false;
      Extern_Form_exit();
    },
    //立即参与
    ImmediateParticipation: function() {
      this.mpmask = false;
      this.ruoueUrl('http://580.steam.taohaobang.com/?hmsr=580%E5%AE%A2%E6%88%B7%E7%AB%AF&hmpl=khd030&h');
    },
    //最小化
    minimize: function() {
      Extern_Form_minimize();
    },
    //鼠标拖动
    mouse_down: function() {
      Extern_Form_caption_click("down");
    },
    //鼠标松开
    mouse_move: function() {
      Extern_Form_caption_click("up");
    },
    //领奖中心
    AwardCenter: function() {
      this.ruoueUrl('http://www.taohaobang.com/downapp/?from=580');
      // this.isAwardCenter = true;
    },
    //加速器特权
    AcceleratorPrivileges: function() {
      Extern_Form_open_ggbooster();
    },
    //点击头部导航 统计&跳链接
    OneyuansecondrentUrl: function(name, url) {
      _hmt.push(['_trackEvent', '顶部导航', '点击量', name]);
      Extern_Form_open_ie_url(url);
    },
    //打开GG租号客服端
    Oneyuansecondrent: function(name) {
      _hmt.push(['_trackEvent', '顶部导航', '点击量', name]);
      Extern_Form_open_GG()
    },
    //steam特权
    nureOpenersteam: function(name) {
      _hmt.push(['_trackEvent', '顶部导航', '点击量', name]);
      window.open('http://c.580tequan.com/#/GameList/HomePageList');
    },
    steam: function(url) {
      window.open(url);
    },

  },
};
</script>
