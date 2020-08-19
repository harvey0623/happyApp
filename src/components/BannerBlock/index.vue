<template>
<div class="bannerBlock">
   <div class="communityIntro">
      <div class="userName">{{ targetCommunity.name }}</div>
      <div class="communityName" @click="clickHandler">
         <span>{{ targetCommunity.vName }}</span>
         <i class="fas fa-caret-down"></i>
      </div>
   </div>
</div>
</template>

<script>
export default {
   props: {
      targetCommunity: {
         type: Object,
         required: true
      }
   },
   methods: {
      clickHandler() {
         this.$emit('switch');
      }
   }
}
</script>

<style lang="scss">
%bannerRadius {
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 20px;
}

.bannerBlock {
   position: relative;
   @extend %centerFlex;
   padding-left: 25px;
   height: 150px;
   margin-bottom: 20px;
   background-image: url("~@/assets/img/community1.jpg");
   background-size: cover;
   background-position: center top;
   @extend %bannerRadius;
   &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      @include size(100%);
      background-color: rgba(#000, 0.55);
      @extend %bannerRadius;
      z-index: 1;
   }
   >.communityIntro {
      position: relative;
      color: #fff;
      font-size: 18px;
      z-index: 2;
      >.userName {
         margin-bottom: 8px;
      }
      >.communityName {
         >span {
            margin-right: 10px;
         }
      }
   }
}
</style>