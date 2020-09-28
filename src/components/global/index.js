import Vue from 'vue';
import Default from '@/components/Layout/Default.vue';
import Entrance from '@/components/Layout/Entrance.vue';
import Loading from '@/components/Loading/index.vue';
import BackBlock from '@/components/BackBlock/index.vue';
import EmptyBlock from '@/components/EmptyBlock/index.vue';
import SlideUpDown from 'vue-slide-up-down';

Vue.component('defaultLayout', Default);
Vue.component('entranceLayout', Entrance);
Vue.component('Loading', Loading);
Vue.component('BackBlock', BackBlock);
Vue.component('EmptyBlock', EmptyBlock);
Vue.component('SlideUpDown', SlideUpDown);