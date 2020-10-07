<template>
<div class="characterInfo">
   <div class="backIcon" @click="backHandler">
      <i class="fal fa-long-arrow-left"></i>
   </div>
   <div class="detailBox">
      <div class="companyName">{{ companyName || 'Big Company' }}</div>
      <div class="laborName">
         <span>{{ laborName }}</span>
      </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
   computed: {
      ...mapState('auth', ['userInfo']),
      securityData() {
         if (this.userInfo === null) return null;
         return this.userInfo.security[0];
      },
      companyName() {
         if (this.securityData === null) return '';
         return this.securityData.vName;
      },
      laborName() {
         if (this.securityData === null) return '';
         return this.securityData.name;
      }
   },
   methods: {
      backHandler() {
         this.$router.back()
      }
   }
}
</script>

<style lang="scss" scoped>
.characterInfo {
   position: relative;
   @extend %centerFlex;
   height: 150px;
   margin-bottom: 20px;
   background-image: url("~@/assets/img/community1.jpg");
   background-position: center top;
   background-size: cover;
   border-bottom-left-radius: 20px;
   &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      @include size(100%);
      background-color: rgba(#000, 0.5);
      border-bottom-left-radius: 20px;
      z-index: 1;
   }
   >.backIcon {
      position: absolute;
      left: 15px;
      top: 12px;
      z-index: 2;
      >i {
         font-size: 30px;
         color: map-get($fontColor, arrow);
      }      
   }
   >.detailBox {
      position: relative;
      top: 5px;
      @include elGutter(margin-bottom, 15px);
      color: #fff;
      text-align: center;
      z-index: 2;
      >.companyName {
         margin-bottom: 10px;
         font-size: 20px;
      }
      >.laborName {
         >span {
            margin-right: 8px;
         }
      }
   }
}
</style>