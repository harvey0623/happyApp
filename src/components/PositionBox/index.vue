<template>
<div class="positionBox">
   <div class="title">職務入口</div>
   <div class="positionList">
      <router-link 
         v-for="(item,index) in lists"
         :key="index"
         :to="item.href">
         <i :class="item.iconClass"></i>
         <span>{{ item.title }}</span>
      </router-link>
   </div>
</div>
</template>

<script>
export default {
   data: () => ({
      lists: [
         { title: '管委會', iconClass: 'fas fa-users', href: '/' },
         { title: '保全人員', iconClass: 'fas fa-user-shield', href: '/' },
         { title: '物業人員', iconClass: 'fas fa-user', href: '/' },
         { title: '房仲人員', iconClass: 'fas fa-user-tie', href: '/' },
      ]
   })
}
</script>

<style lang="scss">
.positionBox {
   display: flex;
   align-items: center;
   padding: 15px;
   >.title {
      flex: 0 0 65px;
      margin-right: 15px;
      color: map-get($fontColor, sidebar);
      font-weight: bold;
   }
   >.positionList {
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      overflow: auto;
      >a {
         flex: 0 0 160px;
         height: 38px;
         margin-right: 15px;
         background-color: map-get($elBgColor, position);
         border-radius: 50px;
         text-align: center;
         line-height: 38px;
         >i {
            color: map-get($fontColor, header);
            font-size: 20px;
         }
         >span {
            margin-left: 5px;
            color: map-get($fontColor, form);
         }
      }
   }
}
</style>