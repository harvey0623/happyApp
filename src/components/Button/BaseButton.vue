<template>
<button>
   <i :class="iconClass" v-show="iconClass"></i>
   <span>{{ text }}</span>
</button>
</template>

<script>
export default {
   props: {
      text: {
         type: String,
         required: true
      },
      iconClass: {
         type: String,
         default: ''
      }
   }
}
</script>

<style>

</style>