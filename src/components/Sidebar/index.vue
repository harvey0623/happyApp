<template>
<div class="sidebar">
   <div class="sidebarHead"></div>
   <div class="sidebarBody">
      <SidebarItem
         v-for="item in sideBarMenu"
         :key="item.id"
         :id="item.id"
         :title="item.title"
         :iconClass="item.iconClass"
         :isSlideDown="item.isSlideDown"
         :children="item.children"
         @update="updateSlide"
      ></SidebarItem>
      <div class="sidebarItem" @click="logoutHandler">
         <div class="itemTop">
            <i class="fal fa-sign-out-alt featureIcon"></i>
            <span>登出</span>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import SidebarItem from '@/components/Sidebar/SidebarItem.vue';
export default {
   data: () => ({
      sideBarMenu: [
         {
            id: 'group1',
            title: '會員資料',
            iconClass: 'fal fa-user',
            isSlideDown: false,
            children: [
               { title: '我的資料', href: '/' },
               { title: '組織成員', href: '/' }
            ]
         },
         {
            id: 'group2',
            title: '社區相關',
            iconClass: 'fal fa-home',
            isSlideDown: false,
            children: [
               { title: '社區簡介', href: '/' },
               { title: '社區訊息', href: '/' },
               { title: '社區設施', href: '/' },
               { title: '社區行事曆', href: '/' }
            ]
         },
         {
            id: 'group3',
            title: '生活相關',
            iconClass: 'fal fa-hand-holding-heart',
            isSlideDown: false,
            children: [
               { title: '費用代轉', href: '/' },
               { title: '費用繳交', href: '/' },
               { title: '郵政項目', href: '/' },
            ]
         },
      ]
   }),
   methods: {
      updateSlide(data) { //更新選單收合狀態
         this.sideBarMenu.forEach(item => {
            if (item.id === data.id) item.isSlideDown = data.status;
            else item.isSlideDown = false;
         });
      },
      async logoutHandler() { //登出
         await this.$store.dispatch('auth/doLogout');
         this.$router.replace('/entrance');
         this.$store.commit('setMenuOpen', false);
      }
   },
   components: {
      SidebarItem
   }
}
</script>

<style lang="scss" src="./index.scss"></style>