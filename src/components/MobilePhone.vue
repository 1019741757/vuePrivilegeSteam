<template>
<div class="">
  <div class="kiko-confirm">
    <div class="bg"></div>
    <div class="kiko-container">
      <div class="header">
        手机号码验证
        <i class="icon-remove icon-large kiko-close-btn"></i>
      </div>
      <div class="content_Bg">
        <div class="content_form">
          <div class="content_phone">
            <input name="phone" type="text" autocomplete="off" placeholder="请输入您的手机号" v-model="phone" class="phone">
          </div>
          <div class="content_phone">
            <input name="phone" type="text" autocomplete="off" placeholder="图形验证码" v-model="imgCode" class="phone">
            <span class="content_bn" @click="GetVerifyCode">
              <img :src="Base64Img" alt>
            </span>
          </div>
          <div class="content_phone">
            <input name="phone" type="text" autocomplete="off" placeholder="手机验证码" v-model="phoneCode" class="phone">
            <span class="content_sn" v-show="show" @click="GetPhoneCode">获取验证码</span>
            <span class="content_sn" v-show="!show">{{count}} s</span>
          </div>
          <!-- <p v-if="errText" class="errText">提示：{{errText}}</p> -->
        </div>

        <div class="kiko-footer">
          <a class="kiko-btn cancel fl" @click="cancel" @mouseover="cancelHover = false" @mouseout="cancelHover = true">
            <img v-if="cancelHover" src="./../assets/images/icon-cancel.png" alt="" />
            <img v-else src="./../assets/images/icon-cancel-hover.png" alt="" />
          </a>
          <a class="kiko-btn make-sure fr" @click="submit" @mouseover="confirmHover = false" @mouseout="confirmHover = true">
            <img v-if="confirmHover" src="./../assets/images/icon-confirm.png" alt="" />
            <img v-else src="./../assets/images/icon-confirm-hover.png" alt="" />
          </a>
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
      show: true,
      count: "",
      phone: "", //手机号码
      imgCode: "", //图片验证code
      phoneCode: "", //手机验证吗
      Base64Img: "", //验证图片
      ValidateKey: "", //图片验证key
      InternetCafeName: "", //网吧名称
      cancelHover: true,
      confirmHover: true,
    }
  },
  computed: {
    ...mapGetters(["MobilePhoneIs"])
  },
  created() {
    this.GetVerifyCode();
  },
  methods: {
    //弹框关闭
    cancel: function() {
      clearInterval(this.timer);
      this.$store.commit('SET_MOBILEPHONEIS', false);
      this.$store.commit('SET_MOBILEPHONEHOVERIS', false);
      this.phone = "";
      this.imgCode = "";
      this.ValidateKey = "";
      this.phoneCode = "";
      this.show = true;
      this.cancelHover = true;
    },
    //获取验证码图片
    GetVerifyCode: function() {
      let paramList = {};
      var _this = this;
      this.axios.get("SteamOrder/GetVerifyCode", paramList).then(res => {
        if (res.data.StatusCode == 200) {
          var data = res.data.Object;
          _this.Base64Img =
            "data:image/png;base64," + res.data.Object.Base64Img;
          _this.ValidateKey = res.data.Object.ValidateKey;
        } else {
          Message({
            message: "获取不到验证图片",
            type: "success"
          });
        }
      });
    },
    //发送手机验证码
    GetPhoneCode: function() {
      var reg = /^1[3456789]\d{9}$/;
      var phoneNum = this.phone;
      if (!phoneNum) {
        //未输入手机号
        Message({
          message: "请输入手机号码",
          type: "success"
        });
        return false;
      }
      if (!reg.test(phoneNum)) {
        //手机号不合法
        Message({
          message: "您输入的手机号码不合法，请重新输入",
          type: "success"
        });
        return false;
      }
      let paramList = {
        phone: this.phone,
        imgCode: this.imgCode,
        validateKey: this.ValidateKey
      };
      // console.log(paramList);
      var _this = this;
      get("GetPhoneCode", paramList)
        .then(res => {
          _this.getCode();
        })
        .catch(err => {
          _this.imgCode = "";
          _this.ValidateKey = "";
          _this.GetVerifyCode();
        });
    },
    //倒计时
    getCode: function() {
      const TIME_COUNT = 60;
      if (!this.timer) {
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
    submit: function() {
      if (!this.phone) {
        //未输入手机号
        Message({
          message: "请输入手机号码",
          type: "error"
        });
        return false;
      }
      if (!this.imgCode) {
        //未输入手机号
        Message({
          message: "请输入图形验证码",
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
        phone: this.phone
      };
      var _this = this;
      get("Authorization", paramList)
        .then(res => {
          sessionStorage.setItem("phone", _this.phone);
          _this.$emit('MobilePhoneBox');
          Message({
            message: "验证成功",
            type: "success"
          });
        })
        .catch(err => {});
    }
  }
};
</script>
