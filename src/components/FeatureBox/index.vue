<template>
<div class="featureBox">
   <div class="featureList">
      <router-link 
         v-for="(item,index) in lists"
         :key="index"
         :to="item.href">
         <img :src="item.imgUrl" alt="">
         <p>{{ item.title }}</p>
      </router-link>
   </div>
</div>
</template>

<script>
export default {
   data: () => ({
      lists: [
         { title: '管委會', imgUrl: require('@/assets/img/commonBtn1.svg'), href: '/' },
         { title: '保全人員', imgUrl: require('@/assets/img/commonBtn2.svg'), href: '/' },
         { title: '物業人員', imgUrl: require('@/assets/img/commonBtn3.svg'), href: '/' },
         { title: '房仲人員', imgUrl: require('@/assets/img/commonBtn4.svg'), href: '/' },
         { title: '房仲人員', imgUrl: require('@/assets/img/commonBtn5.svg'), href: '/' },
      ]
   })
}
</script>

<style lang="scss">
.featureBox {
   padding: 15px;
   >.featureList {
      display: flex;
      align-items: center;
      >a {
         flex: 0 0 20%;
         text-align: center;
         >img {
            margin-bottom: 5px;
         }
         >p {
            color: map-get($fontColor, form);
            font-size: 14px;
         }
      }
   }
}
</style>