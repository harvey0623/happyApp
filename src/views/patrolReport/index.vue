<template src="./index.html"></template>

<script>
import { mapState } from 'vuex';
import securityObj from '@/api/security.js';
const reader = new FileReader();
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
      uploadHandler(evt) {
         let file = evt.target.files[0];
         reader.readAsDataURL(file);
      },
      loadHandler(evt) {
         this.uploadImages.push({ base64: evt.target.result });
         this.resetInputType();
      }
   },
   async mounted() {
      this.setAboutId();
      this.missionList = await this.getMission().then(res => res);
      reader.addEventListener('load', this.loadHandler);
   },
   beforeDestroy() {
      reader.removeEventListener('load', this.loadHandler);
   }
}
</script>
<style lang="scss" scoped src="./index.scss"></style>

