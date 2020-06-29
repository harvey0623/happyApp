import axios from 'axios';
import router from '@/router/index.js';
import store from '@/store/index.js';
import i18n from '@/plugins/i18n/index.js';
import swal from '@/plugins/sweetAlert/index.js';

const errorHandle = function(code) {
   let codeObj = {
      400: '用戶端出現錯誤',
      401: '請重新登入',
      500: '司服器錯誤'
   };
   swal({ icon: 'error', title: codeObj[code] });
   if (code === 401) router.replace('/login');
}

const instance = axios.create({
   baseURL: process.env.VUE_APP_BASEURL
});

//request interceptor
instance.interceptors.request.use(function (config) {
   let data = JSON.parse(config.data);
   data.token = store.state.auth.userInfo.token || '';
   config.data = JSON.stringify(data);
   return config;
}, function (error) {
   return Promise.reject(error);
});

//response interceptor
instance.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   if (error.response) {
      let code = error.response.status;
      errorHandle(code);
   }
   return Promise.reject(error);
});

const httpMethod = function (option) {
   return instance(option);
}

export default httpMethod;