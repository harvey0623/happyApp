import httpMethod from './http.js';

export default {
   async getNotifyData(payload) {
      let result = await httpMethod({
         url: '/notify',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   }
}