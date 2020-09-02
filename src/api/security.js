import httpMethod from './http.js';

export default {
   async getAttendance(payload) {
      let result = await httpMethod({
         url: '/security/attendance_list',
         method: 'post',
         data: payload
      }).then(res => res.data);
      return result;
   }
}