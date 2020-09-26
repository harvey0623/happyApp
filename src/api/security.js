import httpMethod from './http.js';

export default {
   async getAttendance(payload) {
      let result = await httpMethod({
         url: '/security/attendance_list',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
   async getSchedule(payload) {
      let result = await httpMethod({
         url: '/security/schedule_list',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
   async getMission(payload) {
      let result = await httpMethod({
         url: '/security/mission_list',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   },
   async uploadMission(payload) {
      let result = await httpMethod({
         url: '/security/upload/mission',
         method: 'post',
         data: payload
      }).then(res => res.data.aaData);
      return result;
   }
}