import authObj from '@/api/auth.js';
import crypto from '@/plugins/crypto/index.js';

const LS = {
   get(key) {
      let data = localStorage.getItem(key);
      if (data !== null) {
         let aesData = crypto.decodeBase64(data);
         let jsonData = crypto.decodeAes(aesData);
         data = JSON.parse(jsonData);
      }
      return data;
   },
   set(key, data) {
      let jsonData = JSON.stringify(data);
      let aseData = crypto.encodeAes(jsonData) 
      let base64 = crypto.encodeBase64(aseData);
      localStorage.setItem(key, base64);
   },
   remove(key) {
      localStorage.removeItem(key);
   }
};

const authStore = function() {
   return {
      namespaced: true,
      state: {
         userInfo: LS.get('userInfo'),
         userCommunity: LS.get('communityId')
      },
      mutations: {
         setUserInfo(state, value) {
            state.userInfo = value;
            if (value !== null) LS.set('userInfo', value);
            else LS.remove('userInfo');
         },
         setUserCommunity(state, value) {
            state.userCommunity = value;
            LS.set('communityId', value);
         }
      },
      getters: {
         isLogin(state) {
            return state.userInfo !== null;
         }
      },
      actions: {
         async doLogin({ commit }, payload) {
            let result = await authObj.doLogin(payload).then(res => res);
            let { status, userinfo } = result;
            if (status === 1) commit('setUserInfo', userinfo);
            return { loginStatus: status === 1 };
         },
         async doRegister({ commit }, payload) {
            let result = await authObj.doRegister(payload).then(res => res);
            let { status, message } = result;
            return { 
               registerStatus: status === 1,
               message
            }
         },
         async doLogout({ commit }, payload) {
            return await new Promise((resolve) => {
               commit('setUserInfo', null);
               resolve();
            });
         }
      }
   }
}

export default authStore;