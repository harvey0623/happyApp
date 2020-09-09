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
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import DatePanel from '@/components/DatePanel/index.vue';
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
            month: today.getMonth() + 1
         },
      }
   },
   methods: {
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
      addEvents() {
         // this.fullCalendar.addEvent({
         //    id: 'test',
         //    title: 'hello',
         //    start: '2020-09-09T00:00:00',
         //    end: '2020-09-15T14:59:59'
         // })
         // let result = this.fullCalendar.getEvents();
         // result[0].remove();
      }
   },
   mounted() {
      this.fullCalendar = this.$refs.fullCalendar.getApi();
   },
   components: {
      FullCalendar,
      DatePanel
  },
}
</script>

<style lang="scss">

</style>