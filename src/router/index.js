import Vue from 'vue';
import VueRouter from 'vue-router';
import i18n from '@/plugins/i18n/index.js';
import store from '@/store/index.js';
import TempView from '@/views/tempView/index.vue';
import Home from '@/views/home/index.vue';
import Entrance from '@/views/entrance/index.vue';
import Login from '@/views/login/index.vue';
import Register from '@/views/register/index.vue';
import ForgotPw from '@/views/forgotPw/index.vue';
import Security from '@/views/security/index.vue';
import WorkInfo from '@/views/workInfo/index.vue';
import Notify from '@/views/notify/index.vue';
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			auth: true
		},
	},
	{
		path: '/security',
		component: TempView,
		meta: {
			auth: true
		},
		children: [
			{
				path: '',
				name: 'security',
				component: Security,		
			},
			{
				path: 'workInfo',
				name: 'workInfo',
				component: WorkInfo,		
			},
			{
				path: '*',
				redirect: '/security'
			}
		]
	},
	{
		path: '/notify',
		name: 'notify',
		component: Notify,
		meta: {
			auth: true
		}
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

const entranceName = ['entrance', 'login', 'register', 'forgotPw'];

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.auth)) {
		if (store.state.auth.userInfo === null) return next('/entrance');
	}
	if (entranceName.includes(to.name)) { //登入狀態下不可進入的頁面
		if (store.getters['auth/isLogin']) return next('/');
	}
	return next();
});

export default router;
