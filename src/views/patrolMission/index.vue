<template>
<div class="patrolMission">
   <BackBlock title="巡檢任務"></BackBlock>
   <Loading v-if="isLoading"></Loading>
   <div class="mycontainer vertical">
      <template v-if="hasMission">
         <div class="missionInfo">
            <p class="title">{{ targetMission.vTitle }}</p>
            <div class="content">
               <p>巡檢哨點數量 : {{ totalPlace }}</p>
               <p>巡檢時段 : {{ patrolDuration }}</p>
            </div>
         </div>
         <ul class="patrolBox">
            <PatrolList
               v-for="patrol in patrolList"
               :key="patrol.iId"
               :patrol="patrol"
               @punch="patrolPunch"
            ></PatrolList>
         </ul>
      </template>
      <template v-else>
         <EmptyBlock text="找不到巡檢任務"></EmptyBlock>
      </template>
   </div>
   <QrcodeReader
      v-show="openCamera"
      :openCamera.sync="openCamera"
      :cameraStatus.sync="cameraStatus"
      :isProcess="isProcess"
      @scan="scanHandler"
   ></QrcodeReader>
</div>
</template>

<script>
import { mapState } from 'vuex';
import MissionList from '@/components/MissionList/index.vue';
import securityObj from '@/api/security.js';
import PatrolList from '@/components/PatrolList/index.vue';
import QrcodeReader from '@/components/QrcodeReader/index.vue';
export default {
   name: 'patrolMission',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.patrolMission.title'),
      }
   },
   data: () => ({
      id: 0,
      isLoading: false,
      missionList: [],
      openCamera: false,
      cameraStatus: 'auto',
      isProcess: false,
      tempPointId: null
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetMission() {
         let obj = this.missionList.find(item => item.iId === this.id);
         if (obj !== undefined) return obj;
         else return null;
      },
      totalPlace() {
         if (this.targetMission === null) return 0; 
         else return this.targetMission.place.length;
      },
      patrolList() {
         if (this.targetMission === null) return [];
         else return this.targetMission.place;
      },
      patrolDuration() {
         if (this.targetMission === null) return '';
         let { vBegin, vFinish } = this.targetMission;
         return `${vBegin}-${vFinish}`;
      },
      hasMission() {
         return this.isLoading === false && this.targetMission !== null;
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
            .finally(() => this.isLoading = false)
      },
      patrolPunch(payload) {
         this.tempPointId = payload.checkPointId;
         this.openCamera = true;
      },
      async scanHandler(scanData) {
         alert(scanData);
         alert(typeof scanData);
         this.isProcess = true;
         this.cameraStatus = 'off';
         let isMatch = await this.matchPointId(scanData).then(res => res);
         alert(isMatch);
      },
      matchPointId(id) {
         return new Promise((resolve) => {
            resolve(id === this.tempPointId.toString());
         });
      }
   },
   async mounted() {
      this.id = parseInt(this.$route.params.id);
      this.missionList = await this.getMission().then(res => res);
   },
   watch: {
      $route(newVal) {
         this.id = parseInt(newVal.params.id);
      }
   },
   components: {
      PatrolList,
      QrcodeReader
   }
}
</script>

<style lang="scss" scoped>
.missionInfo {
   margin-bottom: 30px;
   >.title {
      margin-bottom: 15px;
      padding-left: 15px;
      color: map-get($fontColor, sidebar);
      font-weight: bold;
      font-size: 18px;
   }
   >.content {
      padding: 15px;
      background-color: map-get($elBgColor, position);
      color: map-get($fontColor, form);
      >p {
         @include elGutter(margin-bottom, 12px);
      }
   }
}
</style>