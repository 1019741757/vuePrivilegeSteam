<template>
<div class="Feedback">
  <div :class="[IfselectName ? 'Feedback_errBox' : '', 'Feedback_select']" @mouseenter="Feedbackselectul=true" @mouseleave="Feedbackselectul=false">
    <div class="Feedback_select_input">请选择您的建议（必选）： &nbsp;&nbsp;{{selectName}} <i class="iconfont icon-unfold" style="float: right; font-size: 22px; margin-right: 22px;"></i></div>
    <div class="Feedback_select_ul" v-if="Feedbackselectul">
      <div class="Feedback_select_li" @click="FeedbacIndexform('steam或游戏登录不上')"> <i class="iconfont icon-yijianfankui"></i> &nbsp; steam或游戏登录不上 </div>
      <div class="Feedback_select_li" @click="FeedbacIndexform('游戏登录上后账号被封或玩不了')"> <i class="iconfont icon-yijianfankui"></i> &nbsp; 游戏登录上后账号被封或玩不了 </div>
      <div class="Feedback_select_li" @click="FeedbacIndexform('其它')"> <i class="iconfont icon-yijianfankui"></i> &nbsp; 其它 </div>
    </div>
    <div class="el-form-item__error feedback_error" style="top:110%" v-if="IfselectName"> <i class="el-icon-warning"></i> 请选择您的建议类型</div>
  </div>
  <div class="Feedback_Information">
    <div class="Feedback_Information_text">请输入订单信息（选填）： </div>
    <input type="text" name="" v-model="OrderNumber" class="Feedback_Information_input" placeholder="如提交的建议有关联订单，请输入订单编号">
  </div>
  <div class="Feedback_textarea" style="position: relative;">
    <textarea :class="[IfContent ? 'Feedback_errBox' : '']" name="name" rows="8" cols="80" maxlength="300" placeholder="在这里输入您的反馈和建议" v-model="Content" ></textarea>
    <p>300字以内</p>
    <div class="el-form-item__error feedback_error" style="top: 93%;" v-if="IfContent"> <i class="el-icon-warning"></i> 请输入反馈内容 </div>
  </div>
  <div class="Feedback_submin" @click="FeedbackSubmit"></div>
  <!-- <div class="Feedback_muier">
    如您有更好的意见，可直接联系我们的产品经理，我们真诚为您提供更好的服务！联系QQ：951137307
  </div> -->

  <!-- //意见反馈  反馈成功-->
  <div v-if="isDialog7">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container jackInTheBox animated" style="padding-top: 0;">
        <div class="feedback_gooder"> 反馈成功 </div>
        <p style="line-height: 40px;"> 感谢你的反馈 </p>
        <p style="line-height: 60px;"> 我们将不断努力，为你提供更好的服务</p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn center_dd" @click="isDialog7=false">朕知道了({{Deletitem}}s)</a>
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
  name: "Feedback",
  data() {
    return {
      selectName: '',
      OrderNumber: '',
      Content: '',
      Feedbackselectul: false,
      isDialog7: false,
      IfselectName: false,
      IfContent: false,
      time: '',
      Deletitem: 3
    };
  },
  computed: {
    ...mapGetters(["SteamList", "NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "MobilePhoneHoverIs"])
  },
  created: function() {
    this.OrderNumber = this.$route.query.OrderNuber || '';
  },
  methods: {
    FeedbacIndexform: function(name) {
      this.selectName = name;
      this.Feedbackselectul = false
    },
    FeedbackSubmit: function() {
      if (!this.selectName) {
        this.IfselectName = true;
      }
      if (!this.Content) {
        this.IfContent = true;
      }
      if (this.selectName && this.Content) {
        var phone = sessionStorage.getItem("phone");
        _hmt.push(['_trackEvent', '信息反馈', '点击量', '确认提交']);
        var _this = this;
        let paramList = {
          NetbarId: this.NetBarId,
          Type: this.selectName,
          Content: this.Content,
          NetbarName: this.NetBarName,
          ValidateKey: '',
          Code: '',
          ConsumerId: phone,
          OrderNumber: this.OrderNumber,
        };
        post("/api/Proposal/ProposalAdd", paramList)
          .then(res => {
            _this.isDialog7 = true;
            window.Delettime = setInterval(function() {
              if (_this.Deletitem > 0) {
                _this.Deletitem--;
              } else {
                clearInterval(window.Delettime);
                _this.isDialog7 = false;
                _this.Deletitem = 3;
              }
            }, 1000);
            _this.selectName = '';
            _this.Content = '';
            _this.OrderNumber = '';
          }).catch(err => {});
      }

    }

  },
  watch: {
    selectName(newName, oldName) {
      console.log(newName);
      if (newName) {
        this.IfselectName = false;
      }
    },
    Content(newName, oldName) {
      console.log(newName);
      if (newName) {
        this.IfContent = false;
      }
    }
  }
};
</script>
