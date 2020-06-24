<template>
<div class="logoBox">
   <div class="flashBox">
      <div class="imgBox">
         <img :src="require('@/assets/img/logo.png')">
      </div>
      <div class="rippleBox">
         <div class="ripple ripple-inner"></div>
         <div class="ripple ripple-middle"></div>
         <div class="ripple ripple-outer"></div>
      </div>
   </div>
   <img :src="require('@/assets/img/fontLogo.svg')" class="fontLogo" alt="">
</div>
</template>

<script>
export default {
   
}
</script>

<style lang="scss" src="./index.scss"></style>