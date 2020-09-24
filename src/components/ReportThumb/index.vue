<template>
<div class="reportThumb" :style="bgStyle" @click="clickHandler">
   <div class="removeIcon" @click="removeHandler">
      <i class="far fa-times"></i>
   </div>
</div>
</template>

<script>
export default {
   props: {
      timestamp: {
         type: Number,
         required: true
      },
      base64: {
         type: String,
         required: true
      }
   },
   computed: {
      bgStyle() {
         return { backgroundImage: `url(${this.base64})` }
      }
   },
   methods: {
      clickHandler() {
         this.$emit('preview', this.timestamp);
      },
      removeHandler() {
         this.$emit('remove', this.timestamp);
      }
   }
}
</script>

<style lang="scss" scoped>
.reportThumb {
   position: relative;
   @include size(75px);
   border-radius: 4px;
   background-size: cover;
   >.removeIcon {
      position: absolute;
      right: -8px;
      top: -8px;
      @include size(20px);
      border-radius: 50%;
      background-color: map-get($elBgColor, remove);
      color: map-get($fontColor, form);
      text-align: center;
      line-height: 20px;
   }
}
</style>