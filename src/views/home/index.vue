<template>
<div class="home">
   <BannerBlock
      :targetCommunity="targetCommunity"
      @switch="chooseCommunity"
   ></BannerBlock>
   <PositionBox></PositionBox>
   <!-- <FeatureBox></FeatureBox> -->
   <BulletinSlider :bulletinData="bulletin1"></BulletinSlider>
   <Announce
      :title="'社區公告'"
      :announceData="bulletin2"
   ></Announce>

   <!-- 社區選擇modal -->
   <b-modal 
      id="calModal" modal-class="mymodal" 
      no-close-on-backdrop @hidden="hiddenModal">
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h3>切換社區</h3>
      </template>
      <template v-slot:default>
         <p class="formTitle">選擇社區</p>
         <select class="mySelect" v-model="selectId">
            <option 
               v-for="(item,index) in communityList"
               :key="index"
               :value="item.iId"
            >{{ item.vName }}</option>
         </select>
      </template>
      <template v-slot:modal-footer>
         <button class="btnSure" @click="switchCommunity">確定</button>
      </template>
   </b-modal>

   <Loading v-show="isLoading"></Loading>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BannerBlock from '@/components/BannerBlock/index.vue';
import BulletinSlider from '@/components/BulletinSlider/index.vue';
import Announce from '@/components/Announce/index.vue';
import PositionBox from '@/components/PositionBox/index.vue';
import FeatureBox from '@/components/FeatureBox/index.vue';
import communityObj from '@/api/community.js';
export default {
   name: 'home',
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.home.title'),
      }
   },
   data: () => ({
      communityList: [],
      selectId: '',
      bulletin1: [],
      bulletin2: [],
      isLoading: false
   }),
   computed: {
      ...mapState('auth', ['userInfo', 'userCommunity']),
      targetCommunity() {
         let result = this.communityList.find(item => item.iId === this.userCommunity);
         if (result !== undefined) return result;
         else return {};
      }
   },
   methods: {
      ...mapMutations('auth', ['setUserCommunity']),
      async getBulletin() { //取得社區公告資料
         this.isLoading = true;
         return await communityObj.getBulletin({
            iUserId: this.userInfo.user_id,
            vToken: this.userInfo.token,
            iCommunityId: this.userCommunity
         }).then(res => res)
            .finally(() => this.isLoading = false)
      },
      chooseCommunity() {
         this.$bvModal.show('calModal');
      },
      getStorageData() {
         let result = localStorage.getItem('userInfo');
         return JSON.parse(result);
      },
      tidyCommunity() {
         let result = JSON.parse(JSON.stringify(this.userInfo.community));
         result.sort((a, b) => a.iId - b.iId);
         return result;
      },
      setDefaultData() { //寫入預設資料
         this.communityList = this.tidyCommunity();
         if (this.userCommunity === null) {
            this.setUserCommunity(this.communityList[0].iId);
         }
         this.selectId = this.userCommunity;
      },
      tidyBulletin(data) { //整理社區公告資料
         this.bulletin1 = data.filter(item => item.iPosition === 1);
         this.bulletin2 = data.filter(item => item.iPosition === 2);
      },
      async switchCommunity() { //切換社區
         this.setUserCommunity(this.selectId);
         let bulletinData = await this.getBulletin().then(res => res);
         this.tidyBulletin(bulletinData);
         this.$bvModal.hide('calModal');
      },
      hiddenModal() {
         this.selectId = this.userCommunity;
      }
   },
   async mounted() {
      this.setDefaultData();
      await this.switchCommunity();
   },
   components: {
      BannerBlock,
      BulletinSlider,
      Announce,
      PositionBox,
      // FeatureBox
   }
}
</script>

<style lang="scss" src="./index.scss"></style>