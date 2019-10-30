<template>
<div class="RankingList">
  <div class="RankingList_div">
    <div class="RankingList_ul">
      <div :class="{ 'RankingList_a': GameNameVlue === 0 }" @click="GameNameVlueFun(0)"></div>
      <div :class="{ 'RankingList_b': GameNameVlue === 1 }" @click="GameNameVlueFun(1)"></div>
      <div :class="{ 'RankingList_c': GameNameVlue === 2 }" @click="GameNameVlueFun(2)"></div>
    </div>
    <div :class="{'RankingList_body':true, 'RankingList_Mosu': GameNameVlue === 2 }">
      <div class="RankingList_taer RankingList_taer_PUGB clearfix" v-if="GameNameVlue === 0">
        <div :class="{ 'taer_a': GameType === 1 }" @click="GameTypeVlueFun(1)"></div>
        <div :class="{ 'taer_b': GameType === 0 }" @click="GameTypeVlueFun(0)"></div>
        <div :class="{ 'taer_c': GameType === 2 }" @click="GameTypeVlueFun(2)"></div>
      </div>
      <div class="RankingList_taer RankingList_taer_LOL clearfix" v-if="GameNameVlue === 1">
        <div :class="{ 'taer_a': GameType === 0 }" @click="GameTypeVlueFun(0)"></div>
        <div :class="{ 'taer_b': GameType === 1 }" @click="GameTypeVlueFun(1)"></div>
        <div :class="{ 'taer_c': GameType === 2 }" @click="GameTypeVlueFun(2)"></div>
      </div>
      <div class="RankingList_ress">
        <div class="ress_a tl">
          我的<span v-if="GameNameVlue === 0 ">绝地求生</span><span v-if="GameNameVlue === 1 ">英雄联盟</span><span v-if="GameNameVlue === 2 ">云顶之奕</span>排名：<span v-if="Gameranking  > 0">第{{Gameranking}}名</span> <span v-else>未上榜</span>
        </div>
        <div class="ress_b">
          {{GameDate}}{{GameName}}
        </div>
        <div class="ress_c tr" @click="MyHistoryRankFun()">
          <span>我的历史排名</span>
        </div>
      </div>
      <div class="RankingList_tabel RankingList_uess RankingList_rutt Overflow" v-if="GameNameVlue === 0 && GameType === 1">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>场次</span> </th>
              <th> <span>吃鸡数</span></th>
              <th> <span>前十数</span></th>
              <th> <span>总击杀</span></th>
              <th> <span>本月胜点</span></th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.PUBG_Count}}</td>
              <td>{{item.PUBG_TheFirstCount}}</td>
              <td>{{item.PUBG_TopTenCount}}</td>
              <td>{{item.PUBG_KillCount}}</td>
              <td>{{item.PUBG_Integral}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess Overflow" v-if="GameNameVlue === 0 && GameType === 0">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>吃鸡数</span> </th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.Count}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess Overflow" v-if="GameNameVlue === 0 && GameType === 2">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>击杀数</span> </th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.Count}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess RankingList_rutt Overflow" v-if="GameNameVlue === 1 && GameType === 0">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>场次</span> </th>
              <th> <span>五杀数</span></th>
              <th> <span>四杀数</span></th>
              <th> <span>三杀数</span></th>
              <th> <span>超神数</span></th>
              <th> <span>击杀数</span></th>
              <th> <span>本月胜点</span></th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.LOL_Count}}</td>
              <td>{{item.LOL_PentaKillCount}}</td>
              <td>{{item.LOL_QuadraKillCount}}</td>
              <td>{{item.LOL_TripleKillCount}}</td>
              <td>{{item.LOL_LegendaryCount}}</td>
              <td>{{item.LOL_KillCount}}</td>
              <td>{{item.LOL_Integral}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess Overflow" v-if="GameNameVlue === 1 && GameType === 1">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>超神数</span> </th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.Count}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess Overflow" v-if="GameNameVlue === 1 && GameType === 2">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>击杀数</span> </th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.Count}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_tabel RankingList_uess RankingList_Mosu_uess Overflow" v-if="GameNameVlue === 2">
        <table cellspacing="0">
          <thead>
            <tr>
              <th> <span>玩家手机号</span> </th>
              <th> <span>本月胜点</span></th>
              <th> <span>排名</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in GameDateRankList" :key="item.Id" :class="{ 'active_a': index == (Gameranking-1) }">
              <td>{{item.Phone | capitalize}}</td>
              <td>{{item.LOL_YunIntegral}}</td>
              <td>
                <img src="@/assets/images/over/1.png" alt="" v-if="item.Ranking == 1">
                <img src="@/assets/images/over/2.png" alt="" v-if="item.Ranking == 2">
                <img src="@/assets/images/over/3.png" alt="" v-if="item.Ranking == 3">
                {{item.Ranking}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="RankingList_text" v-if="GameNameVlue === 0">
        <a>*</a>
        1、绝地求生胜点排行榜根据吃鸡数（50胜点/次）、场次数（5胜点/次）、击杀数（5胜点/个）、前十数（10胜点/次）获得的战绩总胜点进行排名；
        2、胜点仅作用于排行榜排名统计；
        3、游戏模式仅限大逃杀模式，如为组队模式，则需要所有队员游戏结束后，统计该局结果。
        4、战绩数据仅限580登陆状态有效。
      </div>
      <div class="RankingList_text" v-if="GameNameVlue === 1">
        <a>*</a>
        1、英雄联盟胜点排行榜根据场次数（10胜点/次）、五杀数（100胜点/次）、四杀数（50胜点/次）、三杀数（30胜点/次）、超神数（30胜点/次）、击杀数（5胜点/个）获得的战绩总胜点进行排名；
        2、胜点仅作用于排行榜排名统计；
        3、游戏模式仅限5v5匹配模式和5v5排位模式，<span style="color: #54daff;">请确保英雄联盟战绩界面正常显示，避免数据丢失。</span>
        4、战绩数据仅限580登陆状态有效。
      </div>
      <div class="RankingList_text" v-if="GameNameVlue === 2">
        <a>*</a>
        1、云顶之奕排行榜根据单局第一（150分/次）、单局第二（100分/次）、单局第三（80分/次）、单局第四（50分/次）、单局第五（30分/次）、单局第六（30分/次）、单局第七（30分/次）、单局第八（10分/次）获得的战绩总胜点进行排名；
        2、胜点仅作用于排行榜排名统计；
        3、云顶之奕仅限排位模式；
        4、战绩数据仅限580登录状态有效。
      </div>
    </div>
  </div>
  <!-- 我的历史排名-->
  <div v-if="MyHistoryRank">
    <div class="dialogBox_config">
      <div class="bg_mouer" @click="MyHistoryRank=false"></div>
      <div class="dialogCone_config dialogCone_MyHistoryRank flipInX animated">
        <div class="MyHistoryRank_cor" @click="MyHistoryRank=false"> <img src="@/assets/images/over/but1.png" alt=""></div>
        <div class="MyHistoryRank_h5">我的{{GameName}}排名</div>
        <div class="MyHistoryRank_body" v-if="GetMyHistoryRankList.length>0">
          <div class="MyHistoryRank_tabel" v-if="GameNameVlue === 0 && GameType === 1">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>日期</span> </th>
                  <th> <span>场次</span> </th>
                  <th> <span>吃鸡数</span></th>
                  <th> <span>前十数</span></th>
                  <th> <span>总击杀</span></th>
                  <th> <span>赛季胜点</span></th>
                  <th> <span>排名</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="index">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.PUBG_Count}}</td>
                  <td>{{item.PUBG_TheFirstCount}}</td>
                  <td>{{item.PUBG_TopTenCount}}</td>
                  <td>{{item.PUBG_KillCount}}</td>
                  <td>{{item.PUBG_Integral}}</td>
                  <td>{{item.Ranking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="MyHistoryRank_tabel rtcv" v-if="GameNameVlue === 0 && GameType === 0">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>赛季</span> </th>
                  <th> <span>吃鸡数</span> </th>
                  <th> <span>排名</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="index">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.PUBG_TheFirstCount}}</td>
                  <td>{{item.Ranking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="MyHistoryRank_tabel rtcv" v-if="GameNameVlue === 0 && GameType === 2">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>赛季</span> </th>
                  <th> <span>击杀数</span> </th>
                  <th> <span>排名</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="item.Id">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.PUBG_KillCount}}</td>
                  <td>{{item.Ranking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="MyHistoryRank_tabel" v-if="GameNameVlue === 1 && GameType === 0">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>日期</span> </th>
                  <th> <span>场次</span> </th>
                  <th> <span>五杀数</span></th>
                  <th> <span>四杀数</span></th>
                  <th> <span>三杀数</span></th>
                  <th> <span>超神数</span></th>
                  <th> <span>击杀数</span></th>
                  <th> <span>本月胜点</span></th>
                  <th> <span>排名</span></th>
                  <!-- <th> <span>奖励</span></th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="item.Id">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.LOL_Count}}</td>
                  <td>{{item.LOL_PentaKillCount}}</td>
                  <td>{{item.LOL_QuadraKillCount}}</td>
                  <td>{{item.LOL_TripleKillCount}}</td>
                  <td>{{item.LOL_LegendaryCount}}</td>
                  <td>{{item.LOL_KillCount}}</td>
                  <td>{{item.LOL_Integral}}</td>
                  <td>{{item.Ranking}}</td>
                  <!-- <td>{{item.LOL_Settlement}}</td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="MyHistoryRank_tabel rtcv" v-if="GameNameVlue === 1 && GameType === 1">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>赛季</span> </th>
                  <th> <span>超神数</span> </th>
                  <th> <span>排名</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="item.Id">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.LOL_LegendaryCount}}</td>
                  <td>{{item.Ranking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="MyHistoryRank_tabel rtcv" v-if="GameNameVlue === 1 && GameType === 2">
            <table cellspacing="0">
              <thead>
                <tr>
                  <th> <span>赛季</span> </th>
                  <th> <span>击杀数</span> </th>
                  <th> <span>排名</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in GetMyHistoryRankList" :key="item.Id">
                  <td>{{item.CreateDateStr}}</td>
                  <td>{{item.LOL_KillCount}}</td>
                  <td>{{item.Ranking}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-pagination layout="prev, pager, next,jumper" :total="total" prev-text="上一页" next-text="下一页" @current-change="handleCurrentChange" @size-change="sizeCurrentChange" class="MyHistoryRank_pagination">
          </el-pagination>
        </div>
        <div class="null_W" v-else>
          <img src="@/assets/images/null.png" alt="" style="width: 180px;" class="swing animated">
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
  get,
  post
} from "@/utils/ajax";

export default {
  name: "RankingList",
  data() {
    return {
      ConsumerId: '',
      GameNameVlue: 1,
      GameType: 0,
      Gameranking: '',
      GameDateRankList: [],
      GameName: '胜点榜',
      GameDate: this.getNowFormatDate(),
      MyHistoryRank: false,
      //弹框我的游戏排名
      pageSize: 100,
      pageNo: 1,
      total: 0,
      GetMyHistoryRankList: [],
      TableIconList: [{
          imgUrl: require('@/assets/images/over/1.png'),
        },
        {
          imgUrl: require('@/assets/images/over/2.png'),
        },
        {
          imgUrl: require('@/assets/images/over/3.png'),
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["NetBarId", "AvailableIntegral", "PagesLoginIs"])
  },
  created: function() {
    // this.GameDateRankListFun(0);
    this.ConsumerId = sessionStorage.getItem("ConsumerId");
    if (this.ConsumerId) {
      this.ConsumerSummeryIntegralFun(1);
      this.GetMyCurrentRankFun(5);
    }
  },
  methods: {
    GameNameVlueFun: function(index) {
      this.GameNameVlue = index;
      if (index == 2) {
        this.GameName = "胜点榜";
      } else if (index == 0) {
        this.GameType = 1;
      } else {
        this.GameType = 0;
      }
    },
    GameTypeVlueFun: function(index) {
      this.GameType = index;
    },
    //页数   pageSize 改变时会触发
    handleCurrentChange: function(val) {
      this.pageNo = val;
      this.MyHistoryRankFun();
    },
    //页码 currentPage 改变时会触发
    sizeCurrentChange: function(val) {
      this.pageSize = val;
      this.MyHistoryRankFun();
    },
    MyHistoryRankFun: function() {
      this.MyHistoryRank = true;
      // console.log(this.GameNameVlue);
      // console.log(this.GameType);
      if (this.GameNameVlue == 0 && this.GameType == 1) {
        this.GetMyHistoryIntegralRankFun(0);
      }
      if (this.GameNameVlue == 0 && this.GameType == 0) {
        this.GetMyHistoryRankFun(0);
      }
      if (this.GameNameVlue == 0 && this.GameType == 2) {
        this.GetMyHistoryRankFun(1);
      }
      if (this.GameNameVlue == 1 && this.GameType == 0) {
        this.GetMyHistoryIntegralRankFun(1);
      }
      if (this.GameNameVlue == 1 && this.GameType == 1) {
        this.GetMyHistoryRankFun(2);
      }
      if (this.GameNameVlue == 1 && this.GameType == 2) {
        this.GetMyHistoryRankFun(3);
      }
      if (this.GameNameVlue == 2) {
        this.GetMyHistoryIntegralRankFun(2);
      }
    },
    //【我的当前排名】
    GetMyCurrentRankFun: function(gameType) {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      let paramList = {
        gameType: gameType,
        consumerId: ConsumerId,
      };
      var _this = this;
      get("/api/BetRelevant/GetMyCurrentRank", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.Gameranking = res.Object;
          }
        }).catch(err => {});
    },
    //战绩排名模块 【绝地求生-胜点榜；英雄联盟-胜点榜】
    ConsumerSummeryIntegralFun: function(gameType) {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      let paramList = {
        gameType: gameType,
        consumerId: ConsumerId,
        pageSize: 100,
        pageIndex: 1
      };
      var _this = this;
      get("/api/BetRelevant/ConsumerSummeryIntegral", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.GameDateRankList = res.Items;
          }
        }).catch(err => {});
    },
    //战绩排名模块 【绝地求生-吃鸡榜 ；绝地求生-击杀榜 ；英雄联盟-超神榜 ；英雄联盟：击杀榜】
    GameDateRankListFun: function(gameType) {
      var ConsumerId = sessionStorage.getItem("ConsumerId");
      let paramList = {
        gameType: gameType,
        consumerId: ConsumerId,
        pageSize: 100,
        pageIndex: 1
      };
      var _this = this;
      get("/api/BetRelevant/GameDateRankList", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.GameDateRankList = res.Items;
          }
        }).catch(err => {});
    },
    //判断条件 GetMyCurrentRankFun---0：绝地求生-吃鸡榜，1：绝地求生-击杀榜，2：英雄联盟-超神榜，3：英雄联盟：击杀榜，4：绝地求生-胜点榜，5：5 英雄联盟-胜点榜
    GameIsFun: function(GameNameVlue, GameType) {
      if (GameNameVlue == 0 && GameType == 0) {
        this.GameDateRankListFun(0);
        this.GetMyCurrentRankFun(0);
        this.GameName = "吃鸡榜";
      }
      if (GameNameVlue == 0 && GameType == 1) {
        this.ConsumerSummeryIntegralFun(0);
        this.GetMyCurrentRankFun(4);
        this.GameName = "胜点榜";
      }
      if (GameNameVlue == 0 && GameType == 2) {
        this.GameDateRankListFun(1);
        this.GetMyCurrentRankFun(1);
        this.GameName = "击杀榜";
      }
      if (GameNameVlue == 1 && GameType == 0) {
        this.ConsumerSummeryIntegralFun(1);
        this.GetMyCurrentRankFun(5);
        this.GameName = "胜点榜";
      }
      if (GameNameVlue == 1 && GameType == 1) {
        this.GameDateRankListFun(2);
        this.GetMyCurrentRankFun(2);
        this.GameName = "超神榜";
      }
      if (GameNameVlue == 1 && GameType == 2) {
        this.GameDateRankListFun(3);
        this.GetMyCurrentRankFun(3);
        this.GameName = "击杀榜";
      }
      if (GameNameVlue == 2) {
        this.ConsumerSummeryIntegralFun(2);
        this.GetMyCurrentRankFun(6);
        this.GameName = "胜点榜";
      }
    },
    //战绩排名模块 【我的过去排名】
    GetMyHistoryRankFun: function(gameType) {
      let paramList = {
        gameType: gameType,
        consumerId: this.ConsumerId,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      get("/api/BetRelevant/GetMyHistoryRank", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            _this.GetMyHistoryRankList = res.Items;
            _this.total = res.Total
          }
        }).catch(err => {});
    },
    //战绩排名模块 【我的过去胜点排名】
    GetMyHistoryIntegralRankFun: function(gameType) {
      let paramList = {
        gameType: gameType,
        consumerId: this.ConsumerId,
        pageSize: this.pageSize,
        pageIndex: this.pageNo
      };
      var _this = this;
      get("/api/BetRelevant/GetMyHistoryIntegralRank", paramList)
        .then(res => {
          if (res.StatusCode == 200) {
            console.log(res);
            _this.GetMyHistoryRankList = res.Items;
            _this.total = res.Total
          }
        }).catch(err => {});
    },
  },
  watch: {
    PagesLoginIs: function(to, from) {
      this.ConsumerId = sessionStorage.getItem("ConsumerId");
      if (this.ConsumerId) {
        this.ConsumerSummeryIntegralFun(1);
        this.GetMyCurrentRankFun(5);
      }
    },
    GameNameVlue: function(val, oldval) {
      this.GameIsFun(val, this.GameType);
    },
    GameType: function(val, oldval) {
      this.GameIsFun(this.GameNameVlue, val);
    },
  }
};
</script>
