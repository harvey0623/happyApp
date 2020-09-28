<template>
<div class="mission">
   <BackBlock title="工作任務"></BackBlock>
   <div class="mycontainer vertical">
      <div class="missionTitle">
         <span class="text">巡檢任務</span>
         <span class="total">({{ totalMission }})</span>
      </div>
      <div class="missionBox">
         <MissionList
            v-for="category in missionCategory"
            :key="category.iId"
            :id="category.iId"
            :title="category.vTitle"
            :beginTime="category.vBegin"
            :finishTime="category.vFinish"
         ></MissionList>
      </div>
   </div>
   <Loading v-if="isLoading"></Loading>
</div>
</template>

<script>
import { mapState } from 'vuex';
import MissionList from '@/components/MissionList/index.vue';
import securityObj from '@/api/security.js';
export default {
   name: 'workMission',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workMission.title'),
      }
   },
   data: () => ({
      isLoading: false,
      missionList: []
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      totalMission() {
         return this.missionList.length;
      },
      missionCategory() {
         return this.missionList.reduce((prev, current) => {
            let { iId, vTitle, vBegin, vFinish } = current;
            prev.push({ iId, vTitle, vBegin, vFinish });
            return prev;
         }, []);
      }
   },
   methods: {
      async getMission() {
         this.isLoading = true;
         return await securityObj.getMission({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iSecurityId: 2,
            iCommunityId: this.userCommunity
         }).then(res => res)
            .finally(() => this.isLoading = false);
      }
   },
   async mounted() {
      this.missionList = await this.getMission().then(res => res);
   },
   components: {
      MissionList
   }
}
</script>

<style lang="scss" scoped>
.missionTitle {
   margin-bottom: 30px;
   font-size: 18px;
   >.text{
      color: map-get($fontColor, sidebar);
      font-weight: bold;
   }
   >.total {
      margin-left: 5px;
      color: map-get($fontColor, header);
   }
}
</style>