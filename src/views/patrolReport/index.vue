<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import securityObj from '@/api/security.js';
import ReportThumb from '@/components/ReportThumb/index.vue';
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
      question: '',
      uploadImages: []
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
      setAboutId() {
         let { missionId, pointId } = this.$route.params;
         this.idGroup = {
            missionId: parseInt(missionId), 
            pointId: parseInt(pointId)
         };
      },
      resetInputType() {
         this.$refs.fileInput.type = 'text';
         this.$refs.fileInput.type = 'file';
      },
      async uploadHandler(evt) { //上傳檔案
         let files = Array.from(evt.target.files);
         this.resetInputType();
         if (files.length === 0) return;
         for (let i = 0; i < files.length; i++) {
            let base64 = await this.generateBase64(files[i]).then(res => res);
            this.uploadImages.push({
               timestamp: Date.now(),
               base64
            });
         }
      },
      generateBase64(file) { //產生base64
         return new Promise((resolve) => {
            let reader = new FileReader();
            reader.addEventListener('load', (evt) => {
               resolve(evt.target.result);
            });
            reader.readAsDataURL(file);
         });
      },
      removeUpload(timestamp) {
         let index = this.uploadImages.find(item => item.timestamp === timestamp);
         if (index !== -1) {
            this.uploadImages.splice(index, 1);
         }
      }
   },
   async mounted() {
      this.setAboutId();
      this.missionList = await this.getMission().then(res => res);
   },
   components: {
      ReportThumb
   }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>

