<template>
<div class="communityInfoPage">
   <div class="listBox">
      <communityList
         v-for="list in communityList"
         :key="list.iId"
         :detail="list"
      ></communityList>
   </div>
   <div class="btnBox center" v-show="hasData">
      <button class="btnSure">社區入住申請</button>
   </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
import CommunityList from '@/components/CommunityList/index.vue';
export default {
   name: 'communityInfo',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.communityInfo.title'),
      }
   },
   data: () => ({
      lists: []
   }),
   computed: {
      ...mapState('auth', ['userInfo']),
      communityList() {
         return this.lists.reduce((prev, current) => {
            let { vCity, vArea, vAddress } = current;
            prev.push({
               ...current,
               fullAddress: `${vCity || ''}${vArea || ''}${vAddress || ''}`
            });
            return prev;
         }, []);
      },
      hasData() { //是否有資料
         return this.communityList.length > 0;
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
      this.lists = await this.getMember().then(res => res);
   },
   components: {
      CommunityList
   }
}
</script>

<style lang="scss" scoped>
.listBox {
   margin-bottom: 40px;
}
.btnBox {
   margin-bottom: 15px;
   >.btnSure {
      width: 250px;
   }
}
</style>