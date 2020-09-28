<template>
<div class="fixPassword">
   <Loading v-if="isLoading"></Loading>
   <div class="mycontainer authBox">
      <h1 class="authTitle">修改密碼</h1>
      <div class="authBody">
         <ValidationObserver tag="div" class="formLayout" ref="form">
            <div class="formRow">
               <div class="formTitle">密碼*</div>
               <ValidationProvider 
                  class="formContent" tag="div" vid="confirm"
                  rules="required|password" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput" 
                     placeholder="請輸入含英文及數字，長度6~10碼"
                     v-model.trim="user.password">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider>
            </div>
            <div class="formRow">
               <div class="formTitle">再次輸入密碼*</div>
               <ValidationProvider 
                  class="formContent" tag="div" 
                  rules="required|samePw:confirm" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput" 
                     placeholder="請再次輸入密碼"
                     v-model.trim="user.confirmPw">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
         </ValidationObserver>
         <div class="btnBox center">
            <button class="btnAuth" @click="fixHandler">修改密碼</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
   name: 'register',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.fixPassword.title'),
      }
   },
   data: () => ({
      user: {
         password: '',
         confirmPw: ''
      },
      isLoading: false
   }),
   methods: {
      ...mapActions('auth', ['fixPassword']),
      async fixHandler() {
         let isValid = await this.$refs.form.validate().then(res => res);
         if (!isValid) return;
         this.isLoading = true;
         let { status, message } = await this.fixPassword({
            password: this.user.password,
            confirmPw: this.user.confirmPw
         }).then(res => {
            return res;
         }).finally(() => {
            this.isLoading = false
         });
         let isOk = status === 1;
         this.$swal({
            icon: isOk ? 'success' : 'error',
            title: message
         });
         if (isOk) this.$router.replace('/login');
      }
   }
}
</script>