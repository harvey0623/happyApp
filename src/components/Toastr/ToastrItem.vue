<template>
<transition 
   name="" 
   appear
   enter-active-class="animate__animated animate__flipInX"
   leave-active-class="animate__animated animate__flipOutX">
   <div 
      class="toastrItem" 
      v-if="show" 
      @click="hideHandler" 
      @animationend="animateEnd">
      <div class="iconBox" :class="boxClass">
         <i class="far" :class="iconClass"></i>
      </div>
      <div class="msgBox">{{ msg }}</div>
   </div>
</transition>
</template>

<script>
export default {
   props: {
      timestamp: {
         type: Number,
         required: true
      },
      status: {
         type: Number,
         required: true,
         validator: (val) => val >= 0 && val <= 1
      },
      msg: {
         type: String,
         required: true,
         validator: (val) => val !== ''
      },
      duration: {
         type: Number,
         required: true
      },
   },
   data: () => ({
      show: true,
      timer: null
   }),
   computed: {
      boxClass() {
         return this.status === 1 ? 'success' : 'error';
      },
      iconClass() {
         return this.status === 1 ? 'fa-check' : 'fa-times';
      }
   },
   methods: {
      hideHandler() {
         clearTimeout(this.timer);
         this.show = false;
      },
      animateEnd(evt) {
         if (evt.target.classList.contains('v-leave-to')) {
            this.$store.commit('removeToastr', this.timestamp);
         }
      },
      startCountdown() {
         return new Promise((resolve) => {
            this.timer = setTimeout(() => {
               this.hideHandler();
               resolve();
            }, this.duration);
         });
      }
   },
   async mounted() {
      await this.startCountdown();
   }
}
</script>