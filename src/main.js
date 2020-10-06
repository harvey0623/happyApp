import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/plugins/i18n/index.js';
import validator from "@/plugins/veeValidate/index.js";
import VueMeta from 'vue-meta';

//===global component
import '@/components/global/index.js';

//====filter
import '@/filter/index.js';

//===plugin
import '@/plugins/bootstrap/index.js';
import '@/plugins/sweetAlert/index.js';
import '@/plugins/swiper/index.js';


Vue.config.productionTip = false;
Vue.use(VueMeta);
Vue.use(validator);
Vue.prototype.$hasStoreModule = function (namespace) {
	return this.$store.hasModule(namespace);
}
Vue.prototype.$addToastr = function(payload) {
	this.$store.commit('addToastr', payload);
}

const app = new Vue({
	router,
	store,
	i18n,
	render: h => h(App)
}).$mount('#app');

export default app;