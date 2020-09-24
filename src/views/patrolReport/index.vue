<template>
<div class="patrolReport">
   <BackBlock title="巡檢回報"></BackBlock>
   <div class="mycontainer vertical">
      <div class="placeInfo">
         <p>哨點名稱 : {{ outpost }}</p>
         <p>地點 : {{ site }}</p>
      </div>
   </div>
   <div class="reportBlock">
      <div class="statusBox patrolStatus">
         <p class="statusTitle">巡查點狀態</p>
         <div class="modeBox">
            <label
               class="modeLabel"
               v-for="mode in modeList" 
               :key="mode.value">
               <input 
                  type="radio"
                  name="mode"
                  :value="mode.value"
                  hidden
                  v-model.number="currentMode">
               <span>{{ mode.title }}</span>
            </label>
         </div>
      </div>
      <div class="statusBox question">
         <p class="statusTitle">問題描述</p>
         <textarea
            class="myTextarea"
            v-model="question"
            placeholder="請描述問題"
         ></textarea>
      </div>
      <div class="statusBox question">
         <p class="statusTitle">存檔圖片</p>
         <div class="photoBox"></div>
      </div>
      <div class="statusBox btnBox">
         <button class="btnSure btnReport">送出回報</button>
      </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import securityObj from '@/api/security.js';
export default {
   name: 'patrolReport',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.patrolReport.title'),
      }
   },
   data: () => ({
      currentMode: 1,
      modeList: [
         { title: '正常', value: 1 },
         { title: '異常', value: 0 },
      ],
      idGroup: {
         missionId: 0,
         pointId: 0
      },
      missionList: [],
      question: ''
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetMission() {
         let obj = this.missionList.find(item => item.iId === this.idGroup.missionId);
         if (obj !== undefined) return obj;
         else return null;
      },
      placeList() {
         if (this.targetMission === null) return [];
         else return this.targetMission.place;
      },
      targetPoint() {
         let obj = this.placeList.find(item => item.checkPointId === this.idGroup.pointId);
         if (obj !== undefined) return obj;
         else return null;
      },
      outpost() {
         if (this.targetPoint === null) return '';
         else return this.targetPoint.vTitle;
      },
      site() {
         if (this.targetPoint === null) return '';
         else return this.targetPoint.vSummary;
      }
   },
   methods: {
      async getMission() {
         return await securityObj.getMission({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iSecurityId: 2,
            iCommunityId: this.userCommunity
         }).then(res => {
            return res;
         })
      },
   },
   created() {
      let { missionId, pointId } = this.$route.params;
      this.idGroup = {
         missionId: parseInt(missionId), 
         pointId: parseInt(pointId)
      };
   },
   async mounted() {
      this.missionList = await this.getMission().then(res => res);
   }
}
</script>

<style lang="scss" scoped src="./index.scss"></style>

