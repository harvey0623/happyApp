<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import securityObj from '@/api/security.js';
import ReportThumb from '@/components/ReportThumb/index.vue';
import LightBox from '@/components/LightBox/index.vue';
import { computeHeightAndMargins } from '@fullcalendar/vue';
export default {
   name: 'patrolReport',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.patrolReport.title'),
      }
   },
   data: () => ({
      currentMode: 1,
      missionList: [],
      question: '',
      uploadImages: [],
      isUpload: false,
      showLightBox: false,
      previewIndex: null,
      nofill: false,
      isLoading: false,
      modeList: [
         { title: '正常', value: 1 },
         { title: '異常', value: 0 },
      ],
      idGroup: {
         missionId: 0,
         pointId: 0
      },
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
      },
      totalUpload() {
         return this.uploadImages.length;
      },
      targetUpload() {
         return this.uploadImages[this.previewIndex];
      },
      lightBoxTimestamp() {
         if (this.targetUpload === undefined) return 0;
         else return this.targetUpload.timestamp;
      },
      lightBoxImageUrl() {
         if (this.targetUpload === undefined) return '';
         else return this.targetUpload.base64;
      }
   },
   methods: {
      async getMission() { //取得任務
         return await securityObj.getMission({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iSecurityId: 2,
            iCommunityId: this.userCommunity
         }).then(res => {
            return res;
         })
      },
      async uploadMission(payload) {
         this.isLoading = true;
         return await securityObj.uploadMission({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iSecurityId: 2,
            log: [{
               vCode: `2|${this.idGroup.missionId}|${this.idGroup.pointId}`,
               vMessage: this.question,
               iDateTime: Math.floor(Date.now() / 1000).toFixed(0),
               vMissionImage: payload
            }]
         }).then(res => res)
            .finally(() => this.isLoading = false)
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
      checkIsImageFile(files) { //檢查是否為圖片檔
         return files.every(file => file.type.includes('image/'));
      },
      async uploadHandler(evt) { //上傳檔案
         let files = Array.from(evt.target.files);
         let isImageFile = this.checkIsImageFile(files);
         this.resetInputType();
         if (!isImageFile) {
            this.$addToastr({ status: 0, msg: '上傳檔案需為圖片檔' });
            return;
         }
         this.isUpload = true;
         for (let i = 0; i < files.length; i++) {
            let base64 = await this.generateBase64(files[i]).then(res => res);
            this.uploadImages.push({
               timestamp: Date.now() + (i * 10),
               base64
            });
         }
         this.isUpload = false;
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
         let index = this.uploadImages.findIndex(item => item.timestamp === timestamp);
         if (index !== -1) this.uploadImages.splice(index, 1);
      },
      previewHandler(timestamp) {
         this.previewIndex = this.uploadImages.findIndex(item => item.timestamp === timestamp);
         this.showLightBox = true;
      },
      changeDirection(num) {
         this.previewIndex = (this.previewIndex + num + this.totalUpload) % this.totalUpload;
      },
      setBodyOverflow(val) {
         document.body.style.overflow = val;
      },
      getScanBase64() { //取得掃描qrcode的base64
         let lsData = localStorage.getItem(`pointId-${this.idGroup.pointId}`);
         let base64 = lsData === null ? '' : JSON.parse(lsData).base64;
         if (base64 !== '') {
            this.uploadImages.push({
               timestamp: Date.now(),
               base64
            });
         }
      },
      async reportHandler() {
         if (this.question === '') {
            this.nofill = true;
            return;
         }
         let base64Data = this.uploadImages.map((item) => ({ vImage: item.base64 }));
         let reportResult = await this.uploadMission(base64Data).then(res => res);
         let isOk = reportResult.status === 1;
         this.$addToastr({ 
            status: isOk ? 1 : 0, 
            msg: isOk ? '回報成功' : '回報失敗' 
         });
      }
   },
   async mounted() {
      this.setAboutId();
      this.getScanBase64();
      this.missionList = await this.getMission().then(res => res);
   },
   watch: {
      question(val) {
         this.nofill = val === '';
      },
      showLightBox(val) {
         let styleVal = val ? 'hidden' : '';
         this.setBodyOverflow(styleVal);
      }
   },
   beforeDestroy() {
      this.setBodyOverflow('');
   },
   components: {
      ReportThumb,
      LightBox
   }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>

