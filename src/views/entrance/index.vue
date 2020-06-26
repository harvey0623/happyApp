<template>
<div class="entrance">
   <LogoBox></LogoBox>
   <div class="directBox">
      <router-link to="/" class="btnLogin">登入</router-link>
      <router-link to="/" class="outline-signIn">註冊</router-link>
   </div>
</div>
</template>

<script>
import LogoBox from '@/components/LogoBox/index.vue';
export default {
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.entrance.title'),
      }
   },
   components: {
      LogoBox
   }
}
</script>

<style lang="scss">
.entrance {
   padding-bottom: 30px;
}

.directBox {
   max-width: 280px;
   margin: 0 auto;
   >a {
      display: block;
      @include size(100%, 42px);
      @include elGutter(margin-bottom, 15px);
      font-weight: bold;
   }
   .btnLogin {
      line-height: 42px;
   }
   .outline-signIn {
      line-height: 40px;
      &:focus,
      &:hover {
         color: #fff;
      }
   }
}
</style>