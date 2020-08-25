<template>
<div class="notify">
   <BackBlock title="通知"></BackBlock>
   <div class="mycontainer vertical">
      <NotifyTab 
         :currentTabId="currentTabId"
         @tabUpdate="tabHandler"
      ></NotifyTab>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import NotifyTab from '@/components/NotifyTab/index.vue';
import notifyObj from '@/api/notify.js';
export default {
   name: 'notify',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.notify.title'),
      }
   },
   data: () => ({
      currentTabId: 2,
      tabStatus: [
         { id: 2, isFirst: true, data: [] },
         { id: 3, isFirst: true, data: [] }
      ]
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity'])
   },
   methods: {
      tabHandler({ id }) {
         this.currentTabId = id;
         this.initHandler();
      },
      async getNotifyData() {
         let result = await notifyObj.getNotifyData({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            iCommunityId: this.userCommunity,
            iCategory: this.currentTabId
         }).then(res => res);
         return result;
      },
      async initHandler() {
         let targetStatus = this.tabStatus.find(item => item.id === this.currentTabId);
         if (targetStatus.isFirst) {
            let notifyData = await this.getNotifyData().then(res => res);
            console.log(notifyData);
            targetStatus.data = targetStatus.data.concat(notifyData);
            targetStatus.isFirst = false;
         }
      }
   },
   async mounted() {
      this.initHandler();
   },
   components: {
      NotifyTab
   }
}
</script>

<style lang="scss">

</style>