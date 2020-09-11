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
            height: 500,
            initialDate: today,
            editable: false,
            selectable: false,
            headerToolbar: false,
            showNonCurrentDates: false,
            eventTextColor: '#fff',
            eventBorderColor: '#f65d75',
            eventBackgroundColor: '#f65d75',
            displayEventTime: false,
            eventDisplay: 'block',
            dayHeaderContent(info) {
               let weekName = ['周日', '週一', '周二', '周三', '周四', '週五', '周六'];
               return weekName[info.dow];
            }
         },
         dateInfo: {
            year: today.getFullYear(),
            month: today.getMonth() + 1
         },
         eventList: []
      }
   },
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      dateCriteria() {
         let { year, month } = this.dateInfo;
         let yearText = year;
         let monthText = month >= 10 ? month : `0${month}`;
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
            vMonth: this.dateCriteria
         }).then(res => res)
      },
      countHandler(count) { //計算目前日曆日期
         if (this.isLoading) return;
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
      addShift() { //增加班表
         this.eventList.forEach(event => {
            this.fullCalendar.addEvent(event);
         });
      },
      clearShift() { //清除班表
         let events = this.fullCalendar.getEvents();
         events.forEach(event => event.remove());
      },
      formatDate(timestamp) { //日期格式化
         let dateObj = new Date(timestamp * 1000);
         let year = dateObj.getFullYear();
         let month = dateObj.getMonth() + 1;
         let date = dateObj.getDate();
         month = month >= 10 ? month : '0' + month;
         return `${year}-${month}-${date}`;
      },
      convertToEvent(data) { //轉換成event格式
         return data.reduce((prev, current) => {
            let workDate = this.formatDate(current.iDateTime);
            prev.push({
               id: current.iId,
               title: current.vTitle,
               start: `${workDate}T00:00:00`,
               end: `${workDate}T23:59:59`,
            });
            return prev;
         }, []);
      },
      async updateShift() { //更新班表
         let scheduleData = await this.getSchedule().then(res => res);
         this.eventList = this.convertToEvent(scheduleData);
         this.clearShift();
         this.addShift();
      }
   },
   async mounted() {
      this.fullCalendar = this.$refs.fullCalendar.getApi();
      await this.updateShift();
   },
   watch: {
      async dateCriteria() {
         await this.updateShift();
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