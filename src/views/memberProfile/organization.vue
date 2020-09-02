<template>
<div class="organization">
   <Loading v-if="isLoading"></Loading>
   <ul class="organizeBox">
      <OrganizeList
         v-for="group in groupList"
         :key="group.iParentId"
         :communityName="group.CommunityName"
         :vRoom="group.vRoom"
         :lists="group.lists"
         @updateRenter="showEditModal"
      ></OrganizeList>
   </ul>

   <div class="btnBox center" v-show="hasCommunity">
      <button class="btnSure btnAddMember" @click="showResidentModal">添加成員</button>
   </div>

   <!-- 編輯住戶modal -->
   <b-modal 
      id="editModal" modal-class="mymodal" footer-class="vertical" 
      no-close-on-backdrop @hidden="editModalHidden">
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>編輯成員</h3>
      </template>
      <template v-if="residentData !== null" v-slot:default>
         <div class="infoBox">
            <img src="https://fakeimg.pl/100x100/" alt="">
            <p class="name">{{ residentData.vName || 'userName' }}</p>
            <p class="phone">{{ residentData.vContact }}</p>
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
         <p class="remove" @click="deleteHandler">刪除此成員</p>
      </template>
   </b-modal>

   <!-- 增加住戶 -->
   <b-modal 
      id="residentModal" modal-class="mymodal" footer-class="vertical" 
      no-close-on-backdrop>
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>添加成員</h3>
      </template>
      <template v-slot:default>
         <div class="formLayout">
            <div class="formRow">
               <div class="formTitle">社區單元號</div>
               <div class="formContent">
                  <select class="myInput" v-model="insertData.communityId">
                     <option 
                        v-for="group in groupList"
                        :key="group.iParentId"
                        :value="group.iParentId"
                     >{{ group.CommunityName }}</option>
                  </select>
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">會員帳號</div>
               <div class="formContent">
                  <input type="text" class="myInput" placeholder="請輸入會員帳號">
               </div>
            </div>
            <div class="formRow">
               <div class="formTitle">備註</div>
               <div class="formContent">
                  <input type="text" class="myInput" placeholder="請輸入備註">
               </div>
            </div>
         </div>
      </template>
      <template v-slot:modal-footer>
         <button class="btnSure" @click="insertHandler">確定</button>
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
      },
      insertData: {
         communityId: '',
         account: '',
         remark: ''
      }
   }),
   computed: {
      ...mapState('auth', ['userInfo']),
      hasCommunity() {
         return this.communityData.length > 0;
      },
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
      residentData() { //住戶資料
         if (this.groupList.length === 0) return null;
         let group = this.groupList.find(item => item.iParentId === this.editData.iParentId);
         if (group !== undefined) {
            let obj = group.lists.find(item => item.iId === this.editData.iId);
            if (obj !== undefined) {
               this.editData.remark = obj.vRemark || '';
               return obj;
            } else {
               return null;
            }
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
         }).then(res => res)
      },
      async saveMember() { //修改社區成員資料
         return await communityObj.saveMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            iCommunityId: this.editData.iParentId,
            vAccount: this.userInfo.account,
            iId: this.editData.iId,
            iType: this.editData.iType,
            vRemark: this.editData.remark
         }).then(res => res)
      },
      async deleteMember() { //刪除社區成員
         return await communityObj.deleteMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            iCommunityId: this.editData.iParentId,
            vAccount: this.userInfo.account,
            iId: this.editData.iId,
            iType: this.editData.iType,
         }).then(res => res)
      },
       async addMember() { //增加社區成員
         return await communityObj.addMember({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iCommunityId: this.insertData.communityId,
            vRoom: '',
            vAccount: this.userInfo.account,
            iType: 2,
            vRemark: ''
         }).then(res => {
            return res;
         });
      },
      editModalHidden() { //編輯modal的 event
         this.editData = { iId: '', iParentId: '', iType: '', remark: '' };
      },
      showEditModal(val) {
         this.editData.iType = val.iType;
         this.editData.iId = val.iId;
         this.editData.iParentId = val.iParentId;
         this.$bvModal.show('editModal');
      },
      showResidentModal() {
         this.$bvModal.show('residentModal');
      },
      async updateMember() {
         this.communityData = await this.getMember().then(res => res);
      },
      async editHandler() {
         this.isLoading = true;
         let { status } = await this.saveMember().then(res => res);
         this.responseHandler(status);
         this.isLoading = false;
      },
      async deleteHandler() {
         this.isLoading = true;
         let { status } = await this.deleteMember().then(res => res);
         this.responseHandler(status);
         this.isLoading = false;
      },
      async insertHandler() {
         this.isLoading = true;
         let { status } = await this.addMember().then(res => res);
         this.responseHandler(status);
         this.isLoading = false;
      },
      async responseHandler(status) {
         let isSuccess = status === 1;
         if (isSuccess) {
            await this.updateMember();
            this.$bvModal.hide('editModal');
            this.$bvModal.hide('residentModal');
         }
         this.$swal({
            icon: isSuccess ? 'success' : 'error',
            title: isSuccess ? '修改成功' : '修改失敗'
         });
      }
   },
   async mounted() {
      this.isLoading = true;
      await this.updateMember();
      this.insertData.communityId = this.hasCommunity ? this.communityData[0].iParentId : '';
      this.isLoading = false;
   },
   components: {
      OrganizeList
   }
}
</script>

<style lang="scss" scoped src="./organization.scss"></style>