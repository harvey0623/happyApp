<template>
<div class="sidebar">
   <div class="sidebarHead"></div>
   <div class="sidebarBody">


      <div class="sidebarItem" @click="logoutHandler">
         <i class="fal fa-sign-out-alt"></i>
         <span>登出</span>
      </div>
   </div>
</div>
</template>

<script>
export default {
   methods: {
      logoutHandler() {
         this.$store.dispatch('auth/doLogout');
         this.$router.replace('/entrance');
         this.$store.commit('setMenuOpen', false);
      }
   }
}
</script>

<style lang="scss" src="./index.scss"></style>