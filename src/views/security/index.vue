<template>
<div class="security">
   <CharacterInfo></CharacterInfo>
   <QrcodeReader
      v-if="openCamera"
      :openCamera.sync="openCamera"
      :cameraStatus.sync="cameraStatus"
      :isProcess="isProcess"
      @scan="scanHandler"
   ></QrcodeReader>
   <div class="mycontainer">
      <div class="punchBox" @click="punchHandler">
         <img :src="require('@/assets/img/punch.svg')" alt="">
         <span>上下班打卡</span>
      </div>
      <div class="workBox">
         <p class="title">工作項目</p>
         <div class="workContent">
            <div class="workRow split">
               <div class="workItem">
                  <img :src="require('@/assets/img/record.svg')" alt="">
                  <span>手動簽收</span>
               </div>
               <router-link to="/" class="workItem">
                  <img :src="require('@/assets/img/seeHouse.svg')" alt="">
                  <span>包裹相關</span>
               </router-link>
            </div>
            <div class="workRow">
               <router-link :to="{ name: 'workMission' }" class="workItem">
                  <span>工作任務</span>
                  <div class="imgBox">
                     <img :src="require('@/assets/img/task.svg')" alt="">
                  </div>
               </router-link>
            </div>
         </div>
      </div>
      <div class="workBox">
         <p class="title">我的紀錄</p>
         <div class="workContent">
            <div class="workRow">
               <router-link :to="{ name: 'workRecord' }" class="workItem small">
                  <span>工作紀錄</span>
                  <div class="imgBox">
                     <img :src="require('@/assets/img/record.svg')" alt="">
                  </div>
               </router-link>
            </div>
            <div class="workRow">
               <router-link :to="{ name: 'workSchedule' }" class="workItem small">
                  <span>我的班表</span>
                  <div class="imgBox">
                     <img :src="require('@/assets/img/shift.svg')" alt="">
                  </div>
               </router-link>
            </div>
            <div class="workRow">
               <router-link to="/" class="workItem small">
                  <span>請假事項</span>
                  <div class="imgBox">
                     <img :src="require('@/assets/img/task.svg')" alt="">
                  </div>
               </router-link>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import CharacterInfo from '@/components/CharacterInfo/index.vue';
import QrcodeReader from '@/components/QrcodeReader/index.vue';
import securityObj from '@/api/security.js';
export default {
   name: 'security',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.security.title'),
      }
   },
   data: () => ({
      openCamera: false,
      cameraStatus: 'auto',
      isProcess: false
   }),
   computed: {
      ...mapState('auth', ['userInfo'])
   },
   methods: {
      punchHandler() {
         this.openCamera = true;
      },
      async uploadAttendance(payload) {
         return await securityObj.uploadAttendance({
            iUserId: this.userInfo.user_id,
	         vToken: this.userInfo.token,
            iSecurityId: 2,
            log: [payload]
         }).then(res => {
            if (res === '') throw new Error();
            return res;
         }).catch(err => { 
            return { status: 0 };
         });
      },
      async scanHandler({ scanData }) {
         this.cameraStatus = 'off';
         this.isProcess = true;
         let { status } = await this.uploadAttendance({ vCode: scanData }).then(res => res);
         let isOk = status === 1;
         this.openCamera = false;
         this.cameraStatus = 'auto';
         this.isProcess = false;
         this.$swal({
            icon: isOk ? 'success' : 'error',
            title: isOk ? '打卡成功' : '打卡失敗'
         });
      }
   },
   components: {
      CharacterInfo,
      QrcodeReader
   },
}
</script>

<style lang="scss" src="./index.scss"></style>