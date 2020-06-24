import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/i18n/index.js';
// import Home from '@/views/home/index.vue';
import Entrance from '@/views/entrance/index.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'entrance',
		component: Entrance,
		meta: {
			layout: 'entranceLayout'
		}
	},
	// {
	// 	path: '/',
	// 	name: 'home',
	// 	component: Home,
	// 	meta: {
			
	// 	},
	// },
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
