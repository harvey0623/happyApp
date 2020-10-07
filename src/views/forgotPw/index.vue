<template>
<div class="forgotPw">
   <Loading v-if="isLoading"></Loading>
   <div class="mycontainer authBox">
      <h1 class="authTitle">忘記密碼</h1>
      <div class="authBody">
         <ValidationObserver tag="div" class="formLayout verifyForm" ref="verifyForm">
            <div class="formRow">
               <div class="formTitle">帳號</div>
               <div class="formContent phoneContent">
                  <select class="myInput" v-model="code">
                     <option v-for="item in areaCode" :key="item" :value="item">
                        {{ item }}
                     </option>
                  </select>
                  <ValidationProvider 
                     class="outer" tag="div" 
                     :rules="`required|${phoneRule}`" v-slot="{ errors }"> 
                     <input 
                        type="number" 
                        class="myInput"
                        placeholder="請輸入手機號碼"
                        v-model.trim="user.phone">
                     <span class="errMsg" v-show="errors.length !== 0">
                        {{ errors[0] }}
                     </span>
                  </ValidationProvider>
               </div>
            </div>
            <div class="formRow">
               <button class="outline-verify" @click="sendHandler">寄送驗證碼</button>
            </div>
         </ValidationObserver>
         <ValidationObserver tag="div" class="formLayout" ref="msgForm">
            <div class="formRow">
               <div class="formTitle">簡訊驗證碼</div>
               <ValidationProvider 
                  class="formContent" tag="div" 
                  rules="required" v-slot="{ errors }">
                  <input 
                     type="password"
                     class="myInput" 
                     placeholder="請輸入簡訊驗證碼"
                     v-model.trim="user.msg">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
         </ValidationObserver>
         <div class="btnBox center">
            <button class="btnAuth" @click="confirmHandler">確定</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { constrainPoint } from '@fullcalendar/vue';
import { mapState, mapActions } from 'vuex';
export default {
   name: 'forgotPw',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.register.title'),
      }
   },
   data: () => ({
      areaCode: ['+886', '+86'],
      code: '+886',
      user: {
         phone: '',
         msg: ''
      },
      isLoading: false
   }),
   computed: {
      ...mapState('auth', ['forgotUser']),
      phoneRule() {
         let ruleObj = { '+886': 'mobileTw', '+86': 'mobileCn' };
         return ruleObj[this.code];
      }
   },
   methods: {
      ...mapActions('auth', ['sendSMS', 'checkCode']),
      async sendHandler() { //寄送驗證碼
         let isValid = await this.$refs.verifyForm.validate().then(res => res);
         if (!isValid) return;
         let smsResult = await this.sendSMS({ vAccount: this.user.phone }).then(res => res);
         this.$addToastr({
            status: smsResult ? 1: 0,
            msg: smsResult ? '簡訊已寄送': '請重新輸入電話碼'
         });
      },
      isSendedSMS() {
         let result = this.forgotUser !== null;
         if (!result) this.$addToastr({ status: 0, msg: '請先取得簡訊驗證碼' });
         return result;
      },
      async confirmHandler() { //確認驗證碼
         if (!this.isSendedSMS()) return;
         let isValid = await this.$refs.msgForm.validate().then(res => res);
         if (!isValid) return;
         this.isLoading = true;
         let { status, message } = await this.checkCode({ 
            vVerification: this.user.msg
         }).then(res => {
            return res;
         }).finally(() => {
            this.isLoading = false;
         });
         let isOk = status === 1;
         this.$addToastr({ status: isOk ? 1 : 0, msg: message });
         if (isOk) this.$router.push('/fixPassword');
      }
   }
}
</script>

<style lang="scss">
.verifyForm {
   margin-bottom: 30px;
}

.formRow {
   .outline-verify {
      min-width: 120px;
   }
}
</style>