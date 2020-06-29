import axios from 'axios';
import store from '@/store/index.js';
import i18n from '@/plugins/i18n/index.js';
// import mytoastr from '@/plugin/toastr/toastr.js';

const errorHandle = function(statusCode) {
   // switch (statusCode) {
   //    case 400:
   //       mytoastr.add({ msg: '', type: 'error' });
   //       break;
   //    case 401:
   //       mytoastr.add({ msg: '', type: 'error' });
   //       break;
   //    default:
   //       mytoastr.add({ msg: '', type: 'error' });
   // }
}

const instance = axios.create({
   baseURL: process.env.VUE_APP_BASEURL
});

//request interceptor
instance.interceptors.request.use(function (config) {
   return config;
}, function (error) {
   return Promise.reject(error);
});

//response interceptor
instance.interceptors.response.use(function (response) {
   return response;
}, function (error) {
   if (error.response) {
      let statusCode = error.response.status;
      errorHandle(statusCode);
   }
   return Promise.reject(error);
});

const httpMethod = function (option) {
   return instance(option);
}

export default httpMethod;