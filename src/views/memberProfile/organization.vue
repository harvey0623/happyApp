<template>
<div class="organization">
   <ul clas="organizeBox">
      <OrganizeList
         v-for="group in groupList"
         :key="group.iParentId"
         :communityName="group.CommunityName"
         :vRoom="group.vRoom"
         :lists="group.lists"
         @updateRenter="editRenter"
      ></OrganizeList>
   </ul>

   <b-modal 
      id="editModal" modal-class="mymodal" 
      footer-class="vertical" no-close-on-backdrop>
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>編輯成員</h3>
      </template>
      <template v-slot:default>
         
      </template>
      <template v-slot:modal-footer>
         <button class="btnSure">確定</button>
         <p class="remove">刪除此成員</p>
      </template>
   </b-modal>
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
      communityData: [],
      editData: {
         iId: '',
         iParentId: '',
         iType: '',
         remark: ''
      }
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
      },
      renterData() { //人員資料
         if (this.groupList.length === 0) return null;
         let group = this.groupList.find(item => item.iParentId === this.editData.iParentId);
         if (group !== undefined) {
            let obj = group.lists.find(item => item.iId === this.editData.iId);
            this.editData.remark = obj.vRemark || '';
            return obj;
         } else {
            return null;
         }
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
      async saveMember() { //修改社區成員資料
         return await communityObj.getMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vAccount: this.userInfo.account
         }).then(res => res);
      },
      editRenter(val) {
         this.editData.iType = val.iType;
         this.editData.iId = val.iId;
         this.editData.iParentId = val.iParentId;
      }
   },
   async mounted() {
      this.$bvModal.show('editModal');
      this.communityData = await this.getMember().then(res => res);
   },
   components: {
      OrganizeList
   }
}
</script>

<style lang="scss" scoped>
.remove {
   color: map-get($fontColor, header);
}
</style>