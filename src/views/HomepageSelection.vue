<template>
<div class="HomepageSelection">
  <div class="HomepageSelection_top">
    <div class="HomepageSelection_banner" @click="GoHomepageSelection()">
      <el-carousel v-on:change="changeFun" v-on:handleIndicatorFun="handleIndicatorFun" height="334px" ref="carousel" :autoplay="autoplay">
        <el-carousel-item v-for="(item,index) in ImgList" :key="item.name" :name="item.name" :label="item.name">
          <img :src="item.imgUrl" :alt="item.name">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="HomepageSelection_ul">
      <div class="HomepageSelection_good"> <i class="icon iconfont icon-dianzan"></i> 精品推荐 </div>
      <div class="HomepageSelection_tabel">
        <div class="HomepageSelection_td clearfix" @click="ImmediateExperience(1)">
          <img src="@/assets/images/OverVIP/t4.png" alt="" class="img">
          <div class="center">
            <h5>带鱼电竞</h5>
            <p>玩游戏，就是要约起来</p>
          </div>
          <div class="liji">立即体验</div>
        </div>
        <div class="HomepageSelection_td clearfix" @click="ImmediateExperience(2)">
          <img src="@/assets/images/OverVIP/t2.png" alt="" class="img">
          <div class="center">
            <h5>低价游戏币</h5>
            <p>1元=50W,绿色商品,安全可靠</p>
          </div>
          <div class="liji">立即体验</div>
        </div>
        <div class="HomepageSelection_td clearfix" @click="ImmediateExperience(3)">
          <img src="@/assets/images/OverVIP/t3.png" alt="" class="img">
          <div class="center">
            <h5>美女热舞</h5>
            <p>美女在线面对面秀才艺</p>
          </div>
          <div class="liji">立即体验</div>
        </div>
        <div class="HomepageSelection_td clearfix" @click="ImmediateExperience(4)">
          <img src="@/assets/images/OverVIP/t1.png" alt="" class="img">
          <div class="center">
            <h5>超值租号体验</h5>
            <p>享最低的价格,玩最高端账号</p>
          </div>
          <div class="liji">立即体验</div>
        </div>
      </div>
    </div>
  </div>
  <div class="HomepageSelection_boot">
    <div class="HomepageSelection_h5"> <i class="icon iconfont icon-remenhuodong"></i> &nbsp; 热门活动 </div>
    <div class="container-fluid all-see">
      <div class="container all-see-content">
        <!--时下热游-->
        <ul class="play-list play-list1 clearfix">
          <li :class="{'play-list-li': true, 'active': PlayIndex == 1}" @mouseenter="PlayIndex = 1" @click="activityBioy()">
            <div class="list-title">体验活动</div>
            <div class="list-intro">玩的越多，送的越多</div>
            <div class="list-liji">
              <img src="@/assets/images/OverVIP/right1.png" alt="" style="right: -52px">
              <div class="list-btnner"> 立即参与 </div>
            </div>
            <a class="list-person">
              <img src="@/assets/images/OverVIP/13-1.png" alt="" style="right: -52px">
            </a>
            <div class="play-list-sel">
              <i class="icon iconfont icon-gift"></i> &nbsp; 每10小时送5元网吧
            </div>
          </li>
          <li :class="{'play-list-li': true, 'active': PlayIndex == 2}" @mouseenter="PlayIndex = 2" @click="activityGG('3')">
            <div class="list-title">满20送5元网费</div>
            <div class="list-intro">买LOL精粹号</div>
            <div class="list-liji">
              <img src="@/assets/images/OverVIP/right1.png" alt="" style="right: -52px">
              <div class="list-btnner"> 立即参与 </div>
            </div>
            <a class="list-person">
              <img src="@/assets/images/OverVIP/14-1.png" alt="" style="right: -52px">
            </a>
            <div class="play-list-sel">
              <i class="icon iconfont icon-gift"></i> &nbsp; 每10小时送5元网吧
            </div>
          </li>
          <li :class="{'play-list-li': true, 'active': PlayIndex == 3}" @mouseenter="PlayIndex = 3" @click="activityGG('4')">
            <div class="list-title">每人最高领20元</div>
            <div class="list-intro">游戏租号送网费</div>
            <div class="list-liji">
              <img src="@/assets/images/OverVIP/right1.png" alt="" style="right: -52px">
              <div class="list-btnner"> 立即参与 </div>
            </div>
            <a class="list-person">
              <img src="@/assets/images/OverVIP/15-1.png" alt="" style="right: -52px">
            </a>
            <div class="play-list-sel">
              <i class="icon iconfont icon-gift"></i> &nbsp; 每10小时送5元网吧
            </div>
          </li>
          <li :class="{'play-list-li': true, 'active': PlayIndex == 4}" @mouseenter="PlayIndex = 4" @click="activityGG('2')">
            <div class="list-title">送5元网费</div>
            <div class="list-intro">购买绝地求生账号</div>
            <div class="list-liji">
              <img src="@/assets/images/OverVIP/right1.png" alt="" style="right: -52px">
              <div class="list-btnner"> 立即参与 </div>
            </div>
            <a class="list-person">
              <img src="@/assets/images/OverVIP/16-1.png" alt="" style="right: -52px">
            </a>
            <div class="play-list-sel">
              <i class="icon iconfont icon-gift"></i> &nbsp; 每10小时送5元网吧
            </div>
          </li>
        </ul>
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

