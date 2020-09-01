<template>
<li class="organizeList">
   <div class="groupName" @click="isOpen = !isOpen">
      <i class="fal fa-home"></i>
      <p class="name">{{ communityName }}</p>
      <p class="room">{{ room }}</p>
      <i class="fal fa-chevron-down" :class="{rotate: isOpen}"></i>
   </div>
   <SlideUpDown class="itemBox" :active="isOpen" :duration="250">
      <OrganizeItem
         v-for="list in lists"
         :key="list.iId"
         :detail="list"
      ></OrganizeItem>
   </SlideUpDown>
</li>
</template>

<script>
import SlideUpDown from 'vue-slide-up-down';
import OrganizeItem from '@/components/OrganizeList/OrganizeItem.vue';
export default {
   props: {
      communityName: {
         type: String,
         required: true
      },
      vRoom: {
         required: true
      },
      lists: {
         type: Array,
         required: true
      }
   },
   data: () => ({
      isOpen: true
   }),
   computed: {
      room() {
         return this.vRoom || '';
      }
   },
   components: {
      SlideUpDown,
      OrganizeItem
   }
}
</script>

<style lang="scss" scoped>
.groupName {
   display: flex;
   align-items: center;
   padding: 15px 0;
   >.fa-home,
   >.room {
      color: map-get($fontColor, header);
   }
   >.fa-home {
      font-size: 20px;
      margin-right: 5px;
   }
   >.name {
      margin-right: 5px;
      color: map-get($fontColor, sidebar);
      font-weight: bold;
   }
   >.fa-chevron-down {
      margin-left: auto;
      font-size: 18px;
      transition: transform 0.25s;
      &.rotate {
         transform: rotate(-180deg);
      }
   }
}
.itemBox {
   margin-left: -15px;
   margin-right: -15px;
}
</style>