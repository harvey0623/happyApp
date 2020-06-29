import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2, {
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   showCancelButton: false,
   reverseButtons: true,
   allowOutsideClick: false,
   confirmButtonColor: '#F397AE',
   cancelButtonColor: '#d33',
   timer: 2000,
   showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
   }
});
const swal = Vue.prototype.$swal;
export default swal;