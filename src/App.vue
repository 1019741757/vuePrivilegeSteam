<template>
<div id="app">
  <div class="app_map">
    <div class="app_map_header noselect">
      <div class="header_boxst" @mousedown.stop="mouse_down()" @mouseup.stop="mouse_move()">
        <span class="header_boxst_a fl  noselect">580网吧特权</span>
        <div class="header_ureot fl" v-if="NetBarVIP">
          <img src="@/assets/images/OverVIP/icon-tb.png" alt="">
          <img src="@/assets/images/OverVIP/icon-tb.png" alt="">
          <img src="@/assets/images/OverVIP/icon-tb.png" alt="">
        </div>
      </div>
      <div class="header_Close">
        <a @click.stop="ContactUs"><img src="@/assets/images/colse.png" alt="" style="position: relative;top: 3px;left: 12px;">在线人工客服</a>
        <img src="@/assets/images/icon-tb4.png" id="khd033" alt="" @click.stop="minimize()">
        <img src="@/assets/images/icon-tb3.png" alt="" @click.stop="Insistonquit()">
      </div>
    </div>

    <router-view />
  </div>
  <!-- 联系我们 -->
  <div v-if="ContactUs_show">
    <div class="kiko-confirm">
      <div class="bg"></div>
      <div class="ContactUs_show">
        <div class="ContactUs_bi" @click="ContactUsGuan"><img src="@/assets/images/Activity/L2.png" alt=""> </div>
        <div class="ContactUs_fertig">
          <div class="ContactUs_urtte clearfix">
            <h6>问题反馈</h6>
            <img src="@/assets/images/Activity/L3.png" alt="" @click="DeFeedback()">
          </div>
          <p>您可以在线填写问题反馈，也可以在下方查看使用帮助</p>
        </div>
        <div class="ContactUs_neiroueer clearfix">
          <h6>使用帮助</h6>
          <ul class="ContactUs_ul  clearfix">
            <li class="ContactUs_li">
              <span>游戏登录上后账号被封了</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                1、由于之前体验游戏的玩家存在违规行为导致账号异常，建议您在“问题反馈”里，提供
                相应订单号，平台会及时下架对应账号，之后平台会及时补充相应的号源；<br>
                2、您可以重新下一个免费玩订单进行体验。
              </div>
            </li>
            <li class="ContactUs_li">
              <span>网吧没下载此游戏</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                建议您反映给网管，请网管下载相应游戏，或者您自己手动下载游戏。
              </div>
            </li>
            <li class="ContactUs_li">
              <span> 租错了，能退吗？ </span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                这个您可以再体验其他游戏使用呢，平台退单功能即将上线，下次要注意哦，希望您游戏愉快
              </div>
            </li>
            <li class="ContactUs_li">
              <span>上不去游戏</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                重新启动电脑或者换一台电脑继续体验
              </div>
            </li>
            <li class="ContactUs_li">
              <span> steam里面加不了好友 </span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                检查账号是否有开pin，如果有，建议您换一个账号体验；如未开pin，建议使用常用加速器后重新试一下。
              </div>
            </li>
            <li class="ContactUs_li">
              <span>一键上号后蓝屏(或卡顿异常等)</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                重新启动电脑或者换一台电脑继续体验
              </div>
            </li>
            <li class="ContactUs_li">
              <span> 为什么绝地求生游戏只能玩1小时？ </span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                检查网吧当前的特权版本，黄金版特权的绝地求生游戏只能体验1小时，建议提醒网吧开
                通钻石版，钻石版拥有每天10个小时免费体验的权限。
              </div>
            </li>
            <li class="ContactUs_li">
              <span>怎么兑换网费？</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                凭短信信息中的兑换码到相对应的网吧吧台兑换网费，如网吧未开通网费兑换功能，建议您提醒网吧开通。
              </div>
            </li>
            <li class="ContactUs_li">
              <span> 为什么下单时提示游戏库存不足？ </span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                因为当前全平台体验同一个游戏的用户较多，建议您换一个游戏继续体验。
              </div>
            </li>
            <li class="ContactUs_li">
              <span>怎么游戏加时？</span>
              <div class="ContactUs_hourver">
                <div class="_top"></div>
                1、在同一个游戏详情的地方，点击免费玩，选择加时或者重新下一单；<br>
                2、在“我的游戏”页面找到相应的游戏订单，点击游戏加时按钮进行加时选择；如订单已经
                结束，则只能重新下一单。
              </div>
            </li>
          </ul>
        </div>
        <div class="ContactUs_mueroou">
          <a>* </a>如以上仍未解决您的问题，您也可以拨打 <span>&nbsp;&nbsp;客服热线：4000691500 </span>&nbsp;&nbsp;或&nbsp;&nbsp;<img src="@/assets/images/Activity/L4.png" alt="" @click="Consultation()">
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
import WeChatVerification from './components/WeChatVerification.vue' //微信二维码验证
export default {
  name: "App",
  data() {
    return {
      ContactUs_show: false, //联系我们
      FeedbackHoverIs: false,
    };
  },
  components: {
    WeChatVerification
  },
  computed: {
    ...mapGetters(["NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "MobilePhoneIs", "ContactUsIs", "OnerName"])
  },
  created() {
    var _this = this;
    let NetBarName = Extern_Form_GetNetBarName();
    let NetBarId = Extern_Form_GetNetBarID();

    // let NetBarName = '580网吧特权';
    // let NetBarId = '513';
    this.$store.commit('SET_NAME', NetBarName);
    this.$store.commit('SET_ID', NetBarId);
    let paramList = {
      netbarId: NetBarId
    };
    //判断该网吧是否为钻石版
    get("api/SteamOrder/GetSteamPower", paramList).then(res => {
      if (res.Object) {
        _this.$store.commit('SET_VIP', true);
        if (res.Object.IsShow) {
          _this.$store.commit('SET_EXPIREDATETIME', res.Object.ExpireDateTime);
        } else {
          _this.$store.commit('SET_EXPIREDATETIME', null);
        }

      } else {
        _this.$store.commit('SET_VIP', false);
        _this.$store.commit('SET_EXPIREDATETIME', null);
      }

    }).catch(err => {});
    //判断该网吧是否开通活动
    get("api/Activity/IsOpenActivity", paramList).then(res => {
      if (res.StatusCode == 200) {
        _this.$store.commit('SET_ACTIVITY', res.Object);
      } else {
        console.log('请求出错');
      }
    });
  },
  methods: {
    //最小化
    minimize: function() {
      Extern_Form_minimize();
    },
    //执意退出
    Insistonquit: function() {
      // this.mpmask = false;
      Extern_Form_exit();
    },
    //鼠标拖动
    mouse_down: function() {
      Extern_Form_caption_click("down");
    },
    //鼠标松开
    mouse_move: function() {
      Extern_Form_caption_click("up");
    },
    //帮助与反馈
    ContactUs: function() {
      _hmt.push(['_trackEvent', '顶部菜单', '点击量', '帮助与反馈']);
      this.ContactUs_show = true;
    },
    ContactUsGuan: function() {
      _hmt.push(["_trackEvent", "帮助与反馈", "点击", "关闭"]);
      this.ContactUs_show = false;
    },
    //去反馈
    DeFeedback: function() {
      this.ContactUs_show = false;
      _hmt.push(["_trackEvent", "帮助与反馈", "点击", "去反馈"]);
      window.open(this.GloUrl + 'OrderCenter/Feedback');
    },
    //人工咨询
    Consultation: function() {
      _hmt.push(['_trackEvent', '帮助与反馈', '点击量', '在线人工咨询']);
      Extern_Form_open_ie_url('http://www.580tequan.com/Content/customerService/xiaoneng.html');
    },
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 1200px;
  height: 800px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}
</style>
