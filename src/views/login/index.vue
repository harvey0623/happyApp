<template>
<div class="login">
   <LogoBox :isSmall="true"></LogoBox>
   <div class="mycontainer authBox">
      <h1 class="authTitle">會員登入</h1>
      <div class="authBody">
         <div class="formLayout authForm">
            <div class="formRow">
               <div class="formTitle">帳號</div>
               <div class="formContent phoneContent">
                  <select class="myInput">
                     <option value="886">+886</option>
                  </select>
                  <input type="text" class="myInput" placeholder="請輸入手機號碼">
               </div>
            </div>
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
         <div class="settingBox">
            <label>
               <input type="checkbox" class="keepCheckbox">
               <span>記住我</span>
            </label>
            <router-link to="/">忘記密碼?</router-link>
         </div>
         <div class="btnBox center">
            <button class="btnAuth">登入</button>
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
$color: map-get($fontColor, form);
.settingBox {
   @extend %bwtFlex;
   margin-top: 25px;
   margin-bottom: 0;
   font-size: 14px;
   color: $color;
   >a {
      color: $color;
   }
}
</style>