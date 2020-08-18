<template>
<div class="home">
   <BannerBlock
      :targetCommunity="targetCommunity"
      @switch="updateCommunity"
   ></BannerBlock>

   <b-modal id="calModal" modal-class="mymodal">
      <template v-slot:modal-header="{ close }">
         <i class="fal fa-times" @click="close()"></i>
         <h5>切換社區</h5>
      </template>
      <template v-slot:default="{ hide }">
         <p>Modal Body with button</p>
         <b-button @click="hide()">Hide Modal</b-button>
      </template>
   </b-modal>

</div>
</template>

<script>
import BannerBlock from '@/components/BannerBlock/index.vue';
export default {
   metaInfo() {
      return { 
         title: this.$i18n.t('seo.home.title'),
      }
   },
   data: () => ({
      communityList: [],
      communityId: ''
   }),
   computed: {
      targetCommunity() {
         return this.communityList.find(item => item.iId === this.communityId);
      }
   },
   methods: {
      getStorageData() {
         let result = localStorage.getItem('userInfo');
         return JSON.parse(result);
      },
      tidyCommunity(data) {
         let result = JSON.parse(JSON.stringify(data.community));
         result.sort((a, b) => a.iId - b.iId);
         return result;
      },
      updateCommunity() {
         this.$bvModal.show('calModal');
      }
   },
   created() {
      let userInfo = this.getStorageData();
      this.communityList = this.tidyCommunity(userInfo);
      this.communityId = this.communityList[0].iId;
   },
   mounted() {
      this.$bvModal.show('calModal');
   },
   components: {
      BannerBlock
   }
}
</script>

<style lang="scss" src="./index.scss"></style>