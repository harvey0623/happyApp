<template>
<div class="workSchedule">
   <BackBlock title="我的班表"></BackBlock>
   <div class="mycontainer vertical">
      <DatePanel
         :year="dateInfo.year"
         :month="dateInfo.month"
         @count="countHandler"
      ></DatePanel>
      <FullCalendar
         ref="fullCalendar"
         :options="calendarOptions"
      ></FullCalendar>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import FullCalendar, { compareByFieldSpec } from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePanel from '@/components/DatePanel/index.vue';
import securityObj from '@/api/security.js';
const today = new Date();
export default {
   name: 'workSchedule',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workSchedule.title'),
      }
   },
   data() {
      return {
         fullCalendar: null,
         calendarOptions: {
            plugins: [
               dayGridPlugin,
               interactionPlugin
            ],
            initialView: 'dayGridMonth',
            height: 530,
            initialDate: today,
            editable: false,
            selectable: false,
            headerToolbar: false,
            showNonCurrentDates: false,
            eventTextColor: '#fff',
            eventBorderColor: '#f65d75',
            eventBackgroundColor: '#f65d75',
            displayEventTime: false,
            dayHeaderContent(info) {
               let weekName = ['周日', '週一', '周二', '周三', '周四', '週五', '周六'];
               return weekName[info.dow];
            },
         },
         dateInfo: {
            year: today.getFullYear(),
            month: 8 //today.getMonth() + 1
         },
         eventList: []
      }
   },
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      dateText() {
         let { year, month } = this.dateInfo;
         let yearText = year;
         let monthText = month > 10 ? month : '0' + month;
         return yearText + monthText; 
      }
   },
   methods: {
      async getSchedule() { //取得班表資料
         return await securityObj.getSchedule({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iPropertyId: this.userInfo.property[0].iId,
            iCommunityId: this.userCommunity,
            vMonth: '202008'
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
         if (count > 0) this.fullCalendar.next();
         else this.fullCalendar.prev();
      },
      chckContinueDays(data) { //判斷日期是否連續
         let dateArray = data.map((item, index) => {
            let dt = new Date(item.iDateTime * 1000);
            dt.setDate(dt.getDate() + 4 - index);
            dt.setHours(0);
            dt.setMinutes(0);
            dt.setSeconds(0);
            dt.setMilliseconds(0);
            return dt.getTime();
         });
         return dateArray.every((item, index, arr) => item === arr[0]);
      },
      continueHandler(data) {
         let { vTitle, iId } = data[0];
         let total = data.length;
         let startTime = new Date(data[0].iDateTime * 1000).toLocaleDateString();
         let endTime = new Date(data[total - 1].iDateTime * 1000).toLocaleDateString();
         startTime = `${startTime.replace(/\//g, '-')}T00:00:00`;
         endTime = `${endTime.replace(/\//g, '-')}T23:59:59`;
         return { startTime, endTime, title: vTitle, id: iId };
      }
   },
   async mounted() {
      this.fullCalendar = this.$refs.fullCalendar.getApi();
      let scheduleData = await this.getSchedule().then(res => res);
      scheduleData.sort((a, b) => a.iDateTime - b.iDateTime);
      let isContinue = this.chckContinueDays(scheduleData);
      if (isContinue) {
         this.eventList = this.continueHandler(scheduleData);
      } else {
         
      }

   },
   components: {
      FullCalendar,
      DatePanel
   },
}
</script>

<style lang="scss">

</style>