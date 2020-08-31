<template>
<div class="pagePanel">
   <router-link to="/" exact>
      <i class="fal fa-home"></i>
      <div>首頁</div>
   </router-link>
   <router-link to="/memberProfile">
      <i class="fal fa-user"></i>
      <div>我的資料</div>
   </router-link>
   <router-link to="/a">
      <i class="far fa-barcode-scan"></i>
      <div>條碼掃描</div>
   </router-link>
</div>
</template>

<script>
export default {
   computed: {

   }
}
</script>

<style lang="scss" scoped>
.pagePanel {
   display: flex;
   align-items: center;
   position: fixed;
   left: 0;
   bottom: 0;
   @include size(100%, map-get($heightObj, pagePanel));
   padding-top: 5px;
   background-color: #fff;
   border: 1px solid map-get($borderColor, primary);
   z-index: 19;
   >a {
      flex: 1;
      text-align: center;
      color: map-get($fontColor, arrow);
      &.router-link-active,
      &.router-link-exact-active {
         color: map-get($fontColor, header);
      }
      >i {
         font-size: 22px;
      }
      >div {
         font-size: 14px;
      }
   }
}
</style>