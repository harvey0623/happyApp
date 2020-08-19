import httpMethod from './http.js';

export default {
   async getBulletin(payload) {
      let result = await httpMethod({
         url: '/community/bulletin',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   }
}