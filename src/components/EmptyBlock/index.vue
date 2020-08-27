<template>
<h3 class="emptyTip">{{ text }}</h3>
</template>

<script>
export default {
   props: {
      text: {
         type: String,
         required: true,
         validator: (val) => val !== '' 
      }
   }
}
</script>

<style lang="scss" scoped>
.emptyTip {
   text-align: center;
   color: map-get($fontColor, placeholder);
}
</style>