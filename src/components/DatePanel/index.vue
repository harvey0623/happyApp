<template>
<div class="datePanel">
   <button @click="clickHandler(-1)">
      <i class="fal fa-chevron-left"></i>
   </button>
   <div class="dateText">{{ dateText }}</div>
   <button @click="clickHandler(1)">
      <i class="fal fa-chevron-right"></i>
   </button>
</div>
</template>

<script>
export default {
   props: {
      year: {
         type: Number,
         required: true
      },
      month: {
         type: Number,
         required: true
      },
   },
   computed: {
      dateText() {
         return `${this.year}年 ${this.month}月`;
      }
   },
   methods: {
      clickHandler(val) {
         this.$emit('count', val);
      }
   }
}
</script>

<style lang="scss" scoped>
.datePanel {
   @extend %bwtFlex;
   height: 45px;
   padding: 0 15px;
   background-color: map-get($elBgColor, date);
   >.dateText {
      color: #fff;
      font-size: 22px;
   }
   >button {
      @include size(45px, 30px);
      line-height: 30px;
      background-color: #F2F2F2;
      border: none;
      border-radius: 3px;
      >i {
         font-size: 20px;
         color: map-get($fontColor, tab);
      }
   }
}
</style>