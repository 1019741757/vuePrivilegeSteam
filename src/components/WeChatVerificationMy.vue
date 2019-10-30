<template>
<div class="">
  <div class="dialogBox_wx">
    <div class="bg_mouer" @click="cancel"></div>
    <div class="dialogBox-container">
      <ul class="header_ul clearfix">
        <li :class="LoginMode== 'wx'?'avtive':''"><a @click="WeChatVerificationBox('wx')">微信快速登录</a></li>
        <li :class="LoginMode== 'phone'?'avtive':''"><a @click="WeChatVerificationBox('phone')">手机验证码登录</a></li>
      </ul>
      <div class="content_Bg">
        <div class="content_form" v-if="LoginMode== 'wx'">
          <p>请使用微信扫描二维码登录</p>
          <a class="img_a"><img :src="CodeImg" alt=""></a>
          <div class="content_runde">登录成功即视为同意遵守 <a @click="AgreementBox()">《580网吧特权顾客账号注册及服务协议》</a></div>
        </div>
        <div class="content_form content_atabel" v-if="LoginMode== 'phone'">
          <div class="content_Phone">
            <div class="soie">+86</div>
            <input type="text" v-model="Loginphone" name="Loginphone" value="" placeholder="请输入手机号码">
          </div>
          <div class="content_Code">
            <input type="text" v-model="phoneCode" name="phoneCode" value="" placeholder="请输入验证码">
            <div class="getcode" v-if="show" @click="GetPhoneCode">获取验证码</div>
            <div class="getcode" v-if="!show">{{count}} s</div>
          </div>
          <div class="content_Buttton" @click="CodeLoginsubmit"></div>
          <div class="content_runde">登录成功即视为同意遵守 <a @click="AgreementBox()">《注册及服务协议》</a></div>
        </div>
        <a href="javascript:;" class="Close_Button_wx" @click="cancel">
          <img src="./../assets/images/logoin/4.png" alt>
        </a>
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
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import {
  Message
} from "element-ui";
export default {
  name: 'MobilePhone',
  data() {
    return {
      Code: "",
      CodeImg: "",
      GetVerifytimer: "",
      Authorizetimer: "",
      cancelHover: true,
      confirmHover: true,
      LoginMode: "wx",
      Loginphone: null,
      phoneCode: null,
      show: true,
      count: "",
      timer: "",
    }
  },
  props: ['isVisible'],
  computed: {
    ...mapGetters(["NetBarId", "MobilePhoneIs"])
  },
  created() {
    _hmt.push(['_trackEvent', '微信扫码登录', '点击', '二维码弹框展示量']);
    if (this.NetBarId && this.NetBarId != '' && this.NetBarId != 0) {
      this.GetVerifyCode();
    } else {
      _hmt.push(['_trackEvent', '没有获取到网吧Key', '出现次数', '错误弹框']);
      this.$emit('update:isVisible', false);
      this.$alert('发生故障请联系 手机：15674813000 ， QQ：3003016209，解决问题送微信红包！', '没有获取到网吧Key', {
        confirmButtonText: '确定',
        callback: action => {}
      });
    }
  },
  methods: {
    WeChatVerificationBox: function(name) {
      this.LoginMode = name;
      if (name == 'wx') {
        clearInterval(this.Authorizetimer);
        this.GetVerifyCode();
        this.Loginphone = null;
        this.phoneCode = null;
        this.show = true;
        clearInterval(this.timer);
        this.timer = null;
      }
      if (name == 'phone') {
        clearInterval(this.Authorizetimer);
      }
    },
    AgreementBox: function() {
      _hmt.push(['_trackEvent', '用户扫码登录', '点击量', '服务协议']);
      Extern_Form_open_ie_url('http://www.580tequan.com/Content/html/Agreement.html');
    },
    //弹框关闭
    cancel: function() {
      _hmt.push(['_trackEvent', '微信扫码登录', '点击', '二维码关闭按钮']);
      clearInterval(this.Authorizetimer);
      // this.$emit('update:isVisible', false);
      sessionStorage.setItem("HomepageLosinIs", false);
      this.$router.push({
        path: '/OrderCenter/HomepageSelection'
      });
    },
    //获取微信验证
    GetVerifyCode: function() {
      let paramList = {
        random: this.NetBarId,
      };

      var _this = this;
      get("/api/Consumer/GetQRCode", paramList)
        .then(res => {
          if (res.Object) {
            _this.Code = res.Object.Code;
            _this.CodeImg = "data:image/png;base64," + res.Object.QRCode;
            _this.Authorizetimer = window.setInterval(_this.submit, 3000);
          }
        }).catch(err => {
          clearInterval(_this.Authorizetimer);
        });
    },
    // 获取验证是否通过
    submit: function() {
      let paramList = {
        code: this.Code
      };
      var _this = this;
      get("/api/Consumer/AjaxIsAuthorize", paramList)
        .then(res => {
          if (res.Object) {
            clearInterval(_this.Authorizetimer);
            _this.$emit('MobilePhoneBox', res.Object);
            _this.$emit('update:isVisible', false);
            Extern_Form_SetUserID(res.Object.ConsumerId);
            Message({
              message: "验证成功",
              type: "success"
            });
          }
        }).catch(err => {
          clearInterval(_this.Authorizetimer);
          _this.$router.push({
            path: '/OrderCenter/HomepageSelection'
          });
        });
    },
    //发送手机验证码
    GetPhoneCode: function() {
      var reg = /^1[3456789]\d{9}$/;
      var phoneNum = this.Loginphone;
      if (!phoneNum) {
        //未输入手机号
        Message({
          message: "请输入手机号码",
          type: "warning"
        });
        return false;
      }
      if (!reg.test(phoneNum)) {
        //手机号不合法
        Message({
          message: "您输入的手机号码不合法，请重新输入",
          type: "warning"
        });
        return false;
      }
      let paramList = {
        phone: this.Loginphone
      };
      // console.log(paramList);
      var _this = this;
      get("/api/Consumer/GetPhoneCode", paramList)
        .then(res => {
          _this.getCode();
        }).catch(err => {});
    },
    //倒计时
    getCode: function() {

      const TIME_COUNT = 60;
      if (!this.timer) {
        console.log(this.timer);
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    //手机验证登录提交
    CodeLoginsubmit: function() {
      if (!this.Loginphone) {
        //未输入手机号
        Message({
          message: "请输入手机号码",
          type: "error"
        });
        return false;
      }
      if (!this.phoneCode) {
        //未输入手机号
        Message({
          message: "请输入手机验证码",
          type: "error"
        });
        return false;
      }
      let paramList = {
        phoneCode: this.phoneCode,
        phone: this.Loginphone
      };
      var _this = this;
      get("/api/Consumer/CodeLogin", paramList)
        .then(res => {
          _this.$emit('MobilePhoneBox', res.Object);
          _this.$emit('update:isVisible', false);
          Extern_Form_SetUserID(res.Object.ConsumerId);
          Message({
            message: "验证成功",
            type: "success"
          });
        })
        .catch(err => {});
    }
  },
};
</script>
