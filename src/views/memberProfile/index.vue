<template>
<div class="memberProfile">
   <BackBlock title="會員資料"></BackBlock>
   <div class="mycontainer vertical">
      <div class="communityInfo">
         <p class="communityName">{{ communityName }}</p>
         <p class="room">{{ room }}</p>
         <p class="account">帳號 {{ account }}</p>
      </div>
      <ProfileTab></ProfileTab>
   </div>
   <div class="mycontainer">
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import ProfileTab from '@/components/ProfileTab/index.vue';
export default {
   name: 'memberProfile',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.memberProfile.title'),
      }
   },
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetCommunity() {
         if (this.userInfo === null) return null;
         return this.userInfo.community.find(item => item.iId === this.userCommunity);
      },
      communityName() {
         if (this.targetCommunity === null) return '';
         return this.targetCommunity.vName;
      },
      room() {
         if (this.targetCommunity === null) return '';
         return this.targetCommunity.room;
      },
      account() {
         if (this.targetCommunity === null) return '';
         return this.userInfo.account;
      }
   },
   components: {
      ProfileTab
   }
}
</script>

<style lang="scss" scoped>
.communityInfo {
   margin-bottom: 25px;
   text-align: center;
   >p {
      @include elGutter(margin-bottom, 8px);
      &.communityName {
         color: map-get($fontColor, sidebar);
         font-weight: bold;
         font-size: 20px;
      }
      &.room {
         color: map-get($fontColor, arrow);
         font-size: 16px;
      }
      &.account {
         color: map-get($fontColor, tab);
         font-size: 18px;
      }
   }
}
</style>