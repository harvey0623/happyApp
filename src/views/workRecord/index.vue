<template>
<div class="workRecord">
   <BackBlock title="工作紀錄"></BackBlock>

</div>
</template>

<script>
import securityObj from '@/api/security.js';
const today = new Date();
export default {
   name: 'workRecord',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workRecord.title'),
      }
   },
   data: () => ({
      dateDate: {
         year: today.getFullYear(),
         month: today.getMonth() + 1
      }
   }),
   mounted() {

   }
}
</script>

<style lang="scss" scoped>

</style>