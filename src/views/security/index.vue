<template>
<div class="security">
   <CharacterInfo></CharacterInfo>
   <div class="mycontainer">
      <div class="punchBox">
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
               <router-link to="/" class="workItem">
                  <span>工作任務</span>
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
import CharacterInfo from '@/components/CharacterInfo/index.vue';
export default {
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.security.title'),
      }
   },
   components: {
      CharacterInfo
   }
}
</script>

<style lang="scss" src="./index.scss"></style>