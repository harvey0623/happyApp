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
      :dong.sync="houseInfo.dong"
      :number1.sync="houseInfo.number1"
      :number2.sync="houseInfo.number2"
      :room.sync="houseInfo.room"
      :unit.sync="houseInfo.unit"
      :fullAddress="fullAddress"
      @add="addHandler"
   ></ApplyModal>
   <Loading v-show="isLoading"></Loading>
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
      isLoading: false,
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
      },
      fullAddress() { //完整社區地址
         let { city, area } = this.position;
         let { floor, dong, number1, number2, room, unit } = this.houseInfo;
         let floorText = floor !== '' ? `${floor}樓` : '';
         let dongText = dong !== '' ? `${dong}棟` : '';
         let roomText = room !== '' ? `${room}室` : '';
         let unitText = unit !== '' ? unit : '';
         let number1Text = '';
         let number2Text = '';
         if (number1 !== '' && number2 !== '') {
            number1Text = number1;
            number2Text = `-${number2}號`;
         } else if (number1 !== '' && number2 === '') {
            number1Text = `${number1}號`;
            number2Text = '';
         } else if (number1 === '' && number2 !== '') {
            number1Text = '';
            number2Text = `${number2}號`;
         } else if (number1 === '' && number2 === '') {
            number1Text = '';
            number2Text = '';
         }
         return `${city}${area}${floorText}${dongText}${roomText}
            ${number1Text}${number2Text}${unitText}`;
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
      },
      async addMember() { //增加社區成員
         this.isLoading = true;
         return await communityObj.addMember({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iCommunityId: this.apartmentData.id,
            vRoom: this.houseInfo.room,
            vAccount: this.userInfo.account,
            iType: 1,
            vRemark: ''
         }).then(res => {
            return res;
         }).finally(() => this.isLoading = false);
      },
      async addHandler() {
         let { status } = await this.addMember().then(res => res);
         let isSuccess = status === 1;
         this.$swal({
            icon: isSuccess ? 'success' : 'error',
            title: isSuccess ? '添加成功' : '添加失敗'
         });
         if (isSuccess) this.$bvModal.hide(this.modalId);
      }
   },
   async mounted() {
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