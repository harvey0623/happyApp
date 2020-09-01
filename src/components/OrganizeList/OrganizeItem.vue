<template>
<div class="organizeItem">
   <div class="imgBox">
      <img src="https://fakeimg.pl/100x100" alt="">
   </div>
   <div class="descBox">
      <div class="descTop">
         <div>
            <p class="name">{{ renterName }}</p>
            <p class="phone">{{ detail.vContact }}</p>
         </div>
         <div>
            <div class="character">{{ character }}</div>
            <div class="rentTime">{{ rentTime }}</div>
         </div>
      </div>
      <div class="descBottom">{{ detail.vRemark }}</div>
   </div>
</div>
</template>

<script>
export default {
   props: {
      detail: {
         type: Object,
         required: true
      }
   },
   computed: {
      renterName() {
         return this.detail.vName || 'userName';
      },
      character() {
         return this.detail === 1 ? '屋主' : '租客';
      },
      rentTime() {
         return new Date(this.detail.iCreateTime).toLocaleDateString();
      }
   }
}
</script>

<style lang="scss" scoped>
.organizeItem {
   display: flex;
   align-items: center;
   padding: 15px 15px;
   background-color: #f2f2f2;
   border-bottom: 1px solid #fff;
   >.imgBox {
      width: 50px;
      >img {
         @include size(100%, auto);
         border-radius: 50%;
      }
   }
   >.descBox {
      flex: 1;
      padding-left: 20px;
      
   }
}
.descTop {
   @extend %bwtFlex;
   margin-bottom: 10px;
   .name {
      margin-bottom: 3px;
      color: map-get($fontColor, sidebar);
      font-weight: bold;
   }
   .phone {
      font-size: 12px;
      color: map-get($fontColor, tab);
   }
   .character {
      max-width: 50px;
      margin: 0 auto 6px;
      color: #fff;
      background-color: map-get($elBgColor, auth);
      font-size: 14px;
      text-align: center;
      border-radius: 50px;
   }
   .rentTime {
      font-size: 12px;
      color: map-get($fontColor, tab);
   }
}
.descBottom {
   color: map-get($fontColor, form);
   font-size: 12px;
}
</style>