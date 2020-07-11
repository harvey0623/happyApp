import httpMethod from './http.js';

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
   async doLogout(payload) {
      let url = '';
   }
}