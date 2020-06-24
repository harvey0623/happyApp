import httpMethod from './http.js';

class Member {
   static getInfo(option = {}) {
      return httpMethod({
         url: '',
         method: 'post'
      }, option);
   }
};

export default Member;