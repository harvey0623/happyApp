import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/i18n/index.js';
import Home from '@/views/home/index.vue';
import Contact from '@/views/contact/index.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			
		},
	},
	{
		path: '/contact',
		name: 'contact',
		component: Contact,
		meta: {
			
		}
	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'hash',
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			return {
				selector: to.hash
			};
		} else {
			return { x: 0, y: 0 };
		}
	}
});

router.beforeEach((to, from, next) => {
	return next();
});

export default router;
