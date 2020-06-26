<template>
<div class="logoBox" :class="{ small: isSmall }">
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
   props: {
      isSmall: {
         type: Boolean,
         default: false
      }
   }
}
</script>

<style lang="scss" src="./index.scss"></style>