<template>
<div class="workInfo">
   <BackBlock title="我的工作資料"></BackBlock>
   <div class="mycontainer vertical">
      <div class="companyInfo">
         <p class="nameBlock companyName">{{ companyName }}</p>
         <p class="nameBlock communityName">{{ communityName }}</p>
      </div>
      <div class="laborInfo">
         <div class="formLayout">
            <div class="formRow">
               <div class="formTitle">帳號</div>
               <div class="formContent">
                  <input type="text" class="myInput" v-model="account" readonly>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">姓名</div>
               <div class="formContent">
                  <input type="text" class="myInput" v-model="userName" readonly>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">Email</div>
               <div class="formContent">
                  <input type="email" class="myInput" v-model="email">
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">電話</div>
               <div class="formContent">
                  <input type="number" class="myInput" v-model="phone" readonly>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">身分證號</div>
               <div class="formContent">
                  <input type="text" class="myInput" readonly>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">工號</div>
               <div class="formContent">
                  <input type="text" class="myInput" v-model="jobNumber" readonly>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import modifyUser from '@/store/modules/modifyUser.js';
export default {
   name: 'worlInfo',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.workInfo.title'),
      }
   },
   computed: {
      ...mapState('auth', ['userInfo']),
      ...mapState('modifyUser', { tempUserInfo: 'userInfo' }),
      account() {
         if (this.userInfo === null) return '';
         return this.userInfo.account;
      },
      securityData() {
         if (this.userInfo === null) return null;
         return this.userInfo.security[0];
      },
      companyName() {
         if (this.securityData === null) return '';
         return this.securityData.vName;
      },
      communityName() {
         if (this.securityData === null) return '';
         return this.securityData.communityInfo[0].communityName;
      },
      tempSecurity() {
         return this.tempUserInfo.security[0];
      },
      userName: {
         get() {
            return this.tempSecurity.name;
         },
         set(val) {
            this.fixItem({ key: 'name', value: val });
         }
      },
      email: {
         get() {
            return this.tempSecurity.email || '';
         },
         set(val) {
            this.fixItem({ key: 'email', value: val });
         }
      },
      phone: {
         get() {
            return this.tempSecurity.contact || '';
         },
         set(val) {
            this.fixItem({ key: 'concat', value: val });
         }
      },
      jobNumber: {
         get() {
            return this.tempSecurity.job_number || '';
         },
         set(val) {
            this.fixItem({ key: 'job_number', value: val });
         }
      },
   },
   methods: {
      ...mapMutations('modifyUser', ['fixUserInfo', 'fixItem']),
   },
   created() {
      if (!this.$hasStoreModule('modifyUser')) {
         this.$store.registerModule('modifyUser', modifyUser());
         this.fixUserInfo(JSON.parse(JSON.stringify(this.userInfo)));
      }
   },
   beforeDestroy() {
      if (this.$hasStoreModule('modifyUser')) {
         this.$store.unregisterModule('modifyUser');
      }
   }
}
</script>

<style lang="scss" scoped>
.companyInfo {
   margin-bottom: 30px;
   >.nameBlock {
      text-align: center;
      font-size: 18px;
      &.companyName {
         margin-bottom: 5px;
         color: map-get($fontColor, sidebar);
         font-weight: bold;
      }
      &.communityName {
         color: map-get($fontColor, header);
      }
   }
}

.laborInfo {
   padding-left: 22px;
   padding-right: 22px;
}
</style>