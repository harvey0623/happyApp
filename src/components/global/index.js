import Vue from 'vue';
import Default from '@/components/Layout/Default.vue';
import Entrance from '@/components/Layout/Entrance.vue';
import ButtonBox from '@/components/ButtonBox/index.vue';
import Loading from '@/components/Loading/index.vue';

Vue.component('defaultLayout', Default);
Vue.component('entranceLayout', Entrance);
Vue.component('ButtonBox', ButtonBox);
Vue.component('Loading', Loading);