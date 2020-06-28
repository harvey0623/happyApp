<template>
<div class="forgotPw">
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
               <button 
                  class="outline-verify" 
                  @click="sendHandler"
               >寄送驗證碼</button>
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
                     v-model="user.msg">
                  <span class="errMsg" v-show="errors.length !== 0">
                     {{ errors[0] }}
                  </span>
               </ValidationProvider >
            </div>
         </ValidationObserver>
         <div class="btnBox center">
            <button class="btnAuth" @click="suerHandler">確定</button>
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
         msg: ''
      },
   }),
   computed: {
      phoneRule() {
         let ruleObj = { '+886': 'mobileTw', '+86': 'mobileCn' };
         return ruleObj[this.code];
      }
   },
   methods: {
      async sendHandler() {
         let isValid = await this.$refs.verifyForm.validate().then(res => res);
         if (!isValid) return;
      },
      async suerHandler() {
         let isValid = await this.$refs.msgForm.validate().then(res => res);
         if (!isValid) return;
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