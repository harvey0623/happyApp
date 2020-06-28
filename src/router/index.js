import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/i18n/index.js';
import Home from '@/views/home/index.vue';
import Entrance from '@/views/entrance/index.vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';
import ForgotPw from '@/views/forgotPw/index.vue';
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
		path: '/entrance',
		name: 'entrance',
		component: Entrance,
		meta: {
			layout: 'entranceLayout'
		}
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
		meta: {
			layout: 'entranceLayout'
		}
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
		meta: {
			layout: 'entranceLayout'
		}
	},
	{
		path: '/forgotPw',
		name: 'forgotPw',
		component: ForgotPw,
		meta: {
			layout: 'entranceLayout'
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
	// if (to.matched.some(record => record.meta.requiresAuth)) {
		
	// } else {
	// 	return next();
	// }

	return next();
});

export default router;
