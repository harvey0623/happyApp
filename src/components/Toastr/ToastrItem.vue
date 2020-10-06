<template>
<transition name="fade" appear>
   <div class="toastrItem" v-if="show" @click="hideHandler">
      <div class="iconBox">
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
      iconClass() {
         return this.status === 1 ? 'fa-check' : 'fa-times';
      }
   },
   methods: {
      hideHandler() {
         clearTimeout(this.timer);
         this.$store.commit('removeToastr', this.timestamp);
         this.show = false;
      },
      startCountdown() {
         return new Promise((resolve) => {
            this.timer = setTimeout(() => {
               resolve();
            }, this.duration);
         });
      }
   },
   async mounted() {
      await this.startCountdown();
      this.hideHandler();
   },
   beforeDestroy() {
      clearTimeout(this.timer);
   }
}
</script>