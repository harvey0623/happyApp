<template>
<div class="login">
   <LogoBox :isSmall="true"></LogoBox>
   <div class="mycontainer authBox">
      <h1 class="authTitle">會員登入</h1>
      <div class="authBody">
         <ValidationObserver tag="div" class="formLayout authForm" ref="form">
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
                        type="text" 
                        class="myInput" 
                        placeholder="請輸入手機號碼"
                        v-model="user.phone">
                     <span 
                        class="validate-error" 
                        v-show="errors.length !== 0"
                     >{{ errors[0] }}</span>
                  </ValidationProvider>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">密碼</div>
               <ValidationProvider 
                  class="formContent" tag="div" 
                  rules="required|password" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput" 
                     placeholder="請輸入密碼"
                     v-model="user.password">
                  <span 
                     class="validate-error"
                     v-show="errors.length !== 0"
                  >{{ errors[0] }}</span>
               </ValidationProvider >
            </div>
         </ValidationObserver>
         <div class="settingBox">
            <label>
               <input type="checkbox" class="keepCheckbox" v-model="user.keep">
               <span>記住我</span>
            </label>
            <router-link to="/">忘記密碼?</router-link>
         </div>
         <div class="btnBox center">
            <button class="btnAuth" @click="loginHandler">登入</button>
         </div>
      </div>
      <div class="luckyTip">
         還沒有家幸福帳號? 
         <router-link to="/register">立即註冊</router-link>
      </div>
   </div>
</div>
</template>

<script>
import LogoBox from '@/components/LogoBox/index.vue';
export default {
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.login.title'),
      }
   },
   data: () => ({
      areaCode: ['+886', '+86'],
      code: '+886',
      user: {
         phone: '',
         password: '',
         keep: false
      }
   }),
   computed: {
      phoneRule() {
         let ruleObj = { '+886': 'mobileTw', '+86': 'mobileCn' };
         return ruleObj[this.code];
      }
   },
   methods: {
      async loginHandler() {
         let isValid = await this.$refs.form.validate().then(res => res);
         if (!isValid) return;
      }
   },
   components: {
      LogoBox
   }
}
</script>

<style lang="scss" src="./index.scss"></style>