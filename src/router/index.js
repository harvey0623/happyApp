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
import Bulletin from '@/views/bulletin/index.vue';
import MemberProfile from '@/views/memberProfile/index.vue';
import Community from '@/views/memberProfile/community/index.vue';
import CommunityIntro from '@/views/memberProfile/community/communityIntro.vue';
import Organize from '@/views/memberProfile/organize/index.vue';
import WorkRecord from '@/views/workRecord/index.vue';
import WorkSchedule from '@/views/workSchedule/index.vue';
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
		path: '/memberProfile',
		component: MemberProfile,
		meta: {
			auth: true
		},
		children: [
			{
				path: '',
				redirect: 'community'
			},
			{
				path: 'community',
				name: 'community',
				component: Community,
			},
			{
				path: 'organize',
				name: 'organize',
				component: Organize,
			},
		]
	},
	{
		path: '/communityIntro/:id',
		name: 'communityIntro',
		component: CommunityIntro
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
		path: '/workSchedule',
		name: 'workSchedule',
		component: WorkSchedule,
		meta: {
			auth: true
		}
	},
	{
		path: '/workRecord',
		name: 'workRecord',
		component: WorkRecord,
		meta: {
			auth: true
		}
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
		path: '/bulletin/:id',
		name: 'bulletin',
		component: Bulletin,
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
