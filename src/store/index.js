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
		isMenuOpen: false,
		toastrList: []
	},
	mutations: {
		setMenuOpen(state, value) {
			state.isMenuOpen = value;
		},
		addToastr(state, payload) { //增加訊息
			state.toastrList.push({
				timestamp: Date.now(),
				...payload
			});
		},
		removeToastr(state, timestamp) { //移除訊息
			let index = state.toastrList.findIndex(item => item.timestamp === timestamp);
			if (index !== -1) state.toastrList.splice(index, 1);
		}
	},
	getters: {
		toastrLength(state) { //訊息數量
			return state.toastrList.length;
		}
	},
	actions: {
		
   },
   modules: {
      i18n: i18nStore(),
		auth: authStore()
   }
});