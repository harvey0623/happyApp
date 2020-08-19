<template>
<div class="home">
   <BannerBlock
      :targetCommunity="targetCommunity"
      @switch="updateCommunity"
   ></BannerBlock>

   <div class="bulletonBox" v-show="hasBullein1">
      <swiper ref="mySwiper" :options="swiperOptions1" class="bulletin1Swiper">
         <swiper-slide
            v-for="item in bulletin2"
            :key="item.iId">  
            <img :src="item.vImage" alt="">
            <p class="imgDesc">{{ item.vTitle }}</p>
         </swiper-slide>
         <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
   </div>

   <!-- 社區選擇modal -->
   <b-modal id="calModal" modal-class="mymodal" no-close-on-backdrop>
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>切換社區</h3>
      </template>
      <template v-slot:default>
         <p class="formTitle">選擇社區</p>
         <select class="mySelect" v-model="selectId">
            <option 
               v-for="item in communityList"
               :key="item.iId"
               :value="item.iId"
            >{{ item.vName }}</option>
         </select>
      </template>
      <template v-slot:modal-footer>
         <button class="btnSure" @click="changeCal">確定</button>
      </template>
   </b-modal>

</div>
</template>

<script>
import BannerBlock from '@/components/BannerBlock/index.vue';
import communityObj from '@/api/community.js';
export default {
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.home.title'),
      }
   },
   data: () => ({
      userInfo: null,
      communityList: [],
      communityId: '',
      selectId: '',
      bulletin1: [],
      bulletin2: [],
      swiperOptions1: {
         loop: true,
         initialSlide: 0,
         spaceBetween: 10,
         pagination: {
            el: '.swiper-pagination'
         }
      }
   }),
   computed: {
      targetCommunity() {
         let result = this.communityList.find(item => item.iId === this.communityId);
         if (result !== undefined) return result;
         else return {};
      },
      hasBullein1() {
         return this.bulletin1.length > 0;
      }
   },
   methods: {
      getStorageData() {
         let result = localStorage.getItem('userInfo');
         return JSON.parse(result);
      },
      tidyCommunity() {
         let result = JSON.parse(JSON.stringify(this.userInfo.community));
         result.sort((a, b) => a.iId - b.iId);
         return result;
      },
      updateCommunity() {
         this.$bvModal.show('calModal');
      },
      async getBulletin() { //取得社區公告資料
         let result = await communityObj.getBulletin({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iCommunityId: this.communityId
         }).then(res => res);
         return result;
      },
      tidyBulletin(data) { //整理社區公告資料
         this.bulletin1 = data.filter(item => item.iPosition === 1);
         this.bulletin2 = data.filter(item => item.iPosition === 2);
         this.$refs.mySwiper.$swiper.slideTo(1, 0, false);
      },
      async changeCal() { //切換社區
         this.communityId = this.selectId;
         let bulletinData = await this.getBulletin().then(res => res);
         this.tidyBulletin(bulletinData);   
         this.$bvModal.hide('calModal');
      }
   },
   created() {
      this.userInfo = this.getStorageData();
      this.communityList = this.tidyCommunity();
      this.communityId = this.communityList[0].iId;
      this.selectId = this.communityId;
   },
   async mounted() {
      let bulletinData = await this.getBulletin().then(res => res);
      this.tidyBulletin(bulletinData);
   },
   components: {
      BannerBlock
   }
}
</script>

<style lang="scss" src="./index.scss"></style>