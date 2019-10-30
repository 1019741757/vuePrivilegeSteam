/**
axios.js提供request请求封装
包括 get、post、delete、put等方式
@author: ldy
*/
import axios from 'axios';
// import store from '@/vuex/store';
import {
  aes,
  signstr,
  md5
} from '@/utils/crypto';
import {
  Message
} from 'element-ui';

const ajax = axios.create({
  //baseURL: 'http://192.168.1.62:1041/api/SteamOrder/', // url前缀
  baseURL: 'http://tc.api.580tequan.com/', // url前缀
  timeout: 10000, // 超时毫秒数
  // withCredentials: true // 携带认证信息cookie
});

// Add a request interceptor
ajax.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  console.log(error);
  return Promise.reject(error);
});

// Add a response interceptor
ajax.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  Message({
    message: error.response.data.Message,
    type: 'error'
  });
  return Promise.reject(error);
});
/**
get方式请求，url传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const get = (url, params, level) => ajax(postConfig(url, 'get', true, params, level)).then(res => successback(res)).catch(error => errback(error));
/*
post方式请求 json方式传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const postJson = (url, params, level) => ajax(getConfig(url, 'post', true, params, level)).then(res => successback(res)).catch(error => errback(error));
/*
post方式请求 表单传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const post = (url, params, level) => ajax(postConfig(url, 'post', false, params)).then(res => successback(res)).catch(error => errback(error));
/*
delete方式请求 url传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const del = (url, params, level) => ajax(getConfig(url, 'delete', true, params, level)).then(res => successback(res)).catch(error => errback(error));
/*
put方式请求 json传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const putJson = (url, params, level) => ajax(getConfig(url, 'put', true, params, level)).then(res => successback(res)).catch(error => errback(error));
/*
put方式请求 表单传参
@param url 请求url
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
**/
const put = (url, params, level) => ajax(getConfig(url, 'put', false, params, level)).then(res => successback(res)).catch(error => errback(error));

// 参数转换
const param2String = data => {
  // console.log('data', data);
  if (typeof data === 'string') {
    return data;
  }
  let ret = '';
  for (let it in data) {
    let val = data[it];
    if (typeof val === 'object' && //
      (!(val instanceof Array) || (val.length > 0 && (typeof val[0] === 'object')))) {
      val = JSON.stringify(val);
    }
    ret += it + '=' + encodeURIComponent(val) + '&';
  }
  if (ret.length > 0) {
    ret = ret.substring(0, ret.length - 1);
  }
  return ret;
};
// 错误回调函数
const errback = error => {
  return Promise.reject({
    data: error.message
  });
};
// 成功回调函数
const successback = res => {
  // console.log(res);
  if (res.status === 200 && res.data.code !== 20000) {
    return res.data;
  }
  // return res.data;
};
/**

@param url 请求url
@param method get,post,put,delete
@param isjson 是否json提交参数
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const getConfig = (url, method, isjson, params, level = 0) => {
  let config_ = {
    url,
    method,
    params,
    data,
    headers: {
      level
    }
  };
  // 时间戳
  if (level === 1) { // 加密
    params = {
      encrypt: aes.en(JSON.stringify(params))
    };
  } else if (level === 2) { // 签名
    let timestamp = new Date().getTime();
    // 获取token
    let token = sessionStorage.getItem("phone");
    if (!token) {
      // token = JSON.parse(sessionStorage.getItem('user')).token;
      // store.state.token = token;
    }
    // 签名串
    let signstr = sign(token, timestamp, params);
    // console.log('token', token);
    // console.log('signstr', signstr);
    config_.headers = {
      url,
      level,
      signstr,
      timestamp,
    };
  }
  // 表单提交参数
  if (!isjson) {
    config_.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config_.responseType = 'text';
    config_.transformRequest = [function(data) {
      return param2String(data);
    }];
  }
  // 设置参数
  if (method in {
      'get': true,
      'delete': true
    }) {
    config_.params = params;
  } else if (method in {
      'post': true,
      'put': true
    }) {
    config_.data = params;
  }
  return config_;
};
/**

@param url 请求url
@param method get,post,put,delete
@param isjson 是否json提交参数
@param params 参数
@param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const postConfig = (url, method, isjson, params) => {
  let appkey = "10003";
  let secret = "5D7AB40F-3E47-49B3-B74C-D261B69DA000";
  // 签名
  let timestamp = Math.round(new Date() / 1000);
  // 获取token
  let token = sessionStorage.getItem("phone");
  // 签名串
  let paramstr = signstr(params);
  var reg = /([^/]+)$/;
  var blueurl = url.match(reg)[1];
  let action = 'action=' + blueurl + '&' + paramstr + '&' + 'secret=' + secret + '&' + 'timestamp=' + timestamp;
  // console.log(action);
  let sign = md5(action).toUpperCase();
  let config_ = {
    url,
    method,
    // params, data,
    headers: {}
  };
  config_.headers = {
    sign,
    appkey,
    timestamp,
  };
  //表单提交参数
  if (!isjson) {
    config_.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config_.responseType = 'text';
    // config_.transformRequest = [function(data) {
    //   // console.log(JSON.stringify(data));
    //   // return JSON.stringify(data);
    // return param2String(data);
    // }];
  }
  // 设置参数
  if (method in {
      'get': true,
      'delete': true
    }) {
    config_.params = params;
  } else if (method in {
      'post': true,
      'put': true
    }) {
    config_.data = params;
  }
  return config_;
};

// 统一方法输出口
export {
  ajax,
  get,
  postJson,
  post,
  del,
  putJson,
  put
};
