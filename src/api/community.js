import httpMethod from './http.js';

export default {
   async getBulletin(payload) {
      let result = await httpMethod({
         url: '/community/announcement_list',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
   async getNotify(payload) {
      let result = await httpMethod({
         url: '/community/notify_list',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
   async getMember(payload) {
      let result = await httpMethod({
         url: '/community/member_detail',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
}