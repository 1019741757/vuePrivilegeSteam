<template>
<div class="LuckDraw">
  <div class="LuckDraw_box">
    <div class="clearfix">
      <div class="LuckDraw_left fl">
        <div class="LuckDraw_goo" @click="move()" v-if="moveShow"></div>
        <div class="LuckDraw_goo" v-else></div>
        <ul class="LuckDraw_app">
          <li v-for="(item,_index) in list" :key="item.PrizeID" :class="{'active': _index == index}">
            <a href="#"> <img :src="item.PrizeImg" alt=""> </a>
            <p>{{item.PrizeName}}</p>
          </li>
        </ul>
      </div>
      <div class="LuckDraw_right fr">
        <div class="LuckDraw_paiser">
          <table>
            <tr v-for="(item,_index) in playersTwoList" :key="_index">
              <td>{{item.Phone}}</td>
              <td>获得<span>{{item.PrizeName}}</span></td>
            </tr>
          </table>
        </div>
        <div class="LuckDraw_form">
          <input type="text" name="" value="" v-model="valuePQQ" :placeholder="QQplaceholder">
          <a class="totop" @click="Preservation()"></a>
        </div>
      </div>
    </div>
    <div class="LuckDraw_text">注：每次抽奖消耗<span>100</span>积分，抽中除Q币之外的奖品时，请根据相应的提示填写相应的信息，奖品才会成功发放哦！</div>
  </div>

  <!-- //  中奖   -->
  <div v-if="WinningthePrize">
    <div class="dialogBox_config WinningthePrize">
      <div class="bg_mouer" @click="WinningthePrize = false;"></div>
      <div class="dialogBox-container flipInX animated">
        <div class="WinningthePrize_quxiao" @click="WinningthePrize = false"><img src="@/assets/images/LuckDraw/z4.png" /></div>
        <div class="dialogBox_WinningthePrize_body" v-if="prize_data.PrizeID != 1">
          <p>恭喜您获得</p>
          <a> <img :src="prize_data.PrizeImg" /> </a>
          <p>"{{prize_data.PrizeName}}"</p>
          <div class="WinningthePrize_btn"><img src="@/assets/images/LuckDraw/z3.png" @click="WinningthePrize = false;" /></div>
        </div>
        <div class="dialogBox_WinningthePrize_body" style="padding-top:38%" v-else>
          <a> <img src="@/assets/images/LuckDraw/z5.png" /> </a>
          <p>很遗憾</p>
          <p>你本次未抽中！</p>
          <div class="WinningthePrize_btn"><img src="@/assets/images/LuckDraw/z3.png" @click="WinningthePrize = false;" /></div>
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
import {
  Message,
  MessageBox
} from "element-ui";
import Clipboard from "clipboard";
import {
  get,
  post
} from "@/utils/ajax";
export default {
  name: "LuckDraw",
  data() {
    return {
      list: [{
          "PrizeID": 2,
          "PrizeName": "Q币10个",
          "PrizeImg": require('@/assets/images/LuckDraw/3.png')
        },
        {
          "PrizeID": 8,
          "PrizeName": "伊泽瑞尔皮肤",
          "PrizeImg": require('@/assets/images/LuckDraw/1.png')
        },
        {
          "PrizeID": 3,
          "PrizeName": "Q币12个",
          "PrizeImg": require('@/assets/images/LuckDraw/3.png')
        },
        {
          "PrizeID": 7,
          "PrizeName": "LOL-1W点卷",
          "PrizeImg": require('@/assets/images/LuckDraw/4.png')
        },
        {
          "PrizeID": 4,
          "PrizeName": "Q币15个",
          "PrizeImg": require('@/assets/images/LuckDraw/3.png')
        },
        {
          "PrizeID": 1,
          "PrizeName": "谢谢参与",
          "PrizeImg": require('@/assets/images/LuckDraw/5.png')
        },
        {
          "PrizeID": 5,
          "PrizeName": "Q币20个",
          "PrizeImg": require('@/assets/images/LuckDraw/3.png')
        },
        {
          "PrizeID": 6,
          "PrizeName": "绝地求生账号",
          "PrizeImg": require('@/assets/images/LuckDraw/2.png')
        },


      ], //奖品列表
      playersList: [{
          "Phone": "137****8589",
          "PrizeName": '20个Q币'
        },
        {
          "Phone": "156****8555",
          "PrizeName": '绝地求生账号'
        },
        {
          "Phone": "186****7300",
          "PrizeName": 'LOL-1W点卷'
        },
        {
          "Phone": "185****5625",
          "PrizeName": '15个Q币'
        },
        {
          "Phone": "189****2586",
          "PrizeName": '绝地求生账号'
        },
        {
          "Phone": "186****8955",
          "PrizeName": '10个Q币'
        },
        {
          "Phone": "138****4522",
          "PrizeName": 'LOL-1W点卷'
        },
        {
          "Phone": "156****8955",
          "PrizeName": '游戏账号'
        },
        {
          "Phone": "138****4522",
          "PrizeName": 'LOL-1W点卷'
        },
        {
          "Phone": "138****4522",
          "PrizeName": '15个Q币'
        },
        {
          "Phone": "138****4522",
          "PrizeName": 'LOL-1W点卷'
        },
        {
          "Phone": "189****4522",
          "PrizeName": '20个Q币'
        },
        {
          "Phone": "156****4522",
          "PrizeName": '15个Q币'
        },
        {
          "Phone": "132****4522",
          "PrizeName": '12个Q币'
        },
        {
          "Phone": "156****4522",
          "PrizeName": '绝地求生账号'
        },
        {
          "Phone": "153****4522",
          "PrizeName": '绝地求生账号'
        },
        {
          "Phone": "189****4522",
          "PrizeName": '绝地求生账号'
        },
        {
          "Phone": "155****9685",
          "PrizeName": 'LOL-1W点卷'
        },
        {
          "Phone": "137****6954",
          "PrizeName": '绝地求生账号'
        },
      ],
      playersTwoList: [],
      valueQQ: "",
      valuePQQ: "",
      QQplaceholder: "请填写正确并有效的QQ账号，可修改",
      index: -1, // 当前转动到哪个位置，第一次起点位置0,对应页面item1位置
      count: 8, // 总共有多少个位置
      times: 0, // 转动跑格子次数,
      cycle: 60, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      speed: 200, // 初始转动速度
      timer: 0, // 转动定时器
      prize: 0, // 中奖位置，接口返回
      prize_data: {},
      moveShow: true,
      WinningthePrize: false, //中奖弹框

    };
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral"])
  },
  mounted() {
    this.playersTwoList = this.getRandomArray(this.playersList, 8);
  },
  methods: {
    // 目标数组中 随机抽取 新数组
    getRandomArray: function(arr, num) {
      let out = []
      let n = arr.length > num ? num : arr.length
      while (out.length < n) {
        let temp = parseInt(Math.random() * arr.length)
        out = [...out, ...arr.splice(temp, 1)]
      }
      return out
    },
    Preservation: function() {
      var filter = /^\s*[.0-9]{5,11}\s*$/;
      if (filter.test(this.valuePQQ)) {
        this.valueQQ = this.valuePQQ;
        this.valuePQQ = "";
        this.QQplaceholder = "当前领奖QQ号码：" + this.valueQQ + " (可修改)",
          Message({
            message: "保存成功!,当前领奖QQ号码为" + this.valueQQ,
            type: "success"
          });
      } else {
        Message({
          message: '请输入正确的QQ号码',
          type: "warning"
        });
      }
    },
    //点击开始抽奖
    move: function() {
      var _this = this;
      let paramList = {
        NetbarId: this.NetBarId,
        ConsumerId: sessionStorage.getItem("ConsumerId"),
        QQ: this.valueQQ
      };
      if (!this.valueQQ) {
        Message({
          message: '请先保存QQ号码',
          type: "warning"
        });
      } else if (this.AvailableIntegral < 100) {
        Message({
          message: '积分不足',
          type: "warning"
        });
      } else {
        post("api/Lottery/Lottery", paramList).then(res => {
          _this.speed = 200; //每次抽奖速度初始化为200
          for (var i = 0; i < _this.list.length; i++) {
            if (_this.list[i].PrizeID == res.Object) {
              _this.prize_data = _this.list[i]; //已经拿到中奖信息，页面展示，等抽奖结束后，将弹窗弹出
              _this.prize = i; //中奖位置赋值，跑马灯最终停留位置，这里实际位置需要-1
              _this.moveShow = false;
              _this.startRoll(); //执行抽奖
              _this.$store.dispatch('GetUserInfo').then(() => {}).catch(() => {})
            }
          }
        }).catch(err => {});
      }

    },
    // 开始转动
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll(); // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      this.usePrize();
    },

    // 每一次转动
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      const count = 8; // 总共有多少个位置
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;
    },
    usePrize() {
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
      if (this.times > this.cycle + 8 && this.prize === this.index) {
        clearTimeout(this.timer); // 清除转动定时器
        this.times = 0; // 转动跑格子次数初始化为0，可以开始下次抽奖
        this.moveShow = true;
        this.WinningthePrize = true;
      } else {
        if (this.times < this.cycle - 20) {
          this.speed -= 6; // 加快转动速度
        } else {
          this.speed += 8; // 抽奖即将结束，放慢转动速度
        }
        this.timer = setTimeout(this.startRoll, this.speed); //开始转动
      }
    },
  },
};
</script>
