<template>
<div class="bulletinSlider" v-show="hasData">
   <swiper ref="mySwiper" :options="swiperOption" class="topSwiperBox">
      <swiper-slide
         v-for="item in bulletinData"
         :key="item.iId">
         <img :src="item.vImage" alt="">
         <p class="imgDesc">{{ item.vTitle }}</p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination" v-show="moreThanOne"></div>
   </swiper>
</div>
</template>

<script>
export default {
   props: {
      bulletinData: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      swiperOption: {
         loop: true,
         initialSlide: 0,
         spaceBetween: 10,
         pagination: {
            el: '.swiper-pagination'
         }
      },
      swiper: null
   }),
   computed: {
      hasData() {
         return this.bulletinData.length > 0;
      },
      moreThanOne() {
         return this.bulletinData.length > 1;
      }
   },
   mounted() {
      this.swiper = this.$refs.mySwiper.$swiper;
   },
   watch: {
      bulletinData() {
         if (this.hasData) this.swiper.slideTo(1, 0, false);
         this.swiper.allowTouchMove = this.moreThanOne; 
      }
   }
}
</script>

<style lang="scss">
.bulletinSlider {
   padding: 15px;
}

.topSwiperBox {
   padding-bottom: 25px;
   .swiper-slide {
      position: relative;
      &:after {
         content: '';
         position: absolute;
         left: 0;
         top: 0;
         @include size(100%);
         background-color: rgba(#fff, 0.5);
         border-radius: 15px;
      }
      >img {
         border-radius: 15px;  
      }
      >.imgDesc {
         position: absolute;
         @extend %posCenter;
         font-size: 22px;
         text-shadow: 0px 1px 10px #4F3B54;
         color: #fff;
         font-weight: bold;
      }
   }
   .swiper-pagination-bullets {
      bottom: 0;
      >.swiper-pagination-bullet-active {
         background-color: map-get($elBgColor, dot);
      }
   }
}
</style>