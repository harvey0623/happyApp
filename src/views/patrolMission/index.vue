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
      v-if="openCamera"
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
      tempPunch: {
         pointId: null,
         changeStatus: null
      }
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
         this.openCamera = true;
         this.tempPunch = {
            pointId: payload.pointId,
            changeStatus: payload.changeStatus
         };
      },
      async scanHandler(scanData) {
         this.isProcess = true;
         this.cameraStatus = 'off';
         let isMatch = await this.matchPointId(scanData).then(res => res);
         this.isProcess = false;
         this.cameraStatus = 'auto';
         if (isMatch) {
            this.openCamera = false;
            this.tempPunch.changeStatus(true);
         }
         this.$swal({
            icon: isMatch ? 'success' : 'error',
            title: isMatch ? '巡點成功' : '巡點失敗'
         });
      },
      matchPointId(id) { //確認qrcode的id是否跟巡點id相同
         return new Promise((resolve) => {
            setTimeout(() => {
               resolve(id === this.tempPunch.pointId.toString());
            }, 1000);
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