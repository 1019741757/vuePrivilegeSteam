// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/Iconfont/iconfont.css' // global css
import '@/assets/css/index.css' // global css
import '@/assets/css/user.css' // global css
import '@/assets/css/zyy_animation.css' // global css
import animate from 'animate.css'
import axios from "@/utils/request.js"
import moment from 'moment'


Vue.prototype.GloUrl = 'http://tdesk.580tequan.com/#/';
// Vue.prototype.GloUrl = 'http://localhost:8089/#/';
Vue.prototype.axios = axios;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false
Vue.use(ElementUI);
//  参数1：过滤器名称
//  参数2：过滤器的逻辑

Vue.filter('capitalize', function(value) {
  if (!value) return ''
  value = value.toString()
  return value.substring(0, 3) + '****' + value.substring(7, 11)
})


Vue.prototype.getNowFormatDate = function() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + '年' + month + '月';
  return currentdate;
};
/********客户端登录通讯**********/
Vue.prototype.SetInAllWindows = function(funName, UserInformation) {
  Extern_Form_SetInAllWindows(funName, UserInformation);
}
Vue.prototype.AllWindowsSet = function(UserInformation) {
  var UserInformationlist = JSON.parse(UserInformation);
  sessionStorage.setItem("ConsumerId", UserInformationlist.ConsumerId);
  store.dispatch('SetUserInfo', UserInformation);
  store.dispatch('GetAchievingRankings').then(() => {}).catch(() => {});
}
window.AllWindowsSet = function(UserInformation) {
  Vue.prototype.AllWindowsSet(UserInformation);
}
/**********打开主页客户端 隐藏活动******************/
Vue.prototype.PopupthemainPage = function(is) {
  store.commit('SET_ISNETBARACTIVITY', is);
}
window.WPopupthemainPage = function(is) {
  Vue.prototype.PopupthemainPage(is);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
