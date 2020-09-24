<template>
<div id="lightBox">
   <img :src="imageUrl" :key="timestamp" alt="">
   <div class="direction prev" @click="direction(-1)">
      <i class="fal fa-chevron-left"></i>
   </div>
   <div class="direction next" @click="direction(1)">
      <i class="fal fa-chevron-right"></i>
   </div>
   <div class="ligthBox-close" @click="closeHandler">
      <i class="fal fa-times"></i>
   </div>
</div>
</template>

<script>
export default {
   props: {
      timestamp: {
         type: Number,
         required: true
      },
      imageUrl: {
         type: String,
         required: true
      }
   },
   methods: {
      direction(num) {
         this.$emit('dir', num);
      },
      closeHandler() {
         this.$emit('close');
      }
   }
}
</script>

<style lang="scss" scoped>
#lightBox {
   position: fixed;
   left: 0;
   top: 0;
   @include size(100%, 100vh);
   @extend %centerFlex;
   background-color: rgba(#000, 0.75);
   z-index: 20;
   >img {
      display: block;
      max-width: 95%;
      height: auto;
      margin: 0 auto;
   }
   >.direction {
      position: absolute;
      top: 50%;
      color: #fff;
      font-size: 35px;
      transform: translateY(-50%);
      &.prev {
         left: 10px;
      }
      &.next {
         right: 10px;
      }
   }
   >.ligthBox-close {
      position: absolute;
      right: 15px;
      top: 5px;
      color: #fff;
      font-size: 35px;
   }
}
</style>