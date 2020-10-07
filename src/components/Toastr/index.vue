<template>
<div class="toastr" v-show="toastrLength > 0">
   <ToastrItem
      v-for="toastr in toastrList"
      :key="toastr.timestamp"
      :timestamp="toastr.timestamp"
      :status="toastr.status"
      :msg="toastr.msg"
      :duration="duration"
   ></ToastrItem>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ToastrItem from './ToastrItem.vue';
export default {
   props: {
      duration: {
         type: Number,
         default: 3000 
      }
   },
   computed: {
      ...mapState(['toastrList']),
      ...mapGetters(['toastrLength']),
   },
   components: {
      ToastrItem
   }
}
</script>

<style lang="scss" src="./index.scss"></style>