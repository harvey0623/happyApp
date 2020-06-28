<template>
<div class="register">
   <div class="mycontainer authBox">
      <h1 class="authTitle">會員註冊</h1>
      <div class="authBody">
         <ValidationObserver tag="div" class="formLayout" ref="form">
            <div class="formRow">
               <div class="formTitle">帳號*</div>
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
                     <span class="errMsg" v-show="errors.length !== 0">
                        {{ errors[0] }}
                     </span>
                  </ValidationProvider>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">姓名*</div>
               <ValidationProvider 
                  class="formContent" tag="div" 
                  rules="required" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput"
                     placeholder="請輸入名稱"
                     v-model="user.name">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
            <div class="formRow">
               <div class="formTitle">Email*</div>
               <ValidationProvider 
                  class="formContent" tag="div" 
                  rules="required|email" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput"
                     placeholder="請輸入電子信箱"
                     v-model="user.email">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
            <div class="formRow">
               <div class="formTitle">密碼*</div>
               <ValidationProvider 
                  class="formContent" tag="div" vid="confirm"
                  rules="required|password" v-slot="{ errors }">
                  <input 
                     type="password" 
                     class="myInput" 
                     placeholder="請輸入含英文及數字，長度6~10碼"
                     v-model="user.password">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
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
                     v-model="user.confirmPw">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
         </ValidationObserver>
         <div class="btnBox center">
            <button class="btnAuth" @click="clickHandler">註冊</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
export default {
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
         name: '',
         email: '',
         password: '',
         confirmPw: ''
      }
   }),
   computed: {
      phoneRule() {
         let ruleObj = { '+886': 'mobileTw', '+86': 'mobileCn' };
         return ruleObj[this.code];
      }
   },
   methods: {
      async clickHandler() {
         let isValid = await this.$refs.form.validate().then(res => res);
         if (!isValid) return;
      }
   }
}
</script>