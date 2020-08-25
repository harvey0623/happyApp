const modifyUser = function() {
   return {
      namespaced: true,
      state: {
         userInfo: null
      },
      mutations: {
         fixUserInfo(state, payload) {
            state.userInfo = payload;
         },
         fixItem(state, payload) {
            let data = state.userInfo.security[0];
            let { key, value } = payload;
            data[key] = value;
         }
      },
      actions: {

      }
   }
}

export default modifyUser;