import Vue from 'vue';
import VueToastr from "vue-toastr";
Vue.use(VueToastr, {
   defaultProgressBar: false,
   defaultTimeout: 3000,
   defaultType: 'success',
   defaultPosition: 'toast-top-right',
   preventDuplicates: false,
   defaultClassNames: ['mytoastr', 'noBackgroundImg']
});

const toastr = Vue.prototype.$toastr;
export default toastr;