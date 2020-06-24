<template>
<div class="btnBox" :class="extendClass">
   <slot></slot>
</div>
</template>

<script>
export default {
   props: {
      center: {
         type: Boolean,
         default: false
      },
      right: {
         type: Boolean,
         default: false
      },
      spaceBetween: {
         type: Boolean,
         default: false
      }
   },
   computed: {
      extendClass() {
         return {
            center: this.center,
            right: this.right,
            spaceBetween: this.spaceBetween,
         }
      }
   },
}
</script>

<style>

</style>