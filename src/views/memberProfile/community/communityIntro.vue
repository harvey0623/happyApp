<template>
<div class="communityDetail">
   <BackBlock title="社區簡介"></BackBlock>
   <div class="intorBox" v-if="detail !== null">
      <div class="imgBox">
         <img :src="detail.vImage" alt="">
      </div>
      <div class="descBox">
         <h3 class="communityName">{{ detail.CommunityName }}</h3>
         <div class="innerBox">
            <p>建設公司 : {{  }}</p>
            <p>建成年度 : {{  }}</p>
            <p>社區總戶數 : {{  }}</p>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
export default {
   name: 'communityDetail',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.communityIntro.title'),
      }
   },
   data: () => ({
      detailId: 0,
      lists: []
   }),
   computed: {
      ...mapState('auth', ['userInfo']),
      detail() {
         if (this.lists.length === 0) return null;
         let result = this.lists.find(item => item.iId === this.detailId);
         if (result !== undefined) return result;
         else return null;
      }
   },
   methods: {
      async getMember() {
         let result = await communityObj.getMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vAccount: this.userInfo.account
         }).then(res => res);
         return result;
      }
   },
   async mounted() {
      this.detailId = parseInt(this.$route.params.id);
      this.lists = await this.getMember().then(res => res);
   }
}
</script>

<style lang="scss" scoped>
.intorBox {
   >.imgBox {
      >img {
      @include size(100%, auto);
      }
   }
   >.descBox {
      padding: 20px 25px;
      >h3 {
         margin-bottom: 20px;
         color: map-get($fontColor, sidebar);
         font-size: 22px;
         font-weight: bold;
      }
      >.innerBox {
         color: map-get($fontColor, form);
         >p {
            @include elGutter(margin-bottom, 15px);
         }
      }
   }
}
</style>