<template>
<div>
  <div class="HomePage_lead zoomInDown animated" v-if="HomePageLead && GetUserInfoList.Temp>=5">
    <div class="HomePage_arrow"></div>
    <div class="HomePage_sreicv">
      <p>您有{{parseInt(GetUserInfoList.Temp||0)}}元网费待领取，快去领取吧！ <i class="iconfont icon-cuohao" @click="CuohaoHomePage"></i></p>
      <div class="HomePage_sreicv_buttom" @click="ReceiveHomePage">立即领取</div>
    </div>
  </div>
  <div class="HomePage_lead zoomInDown animated" style="left: 147px;right: auto;" v-if="ExpireDateBox && ExpireDateTime!=null">
    <div class="HomePage_arrow" style="left: 20px;"></div>
    <div class="HomePage_sreicv">
      <i class="iconfont icon-cuohao asourr_iconfont" @click="ExpireDatePage"></i>
      <p>温馨提示：当前网吧的580网吧特权-钻石版，</p>
      <p>将在{{ExpireDateTime.substring(0,10)}}到期，请联系网管及时续费！</p>
    </div>
  </div>
  <div class="HomePageList">
    <div class="GameList_ul clearfix">
      <a href="javascript:;" class="Left_Button fl" @click="slidePre"></a>
      <div class="Slider_Box fl">
        <slider ref="slider" :options="options" @slide="slide">
          <slideritem v-for="item in PageSteamList" :key="item.GameId" :class="['Slide_Style', GameId==item.GameId?'Active':'']">
            <a href="javascript:;" @click="FreePlay(item.GameId)">
              <img :src="item.imgUrl" alt>
              <p class="GameName">免费玩</p>
            </a>
            <div class="Slider_hoverAcvter" @click="FreePlay(item.GameId)">
              <!-- <p>免费玩</p> -->
              <span>选择游戏</span>
            </div>
          </slideritem>
        </slider>
      </div>
      <a href="javascript:;" class="Right_Button fr" @click="slideNext"></a>
    </div>
    <div class="activity_Content clearfix" v-if="isNetBarActivity">
      <div class="activity_berver fl" @click="getActivityUrl()">
        <img src="../../assets/images/Activity/7.png">
        <!-- <div class="activity_vceet" @click="getActivityUrl()">
          <span>立即参与</span>
        </div> -->
      </div>
      <div class="activity_ouast fr">
        <div class="activity_ouast_li" @click="activityGG('1')">
          <img src="../../assets/images/Activity/111.png">
        </div>
        <div class="activity_ouast_li" @click="activityGG('2')">
          <img src="../../assets/images/Activity/222.png">
        </div>
        <div class="activity_ouast_li" @click="activityGG('3')">
          <img src="../../assets/images/Activity/5.png">
        </div>
        <div class="activity_ouast_li" @click="activityGG('4')">
          <img src="../../assets/images/Activity/6.png">
          <!-- <img src="../../assets/images/Activity/6.png"> -->
        </div>
      </div>
    </div>
    <div class="Detail_Content" v-else>
      <div class="Game_Pic fl">
        <div class="Big_Pic fl" @click="ruoueUrl(GameList.GameURL)">
          <img :src="bigImg" alt>
        </div>
        <div class="Small_Pic fr">
          <ul>
            <li :class="imgActive == 1 ? 'Active': ''" @mouseenter="changeBigImg(detailObj.imgList.img1, 1)">
              <img :src="detailObj.imgList.img1" alt>
            </li>
            <li :class="imgActive == 2 ? 'Active': ''" @mouseenter="changeBigImg(detailObj.imgList.img2, 2)">
              <img :src="detailObj.imgList.img2" alt>
            </li>
            <li :class="imgActive == 3 ? 'Active': ''" @mouseenter="changeBigImg(detailObj.imgList.img3, 3)">
              <img :src="detailObj.imgList.img3" alt>
            </li>
          </ul>
        </div>
      </div>
      <div class="Game_Detail fr">
        <div class="Detail">
          <h2 @click="ruoueUrl(GameList.GameURL)">{{detailObj.GameName}}</h2>
          <p>
            {{detailObj.GameIntroduction}}
            <a href="javascript:;" v-if="detailObj.GameURL" @click="ruoueUrl(GameList.GameURL)">查看详情>></a>
          </p>
        </div>
        <div class="Buy">
          <div class="TimeBox" style="margin-bottom: 12px;">
            <span>免费时长：</span>
            <a href="javascript:;" class="prep" @click="sub" v-if="steamPUBG">-</a><span class="textInput">{{ipt}}</span><a href="javascript:;" class="add" @click="add" v-if="steamPUBG">+</a>
            <span class="Hours">
              还可以免费玩
              <span>{{maxtiem}}</span>
              小时
            </span>
          </div>
          <p class="Ps" style="margin-bottom: 2px;">温馨提示：禁止使用外挂或其他插件，否则将关闭游戏</p>
          <p class="Ps" style="margin-bottom: 10px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每次下单或加时最高可选5个小时</p>
          <div class="licne" style="margin-left:5px;">
            <img src="@/assets/images/liuu.gif" alt>
          </div>
          <div class="Buy_Box">
            <div class="fl">
              <a href="javascript:;" class="Free_Play" @click="PlaceanSubmit()" @mouseover="freePlayHover = false" @mouseout="freePlayHover = true">
                <img v-if="freePlayHover" src="./../../assets/images/icon-15.png" alt>
                <img v-else src="./../../assets/images/icon-15-hover.png" alt>
              </a>
            </div>
            <div class="Go_Buy_Price fr" @click="goBuy">
              <a href="javascript:;" class="Price_Box" v-if="detailObj.OriginalPrice">
                <span class="Price">￥{{detailObj.DiscountPrice}}</span>
                <span class="Line_Price">￥{{detailObj.OriginalPrice}}</span>
              </a>
              <a href="javascript:;" class="Go_Buy" v-if="detailObj.OriginalPrice" @mouseover="goBuyHover=false" @mouseout="goBuyHover=true">
                <img v-if="goBuyHover" src="./../../assets/images/icon-16.png" alt>
                <img v-else src="./../../assets/images/icon-16-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="NetBarVIP?'footer_VIP footer':'footer_huangjin footer'">
    <img src="../../assets/images/footer_g.png">
  </div>
  <!-- 手机号码验证 -->
  <We-Chat-Verification v-if="MobilePhoneHoverIs" :isVisible.sync="MobilePhoneHoverIs" @MobilePhoneBox="MobilePhoneHoverSubmit"></We-Chat-Verification>
  <We-Chat-Verification v-if="ExchangeHoverIs" :isVisible.sync="ExchangeHoverIs" @MobilePhoneBox="ExchangeSubmit"></We-Chat-Verification>
  <!-- 双击下单 -->
  <div v-if="PlaceanYoutou" @click="PlaceanYoutou = false;">
    <div class="dialogBox">
      <div class="bg"></div>
      <div class="dialogBox-PlaceanYoutou">
        <img src="@/assets/images/PlaceanYoutou.png" alt class=" jackInTheBox animated">
      </div>
    </div>
  </div>
  <!-- 下单 -->
  <div v-if="isDialog">
    <div class="dialogBox">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">请选择免费玩时长</div>
        <div class="content-box">
          <div class="content_detail">
            <div class="content_phone">游戏名称：{{GameList.GameName}}</div>
            <div class="content_phone">剩余免费总时长：{{maxtiem}}小时</div>
            <div class="content_phone content_butadr">
              <span>请选择免费时长：</span>
              <a href="javascript:;" class="prep" @click="sub" v-if="steamPUBG">-</a>
              <span class="textInput">{{ipt}}</span>
              <a href="javascript:;" class="add" @click="add" v-if="steamPUBG">+</a>
            </div>
          </div>
          <div class="GGboostetcheckbox">
            <input type="checkbox" name="GGboosterValue1" v-model="GGboosterValue1" id="input-checkbox">
            <label for="input-checkbox">是否使用加速器（开启加速器体验更佳）</label>
          </div>
          <div class="PS_Button_Box" style="padding: 2px 0;">
            <!-- <p>温馨提示：使用加速器可以让游戏体验更流畅</p> -->
            <!-- <img src="./../../assets/images/icon-start-game.png" alt=""> -->
            <div class="dialog-footer clearfix">
              <a class="dialog-btn cancel fl" @click="isDialog = false;closeHover = true,GGboosterValue1=false" @mouseover="closeHover = false" @mouseout="closeHover = true">
                <img v-if="closeHover" src="./../../assets/images/icon-cancel.png" alt>
                <img v-else src="./../../assets/images/icon-cancel-hover.png" alt>
              </a>
              <a class="dialog-btn make-sure fr" @click="btnConfirm" @mouseover="startHover = false" @mouseout="startHover = true">
                <img v-if="startHover" src="./../../assets/images/icon-start.png" alt>
                <img v-else src="./../../assets/images/icon-start-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 续租 -->
  <div v-if="isOrder">
    <div class="dialogBox1">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">温馨提示</div>
        <div class="header_nes"> 该游戏有未结束的订单！ </div>
        <div class="content-box" style="padding: 5px 24px;">
          <div class="content_detail">
            <div class="content_phone">游戏名称：{{EffectiveOrderList.GameName}}</div>
            <div class="content_phone">该订单到期时间：{{EffectiveOrderList.EndTime}}</div>
            <div class="content_phone">剩余免费总时长：{{maxtiem}}小时</div>
            <div class="content_phone content_butadr">
              <span>请选择免费时长：</span>
              <a href="javascript:;" class="prep" @click="subOrder" v-if="steamPUBG">-</a>
              <span class="textInput">{{Count}}</span>
              <a href="javascript:;" class="add" @click="addOrder" v-if="steamPUBG">+</a>
            </div>
          </div>
          <div class="GGboostetcheckbox">
            <input type="checkbox" name="GGboosterValue2" v-model="GGboosterValue2" id="input-checkbox">
            <label for="input-checkbox">是否使用加速器（开启加速器体验更佳）</label>
          </div>
          <div class="PS_Button_Box" style="padding: 5px 0;">
            <!-- <p>温馨提示：使用加速器可以让游戏体验更流畅</p> -->
            <!-- <img src="./../../assets/images/icon-start-game.png" alt=""> -->
            <div class="dialog-footer clearfix" style="padding: 0 7%;">
              <a class="dialog-btn cancel fl" @click="isOrder = false;closeHover = true,GGboosterValue2=false" @mouseover="closeHover = false" @mouseout="closeHover = true">
                <img v-if="closeHover" src="./../../assets/images/icon-cancel.png" alt>
                <img v-else src="./../../assets/images/icon-cancel-hover.png" alt>
              </a>
              <a class="dialog-btn make-sure fr" @click="EffectiveOrderSubmit" @mouseover="startHover = false" @mouseout="startHover = true">
                <img v-if="startHover" src="./../../assets/images/icon-start.png" alt>
                <img v-else src="./../../assets/images/icon-start-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 账号今日免费玩时长已达上限 -->
  <div v-if="isDialog2">
    <div class="dialogBox2">
      <div class="bg"></div>
      <div class="dialogBox-container">
        <div class="header">温馨提示</div>
        <div class="content-box">
          <div class="PS_Button_Box">
            <p>你今日已免费体验时长已用完，请明日再来，你也可以</p>
            <!-- <img src="./../../assets/images/icon-start-game.png" alt=""> -->
            <div class="dialog-footer">
              <a class="dialog-btn cancel fl" @click="startGame('前往租号')" @mouseover="rentHover = false" @mouseout="rentHover = true">
                <img v-if="rentHover" src="./../../assets/images/icon-rent.png" alt>
                <img v-else src="./../../assets/images/icon-rent-hover.png" alt>
              </a>
              <a class="dialog-btn make-sure fr" @click="lijiruoueUrl('http://580.steam.taohaobang.com?form=580','立即买号')" @mouseover="buyNoHover = false" @mouseout="buyNoHover = true">
                <img v-if="buyNoHover" src="./../../assets/images/icon-buy-no.png" alt>
                <img v-else src="./../../assets/images/icon-buy-no-hover.png" alt>
              </a>
            </div>
          </div>
        </div>
        <a href="javascript:;" class="Close_Button" @click="isDialog2 = false">
          <img src="./../../assets/images/close.png" alt>
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
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>5元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>5元</p>
            </div>
            <div :class="{hoverClass:10==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(10)" v-if="GetUserInfoList.Temp>=10">
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>10元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>10元</p>
            </div>
            <div :class="{hoverClass:15==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(15)" v-if="GetUserInfoList.Temp>=15">
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>15元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>15元</p>
            </div>
            <div :class="{hoverClass:20==Money,disabledClass:GetUserInfoList.Temp<5}" @click="changeList(20)" v-if="GetUserInfoList.Temp>=20">
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>20元</p>
            </div>
            <div class="birewe_class" v-else>
              <img src="./../../assets/images/Activity/nyi.png" alt>
              <p>20元</p>
            </div>
          </div>
        </div>
        <div class="dialog-footer clearfix" style="padding: 0 8%;">
          <a class="dialog-btn cancel fl" @click="RedeemSubmit"></a>
          <a class="dialog-btn make-sure fr" @click="ObtainNetFeeRedeemCodeSubmit"></a>
        </div>
        <!-- <a href="javascript:;" class="Close_Button" @click="isDialog4 = false">
          <img src="./../../assets/images/close.png" alt>
        </a> -->
      </div>
    </div>
  </div>
  <!-- //网费兑换  不足5元 -->
  <div v-if="isDialog5">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <img src="./../../assets/images/Activity/w1.png" class="img_yw swing animated">
        <p>您获得的网费<span>不足5元</span></p>
        <p> 快去体验游戏攒网费吧！ </p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn fl" @click="CancelBox"></a>
          <a class="dialog-btn fr" @click="ExperienceBox"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //网费兑换  网吧未开通活动-->
  <div v-if="isDialog6">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <img src="./../../assets/images/Activity/w1.png" class="img_yw swing animated">
        <p>该网吧暂未开通网费兑换功能，</p>
        <p> 请联系网吧管理员开通！ </p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn center_vv" @click="isDialog6=false"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //网吧黄金版  游戏未开通活动-->
  <div v-if="isDialog7">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer"></div>
      <div class="dialogBox-container">
        <img src="./../../assets/images/Activity/w1.png" class="img_yw swing animated">
        <p>该游戏仅限钻石版特权使用，如需体验</p>
        <p> 请联系网管开通steam特权钻石版 </p>
        <div class="dialog-footer clearfix" style="padding: 20px 8%;">
          <a class="dialog-btn center_vv" @click="isDialog7=false"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //下单  判断是否有存在的订单-->
  <div v-if="isDialog8">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer" @click="isDialog8=false;"></div>
      <div class="dialogBox-container" style="padding-top: 0;">
        <div class="header">温馨提示</div>
        <p style="line-height: 48px;">陛下！当前该游戏有正在进行的订单</p>
        <p style="line-height: 48px;"> 你也可以进行以下操作 </p>
        <div class="dialog-footer clearfix" style="padding: 30px 2%;">
          <a class="dialog-btn center_zaixaidan" @click="isDialog8=false;isDialog = true"></a>
          &nbsp;&nbsp;&nbsp;
          <a class="dialog-btn center_jiashi" @click="isDialog8=false;kerpOnekeyNumber()"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- //网费兑换  不足5元 -->
  <div v-if="isDialog9">
    <div class="dialogBox_config dialogBox_wangfei">
      <div class="bg_mouer" @click="isDialog9 = false"></div>
      <div class="dialogBox-container" style="padding-top: 72px;">
        <img src="./../../assets/images/Activity/w1.png" class="img_yw swing animated">
        <p style="font-size: 16px;line-height: 25px;color: #f5f7eb;">经平台核证，你的账号因使用外挂或其他插件，</p>
        <p style="font-size: 16px;line-height: 25px;color: #f5f7eb;">平台已禁止你体验580提供的游戏权限，</p>
        <p style="font-size: 16px;line-height: 25px;color: #f5f7eb;">如有疑问，请联系客服！你仍然拥有使用其 </p>
        <p style="font-size: 16px;line-height: 25px;color: #f5f7eb;"> 他功能或参与活动的权限，祝你游戏愉快！</p>
        <div class="dialog-footer clearfix" style="padding: 20px 30%;">
          <a class="dialog-btn fl" @click="isDialog9 = false"></a>
        </div>
      </div>
    </div>
  </div>
  <!-- 玩命加载中。。。。 -->
  <div v-if="isDialoging">
    <div class="dialogBox">
      <div class="bg"></div>
      <div class="dialogBox-container-Loading">
        <img src="@/assets/images/Loing.gif">
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
  Message,
  MessageBox
} from "element-ui";
import {
  get,
  post
} from "@/utils/ajax";
import {
  slider,
  slideritem
} from "vue-concise-slider"; // import slider components
import WeChatVerification from '../../components/WeChatVerification.vue' //微信二维码验证

