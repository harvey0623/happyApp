<template>
<div class="notify">
   <BackBlock title="通知"></BackBlock>
   <div class="mycontainer vertical tabGutter">
      <NotifyTab 
         :currentTabId="currentTabId"
         @tabUpdate="tabHandler"
      ></NotifyTab>
      <KeywordPanel
         :editId.sync="editId"
         v-model="currentKeyword"
      ></KeywordPanel>
   </div>
   <div class="notifyWrap" ref="notifyWrap">
      <NotifyContent
         v-for="tab in tabStatus"
         :key="tab.id"
         :detail="tab"
         :showRemove="showRemove"
         v-show="tab.id === currentTabId"
      ></NotifyContent>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
import NotifyTab from '@/components/NotifyTab/index.vue';
import NotifyContent from '@/components/NotifyTab/NotifyContent.vue';
import KeywordPanel from '@/components/KeywordPanel/index.vue';
export default {
   name: 'notify',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.notify.title'),
      }
   },
   data: () => ({
      currentTabId: 2,
      editId: 1, //1:編輯 2:完成
      tabStatus: [
         { id: 2, isFirst: true, keyword: '', data: [], scrollPos: 0, isLoading: false },
         { id: 3, isFirst: true, keyword: '', data: [], scrollPos: 0, isLoading: false }
      ],
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetCategory() {
         return this.tabStatus.find(item => item.id === this.currentTabId);
      },
      currentKeyword: {
         get() {
            return this.targetCategory.keyword;
         },
         set(val) {
            this.targetCategory.keyword = val;
         }
      },
      showRemove() { //是否顯示移儲icon
         return this.editId === 2;
      }
   },
   methods: {
      async tabHandler({ id }) { //tab切換
         this.targetCategory.scrollPos = this.getScrollPos();
         this.currentTabId = id;
         await this.initHandler();
         this.setScrollPos(this.targetCategory.scrollPos);
      },
      async getNotifyData() {
         let result = await communityObj.getNotify({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            iCommunityId: this.userCommunity,
            iCategory: this.currentTabId
         }).then(res => res);
         return result;
      },
      async initHandler() {
         if (this.targetCategory.isFirst) {
            this.targetCategory.isLoading = true;
            let notifyData = await this.getNotifyData().then(res => res);
            this.targetCategory.data = this.targetCategory.data.concat(notifyData);
            this.targetCategory.isFirst = false;
            this.targetCategory.isLoading = false;
         }
      },
      getScrollPos() {
         return this.$refs.notifyWrap.scrollTop;
      },
      setScrollPos(pos) {
         this.$refs.notifyWrap.scrollTop = pos;
      }
   },
   async mounted() {
      this.initHandler();
   },
   components: {
      NotifyTab,
      KeywordPanel,
      NotifyContent
   }
}
</script>

<style lang="scss">
.notifyWrap {
   height: calc(100vh - 50px - 45px - 125px - 40px - 30px);
   overflow: auto;
}
</style>