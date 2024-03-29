import httpMethod from './config.js';

export default {
   async doLogin(payload) {
      let result = await httpMethod({
         url: '/auth/login',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   },
   async doRegister(payload) {
      let result = await httpMethod({
         url: '/auth/register',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   },
   async sendSMS(payload) {
      let result = await httpMethod({
         url: '/auth/app/sendSMS',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   },
   async checkCode(payload) {
      let result = await httpMethod({
         url: '/auth/app/checkCode',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   },
   async newPassword(payload) {
      let result = await httpMethod({
         url: '/auth/app/newPassword',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   }
}