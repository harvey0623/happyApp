<template>
<router-link
   class="communityList"
   :to="{ name: 'communityIntro', params: { id: detail.iId }}">
   <div class="imgBox">
      <img src="https://fakeimg.pl/100x100/">
   </div>
   <div class="descBox">
      <div class="name">{{ detail.CommunityName }}</div>
      <div class="unit">{{ detail.vRoom }}</div>
      <div class="address">
         <i class="fal fa-map-marker-alt"></i> 
         {{ detail.fullAddress }}
      </div>
   </div>
</router-link>
</template>

<script>
export default {
   props: {
      detail: {
         type: Object,
         required: true
      }
   }
}
</script>

<style lang="scss" scoped>
.communityList {
   display: flex;
   padding-bottom: 10px;
   margin-bottom: 10px;
   @include elGutter(margin-bottom, 10px);
   border-bottom: 1px solid map-get($borderColor, notify);
   &:last-child {
      padding-bottom: 0;
      margin-bottom: 0;
      border-bottom: none;
   }
   >.imgBox {
      flex: 0 0 100px;
      height: 100px;
      >img {
         @include size(100%);
         border-radius: 5px;
      }
   }
   >.descBox {
      flex: 1;
      padding-top: 5px;
      padding-left: 12px;
      >* {
         @include elGutter(margin-bottom, 3px);
      }
      >.name {
         color: map-get($fontColor, sidebar);
         font-weight: bold;
      }
      >.unit {
         color: map-get($fontColor, placeholder);
      }
      >.address {
         color: map-get($fontColor, form);
         >i {
            margin-right: 3px;
            color: map-get($fontColor, header);
         }
      }
   }
}
</style>