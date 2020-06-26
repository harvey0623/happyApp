<template>
<div class="login">
   <LogoBox :isSmall="true"></LogoBox>
   <div class="mycontainer authBox">
      <h1 class="authTitle">會員登入</h1>
      <div class="authBody">
         <div class="formLayout authForm">
            <div class="formRow">
               <div class="formTitle">密碼</div>
               <div class="formContent">
                  <input 
                     type="password" 
                     class="myInput" 
                     placeholder="請輸入密碼">
               </div>
            </div>
         </div>
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
   components: {
      LogoBox
   }
}
</script>

<style lang="scss">

</style>