export default {
  name: "HomePageList",
  data() {
    return {
      isDialoging: false,
      MobilePhoneHoverIs: false,
      ExchangeHoverIs: false,
      // isLoading: true,
      PageSteamList: [],
      GameId: "", //游戏id
      detailObj: {
        GameName: "",
        GameURL: "",
        imgList: {
          img1: "",
          img2: "",
          img3: ""
        },
        GameIntroduction: "",
        OriginalPrice: "",
        DiscountPrice: ""
      },
      bigImg: "",
      imgActive: "1",
      currentPage: 0,

      phone: "",
      ipt: 1,
      steamPUBG: true,
      islight: true,
      maxtiem: "",
      GameList: {},
      isDialog: false,
      isDialog2: false,
      freePlayHover: true,
      cancelHover: true,
      confirmHover: true,
      rentHover: true,
      buyNoHover: true,
      closeHover: true,
      startHover: true,
      goBuyHover: true,
      GGboosterValue1: false, //是否启动加速器
      GGboosterValue2: false, //是否启动加速器
      EffectiveOrderList: {}, //游戏是否存在未结束的订单
      isOrder: false, //游戏是否存在未结束的订单
      OrderNuber: '', //游戏是否存在未结束的订单
      Count: 1, //游戏是否存在未结束的订单
      //网费兑换
      HomePageLead: false,
      ExpireDateBox: false,
      isDialog5: false,
      isDialog6: false,
      isDialog7: false,
      isDialog8: false,
      isDialog9: false,
      PlaceanYoutou: false,
      GetUserInfoList: {},
      isDialog4: false,
      Money: 5,
      GGboosterValue3: false, //是否启动加速器
      options: {
        pagination: false,
        currentPage: 0,
        tracking: false,
        thresholdDistance: 100, // 滑动距离阈值判定
        thresholdTime: 300, // 滑动时间阈值判定
        loopedSlides: 7, // 多级滚动时，需要添加前后遍历数
        slidesToScroll: 7, // 需要滚动页面的数量
        loop: true, // 无限循环
        // autoplay: 1000 // 自动播放:时间[ms]
      },
      //滑动配置[obj]
      sliderinit: {
        currentPage: 0, //当前页码
        thresholdDistance: 500, //滑动判定距离
        thresholdTime: 100, //滑动判定时间
        // autoplay: 1000, //自动滚动[ms]
        loop: true, //循环滚动
        direction: "vertical", //方向设置，垂直滚动
        infinite: 1, //无限滚动前后遍历数
        slidesToScroll: 7 //每次滑动项数
      }
    };
  },
  computed: {
    ...mapGetters(["SteamList", "NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity", "ExpireDateTime", "GameState", "isNetBarActivity"])
  },
  components: {
    WeChatVerification,
    slider,
    slideritem
  },
  created() {
    if (this.SteamList && this.SteamList.length > 0) {
      this.PageSteamList = this.SteamList.slice(0, 7);
      let gameID = this.PageSteamList[
        Math.floor(Math.random() * this.PageSteamList.length)
      ].GameId;
      this.GameId = gameID;
    }
    Extern_Form_SetWindowsNum(1);
    this.GetContent();
    // 获取登录状态
    this.phone = sessionStorage.getItem("phone");
    if (this.phone) {
      let paramList = {
        phone: this.phone
      };
      var _this = this;
      get("api/SteamOrder/GetPhoneSurplusCreateOrderTime", paramList).then(res => {
        _this.maxtiem = res.Object;
      }).catch(err => {});
      this.GetUserInfoExchange();
    } else {
      this.maxtiem = 10;
    }
    //获取立即领取是否关闭HomePageLead
    var HomePageLead = sessionStorage.getItem("HomePageLead");
    if (!HomePageLead) {
      this.HomePageLead = true;
    } else {
      this.HomePageLead = false;
    }
    //特权到期   是否关闭 ExpireDateBox
    var ExpireDateBox = sessionStorage.getItem("ExpireDateBox");
    if (!ExpireDateBox) {
      this.ExpireDateBox = true;
    } else {
      this.ExpireDateBox = false;
    }
  },
  methods: {
    // 前往租号
    startGame: function(name) {
      _hmt.push(['_trackEvent', '下单弹框', '点击量', name]);
      Extern_Form_open_GG();
    },
    //立即买号
    lijiruoueUrl: function(url, name) {
      _hmt.push(['_trackEvent', '下单弹框', '点击量', name]);
      Extern_Form_open_ie_url(url);
    },
    turnTo(num) {
      // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
      this.$refs.slider.$emit("slideTo", num);
    },
    slideNext() {
      console.log(this.currentPage);
      console.log(this.PageSteamList);
      if (this.currentPage == 0 && this.PageSteamList.length == 7) {
        var _SteamList = this.SteamList.slice(7, 14);
      }
      if (this.currentPage == 7 && this.PageSteamList.length == 14) {
        var _SteamList = this.SteamList.slice(14, 21);
      }
      if (this.currentPage == 14 && this.PageSteamList.length == 21) {
        var _SteamList = this.SteamList.slice(21, 28);
      }
      if (this.currentPage == 21 && this.PageSteamList.length == 28) {
        var _SteamList = this.SteamList.slice(28, 35);
      }
      if (_SteamList) {
        this.PageSteamList = this.PageSteamList.concat(_SteamList);
      }
      this.$refs.slider.$emit("slideNext");
    },
    slidePre() {

      // if (this.currentPage == 0 && this.PageSteamList.length == 7) {
      //   var _SteamList = this.SteamList.slice(28, 35);
      // }
      // if (this.currentPage == 7 && this.PageSteamList.length == 14) {
      //   var _SteamList = this.SteamList.slice(21, 28);
      // }
      // if (this.currentPage == 14 && this.PageSteamList.length == 21) {
      //   var _SteamList = this.SteamList.slice(14, 21);
      // }
      // if (this.currentPage == 21 && this.PageSteamList.length == 28) {
      //   var _SteamList = this.SteamList.slice(7, 14);
      // }
      // if (_SteamList) {
      //   this.PageSteamList = this.SteamList;
      // }
      if (this.PageSteamList.length != 35) {
        console.log(this.currentPage);
        console.log(this.PageSteamList);
        this.PageSteamList = this.SteamList;
      }
      this.$refs.slider.$emit("slidePre");
    },
    autoplayStart() {
      this.$refs.slider.$emit("autoplayStart");
    },
    autoplayStop() {
      this.$refs.slider.$emit("autoplayStop");
    },
    loadingShow() {
      this.$refs.slider.$emit("loadingShow");
    },
    loadingHide() {
      this.$refs.slider.$emit("loadingHide");
    },
    // 监听事件发生了变化,需要指向一个子组件实例
    slide(data) {
      // console.log(data);
      this.currentPage = data.currentPage;
    },
    // 切换大图
    changeBigImg(src, index) {
      // console.log(index);
      this.bigImg = src;
      this.imgActive = index;
    },
    //免费玩
    FreePlay: function(GameId) {
      this.$store.commit('SET_ISNETBARACTIVITY', false);
        if (this.GameId == GameId) {
          this.PlaceanYoutou = true;
          var _this = this;
          window.setTimeout(function() {
            _this.PlaceanYoutou = false;
          }, 2000);
        } else {
          this.PlaceanYoutou = false;
          this.GameId = GameId;
          this.imgActive = "1";
          this.GetContent();
        }
    },
    // 获取内容
    GetContent: function() {
      this.SteamList &&
        this.SteamList.map(item => {
          if (this.GameId === item.GameId) {
            this.detailObj = item;
            this.GameList = item;
            this.detailObj.GameName = item.GameName;
            this.detailObj.GameURL = item.GameURL;
            this.bigImg = item.imgList.img1;
            this.detailObj.imgList.img1 = item.imgList.img1;
            this.detailObj.imgList.img2 = item.imgList.img2;
            this.detailObj.imgList.img3 = item.imgList.img3;
            this.detailObj.GameIntroduction = item.GameIntroduction;
            this.detailObj.OriginalPrice = item.OriginalPrice;
            this.detailObj.DiscountPrice = item.DiscountPrice;
          }
        });
    },

    // 减少数量
    sub: function() {
      if (this.ipt > 1) {
        this.ipt--;
        this.islight = this.lightFunc();
      }
    },
    // 增加数量
    add: function() {
      if (this.ipt < 5) {
        this.ipt++;
        this.islight = this.lightFunc();
      }
    },
    subOrder: function() {
      if (this.Count > 1) {
        this.Count--;
        this.islight = this.lightFunc();
      }
    },
    // 增加数量
    addOrder: function() {
      if (this.Count < 5) {
        this.Count++;
        this.islight = this.lightFunc();
      }
    },
    lightFunc() {
      if (this.Count < 5) {
        return true;
      } else {
        return false;
      }
    },
    //免费玩  游戏下单
    PlaceanSubmit: function() {
      // 免费玩点击
      _hmt.push(["_trackEvent", "游戏介绍区域", "点击", "免费玩"]);
      //判断是否登录
      var onerNamePhone = sessionStorage.getItem("phone");
      if (!onerNamePhone) {
        this.MobilePhoneHoverIs = true;
        this.$store.commit('SET_ONERNSME', '个人中心');
      } else {
        if (this.GameState == 1) {
          this.isDialog9 = true;
        } else {
          if (!this.NetBarVIP && !this.GameList.GameVip) {
            this.isDialog7 = true;
          } else {
            this.MobilePhoneHoverIs = false;
            // 获取登录状态
            this.phone = onerNamePhone;
            if (this.phone) {
              var _this = this;
              let paramList = {
                phone: this.phone
              };
              get("api/SteamOrder/GetPhoneSurplusCreateOrderTime", paramList).then(res => {
                _this.maxtiem = res.Object;
                // 根据剩余时长判断是否可以游戏
                if (_this.maxtiem > 0) {
                  _this.IsGameffectiveOrder();
                } else {
                  // console.log("没有时间玩");
                  _this.isDialog2 = true;
                }
              }).catch(err => {});
            }
          }
        }
      }
    },
    //游戏下单 登录完成以后的回调
    MobilePhoneHoverSubmit: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      if (!this.NetBarVIP && !this.GameList.GameVip) {
        this.isDialog7 = true;
      } else {
        this.MobilePhoneHoverIs = false;
        // 获取登录状态
        this.phone = UserInformation.Phone;
        if (this.phone) {
          var _this = this;
          let paramList = {
            phone: this.phone
          };
          get("api/SteamOrder/GetPhoneSurplusCreateOrderTime", paramList).then(res => {
            _this.maxtiem = res.Object;
            // 根据剩余时长判断是否可以游戏
            if (_this.maxtiem > 0) {
              _this.IsGameffectiveOrder();
            } else {
              // console.log("没有时间玩");
              _this.isDialog2 = true;
            }
          }).catch(err => {});
        }
      }
    },
    //判断游戏是否存在未结束的订单
    IsGameffectiveOrder: function() {
      var _this = this;
      let paramListEst = {
        phone: this.phone,
        gameid: this.GameList.GameId
      };
      get("api/SteamOrder/GetEffectiveOrder", paramListEst).then(res => {
        if (res.Object) {
          console.log(res.Object);
          _this.EffectiveOrderList = res.Object;
          _this.isDialog8 = true;
          // _this.isOrder = true;
        } else {
          _this.isDialog = true;
        }
      }).catch(err => {});
    },
    //下单  一键上号
    btnConfirm: function() {
      _hmt.push(["_trackEvent", "下单弹框", "点击", "开始游戏"]);
      var _this = this;
      let phone = sessionStorage.getItem("phone");
      let paramList = {
        netbarId: this.NetBarId,
        phone: this.phone,
        gameId: this.GameList.GameId,
        gameName: this.GameList.GameName,
        count: this.ipt
      };
      this.isDialoging = true;
      post("api/SteamOrder/CreateOrder", paramList)
        .then(res => {
          _this.isDialoging = false;
          //一键上号
          _this.OnekeyNumber(res.Object.Code);
          //启动游戏加速器
          if (_this.GGboosterValue1) {
            Extern_Form_open_ggbooster();
            _hmt.push(["_trackEvent", "游戏下单", "点击", "启动游戏加速器"]);
          }
        }).catch(err => {
          window.setTimeout(function() {
            _this.isDialoging = false;
          }, 1000);
        });
    },
    //续租  一键上号
    EffectiveOrderSubmit: function() {
      if (this.Count != 0) {
        var _this = this;
        let paramList = {
          OrderNuber: this.EffectiveOrderList.OrderNuber,
          Count: this.Count,
        };
        this.isDialoging = true;
        this.isOrder = false;
        post("api/SteamOrder/RenewalOrder", paramList)
          .then(res => {
            _this.isOrder = false;
            _this.isDialoging = false;
            //一键上号
            _this.OnekeyNumber(res.Object.Code);
            //启动游戏加速器
            if (_this.GGboosterValue2) {
              Extern_Form_open_ggbooster();
              _hmt.push(["_trackEvent", "游戏续租", "点击", "启动游戏加速器"]);
            }
          }).catch(err => {
            window.setTimeout(function() {
              _this.isDialoging = false;
            }, 1000);
          });
      } else {
        //一键上号
        this.OnekeyNumber(this.EffectiveOrderList.Code);
        //启动游戏加速器
        if (this.GGboosterValue2) {
          Extern_Form_open_ggbooster();
          _hmt.push(["_trackEvent", "游戏续租", "点击", "启动游戏加速器"]);
        }
      }

    },
    ruoueUrl: function(url) {
      Extern_Form_open_ie_url(url);
    },
    goBuy: function() {
      // 去购买点击
      _hmt.push(["_trackEvent", "游戏介绍区域", "点击", "游戏购买"]);
      this.ruoueUrl(this.GameList.GameURL);
    },
    //一键上号
    OnekeyNumber: function(Code) {
      // 关闭弹窗
      this.isDialog = false;
      var Phone = sessionStorage.getItem("phone");
      window.open(this.GloUrl + 'OrderCenter/MyGame?Phone=' + Phone);
      // 启动游戏
      Extern_Form_open_AutoSSQ(Code);
    },
    kerpOnekeyNumber: function() {
      // 关闭弹窗
      this.isDialog = false;
      var Phone = sessionStorage.getItem("phone");
      window.open(this.GloUrl + 'OrderCenter/MyGame?Phone=' + Phone);
    },
    //首页跳转个人中心指定页面
    activityGG: function(activityid) {
      switch (activityid) {
        case '1':
          _hmt.push(['_trackEvent', '首页推广图', '点击量', '英雄联盟一起去超越']);
          this.pagesActivityGG('OrderCenter/InternetCafeCompetition');
          break;
        case '2':
          _hmt.push(['_trackEvent', '首页推广图', '点击量', '绝地求生吃鸡令']);
          this.pagesActivityGG('OrderCenter/GameActivitiesPUGB');
          break;
        case '3':
          _hmt.push(['_trackEvent', '首页推广图', '点击量', '游戏竞猜']);
          this.pagesActivityGG('OrderCenter/GameGuess');
          break;
        case '4':
          _hmt.push(['_trackEvent', '首页推广图', '点击量', '免费体验游戏,送网费活动']);
          this.pagesActivityGG('OrderCenter/PrizetakingActivities');
          break;
        default:
      }
    },
    //公共跳转
    pagesActivityGG: function(url) {
      var Phone = sessionStorage.getItem("phone");
      if (Phone) {
        window.open(this.GloUrl + url + '?Phone=' + Phone);
      } else {
        window.open(this.GloUrl + url);
      }
    },
    //立即领取  关闭
    CuohaoHomePage: function() {
      _hmt.push(['_trackEvent', '网费活动快去领取', '点击量', '关闭按钮']);
      this.HomePageLead = false;
      sessionStorage.setItem("HomePageLead", false);
    },
    ReceiveHomePage: function() {
      _hmt.push(['_trackEvent', '网费活动快去领取', '点击量', '快去领取']);
      if (this.NetBarActivity) {
        this.isDialog4 = true;
      } else {
        this.isDialog6 = true;
      }

    },
    //特权到期  关闭
    ExpireDatePage: function() {
      _hmt.push(['_trackEvent', '特权到期', '点击量', '关闭按钮']);
      this.ExpireDateBox = false;
      sessionStorage.setItem("ExpireDateBox", false);
    },
    //首页活动网费兑换
    getActivityUrl: function() {
      // 免费玩点击
      _hmt.push(['_trackEvent', '首页推广图', '点击量', '网吧电竞活动']);
      this.pagesActivityGG('OrderCenter/InternetCafeCompetition');
    },
    ExchangeSubmit: function(UserInformation) {
      this.SetInAllWindows('AllWindowsSet', JSON.stringify(UserInformation));
      var onerNamePhone = UserInformation.Phone;
      let paramList = {
        phone: onerNamePhone
      };
      var _this = this;
      get("/api/Consumer/GetUserInfo", paramList)
        .then(res => {
          if (res.Object) {
            _this.GetUserInfoList = res.Object;
            if (this.GetUserInfoList.Temp >= 5) {
              this.isDialog4 = true;
            } else {
              this.isDialog5 = true;
            }
          }
        }).catch(err => {});
    },
    //获取用户网费兑换的余额
    GetUserInfoExchange: function() {
      var onerNamePhone = sessionStorage.getItem("phone");
      let paramList = {
        phone: onerNamePhone
      };
      var _this = this;
      get("/api/Consumer/GetUserInfo", paramList)
        .then(res => {
          if (res.Object) {
            _this.GetUserInfoList = res.Object;
            // _this.GetUserInfoList.Temp = 10;
          }
        }).catch(err => {});
    },
    changeList(index) {
      this.Money = index;
    },
    RedeemSubmit: function() {
      this.isDialog4 = false;
      _hmt.push(['_trackEvent', '首页', '点击量', '立即兑换_取消']);
    },
    ObtainNetFeeRedeemCodeSubmit: function() {
      _hmt.push(['_trackEvent', '首页', '点击量', '立即兑换_确认兑换']);
      var onerNamePhone = sessionStorage.getItem("phone");
      var _this = this;
      let paramList = {
        NetbarId: this.NetBarId,
        ActivityId: 9,
        Phone: onerNamePhone,
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
          _this.GetUserInfoExchange();
        }).catch(err => {});
    },
    //网费兑换  不足5元 取消
    CancelBox: function() {
      this.isDialog5 = false;
      _hmt.push(['_trackEvent', '首页', '点击量', '网费不足弹框_取消']);
    },
    //网费兑换  不足5元 立即体验游戏
    ExperienceBox: function() {
      this.isDialog5 = false;
      this.$store.commit('SET_ISNETBARACTIVITY', false);
      _hmt.push(['_trackEvent', '首页', '点击量', '网费不足弹框_立即体验']);
    },
  }
};
</script>
<style scoped>
</style>
