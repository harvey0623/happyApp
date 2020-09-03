<template>
<li class="punchItem">
   <div class="punchItem-title" @click="isOpen = !isOpen">{{ title }}</div>
   <SlideUpDown class="punchContent" :active="isOpen" :duration="250">
      <PunchRecord
         v-for="item in record"
         :key="item.iId"
         :time="item.time"
         :type="item.iType"
      ></PunchRecord>
   </SlideUpDown>
</li>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
import PunchRecord from './PunchRecord.vue';
export default {
   props: {
      title: {
         type: String,
         required: true
      },
      record: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      isOpen: false
   }),
   components: {
      PunchRecord,
      SlideUpDown
   }
}
</script>

<style lang="scss" scoped>
.punchItem {
   @include elGutter(margin-bottom, 5px);
   border: 1px solid map-get($borderColor, notify);
   >.punchItem-title {
      padding: 8px 10px;
      background-color: map-get($elBgColor, position);
   }
   >.punchContent {
      padding: 0px 10px;
      >.punchRecord {
         padding-top: 10px;
         &:last-child {
            padding-bottom: 10px;
         }
      }
   }
}
</style>