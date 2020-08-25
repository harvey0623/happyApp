<template>
<div class="backBlock">
   <i class="fal fa-long-arrow-left" @click="backHandler"></i>
   <p>{{ title }}</p>
</div>
</template>

<script>
export default {
   props: {
      title: {
         type: String,
         required: true,
         validator: val => val !== ''
      }
   },
   methods: {
      backHandler() {
         this.$router.back();
      }
   }
}
</script>

<style lang="scss">
.backBlock {
   position: relative;
   height: 45px;
   line-height: 45px;
   background-color: map-get($elBgColor, position);
   >.fa-long-arrow-left {
      position: absolute;
      left: 15px;
      top: 8px;
      color: map-get($fontColor, arrow);
      font-size: 30px;
   }
   >p {
      color: map-get($fontColor, form);
      text-align: center;
      font-size: 18px;
   }
}
</style>