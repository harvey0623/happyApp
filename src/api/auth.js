import httpMethod from './http.js';

export default {
   async doLogin(payload) {
      let url = 'https://hj-platform.dev.pin2wall.com/app/doLoginApp';
      let data = JSON.stringify({ url, ...payload });
      let result = await httpMethod({
         url: process.env.VUE_APP_Login,
         method: 'post',
         data
      }).then(res => res.data);
      return result;
   },
   async doRegister(payload) {
      let url = 'https://hj-platform.dev.pin2wall.com/app/doRegisterApp';
      let data = JSON.stringify({ url, ...payload });
      let result = await httpMethod({
         url: process.env.VUE_APP_Login,
         method: 'post',
         data
      }).then(res => res.data);
      return result;
   }
}