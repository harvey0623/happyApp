<template>
<div class="communityInfoPage">
   <div class="listBox">
      <communityList
         v-for="list in communityList"
         :key="list.iId"
         :detail="list"
      ></communityList>
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