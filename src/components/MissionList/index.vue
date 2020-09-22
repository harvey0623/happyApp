<template>
<router-link to="/" class="missionList">
   <div class="missionDesc">
      <div class="title">{{ title }}</div>
      <div class="duration">{{ durationTime }}</div>
   </div>
   <div class="missionStatus">尚未開始</div>
</router-link>
</template>

<script>
export default {
   props: {
      id: {
         type: Number,
         required: true
      },
      title: {
         type: String,
         required: true
      },
      beginTime: {
         type: String,
         required: true
      },
      finishTime: {
         type: String,
         required: true
      }
   },
   computed: {
      durationTime() {
         return `巡檢時段 : ${this.beginTime}-${this.finishTime}`;
      }
   }
}
</script>

<style lang="scss" scoped>
.missionList {
   @extend %bwtFlex;
   padding-bottom: 15px;
   border-bottom: 1px solid #F2F2F2;
   &:last-child {
      border-bottom: none;
   }
   >.missionDesc {
      >.title {
         margin-bottom: 10px;
         color: map-get($fontColor, form);
         font-weight: bold;
         font-size: 18px;
      }
      >.duration {
         color: map-get($fontColor, arrow);
         font-size: 14px;
      }
   }
   >.missionStatus {
      padding-right: 15px;
   }
}
</style>