import {
  get,
  post
} from "@/utils/ajax";
import app from './app'
const user = {
  state: {
    ConsumerId: '',
    OnerName: '',
    HeadImgUrl: '', //微信头像
    NickName: '', //微信名称
    AvailableIntegral: '',
    ExpireDateTime: '',
    isSuccessfulLogin: false,
    GameState: '',
    GamerankingPUGB: '',
    GamerankingLOL: '',
    isNetBarActivity: true,
    PagesLoginIs: false,
    //新手指引
    isNewFingerGuide: false,
    //公众号二维码
    isQRCode: false
  },

  mutations: {
    SET_CONSUMERID: (state, ConsumerId) => {
      state.ConsumerId = ConsumerId
    },
    SET_ONERNSME: (state, OnerName) => {
      state.OnerName = OnerName
    },
    SET_HEDADIMGURL: (state, HeadImgUrl) => {
      state.HeadImgUrl = HeadImgUrl
    },
    SET_NICKNAME: (state, NickName) => {
      state.NickName = NickName
    },
    SET_AVAILABLEINTEGRAL: (state, AvailableIntegral) => {
      state.AvailableIntegral = AvailableIntegral
    },
    SET_EXPIREDATETIME: (state, ExpireDateTime) => {
      state.ExpireDateTime = ExpireDateTime
    },
    SET_ISSUCCESSFUILOGIN: (state, isSuccessfulLogin) => {
      state.isSuccessfulLogin = isSuccessfulLogin
    },
    //游戏状态
    SET_GAMESTATE: (state, GameState) => {
      state.GameState = GameState
    },
    //个人中心登录状态
    SET_PAGESLOGINIS: (state, PagesLoginIs) => {
      state.PagesLoginIs = PagesLoginIs
    },
    //首页活动展示
    SET_ISNETBARACTIVITY: (state, isNetBarActivity) => {
      state.isNetBarActivity = isNetBarActivity
    },
    SET_GAMERANKINGPUGB: (state, GamerankingPUGB) => {
      state.GamerankingPUGB = GamerankingPUGB
    },
    SET_GAMERANKINGLOL: (state, GamerankingLOL) => {
      state.GamerankingLOL = GamerankingLOL
    },
    //新手指引
    SET_ISNEWFINGERGUIDE: (state, isNewFingerGuide) => {
      state.isNewFingerGuide = isNewFingerGuide
    },
    //公众号二维码
    SET_ISQRCODE: (state, isQRCode) => {
      state.isQRCode = isQRCode
    },
  },
  actions: {
    // 设置用户信息
    SetUserInfo({
      commit,
      state
    }, UserInformation) {
      sessionStorage.setItem("UserInformationlist", UserInformation);
      var UserInformationlist = JSON.parse(UserInformation);
      sessionStorage.setItem("phone", UserInformationlist.Phone);
      sessionStorage.setItem("ConsumerId", UserInformationlist.ConsumerId);
      commit('SET_ONERNSME', UserInformationlist.Phone);
      commit('SET_CONSUMERID', UserInformationlist.ConsumerId);
      commit('SET_HEDADIMGURL', UserInformationlist.HeadImgUrl);
      commit('SET_NICKNAME', UserInformationlist.NickName);
      commit('SET_GAMESTATE', UserInformationlist.State);
      commit('SET_AVAILABLEINTEGRAL', UserInformationlist.AvailableIntegral);
      commit('SET_PAGESLOGINIS', true);
    },
    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        let paramList = {
          phone: sessionStorage.getItem("phone")
        };
        get("/api/Consumer/GetUserInfo", paramList).then(res => {
          console.log(res);
          if (res.StatusCode == '200') {
            sessionStorage.setItem("UserInformationlist", JSON.stringify(res.Object));
            sessionStorage.setItem("phone", res.Object.Phone);
            sessionStorage.setItem("ConsumerId", res.Object.ConsumerId);
            commit('SET_ONERNSME', res.Object.Phone);
            commit('SET_CONSUMERID', res.Object.ConsumerId);
            commit('SET_HEDADIMGURL', res.Object.HeadImgUrl);
            commit('SET_NICKNAME', res.Object.NickName);
            commit('SET_GAMESTATE', res.Object.State);
            commit('SET_AVAILABLEINTEGRAL', res.Object.AvailableIntegral);
            commit('SET_PAGESLOGINIS', true);
          } else {}
          resolve()
        });
      })
    },
    // 获取战绩排名
    GetAchievingRankings({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        //总胜点榜-我的排名
        var ConsumerId = sessionStorage.getItem("ConsumerId");
        let paramList = {
          consumerId: ConsumerId,
          startTime: '2019-07-25',
          endTime: '',
        };
        get("/api/BetRelevant/GetMyTotalIntegralRank", paramList)
          .then(res => {
            if (res.StatusCode == 200) {
              console.log(res);
              commit('SET_GAMERANKINGPUGB', res.Object);
            }
            resolve()
          }).catch(err => {});
        // let _paramList = {
        //   consumerId: ConsumerId,
        //
        // };
        // //-我的胜点数
        // get("/api/BetRelevant/GetMyCurrentRank", _paramList)
        //   .then(res => {
        //     if (res.StatusCode == 200) {
        //       commit('SET_GAMERANKINGLOL', res.Object);
        //     }
        //     resolve()
        //   }).catch(err => {});
      })
    },
    // 获取签到
    GetCompleteTask({
      dispatch,
      commit,
      state
    }, ConsumerId) {
      return new Promise((resolve, reject) => {
        let paramList = {
          consumerId: ConsumerId,
          netbarId: app.state.NetBarId
        };
        var _this = this;
        get("/api/TaskRelevant/CompleteTask", paramList)
          .then(res => {
            if (res.Object) {
              commit('SET_ISSUCCESSFUILOGIN', true);
              window.animate = setTimeout(function() {
                commit('SET_ISSUCCESSFUILOGIN', false);
                commit('SET_ISNEWFINGERGUIDE', true);
              }, 3000);
              dispatch('GetUserInfo').then(() => {}).catch(() => {});
            } else {
              commit('SET_ISSUCCESSFUILOGIN', false);
            }
          }).catch(err => {});
      })
    },
  }

}

export default user
