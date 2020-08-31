<template>
<b-modal :id="modalId" modal-class="mymodal" no-close-on-backdrop>
   <template v-slot:modal-header="{ close }">
      <i class="fal fa-times" @click="close()"></i>
      <h3>社區入住申請</h3>
   </template>
   <template v-slot:default>
      <div class="applyBlock apply-top">
         <div class="regionBox">
            <div class="regionRow">
               <p class="title">選擇縣市</p>
               <select class="mySelect" v-model="cityName">
                  <option 
                     v-for="city in cityList"
                     :key="city"
                     :value="city"
                  >{{ city }}</option>
               </select>
            </div>
            <div class="regionRow">
               <p class="title">選擇市區鄉鎮</p>
               <select class="mySelect" v-model="areaName">
                  <option 
                     v-for="area in areaList"
                     :key="area.name"
                     :value="area.name"
                  >{{ area.name }}</option>
               </select>
            </div>
         </div>
         <div class="nameBox">
            <p class="title">所在社區</p>
            <select class="mySelect" v-model="iId">
               <option 
                  v-for="item in apartmentList"
                  :key="item.iId"
                  :value="item.iId"
               >{{ item.vName }}</option>
            </select>
         </div>
      </div>
      <div class="applyBlock apply-middle">
         <i class="fal fa-map-marker-alt"></i>
         <span>{{ fullAddress }}</span> 
      </div>
   </template>
   <template v-slot:modal-footer>
      <button class="btnSure">送出申請</button>
   </template>
</b-modal>
</template>

<script>
import regionsList from '@/components/ZipCode/index.json';
export default {
   props: {
      modalId: {
         type: String,
         required: true
      },
      vCity: {
         type: String,
         required: true
      },
      vArea: {
         type: String,
         required: true
      },
      apartmentId: {
         type: Number,
         required: true
      },
      apartmentList: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      regionsList,
      isFirst: true
   }),
   computed: {
      cityName: {
         get() {
            return this.vCity;
         },
         set(val) {
            this.$emit('update:vCity', val);
         }
      },
      areaName: {
         get() {
            return this.vArea;
         },
         set(val) {
            console.log(val)
            this.$emit('update:vArea', val);
         }
      },
      cityList() {
         return this.regionsList.map(region => region.name);
      },
      areaList() {
         let result = this.regionsList.find(region => region.name === this.cityName);
         if (result !== undefined) {
            if (!this.isFirst) this.areaName = result.region[0].name;
            this.isFirst = false;
            return result.region;
         } else {
            return [];
         }
      },
      iId: {
         get() {
            return this.apartmentId;
         },
         set(val) {
            this.$emit('update:apartmentId', val);
         }
      },
      fullAddress() {
         return `${this.cityName}${this.areaName}`;
      }
   }
}
</script>

<style lang="scss" scoped>
%titleStyle {
   margin-bottom: 3px;
   color: map-get($fontColor, form);
   font-weight: bold;
}
.regionBox {
   @extend %bwtFlex;
   margin-bottom: 25px;
   >.regionRow {
      flex: 0 0 46%;
      >.title {
         @extend %titleStyle;      
      }
   }
}
.nameBox {
   >.title {
      @extend %titleStyle;
   }
}
.applyBlock {
   @include elGutter(margin-bottom, 25px);
}
.apply-middle {
   >i {
      margin-right: 10px;
      color: map-get($fontColor, header);
      font-size: 20px;
   }
   >span {
      color: map-get($fontColor, form);
   }
}
</style>