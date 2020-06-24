import axios from 'axios';
import store from '@/store/index.js';
import mytoastr from '@/plugin/toastr/toastr.js';
import i18n from '@/plugin/i18n/index.js';

const errorHandle = function(statusCode) {
   switch (statusCode) {
      case 400:
         mytoastr.add({ msg: '', type: 'error' });
         break;
      case 401:
         mytoastr.add({ msg: '', type: 'error' });
         break;
      default:
         mytoastr.add({ msg: '', type: 'error' });
   }
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

const httpMethod = function (option1, option2) {
   if (Object.prototype.toString.call(option2) !== '[object Object]') {
      return Promise.reject('option must be object');
   }
   return instance({ ...option1, ...option2 });
}

export default httpMethod;