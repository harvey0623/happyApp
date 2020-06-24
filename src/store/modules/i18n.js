const i18nStore = function() {
   return {
      namespaced: true,
      state: {
         currentLang: localStorage.getItem('lang') || 'tw',
         langList: ['tw', 'en']
      },
      mutations: {
         setLang(state, payload) {
            localStorage.setItem('lang', payload);
            location.reload();
         }
      },
      actions: {
         changeLang({ state, commit }, payload) {
            if (payload === state.lang) return;
            commit('setLang', payload);
         }
      }
   }
}

export default i18nStore;