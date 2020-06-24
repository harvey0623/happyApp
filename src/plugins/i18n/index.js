import Vue from 'vue';
import VueI18n from 'vue-i18n';
import store from '@/store/index.js';
Vue.use(VueI18n);

const { currentLang, langList } = store.state.i18n;
const defaultLang = 'tw';
const userLang = langList.includes(currentLang) ? currentLang : defaultLang;
const i18n = new VueI18n({
   locale: userLang,
   fallbackLocale: defaultLang,
   messages: {
      [userLang]: require(`./locales/${userLang}.json`)
   }
});

export default i18n;