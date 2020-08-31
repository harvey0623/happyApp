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
      <button class="btnSure" @click="showApplyModal">社區入住申請</button>
   </div>

   <ApplyModal
      :modalId="modalId"
      :vCity.sync="position.city"
      :vArea.sync="position.area"
      :apartmentId.sync="apartmentData.id"
      :apartmentList="apartmentData.lists"
      :floor.sync="houseInfo.floor"
      :dong.sync="houseInfo.doing"
      :number1.sync="houseInfo.number1"
      :number2.sync="houseInfo.number2"
      :room.sync="houseInfo.room"
      :unit.sync="houseInfo.unit"
   ></ApplyModal>
   
</div>
</template>

<script>
import { mapState } from 'vuex';
import communityObj from '@/api/community.js';
import CommunityList from '@/components/CommunityList/index.vue';
import ApplyModal from '@/components/Modal/ApplyModal.vue';
export default {
   name: 'communityInfo',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.communityInfo.title'),
      }
   },
   data: () => ({
      lists: [],
      modalId: 'apply',
      apartmentData: {
         id: 0,
         lists: []
      },
      position: {
         city: '新北市',
         area: '土城區'
      },
      houseInfo: {
         floor: '',
         dong: '',
         number1: '',
         number2: '',
         room: '',
         unit: ''
      }
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
      showApplyModal() { //顯示申請modal
         this.$bvModal.show(this.modalId);
      },
      async getMember() { //取得社區資料及組織成員
         return await communityObj.getMember({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vAccount: this.userInfo.account
         }).then(res => res);
      },
      async getCommunityList() {
         return await communityObj.getCommunityList({
            iUserId: this.userInfo.user_id,
            vToken : this.userInfo.token,
            vCity: this.position.city,
            vArea: this.position.area
         }).then(res => res)
      },
      async getApartment() {
         this.apartmentData.lists = await this.getCommunityList().then(res => res);
         this.apartmentData.id = this.apartmentData.lists.length > 0 ? 
            this.apartmentData.lists[0].iId : 0;
      }
   },
   async mounted() {
      this.showApplyModal();
      this.lists = await this.getMember().then(res => res);
      await this.getApartment();
   },
   watch: {
      position: {
         deep: true,
         async handler(val) {
            await this.getApartment();
         }
      }
   },
   components: {
      CommunityList,
      ApplyModal
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