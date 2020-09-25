<template>
<div id="lightBox">
   <img 
      :src="imageUrl" 
      :key="timestamp"
      @touchstart="startHandler"
      @touchmove="moveHandler"
      @touchend="endHandler">
   <div class="direction prev" :class="{hidden: isLessOne}" @click="direction(-1)">
      <i class="fal fa-chevron-left"></i>
   </div>
   <div class="direction next" :class="{hidden: isLessOne}" @click="direction(1)">
      <i class="fal fa-chevron-right"></i>
   </div>
   <div class="ligthBox-close" @click="$emit('close')">
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
      },
      totalImage: {
         type: Number,
         required: true
      }
   },
   data: () => ({
      touchPos: {
         start: 0,
         move: 0
      },
      rangeNumber: 50
   }),
   computed: {
      isLessOne() {
         return this.totalImage <= 1;
      }
   },
   methods: {
      direction(num) {
         this.$emit('dir', num);
      },
      startHandler(evt) {
         this.touchPos.start = evt.touches[0].pageX;
      },
      moveHandler(evt) {
         this.touchPos.move = evt.touches[0].pageX;
      },
      endHandler(evt) {
         let { start, move } = this.touchPos;
         let diff = move - start;
         if (diff >= this.rangeNumber) this.direction(1);
         if (diff <= -this.rangeNumber) this.direction(-1);
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
      max-height: 450px;
      margin: 0 auto;
   }
   >.direction {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: #fff;
      font-size: 35px;
      &.prev {
         left: 10px;
      }
      &.next {
         right: 10px;
      }
      &.hidden {
         display: none;
      }
   }
   >.ligthBox-close {
      position: absolute;
      right: 15px;
      top: 5px;
      color: #fff;
      font-size: 30px;
   }
}
</style>