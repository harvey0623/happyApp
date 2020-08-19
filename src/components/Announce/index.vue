<template>
<div class="announceBox" v-show="hasData">
   <p class="title">{{ title }}</p>
   <swiper ref="mySwiper" :options="swiperOption" class="bottomSwiperBox">
      <swiper-slide  
         v-for="item in announceData"
         :key="item.iId">
         <img :src="item.vImage" alt="">
         <p class="desc">{{ item.vTitle }}</p>
      </swiper-slide>
   </swiper>
</div>
</template>

<script>
export default {
   props: {
      title: {
         type: String,
         required: true
      },
      announceData: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      swiper: null,
      swiperOption: {
         spaceBetween: 8,
         slidesPerView: 3,
         slidesPerView: 'auto',
      },
   }),
   computed: {
      hasData() {
         return this.announceData.length > 0;
      }
   }
}
</script>

<style lang="scss">
.announceBox {
   padding: 15px;
   >.title {
      margin-bottom: 10px;
      color: map-get($fontColor, sidebar);
      font-weight: bold;
   }
   .swiper-slide {
      @include size(150px, auto);
      >img {
         border-radius: 10px;
      }
      >.desc {
         padding-top: 5px;
         padding-left: 10px;
         @include setWebkitLimitRow(2);
         color: map-get($fontColor, form);
         font-size: 14px;
      }
   }
}
</style>