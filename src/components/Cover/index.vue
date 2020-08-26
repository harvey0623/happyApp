<template>
<div id="cover" @click="closeHandler"></div>
</template>

<script>
export default {
   methods: {
      closeHandler() {
         this.$store.commit('setMenuOpen', false);
      }
   }
}
</script>

<style lang="scss" scoped>
#cover {
   position: fixed;
   left: 0;
   top: 0;
   @include size(100%, 100vh);
   background-color: rgba(#000, 0.75);
   z-index: 20;
}
</style>