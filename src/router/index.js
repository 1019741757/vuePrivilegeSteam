import Vue from 'vue'
import Router from 'vue-router'
import GameList from '@/components/GameList'
import HomePageList from '@/views/HomePage/HomePageList'
import OrderCenter from '@/views/OrderCenter'
import HomepageSelection from '@/views/HomepageSelection' //主页精选
import GameActivitiesPUGB from '@/views/GameActivitiesPUGB' //绝地求生活动
import GameActivitiesLOL from '@/views/GameActivitiesLOL' //英雄联盟活动
import PrizetakingActivities from '@/views/PrizetakingActivities' //领奖活动
import MyGame from '@/views/MyGame' //我的游戏
import ExchangeMall from '@/views/ExchangeMall' //兑换商城
import IwantTomakeLingshi from '@/views/IwantTomakeLingshi' //我要赚灵石
import MyTradingRecord from '@/views/MyTradingRecord' //我的兑换记录
import GameGuess from '@/views/GameGuess' //游戏竞猜
import MyGuess from '@/views/MyGuess' //我的竞猜
import InternetCafeCompetition from '@/views/InternetCafeCompetition' //网吧电竞
import Feedback from '@/views/Feedback' //意见反馈
import RankingList from '@/views/RankingList' //游戏排行榜
import TheSumRankingList from '@/views/TheSumRankingList' //电竞比赛排行榜
import TextDetails from '@/views/TextDetails' //积分规则介绍
import LuckDraw from '@/views/LuckDraw' //抽奖
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: GameList,
      redirect: 'GameList/HomePageList',
    },
    {
      path: '/GameList',
      name: 'GameList',
      component: GameList,
      redirect: 'GameList/HomePageList',
      children: [{
        path: 'HomePageList',
        component: HomePageList
      }, ]
    },
    {
      path: '/OrderCenter',
      name: 'OrderCenter',
      component: OrderCenter,
      redirect: 'OrderCenter/HomepageSelection',
      children: [{
          path: 'HomepageSelection',
          name: '主页精选',
          component: HomepageSelection
        }, {
          path: 'GameActivitiesPUGB',
          name: '绝地求生活动',
          component: GameActivitiesPUGB
        },
        {
          path: 'GameActivitiesLOL',
          name: '英雄联盟活动',
          component: GameActivitiesLOL
        }, {
          path: 'PrizetakingActivities',
          name: '领奖活动',
          component: PrizetakingActivities
        }, {
          path: 'MyGame',
          name: '我的游戏',
          component: MyGame
        }, {
          path: 'ExchangeMall',
          name: '兑换商城',
          component: ExchangeMall
        }, {
          path: 'ExchangeMall/IwantTomakeLingshi',
          name: '我要赚积分',
          component: IwantTomakeLingshi
        }, {
          path: 'ExchangeMall/MyTradingRecord',
          name: '我的兑换记录',
          component: MyTradingRecord
        }, {
          path: 'TextDetails',
          name: '积分规则介绍',
          component: TextDetails
        }, {
          path: 'LuckDraw',
          name: '抽奖',
          component: LuckDraw
        }, {
          path: 'GameGuess',
          name: '游戏竞猜',
          component: GameGuess
        }, {
          path: 'GameGuess/MyGuess',
          name: '我的竞猜',
          component: MyGuess
        }, {
          path: 'InternetCafeCompetition',
          name: '网吧电竞',
          component: InternetCafeCompetition
        }, {
          path: 'Feedback',
          name: '意见反馈',
          component: Feedback
        }, {
          path: 'RankingList',
          name: '游戏排行榜',
          component: RankingList
        }, {
          path: 'TheSumRankingList',
          name: '电竞比赛排行榜',
          component: TheSumRankingList
        }
      ]
    }
  ],
  // mode:'history'   //去除#号
})
