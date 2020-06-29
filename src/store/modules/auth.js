import authObj from '@/api/auth.js';

const LS = {
   get(key) {
      let data = localStorage.getItem(key);
      return data !== undefined ? JSON.parse(data) : null; 
   },
   set(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
   },
   remove(key) {
      localStorage.removeItem(key);
   }
};

const authStore = function() {
   return {
      namespaced: true,
      state: {
         userInfo: LS.get('userInfo') || {}
      },
      mutations: {
         setUserInfo(state, value) {
            state.userInfo = value;
            if (value.token) LS.set('userInfo', value);
         }
      },
      getters: {
         isLogin(state) {
            return state.userInfo.token !== undefined;
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
         }
      }
   }
}

export default authStore;