export default {
  name: "HomepageSelection",
  data() {
    return {
      autoplay: true,
      PlayIndex: '1',
      activeIndex: '',
      ImgList: [{
          imgUrl: require('@/assets/images/OverVIP/banner1.jpg'),
          name: '玩家现金狂欢节'
        },
        {
          imgUrl: require('@/assets/images/OverVIP/banner2.png'),
          name: '网吧专属活动'
        },
        {
          imgUrl: require('@/assets/images/OverVIP/banner3.jpg'),
          name: '代练交易平台'
        },
        {
          imgUrl: require('@/assets/images/OverVIP/banner4.jpg'),
          name: '超值租号体验'
        },
        {
          imgUrl: require('@/assets/images/OverVIP/banner5.jpg'),
          name: '低价特惠商城'
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["SteamList", "NetBarName", "NetBarId", "NetBarVIP", "NetBarActivity"])
  },
  created: function() {},
  methods: {
    handleIndicatorFun: function(index) {
      this.GoHomepageSelection();
    },
    changeFun: function(index) {
      this.activeIndex = index
    },
    GoHomepageSelection: function() {
      switch (this.activeIndex) {
        case 0:
          _hmt.push(['_trackEvent', '用户中心_主页轮播', '点击量', '网吧电竞比赛']);
          this.$router.push({
            path: '/OrderCenter/InternetCafeCompetition'
          })
          break;
        case 1:
          _hmt.push(['_trackEvent', '用户中心_主页轮播', '点击量', '网吧专属活动']);
          this.$router.push({
            path: '/OrderCenter/GameActivitiesLOL'
          })
          break;
        case 2:
          _hmt.push(['_trackEvent', '用户中心_主页轮播', '点击量', '代练交易平台']);
          Extern_Form_open_ie_url('http://www.dailiantong.com?L=580');
          break;
        case 3:
          _hmt.push(['_trackEvent', '用户中心_主页轮播', '点击量', '超值租号体验']);
          Extern_Form_open_GG()
          break;
        case 4:
          _hmt.push(['_trackEvent', '用户中心_主页轮播', '点击量', '低价特惠商城']);
          Extern_Form_open_ie_url('http://580.steam.taohaobang.com/?from=580');
          break;
        default:
      }
    },
    ImmediateExperience: function(index) {
      switch (index) {
        case 1:
          _hmt.push(['_trackEvent', '用户中心', '点击量', '带鱼电竞']);
          Extern_Form_open_ie_url('http://www.daiyudianjing.com/?580wbtq');
          break;
        case 2:
          _hmt.push(['_trackEvent', '用户中心', '点击量', '低价游戏币']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/gold?from=580');
          break;
        case 3:
          _hmt.push(['_trackEvent', '用户中心', '点击量', '美女热舞']);
          Extern_Form_open_ie_url('https://www.9xiu.com/activity/activity_pcunion?jxiusr=t_90');
          break;
        case 4:
          _hmt.push(['_trackEvent', '用户中心', '点击量', '超值租号体验']);
          Extern_Form_open_GG();
          break;
        default:
      }
    },
    activityBioy: function() {
      _hmt.push(['_trackEvent', '网费活动入口', '点击量', '体验游戏活动']);
      Extern_Form_ShowNumWindows(1);
      Extern_Form_RunJsInNumWindows(1, 'WPopupthemainPage', false);
    },
    activityGG: function(activityid) {
      switch (activityid) {
        case '3':
          _hmt.push(['_trackEvent', '网费活动入口_用户中心首页', '点击量', '买LOL精粹号送网费']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/?NetbarId=' + this.NetBarId + '&ActivityId=' + activityid);
          break;
        case '4':
          _hmt.push(['_trackEvent', '网费活动入口', '点击量', '游戏租号送网费']);
          Extern_Form_open_GG()
          break;
        case '2':
          _hmt.push(['_trackEvent', '网费活动入口', '点击量', '购买绝地求生账号']);
          Extern_Form_open_ie_url('http://www.taohaobang.com/?NetbarId=' + this.NetBarId + '&ActivityId=' + activityid);
          break;
        default:
      }
    },
  },
  watch: {

  }
};
</script>
