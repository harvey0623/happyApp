<template>
<div class="organization">
   <Loading v-if="isLoading"></Loading>
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

   <!-- 編輯住戶modal -->
   <b-modal 
      id="editModal" modal-class="mymodal" footer-class="vertical" 
      no-close-on-backdrop @hidden="editHidden">
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>編輯成員</h3>
      </template>
      <template v-if="renterData !== null" v-slot:default>
         <div class="infoBox">
            <img src="https://fakeimg.pl/100x100/" alt="">
            <p class="name">{{ renterData.vName || 'userName' }}</p>
            <p class="phone">{{ renterData.vContact }}</p>
         </div>
         <div class="formLayout">
            <div class="formRow">
               <div class="formTitle">備註</div>
               <div class="formContent">
                  <input 
                     type="text" class="myInput" 
                     placeholder="請輸入備註" v-model="editData.remark">
               </div>
            </div>
         </div>
      </template>
      <template v-slot:modal-footer>
         <button class="btnSure" @click="editHandler">確定</button>
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
      isLoading: false,
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
         this.isLoading = true; 
         return await communityObj.getMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vAccount: this.userInfo.account
         }).then(res => res)
            .finally(() => this.isLoading = false);
      },
      async saveMember() { //修改社區成員資料
         this.isLoading = true;
         return await communityObj.saveMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            iCommunityId: this.editData.iParentId,
            vAccount: this.userInfo.account,
            iId: this.editData.iId,
            iType: this.editData.iType,
            vRemark: this.editData.remark
         }).then(res => res)
            .finally(() => this.isLoading = false);
      },
      editHidden() { //編輯modal的 event
         this.editData = { iId: '', iParentId: '', iType: '', remark: '' };
      },
      editRenter(val) { //編輯住戶
         this.editData.iType = val.iType;
         this.editData.iId = val.iId;
         this.editData.iParentId = val.iParentId;
         this.$bvModal.show('editModal');
      },
      async updateMember() {
         this.communityData = await this.getMember().then(res => res);
      },
      async editHandler() { //編輯住戶
         let { status } = await this.saveMember().then(res => res);
         let isSuccess = status === 1;
         if (isSuccess) {
            await this.updateMember();
            this.$bvModal.hide('editModal');
         }
         this.$swal({
            icon: isSuccess ? 'success' : 'error',
            title: isSuccess ? '修改成功' : '修改失敗'
         });
      }
   },
   async mounted() {
      await this.updateMember();
   },
   components: {
      OrganizeList
   }
}
</script>

<style lang="scss" scoped>
.infoBox {
   @extend %centerFlex;
   flex-direction: column;
   margin-bottom: 20px;
   >* {
      @include elGutter(margin-bottom, 8px);
   }
   >img {
      @include size(60px);
      border-radius: 50%;
   }
   >.name {
      color: map-get($fontColor, sidebar);
      font-size: 18px;
      font-weight: bold;
   }
   >.phone {
      font-size: 12px;
      color: map-get($fontColor, tab);
   }
}
.formLayout {
   margin-bottom: 20px;
}
.remove {
   margin-top: 15px;
   margin-bottom: 0;
   color: map-get($fontColor, header);
}
</style>