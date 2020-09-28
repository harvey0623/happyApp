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

      <div class="applyBlock apply-bottom">
         <div class="formLayout">
            <div class="formRow horizontal">
               <div class="formTitle">樓</div>
               <div class="formContent">
                  <input 
                     type="number" class="myInput" 
                     placeholder="請輸入數字" v-model.number="myFloor">
               </div>
            </div>
            <div class="formRow horizontal">
               <div class="formTitle">棟</div>
               <div class="formContent">
                  <input 
                     type="text" class="myInput" 
                     placeholder="請輸入文字" v-model="myDong">
               </div>
            </div>
            <div class="formRow horizontal">
               <div class="formTitle">號</div>
               <div class="formContent numberSplit">
                  <input 
                     type="number" class="myInput" 
                     placeholder="請輸入數字" v-model.number="myNumber1">
                  <span>-</span>
                  <input 
                     type="number" class="myInput" 
                     placeholder="請輸入數字" v-model.number="myNumber2">
               </div>
            </div>
            <div class="formRow horizontal">
               <div class="formTitle">室</div>
               <div class="formContent">
                  <input 
                     type="text" class="myInput" 
                     placeholder="請輸入文字" v-model="myRoom">
               </div>
            </div>
            <div class="formRow horizontal">
               <div class="formTitle">單元</div>
               <div class="formContent">
                  <input 
                     type="text" class="myInput" 
                     placeholder="請輸入文字" v-model="myUnit">
               </div>
            </div>
         </div>
      </div>

   </template>
   <template v-slot:modal-footer>
      <button class="btnSure" @click="$emit('add')">送出申請</button>
   </template>
</b-modal>
</template>

<script>
import regionsList from '@/assets/json/index.json';
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
      },
      floor: {
         required: true
      },
      dong: {
         required: true
      },
      number1: {
         required: true
      },
      number2: {
         required: true
      },
      room: {
         required: true
      },
      unit: {
         required: true
      },
      fullAddress: {
         required: true
      }
   },
   data: () => ({
      regionsList,
      isFirst: true
   }),
   computed: {
      iId: {
         get() {
            return this.apartmentId;
         },
         set(val) {
            this.$emit('update:apartmentId', val);
         }
      },
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
            this.$emit('update:vArea', val);
         }
      },
      myFloor: {
         get() {
            return this.floor;
         },
         set(val) {
            this.$emit('update:floor', val);
         }
      },
      myDong: {
         get() {
            return this.dong;
         },
         set(val) {
            this.$emit('update:dong', val);
         }
      },
      myNumber1: {
         get() {
            return this.number1;
         },
         set(val) {
            this.$emit('update:number1', val);
         }
      },
      myNumber2: {
         get() {
            return this.number2;
         },
         set(val) {
            this.$emit('update:number2', val);
         }
      },
      myRoom: {
         get() {
            return this.room;
         },
         set(val) {
            this.$emit('update:room', val);
         }
      },
      myUnit: {
         get() {
            return this.unit;
         },
         set(val) {
            this.$emit('update:unit', val);
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
      }
   }
}
</script>

<style lang="scss" src="./index.scss"></style>