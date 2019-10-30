<template>
<div class="">
  <div class="MyGame">
    <div class="MyGame_header">
      580体验游戏送网费 &nbsp;&nbsp;
      <!-- <span @click="getActivityUrl()">活动简介</span> -->
    </div>
    <div class="GoBack_Box">
      <div class="Box_er">
        累计游戏时长： <span v-if="GetUserInfoList.GameTime != 0">{{Math.floor((GetUserInfoList.GameTime/60) * 100) / 100||0}}小时</span>
        <span v-else>{{GetUserInfoList.GameTime}}小时</span> &nbsp;&nbsp;
        <!-- 累计活动网费： <span>{{parseInt(GetUserInfoList.TempSum||0)}}元</span>&nbsp;&nbsp; -->
        今日剩余时长： <span>{{maxtiem}}小时</span>
      </div>
      <div class="Box_ht">
        当前可兑换活动网费： <span style="color:#000">{{parseInt(GetUserInfoList.Temp||0)}}元</span>
      </div>
      <div class="Box_bm">
        <div class="Box_bm_btn" @click="Exchange()"></div>
      </div>
    </div>
  </div>
  <div class="OrderCenter_ul" style="padding: 16px;">
    <div v-if="ItemsList.length == 0" class="OrderCenter_zanwu">暂无订单，<a @click="GoBack()">立即体验游戏...</a> </div>
    <div v-else class="OrderCenter_li" v-for="(item,index) in ItemsList" :key="index">
      <div class="OrderCenter_gameBox fl">
        <div class="Game_Pic">
          <div v-for="obj in SteamList" :key="obj.GameId">
            <div v-if="item.GameName == obj.GameName">
              <img :src="obj.imgUrl" alt>
            </div>
          </div>
          <p>{{item.GameName}}</p>
        </div>
      </div>
      <div class="OrderCenter_box fl">
        <div>
          <!-- <p>游戏名称：{{item.GameName}}</p> -->
          <p>订单时长：{{item.Count}}小时</p>
          <p>结束时间：{{item.EndTime}}</p>
          <!-- <p>下单时间：{{item.CreateTime}}</p>
          <p>上号码： {{item.Code}}</p> -->
          <p>订单编号：{{item.OrderNuber}}</p>
        </div>
      </div>
      <div class="OrderCenter_mut fr">
        <a href="javascript:;" @click="OnekeyNumber(item.Code)" v-if="item.iS" @mouseover="mosShow(index)" @mouseout="mosHiden">
          <img v-if="showOnekeyNumber || hoverBtn != index" src="./../assets/images/icon-7.png" alt style="margin-top:0">
          <img v-else src="./../assets/images/icon-7-hover.png" alt style="margin-top:0">
        </a>
        <a href="javascript:;" @click="OrderNumber(item.GameName,item.OrderNuber,item.Code)" v-if="item.iS" @mouseover="boetmosShow(index)" @mouseout="boetmosHiden">
          <img v-if="showOrderNumber || boethoverBtn != index" src="./../assets/images/icon-8.png" alt>
          <img v-else src="./../assets/images/icon-8-hover.png" alt>
        </a>
        <a href="javascript:;" v-else>
          <img src="./../assets/images/icon-7-1.png" alt>
        </a>
        <a class="feedback_geir" @click="feedbackBougout(item.OrderNuber)" v-if="item.iS"><i class="iconfont icon-yijianfankui"></i> 意见反馈</a>
      </div>
    </div>
  </div>
  <div v-if="isOrder">
    <div class="dialogBox">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">游戏加时</div>
        <div class="header_nes"></div>
        <p style="color: #afacaa;">注：每次下单或加时最高可选5个小时</p>
        <div class="content-box" style="padding-top: 0;">
          <div class="content_detail">
            <div class="content_phone">游戏名称：{{EffectiveOrderGameName}}</div>
            <div class="content_phone">可加时免费总时长：{{maxtiem}}小时</div>
            <div class="content_phone content_butadr">
              <span>请选择免费时长：</span>
              <a href="javascript:;" class="prep" @click="subOrder">-</a>
              <span class="textInput">{{Count}}</span>
              <a href="javascript:;" class="add" @click="addOrder">+</a>
            </div>
          </div>
          <div class="GGboostetcheckbox">
            <input type="checkbox" name="GGboosterValue3" v-model="GGboosterValue3" id="input-checkbox">
            <label for="input-checkbox">是否使用加速器（开启加速器体验更佳）</label>
          </div>
          <div class="PS_Button_Box" style="padding: 2px 0;">
            <!-- <p>温馨提示：使用加速器可以让游戏体验更流畅</p> -->
            <!-- <img src="./../assets/images/icon-start-game.png" alt=""> -->
            <div class="dialog-footer clearfix">
              <a class="dialog-btn cancel fl" @click="isOrder = false;closeHover = true;GGboosterValue3=false" @mouseover="closeHover = false" @mouseout="closeHover = true">
                <img v-if="closeHover" src="./../assets/images/icon-cancel.png" alt>
                <img v-else src="./../assets/images/icon-cancel-hover.png" alt>
              </a>
              <a class="dialog-btn make-sure fr" @click="EffectiveOrderSubmit" @mouseover="startHover = false" @mouseout="startHover = true">
                <img v-if="startHover" src="./../assets/images/icon-start.png" alt>
                <img v-else src="./../assets/images/icon-start-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isDialog2">
    <div class="dialogBox2">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">温馨提示</div>
        <div class="content-box">
          <div class="PS_Button_Box">
            <p>该账号今日免费玩时长已达上限</p>
            <!-- <img src="./../assets/images/icon-start-game.png" alt=""> -->
            <div class="dialog-footer">
              <a class="dialog-btn cancel fl" @click="startGame('前往租号')" @mouseover="rentHover = false" @mouseout="rentHover = true">
                <img v-if="rentHover" src="./../assets/images/icon-rent.png" alt>
                <img v-else src="./../assets/images/icon-rent-hover.png" alt>
              </a>
              <a class="dialog-btn make-sure fr" @click="ruoueUrl('http://580.steam.taohaobang.com?form=580','立即买号')" @mouseover="buyNoHover = false" @mouseout="buyNoHover = true">
                <img v-if="buyNoHover" src="./../assets/images/icon-buy-no.png" alt>
                <img v-else src="./../assets/images/icon-buy-no-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="Close_Button" @click="isDialog2 = false">
          <img src="./../assets/images/close.png" alt>
        </a>
      </div>
    </div>
  </div>
  <div v-if="isDialog3">
    <div class="dialogBox2">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">温馨提示</div>
        <div class="content-box">
          <div class="PS_Button_Box">
            <p>加时成功，一键上号，立即体验</p>
          </div>
        </div>
        <a href="javascript:;" class="Close_Button" @click="isDialog3 = false">
          <img src="./../assets/images/close.png" alt>
        </a>
      </div>
    </div>
  </div>
  <!-- //网费兑换 -->
  <div v-if="isDialog4">
    <div class="dialogBox4">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <div class="header">网费兑换</div>
        <div class="content-box">
          <div class="ObtainNet_Box clearfix">
            <div :class="{hoverClass:5==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(5)" v-if="GetUserInfoList.Temp>=5">
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>5元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>5元</p>
            </div>
            <div :class="{hoverClass:10==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(10)" v-if="GetUserInfoList.Temp>=10">
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>10元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>10元</p>
            </div>
            <div :class="{hoverClass:15==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(15)" v-if="GetUserInfoList.Temp>=15">
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>15元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>15元</p>
            </div>
            <div :class="{hoverClass:20==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(20)" v-if="GetUserInfoList.Temp>=20">
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>20元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../assets/images/Activity/nyi.png" alt>
              <p>20元</p>
            </div>
          </div>
        </div>
        <div class="dialog-footer clearfix" style="padding: 0 8%;">
          <a class="dialog-btn cancel fl" @click="RedeemSubmit"></a>
          <a class="dialog-btn make-sure fr" @click="ObtainNetFeeRedeemCodeSubmit"></a>
        </div>
        <!-- <a href="javascript:;" class="Close_Button" @click="isDialog4 = false">
          <img src="./../assets/images/close.png" alt>
        </a> -->
      </div>
    </div>
  </div>
  <!-- //网费兑换  网吧未开通活动-->
  <div v-if="isDialog6">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <img src="./../assets/images/Activity/w1.png" class="img_yw swing animated">
        <p>该网吧暂未开通网费兑换功能，</p>
        <p> 请联系网吧管理员开通！ </p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn center_vv" @click="isDialog6=false"></a>
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
  name: "OrderCenter",
  data() {
    return {
      hoverBtn: '',
      boethoverBtn: '',
      isLoading: false,
      ItemsList: [],
      phone: "",
      maxtiem: "",
      showOnekeyNumber: true,
      showOrderNumber: true,
      closeHover: true,
      startHover: true,
      EffectiveOrderGameName: '', //游戏是否存在未结束的订单
      OrderNuberId: '', //游戏是否存在未结束的订单
      isOrder: false, //游戏是否存在未结束的订单
      OrderNuber: '', //游戏是否存在未结束的订单
      Count: 1, //游戏是否存在未结束的订单
      isDialog2: false,
      isDialog3: false,
      rentHover: true,
      buyNoHover: true,
      GetUserInfoList: {},
      //网费兑换
      isDialog4: false,
      Money: 5,
      GGboosterValue3: false, //是否启动加速器
      isDialog6: false,
    };
  },
  computed: {
    ...mapGetters(["SteamList", "NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "MobilePhoneHoverIs", "OnerName", "PagesLoginIs"])
  },
  created: function() {
    this.phone = sessionStorage.getItem("phone");
    if (this.phone) {
      this.getdata();
      this.GetCreateOrderTime();
    }
  },
  methods: {
    //获取游戏剩余时间
    GetCreateOrderTime: function() {
      let paramList = {
        phone: this.phone
      };
      var _this = this;
      get("api/SteamOrder/GetPhoneSurplusCreateOrderTime", paramList)
        .then(res => {
          _this.maxtiem = res.Object;
        }).catch(err => {});
      get("/api/Consumer/GetUserInfo", paramList)
        .then(res => {
          if (res.Object) {
            _this.GetUserInfoList = res.Object;
            // _this.GetUserInfoList.Temp = 20;
          }
        }).catch(err => {});
    },
    // 启动GG客户端
    startGame: function(name) {
      _hmt.push(['_trackEvent', '下单弹框', '点击量', name]);
      Extern_Form_open_GG();
    },
    //客户端打开链接
    ruoueUrl: function(url, name) {
      _hmt.push(['_trackEvent', '下单弹框', '点击量', name]);
      Extern_Form_open_ie_url(url);
    },
    mosShow: function(index) {
      this.showOnekeyNumber = false;
      this.hoverBtn = index;
    },
    mosHiden: function() {
      this.showOnekeyNumber = true;
      this.hoverBtn = '';
    },
    boetmosShow: function(index) {
      this.showOrderNumber = false;
      this.boethoverBtn = index;
    },
    boetmosHiden: function() {
      this.showOrderNumber = true;
      this.boethoverBtn = '';
    },
    //获取订单列表
    getdata: function() {
      var phone = sessionStorage.getItem("phone");
      var _this = this;
      let paramList = {
        phone: phone,
        pageSize: "20",
        pageIndex: "1"
      };
      get("api/SteamOrder/GetOrder", paramList)
        .then(res => {
          _this.isLoading = false;

          if (res.StatusCode == 200) {
            var Items = res.Items;
            for (var i = 0; i < Items.length; i++) {
              let EndTime = Items[i].EndTime; //结束时间
              let ServiceTime = Items[i].ServiceTime; //系统时间
              Items[i].iS = _this.compareTime(EndTime, ServiceTime);
            }

            _this.ItemsList = res.Items;
          }
        })
        .catch(err => {});
    },
    //判断日期，时间大小
    compareTime: function(startDate, endDate) {
      if (startDate.length > 0 && endDate.length > 0) {
        var startDateTemp = startDate.split(" ");
        var endDateTemp = endDate.split(" ");

        var arrStartDate = startDateTemp[0].split("-");
        var arrEndDate = endDateTemp[0].split("-");

        var arrStartTime = startDateTemp[1].split(":");
        var arrEndTime = endDateTemp[1].split(":");

        var allStartDate = new Date(
          arrStartDate[0],
          arrStartDate[1],
          arrStartDate[2],
          arrStartTime[0],
          arrStartTime[1],
          arrStartTime[2]
        );
        var allEndDate = new Date(
          arrEndDate[0],
          arrEndDate[1],
          arrEndDate[2],
          arrEndTime[0],
          arrEndTime[1],
          arrEndTime[2]
        );

        if (allStartDate.getTime() >= allEndDate.getTime()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    //游戏加时
    OrderNumber: function(GameName, OrderNuber, OrderCode) {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '游戏加时']);
      if (this.maxtiem > 0) {
        this.EffectiveOrderGameName = GameName;
        this.OrderNuberId = OrderNuber;
        this.OrderCode = OrderCode;
        this.isOrder = true
      } else {
        this.isDialog2 = true
      }
    },
    //续租
    EffectiveOrderSubmit: function() {
      if (this.Count != 0) {
        var _this = this;
        let paramList = {
          OrderNuber: this.OrderNuberId,
          Count: this.Count,
        };
        post("api/SteamOrder/RenewalOrder", paramList)
          .then(res => {
            // 关闭弹窗
            _this.isOrder = false;
            _this.isDialog3 = true;
            _this.getdata();
            _this.GetCreateOrderTime();
            _this.OnekeyNumber(res.Object.Code);
            if (_this.GGboosterValue3) {
              Extern_Form_open_ggbooster();
              _hmt.push(["_trackEvent", "游戏续租", "点击", "启动游戏加速器"]);
            }
            // 弹框提示
            window.setTimeout(function() {
              _this.isDialog3 = false;
            }, 3000);
          }).catch(err => {});
      } else {
        var _this = this;
        this.isOrder = false;
        this.OnekeyNumber(this.OrderCode);
        if (this.GGboosterValue3) {
          Extern_Form_open_ggbooster();
          _hmt.push(["_trackEvent", "游戏续租", "点击", "启动游戏加速器"]);
        }
      }
    },
    // 减少数量
    subOrder: function() {
      if (this.Count > 1) {
        this.Count--;
      }
    },
    // 增加数量
    addOrder: function() {
      if (this.Count < 5) {
        this.Count++;
      }
    },
    //一键上号
    OnekeyNumber: function(Code) {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '一键上号']);
      Extern_Form_open_AutoSSQ(Code);
    },
    //返回
    GoBack: function() {
      Extern_Form_ShowNumWindows(1);
    },
    //网费兑换
    Exchange: function() {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '立即兑换']);
      if (this.NetBarActivity) {
        if (this.GetUserInfoList.Temp >= 5) {
          this.isDialog4 = true;
        } else {
          Message({
            message: "当前可兑换网费不足五元！",
            type: "warning"
          });
        }
      } else {
        this.isDialog6 = true;
      }
    },
    changeList(index) {
      this.Money = index;
    },
    RedeemSubmit: function() {
      this.isDialog4 = false;
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '立即兑换_取消']);
    },
    ObtainNetFeeRedeemCodeSubmit: function() {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '立即兑换_确认兑换']);
      var _this = this;
      let paramList = {
        NetbarId: this.NetBarId,
        ActivityId: 9,
        Phone: this.phone,
        Money: this.Money,
        Source: "Steam"
      };
      post("api/Consumer/ObtainNetFeeRedeemCode", paramList)
        .then(res => {
          _this.isDialog4 = false;
          if (res.Message) {
            Message({
              message: res.Message,
              type: "warning"
            });
          } else {
            Message({
              message: "兑换成功",
              type: "success"
            });
          }

          _this.GetCreateOrderTime();
        }).catch(err => {});
    },
    getActivityUrl: function() {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '活动简介']);
      window.open('http://tdesk.580tequan.com/activity/Activity.html');
    },
    feedbackBougout: function(OrderNuber) {
      _hmt.push(['_trackEvent', '我的游戏页面', '点击量', '游戏列表_意见反馈']);
      this.$router.push({
        path: '/OrderCenter/Feedback',
        query: {
          OrderNuber: OrderNuber
        }
      })
    }
  },
  // 监听,当路由发生变化的时候执行
  watch: {
    PagesLoginIs: function(to, from) {
      if (sessionStorage.getItem("phone")) {
        this.phone = sessionStorage.getItem("phone");
        this.getdata();
        this.GetCreateOrderTime();
      }
    },

  },
};
</script>
