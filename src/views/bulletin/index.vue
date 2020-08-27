<template>
<div class="bulletin">
   <div class="mycontainer vertical">
      <div v-if="!showEmpty" class="bulletin_descBox" v-html="bulletinContent"></div>
      <EmptyBlock v-else text="沒有任何公告~"></EmptyBlock>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
export default {
   name: 'bulletin',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.bulletinInfo.title'),
      }
   },
   data: () => ({
      bulletinId: 0,
      bulletinList: [],
      isLoading: false
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      bulletinContent() {
         if (this.bulletinList.length === 0) return '';
         let filterList = this.bulletinList.filter(item => item.iPosition === 2);
         let result = filterList.find(item => item.iId === this.bulletinId);
         if (result !== undefined) return result.vContent;
         else return '';
      },
      showEmpty() {
         return !this.isLoading && this.bulletinContent === '';
      }
   },
   methods: {
      async getBulletin() {
         this.isLoading = true;
         return await communityObj.getBulletin({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iCommunityId: this.userCommunity
         }).then(res => res)
            .finally(() => this.isLoading = false);
      },
      async initHandler() {
         this.bulletinId = parseInt(this.$route.params.id);
         this.bulletinList = await this.getBulletin().then(res => res);
      }
   },
   async mounted() {
      this.initHandler();
   },
   watch: {
      $route(val, oldVal) {
         this.initHandler();
      }
   }
}
</script>

<style lang="scss">
.bulletin_descBox {
   img {
      max-width: 100%;
      height: auto;
   }
}
</style>