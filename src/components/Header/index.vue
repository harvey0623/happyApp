<template>
<header class="myheader">
   <div class="menuBar" @click="openMenu">
      <i class="fal fa-bars"></i>
   </div>
   <router-link to="/"  class="centerLogo">
      <img :src="require('@/assets/img/logo.png')" class="pic" alt="">
      <img :src="require('@/assets/img/fontLogo.svg')" class="text" alt="">
   </router-link>
   <router-link to="/notify" class="bellBox" :class="{ notice: true }">
      <i class="fal fa-bell"></i>
   </router-link>
</header>
</template>

<script>
export default {
   methods: {
      openMenu() {
         this.$store.commit('setMenuOpen', true);
      }
   }
}
</script>

<style lang="scss" src="./index.scss"></style>