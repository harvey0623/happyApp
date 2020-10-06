<template>
<div class="toastr" v-show="toastrLength > 0">
   <ToastrItem
      v-for="toastr in toastrList"
      :key="toastr.timestamp"
      :timestamp="toastr.timestamp"
      :status="toastr.status"
      :msg="toastr.msg"
      :duration="3000"
   ></ToastrItem>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ToastrItem from './ToastrItem.vue';
export default {
   computed: {
      ...mapState(['toastrList']),
      ...mapGetters(['toastrLength']),
   },
   components: {
      ToastrItem
   }
}
</script>

<style lang="scss">
.toastr {
   position: fixed;
   right: 0;
   top: 0;
   width: 200px;
   padding: 10px;
   z-index: 19;
}

.toastrItem {
   display: flex;
   align-items: center;
   padding: 8px 15px;
   @include elGutter(margin-bottom, 10px);
   border-radius: 3px;
   background-color: #fff;
   >.iconBox {
      margin-right: 8px;
      font-size: 20px;
      >.fa-check {
         color: rgb(28, 212, 28);
      }
      >.fa-times {
         color: red;
      }
   }
   >.msgBox {
      font-size: 16px;
      color: map-get($fontColor, sidebar);
   }
}

</style>