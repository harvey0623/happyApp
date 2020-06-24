import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2, {
   type: 'success',
   showCancelButton: false,
   reverseButtons: true,
   allowOutsideClick: false,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
});
const swal = Vue.prototype.$swal;
export default swal;