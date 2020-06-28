import Vue from 'vue';
import Default from '@/components/Layout/Default.vue';
import Entrance from '@/components/Layout/Entrance.vue';
import BaseButton from '@/components/Button/BaseButton.vue';
import ButtonBox from '@/components/ButtonBox/index.vue';
import BaseModal from '@/components/Modal/BaseModal.vue';

Vue.component('defaultLayout', Default);
Vue.component('entranceLayout', Entrance);
Vue.component('BaseButton', BaseButton);
Vue.component('ButtonBox', ButtonBox);
Vue.component('BaseModal', BaseModal);