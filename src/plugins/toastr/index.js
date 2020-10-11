import Toastr from '@/components/Toastr/index.vue';
export default {
   install(Vue, options) {
      Vue.component('Toastr', Toastr);
      Vue.prototype.$addToastr = function(payload) {
         this.$store.commit('addToastr', payload);
      }
   }
}