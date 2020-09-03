<template>
<div class="workRecord">
   <BackBlock title="工作紀錄"></BackBlock>
   <div class="mycontainer vertical">
      <DatePanel
         :year="dateInfo.year"
         :month="dateInfo.month"
         @count="countHandler"
      ></DatePanel>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import securityObj from '@/api/security.js';
import DatePanel from '@/components/DatePanel/index.vue';
const today = new Date();
export default {
   name: 'workRecord',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workRecord.title'),
      }
   },
   data: () => ({
      dateInfo: {
         year: today.getFullYear(),
         month: today.getMonth() + 1
      },
      punchData: []
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      dateGroup() {
         if (this.punchData.length === 0) return [];
         let dateSet = new Set();
         this.punchData.forEach(item => dateSet.add(item.date));
         let result = Array.from(dateSet);
         return result.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      },
      punchList() {
         if (this.punchData.length === 0) return [];
         if (this.dateGroup.length === 0) return [];
         return this.dateGroup.reduce((prev, current) => {
            let tempArr = this.punchData.filter(item => item.date === current);
            prev.push({ groupTitle: current, data: tempArr });
            return prev;
         }, []); 
      },
      filterPunch() {
         if (this.punchList.length === 0) return [];
         return this.punchList.filter(item => {
            let year = new Date(item.groupTitle).getFullYear();
            let month = new Date(item.groupTitle).getMonth() + 1;
            return year === this.dateInfo.year && month === this.dateInfo.month;
         });
      }
   },
   methods: {
      async getAttendance() {
         return await securityObj.getAttendance({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iSecurityId: this.userInfo.security[0].iId,
            iCommunityId: this.userCommunity
         }).then(res => res);
      },
      countHandler(count) {
         let tempMonth = this.dateInfo.month + count;
         if (tempMonth > 12) {
            this.dateInfo.year++;
            this.dateInfo.month = 1;
         } else if (tempMonth < 1) {
            this.dateInfo.year--;
            this.dateInfo.month = 12;
         } else {
            this.dateInfo.month = tempMonth;
         }
      },
      copyPunch(data) {
         let copyData = JSON.parse(JSON.stringify(data));
         return copyData.reduce((prev, current) => {
            let splitMsg = current.vMessage.split(' ');
            prev.push({ ...current, date: splitMsg[0], time: splitMsg[1] });
            return prev;
         }, []);
      }
   },
   async mounted() {
      let punchResult = await this.getAttendance().then(res => res);
      this.punchData = this.copyPunch(punchResult);
   },
   components: {
      DatePanel
   }
}
</script>

<style lang="scss" scoped>

</style>