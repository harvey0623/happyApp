<template>
<div class="organization">
   <ul clas="organizeBox">
      <OrganizeList
         v-for="group in groupList"
         :key="group.iParentId"
         :communityName="group.CommunityName"
         :vRoom="group.vRoom"
         :lists="group.lists"
      ></OrganizeList>
   </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
import OrganizeList from '@/components/OrganizeList/index.vue';
export default {
   name: 'organization',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.organization.title'),
      }
   },
   data: () => ({
      communityData: []
   }),
   computed: {
      ...mapState('auth', ['userInfo']),
      groupList() { //分類社區列表
         return this.communityData.reduce((prev, current) => {
            let { iParentId, CommunityName, vRoom, RoomDetail } = current;
            let obj = prev.find(item => item.iParentId === iParentId);
            if (obj === undefined) {
               prev.push({ iParentId, CommunityName, vRoom, lists: RoomDetail });
            } else {
               obj.lists = obj.lists.concat(RoomDetail);
            }
            return prev;
         }, []);
      }
   },
   methods: {
      async getMember() { //取得社區資料及組織成員
         return await communityObj.getMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vAccount: this.userInfo.account
         }).then(res => res);
      },
   },
   async mounted() {
      this.communityData = await this.getMember().then(res => res);
   },
   components: {
      OrganizeList
   }
}
</script>