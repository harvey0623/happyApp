<template>
<div class="patrolMission">
   <BackBlock title="巡檢任務"></BackBlock>
   <Loading v-if="isLoading"></Loading>
   <div class="mycontainer vertical">
      <EmptyBlock v-show="showEmpty" text="找不到巡檢任務"></EmptyBlock>
      <div v-if="hasMission">
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
               :missionId="missionId"
               :patrol="patrol"
               @punch="patrolPunch"
            ></PatrolList>
         </ul>
      </div>
   </div>
   <QrcodeReader
      v-if="openCamera"
      ref="qrcodeReader"
      :openCamera.sync="openCamera"
      :cameraStatus.sync="cameraStatus"
      :isProcess="isProcess"
      @scan="scanHandler"
   ></QrcodeReader>
</div>
</template>

<script>
import { mapState } from 'vuex';
import QrcodeReader from '@/components/QrcodeReader/index.vue';
import html2canvas from 'html2canvas';
import MissionList from '@/components/MissionList/index.vue';
import securityObj from '@/api/security.js';
import PatrolList from '@/components/PatrolList/index.vue';
export default {
   name: 'patrolMission',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.patrolMission.title'),
      }
   },
   data: () => ({
      missionId: 0,
      isLoading: false,
      missionList: [],
      openCamera: false,
      cameraStatus: 'auto',
      isProcess: false,
      tempPunch: {
         pointId: null,
         changeStatus: null
      },
      isFirstLoadData: true,
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetMission() {
         let obj = this.missionList.find(item => item.iId === this.missionId);
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
         return !this.isLoading && this.targetMission !== null;
      },
      showEmpty() {
         return !this.isLoading && this.targetMission === null && !this.isFirstLoadData;
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
         }).then(res => {
            return res;
         }).finally(() => {
            this.isLoading = false;
            this.isFirstLoadData = false;
         })
      },
      patrolPunch(payload) {
         this.openCamera = true;
         this.tempPunch = {
            pointId: payload.pointId,
            changeStatus: payload.changeStatus
         };
      },
      async scanHandler({ scanData, lensElement }) {
         this.cameraStatus = 'off';
         this.isProcess = true;
         let isMatch = await this.matchPointId(scanData).then(res => res);
         this.cameraStatus = 'auto';
         this.isProcess = false;
         await this.$nextTick();
         if (isMatch) {
            let base64 = await this.screenShot(lensElement).then(res => res);
            this.setLS({ base64 });
            this.openCamera = false;
            this.tempPunch.changeStatus(true);
         }
         this.$addToastr({
            status: isMatch ? 1 : 0,
            msg: isMatch ? '巡點成功' : '巡點失敗'
         });
      },
      matchPointId(id) { //確認qrcode的id是否跟巡點id相同
         return new Promise((resolve) => {
            setTimeout(() => {
               resolve(id === this.tempPunch.pointId.toString());
            }, 1000);
         });
      },
      async screenShot(el) { //截圖
         let canvas = await html2canvas(el).then(res => res);
         return canvas.toDataURL();
      },
      setLS(data) {
         localStorage.setItem(`pointId-${this.tempPunch.pointId}`, JSON.stringify(data));
      }
   },
   async mounted() {
      this.missionId = parseInt(this.$route.params.id);
      this.missionList = await this.getMission().then(res => res);
   },
   watch: {
      $route(newVal) {
         this.missionId = parseInt(newVal.params.id);
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
      padding: 12px 15px;
      background-color: map-get($elBgColor, position);
      color: map-get($fontColor, form);
      >p {
         @include elGutter(margin-bottom, 12px);
      }
   }
}
</style>