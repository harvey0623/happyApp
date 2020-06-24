const authStore = function() {
   return {
      namespaced: true,
      state: {
         isLogin: false,
         user: {
            name: ''
         }
      },
      mutations: {
         setUser(state, value) {
            state.user = value;
         }
      },
      actions: {
         
      }
   }
}

export default authStore;