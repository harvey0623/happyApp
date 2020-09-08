<template>
<div class="workSchedule">
   <BackBlock title="我的班表"></BackBlock>
   <div class="mycontainer vertical">
      <FullCalendar
         :options="calendarOptions"
      ></FullCalendar>
   </div>
</div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
export default {
   name: 'workSchedule',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workSchedule.title'),
      }
   },
   data: () => ({
      calendarOptions: {
         plugins: [
            dayGridPlugin,
            interactionPlugin
         ],
         initialView: 'dayGridMonth',
         height: 500,
         firstDay: 1,
         initialDate: new Date(),
         editable: false,
         headerToolbar: false,
         dayHeaderContent(params) {
            let weekName = ['周日', '週一', '周二', '周三', '周四', '週五', '周六'];
            return weekName[params.dow];
         }
      }
   }),
   methods: {
      
   },
   mounted() {
      
   },
   components: {
      FullCalendar
  },
}
</script>

<style lang="scss" scoped>

</style>