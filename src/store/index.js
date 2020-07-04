import Vue from 'vue';
import Vuex from 'vuex';
import i18nStore from './modules/i18n.js';
import authStore from './modules/auth.js';

Vue.use(Vuex);
Vuex.Store.prototype.hasModule = function (module) {
	return this._modules.root._children[module] !== undefined;
};

export default new Vuex.Store({
	strict: process.NODE_ENV === 'development',
	state: {
		isMenuOpen: false
	},
	mutations: {
		setMenuOpen(state, value) {
			state.isMenuOpen = value;
		}
	},
	actions: {
		
   },
   modules: {
      i18n: i18nStore(),
		auth: authStore()
   }
});